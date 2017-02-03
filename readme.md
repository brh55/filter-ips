# filter-ips [![Build Status](https://img.shields.io/travis/brh55/filter-ips.svg?style=flat-square)](https://travis-ci.org/brh55/filter-ips) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/sindresorhus/xo)

> Filter a list of IPv4 addresess based on a list of exclusion ips or addresses containing wildcards.
>
> filterIps([], []) => []


## Install

```
$ npm install --save filter-ips
```

## Usage
### Basic
```js
const filterIps = require('filter-ips');

const ips = ['1.2.3.4', '1.2.3.5', '1.2.3.6', '1.2.3.7'];
const exclusions = ['1.2.3.4', '1.2.3.6'];
filterIps(ips, exclusions);
//=> ['1.2.3.5', '1.2.3.7'];
```

### Wildcards
```js
const filterIps = require('filter-ips');

const ips = [
	'1.2.3.4',
	'240.230.29.1',
	'240.230.29.2',
	'255.255.255.255',
	'255.255.255.254'
];
const exclusions = ['1.2.3.4', '255.*.*.*'];
filterIps(ips, exclusions);
//=> ['240.230.29.1', '240.230.29.2'];
```

## API

### filterIps(ips, exclusions)

#### ips

Type: [`<array>[<string>]`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Indexed_collections_Arrays_and_typed_Arrays)

A list of IPv4 addresses.

#### exclusions

Type: [`<array>[<string>]`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Indexed_collections_Arrays_and_typed_Arrays) | [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

A list of exclusions to be omitted from the list of IPs entered. Exclusion items can be a specific address or address containing wildcards.

## Related

[ip-class](https://github.com/brh55/ip-class) - :capital_abcd: Return the classful network class (A, B, C, D, E) of an IPv4 address

## License

MIT © [Brandon Him](https://github.com/brh55)
