#!/bin/bash
# Desc: Get the release version of the current linux operating system
set -u

function main(){

file="/etc/os-release"
if [ $(uname) == 'Linux' ]; then
    ver_id=$(awk -F '=' '/VERSION_ID/{ gsub(/"/,""); print $2}' ${file})
    ver_name=$(awk 'BEGIN { FS="\""; OFS="" } /PRETTY_NAME/{ gsub("Red Hat", "RedHat"); val=$(NF-1) } END { split(val, a, fs=" "); print(tolower(a[1])) }' ${file})
    echo "${ver_name} ${ver_id}"
else
    echo "unknown"
    exit 99
fi

}

function test() {

example="redhat 7.5"
echo "${example}"

}

# Replace the real running function name here
main

exit 0
#EOF