import test from 'tape'
import {unified} from 'unified'
import {remark} from 'remark'
import remarkFrontmatter from 'remark-frontmatter'
import remarkHtml from 'remark-html'
import remarkYamlConfig from './index.js'

test('remark-yaml-config', (t) => {
  t.equal(
    remark()
      .use(remarkFrontmatter)
      .use(remarkYamlConfig)
      .processSync('# Foo bar\n')
      .toString(),
    '# Foo bar\n',
    'should not fail without yaml'
  )

  t.equal(
    remark()
      .use(remarkFrontmatter)
      .use(remarkYamlConfig)
      .processSync('---\n---')
      .toString(),
    '---\n---\n',
    'should not fail on empty yaml'
  )

  t.equal(
    remark()
      .use(remarkFrontmatter)
      .use(remarkYamlConfig)
      .processSync('---\nremark:\n  bullet: "*"\n---\n-   Foo')
      .toString(),
    '---\nremark:\n  bullet: "*"\n---\n\n*   Foo\n',
    'should set stringification options'
  )

  t.throws(
    () => {
      remark()
        .use(remarkFrontmatter)
        .use(remarkYamlConfig)
        .processSync('---\nremark:\n  bullet: "?"\n---\n-   Foo')
        .toString()
    },
    /Cannot serialize items with `\?` for `options.bullet`/,
    'should throw exceptions'
  )

  t.doesNotThrow(() => {
    unified().use(remarkYamlConfig).freeze()
  }, 'should not throw without compiler')

  t.equal(
    remark()
      .use(remarkFrontmatter)
      .use(remarkYamlConfig)
      .use(remarkHtml)
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
