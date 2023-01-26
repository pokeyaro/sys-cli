#!/bin/bash
# Desc: Modify the linux network card configuration file (modify ip)
set -u

datesuf=`date +%Y%m%d`
current_dir=`dirname $(readlink -f $0)`
parent_dir=`dirname $current_dir`
template_dir="${parent_dir}/template"

os_ver=`bash ${current_dir}/os-release.sh`

ifname=$1
ipaddr=$2
netmask=$3
gateway=$4

if [ ${#} -ne 4 ]; then
    echo "check params number!"
    exit 99
fi

case ${os_ver} in
    'debian 11')
        default_conf="/etc/network/interfaces"
        template_conf="${template_dir}/interfaces.j2"
        service_name="networking.service"
    ;;
    'centos 7'|'redhat 7.5')
        default_conf="/etc/sysconfig/network-scripts/ifcfg-${ifname}"
        template_conf="${template_dir}/ifcfg-ifname.j2"
        service_name="network.service"
    ;;
    'suse 12.3')
        default_conf="/etc/sysconfig/network/ifcfg-${ifname}"
        template_conf="${template_dir}/ifcfg-ifname.j2"
        service_name="network.service"
    ;;
    *)
        echo "The '${os_ver}' operating system is not adapted!"
        exit 99
    ;;
esac

# modify network
function main() {

# Backup original configuration
mv ${default_conf} ${default_conf}.bak${datesuf}

# Copy the template file to the target location
cp -a ${template_conf} ${default_conf}

# Modify the configuration file
sed -i "s/{{ nicname }}/${ifname}/; \
        s/{{ ipaddr }}/${ipaddr}/; \
        s/{{ netmask }}/${netmask}/; \
        s/{{ gateway }}/${gateway}/" ${default_conf}

# Modify file permissions
chmod 0644 ${default_conf}

# Reload the service (try three times)
for i in $(seq 0 3);
do
    ip addr show ${ifname} | grep -i "state UP" -A 4 | grep -q ${ipaddr}
    if [ $? -eq 0 ]; then
        echo "Network setup successful."
        break
    fi
    if [ $i -eq 3 ]; then
        echo "The network card starts abnormally, and the ip setting fails, please check manually!"
        exit 99
    fi
    sleep 1
    systemctl restart ${service_name}
    sleep 1
done

}

function test() {

sleep 3
echo "${ifname}
${ipaddr}
${netmask}
${gateway}
${default_conf}
${template_conf}
${service_name}
"

}

# Replace the real running function name here
main

exit 0
#EOF