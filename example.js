var yamlConfig = require('./index.js');
var mdast = require('mdast').use(yamlConfig);

var input = [
    '---',
    'mdast:',
    '  commonmark: true',
    '  bullet: "*"',
    '---',
    '',
    '1) Commonmark list (this is a parse setting)',
    '',
    '- Hello (this is a stringification setting)',
    ''
].join('\n');

var tree = mdast.parse(input);

// Stringifying the document yields:
var doc = mdast.stringify(tree);

console.log('markdown', doc);
