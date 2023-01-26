const checkSyntax = (opts) => {
  if (opts.cidr && (opts.ipaddr || opts.netmask)) {
    throw new Error('The -c option cannot coexist with the -i or -m options')
  } else if (opts.gateway && !opts.cidr && (!opts.ipaddr || !opts.netmask)) {
    throw new Error(
      'If the -g option is present, both -i and -m must be present'
    )
  }
}

export default checkSyntax
