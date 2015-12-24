var yamlConfig = require('./index.js');
var remark = require('remark').use(yamlConfig);

var input = [
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
].join('\n');

var tree = remark.parse(input);

// Stringifying the document yields:
var doc = remark.stringify(tree);

console.log('markdown', doc);
