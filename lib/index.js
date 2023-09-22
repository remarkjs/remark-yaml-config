/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Yaml} Yaml
 * @typedef {import('unified').Processor<undefined, undefined, undefined, Root>} Processor
 */

import yaml from 'yaml'

/**
 * Configure remark with YAML frontmatter.
 *
 * @returns {undefined}
 *   Nothing.
 */
export default function remarkYamlConfig() {
  // @ts-expect-error: TypeScript doesn’t handle `this` well.
  // eslint-disable-next-line unicorn/no-this-assignment
  const self = /** @type {Processor} */ (this)
  const data = self.data()
  const toMarkdownExtensions =
    data.toMarkdownExtensions || (data.toMarkdownExtensions = [])

  toMarkdownExtensions.push({
    handlers: {
      /** @param {Yaml} node */
      yaml(node, _, state) {
        /** @type {unknown} */
        const data = yaml.parse(node.value)
        const config =
          data && typeof data === 'object' && 'remark' in data
            ? data.remark
            : undefined

        if (config) {
          state.options = {...state.options, ...config}
        }

        // Like the source:
        // <https://github.com/syntax-tree/mdast-util-frontmatter/blob/d76616b/lib/index.js#L142>
        return '---' + (node.value ? '\n' + node.value : '') + '\n---'
      }
    }
  })
}
