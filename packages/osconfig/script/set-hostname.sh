#!/bin/bash
# Desc: Set the system hostname and change the local domain name resolution name
set -u

current_dir=`dirname $(readlink -f $0)`
parent_dir=`dirname $current_dir`
template_dir="${parent_dir}/template"

hostname=$1

if [ ${#} -ne 1 ]; then
    echo "check params number!"
    exit 99
fi

function main(){

if [ $(uname) == "Linux" ]; then
    # modify /etc/hostname
    if [ -f "/etc/hostname" ]; then
        echo "${hostname}" > /etc/hostname
        hostnamectl set-hostname ${hostname}
    fi
    # modify /etc/hosts
    if [ -f "/etc/hosts" ]; then
        cp -a ${template_dir}/hosts.j2 /etc/hosts
        sed -i "s/{{ hostname }}/${hostname}/" /etc/hosts
    fi
fi

}

function test() {

sleep 2
echo "${hostname} !!!"

}

# Replace the real running function name here
main

exit 0
#EOF