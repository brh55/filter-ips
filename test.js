import test from 'ava';
import fn from '.';

const ips = [
	'1.2.3.4',
	'10.255.233.3',
	'10.255.233.1',
	'10.25.233.240',
	'255.255.99.1',
	'255.255.233.2'
];

test('Test one wildcard', t => {
	t.deepEqual(
		fn(ips, '*.255.233.*'),
		['1.2.3.4', '10.25.233.240', '255.255.99.1'],
		'Remove 255.255.233.2 and 10.255.232.3');
});

test('Test two wildcards', t => {
	t.deepEqual(
		fn(ips, '*.255.*.1'),
		['1.2.3.4', '10.255.233.3', '10.25.233.240', '255.255.233.2'],
		'Remove any 255.255.99.1 and 10.255.233.1 in 2nd octect');
});

test('Test three wildcards', t => {
	t.deepEqual(
		fn(ips, '*.*.*.1'),
		['1.2.3.4', '10.255.233.3', '10.25.233.240', '255.255.233.2'],
		'Remove all the ips that don\'t have 1 in the last octect');
});

test('Test all wildcards', t => {
	t.deepEqual(fn(ips, '*.*.*.*'), [], 'Remove all ips');
});

test('Test empty exclusions', t => {
	t.deepEqual(fn(ips), ips, 'Exclude nothing');
});

test('Test multiple exclusions', t => {
	t.deepEqual(
		fn(ips, ['*.*.*.1', '*.*.*.240', '10.255.233.*']),
		[
			'1.2.3.4',
			'255.255.233.2'
		],
		'Remove all exclusions');
});

test('Test errors for type', t => {
	let err = t.throws(() => fn(123, 'hehe'), TypeError);
	t.is(err.message, 'Expecting ips argument to be type of array');

	err = t.throws(() => fn([], 444421), TypeError);
	t.is(err.message, 'Expecting exclusions argument to be type of array or string');
});
