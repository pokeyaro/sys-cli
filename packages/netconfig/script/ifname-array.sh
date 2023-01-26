#!/bin/bash
# Desc: Obtain the nic device name information in the system
set -u

function main(){

# version 1.0
# Use the `ip a` command to view the ifname name and the corresponding nic status (up/down).
# ip a | sed -n '/2:/,$p' | grep -Ev "link|ether|inet|valid_lft|altname" | awk '{ print $2, $0 }' | sed 's/:.*state//' | awk '{ print $1, $2 }' | sort -n | column -t

# version 2.0
# Obtain the corresponding nic speed information by viewing the `/sys/class/net/{ifname}/speed` file
flag="unknown"
ls -l /sys/class/net | egrep -v "^total|lo" | awk '{print $(NF-2)}' | awk '{print "echo "$0, "cat /sys/class/net/"$0"/speed 2> /dev/null || echo 0"}' | sed 's/ /\n/2' | sh | xargs -n 2 | awk -v "val=${flag}" '{if ($2>=1000 && $2<10000){print $0"MbE"} else if ($2>=10000){print $1, $2/1000"GbE"} else {print $1, val}}' | sort -rn -k 2 | column -t

}

function test() {

example="eno8403     1000MbE
enp152s0f1  10GbE
enp152s0f0  10GbE
enp177s0f1  40GbE
enp177s0f0  40GbE
wg4         unknown
wg3         unknown
wg2         unknown
wg1         unknown
eno8303     unknown
eno12409    unknown
eno12399    unknown"

echo "${example}"

}

# Replace the real running function name here
main

exit 0
#EOF