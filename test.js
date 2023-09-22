import assert from 'node:assert/strict'
import test from 'node:test'
import rehypeStringify from 'rehype-stringify'
import {remark} from 'remark'
import remarkFrontmatter from 'remark-frontmatter'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'
import remarkYamlConfig from './index.js'

test('remark-yaml-config', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('./index.js')).sort(), [
      'default'
    ])
  })

  await t.test('should not throw without compiler', async function () {
    assert.doesNotThrow(function () {
      unified().use(remarkYamlConfig).freeze()
    })
  })

  await t.test('should not fail without yaml', async function () {
    assert.equal(
      String(
        await remark()
          .use(remarkFrontmatter)
          .use(remarkYamlConfig)
          .process('# Foo bar\n')
      ),
      '# Foo bar\n'
    )
  })

  await t.test('should not fail on empty yaml', async function () {
    assert.equal(
      String(
        await remark()
          .use(remarkFrontmatter)
          .use(remarkYamlConfig)
          .process('---\n---')
      ),
      '---\n---\n'
    )
  })

  await t.test('should set stringification options', async function () {
    assert.equal(
      String(
        await remark()
          .use(remarkFrontmatter)
          .use(remarkYamlConfig)
          .process('---\nremark:\n  bullet: "*"\n---\n-   Foo')
      ),
      '---\nremark:\n  bullet: "*"\n---\n\n* Foo\n'
    )
  })

  await t.test('should throw exceptions', async function () {
    try {
      await remark()
        .use(remarkFrontmatter)
        .use(remarkYamlConfig)
        .process('---\nremark:\n  bullet: "?"\n---\n-   Foo')
      assert.fail()
    } catch (error) {
      assert.match(
        String(error),
        /Cannot serialize items with `\?` for `options.bullet`/
      )
    }
  })

  await t.test('should work with a different compiler', async function () {
    assert.equal(
      String(
        await remark()
          .use(remarkFrontmatter)
          .use(remarkYamlConfig)
          .use(remarkRehype)
          .use(rehypeStringify)
          .process(
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
      ),
      '<ol>\n<li>Foo</li>\n</ol>'
    )
  })
})
