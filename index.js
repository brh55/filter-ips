'use strict';
const wildcard = require('wildcard');

module.exports = (ips, exclusions) => {
	if (!Array.isArray(ips)) {
		throw new TypeError('Expecting ips argument to be type of array');
	}

	exclusions = exclusions || [];

	if (exclusions.length === 0) {
		return ips;
	}

	if (!Array.isArray(exclusions)) {
		if (typeof exclusions === 'string') {
			exclusions = [exclusions];
		} else {
			throw new TypeError('Expecting exclusions argument to be type of array or string');
		}
	}

	// Build a list of matching ips
	// to match against
	var excludedIps = exclusions
			.map(exclude => wildcard(exclude, ips))
			.reduce((a, b) => a.concat(b));

	return ips.filter(ip => {
		return excludedIps.indexOf(ip) < 0;
	});
};
