'use strict'

var test = require('tape')
var unified = require('unified')
var remark = require('remark')
var frontmatter = require('remark-frontmatter')
var html = require('remark-html')
var yamlConfig = require('.')

test('remark-yaml-config', function (t) {
  t.equal(
    remark()
      .use(frontmatter)
      .use(yamlConfig)
      .processSync('# Foo bar\n')
      .toString(),
    '# Foo bar\n',
    'should not fail without yaml'
  )

  t.equal(
    remark()
      .use(frontmatter)
      .use(yamlConfig)
      .processSync('---\n---')
      .toString(),
    '---\n---\n',
    'should not fail on empty yaml'
  )

  t.equal(
    remark()
      .use(frontmatter)
      .use(yamlConfig)
      .processSync('---\nremark:\n  bullet: "*"\n---\n-   Foo')
      .toString(),
    '---\nremark:\n  bullet: "*"\n---\n\n*   Foo\n',
    'should set stringification options'
  )

  t.throws(
    function () {
      remark()
        .use(frontmatter)
        .use(yamlConfig)
        .processSync('---\nremark:\n  bullet: "?"\n---\n-   Foo')
        .toString()
    },
    /Cannot serialize items with `\?` for `options.bullet`/,
    'should throw exceptions'
  )

  t.doesNotThrow(function () {
    unified().use(yamlConfig).freeze()
  }, 'should not throw without compiler')

  t.equal(
    remark()
      .use(frontmatter)
      .use(yamlConfig)
      .use(html)
      .processSync(
        [
          '---',
          'remark:',
          '  commonmark: true',
          '  bullet: "*"',
          '---',
          '',
          '1. Foo',
          ''
        ].join('\n')
      )
      .toString(),
    '<ol>\n<li>Foo</li>\n</ol>\n',
    'should work with a different compiler'
  )

  t.end()
})
