// Dependencies:
var remark = require('remark');
var config = require('./index.js');

// Process:
var file = remark().use(config).process([
    '---',
    'remark:',
    '  commonmark: true',
    '  bullet: "*"',
    '---',
    '',
    '1) Commonmark list (this is a parse setting)',
    '',
    '- Hello (this is a stringification setting)',
    ''
].join('\n'));

// Yields:
console.log('markdown', String(file));
