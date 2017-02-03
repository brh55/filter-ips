'use strict';
const wildcard = require('wildcard');

module.exports = (ips, exclusions) => {
	if (!Array.isArray(ips)) {
		throw TypeError('Expecting ips argument to be type of array');
	}

	exclusions = exclusions || [];
	if (!Array.isArray(exclusions)) {
		if (typeof exclusions === 'string') {
			exclusions = [ exclusions ];
		} else {
			throw TypeError('Expecting exclusions argument to be type of array or string');
		}
	}

	// Build a list of matching ips
	// to match against
	var excludedIps = exclusions
			.map(exclude => wildcard(exclude, ips))
			.reduce((a, b) => {
				return a.concat(b);
			});

	return ips.filter(ip => {
	 	return excludedIps.indexOf(ip) < 0;
	});
}
