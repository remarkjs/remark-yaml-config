'use strict';

var test = require('tape');
var unified = require('unified');
var remark = require('remark');
var frontmatter = require('remark-frontmatter');
var html = require('remark-html');
var yamlConfig = require('.');

var processor = remark().use(frontmatter).use(yamlConfig);
var processorHTML = remark().use(frontmatter).use(yamlConfig).use(html);

test('remark-yaml-config', function (t) {
  t.equal(
    processor.processSync('# Foo bar\n').toString(),
    '# Foo bar\n',
    'should not fail without yaml'
  );

  t.equal(
    processor.processSync([
      '---',
      'remark:',
      '  commonmark: true',
      '---',
      '',
      '1)  Foo',
      ''
    ].join('\n')).toString(),
    [
      '---',
      'remark:',
      '  commonmark: true',
      '---',
      '',
      '1.  Foo',
      ''
    ].join('\n'),
    'should set parse options'
  );

  t.equal(
    processor.processSync([
      '---',
      'remark:',
      '  bullet: "*"',
      '---',
      '',
      '-   Foo',
      ''
    ].join('\n')).toString(),
    [
      '---',
      'remark:',
      '  bullet: "*"',
      '---',
      '',
      '*   Foo',
      ''
    ].join('\n'),
    'should set stringification options'
  );

  t.throws(
    function () {
      processor.processSync([
        '---',
        'remark:',
        '  bullet: "?"',
        '---',
        '',
        '-   Foo',
        ''
      ].join('\n')).toString();
    },
    /1:1-4:4: Invalid value `\?` for setting `options\.bullet`/,
    'should throw exceptions with location information'
  );

  t.doesNotThrow(
    function () {
      unified().use(yamlConfig).freeze();
    },
    'should not throw without parser / compiler'
  );

  t.equal(
    processorHTML.processSync([
      '---',
      'remark:',
      '  commonmark: true',
      '  bullet: "*"',
      '---',
      '',
      '1)  Foo',
      ''
    ].join('\n')).toString(),
    [
      '<ol>',
      '<li>Foo</li>',
      '</ol>',
      ''
    ].join('\n'),
    'should ignore missing compilers'
  );

  t.end();
});
