/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').YAML} YAML
 * @typedef {import('mdast-util-to-markdown').Options} Extension
 */

import jsYaml from 'js-yaml'

/**
 * Plugin to configure it with YAML frontmatter.
 *
 * @type {import('unified').Plugin<void[], Root>}
 */
export default function remarkYamlConfig() {
  const data = this.data()
  /** @type {Extension} */
  const yamlConfig = {
    handlers: {
      /** @param {YAML} node */
      yaml(node) {
        const data = jsYaml.load(node.value)
        /** @type {object|undefined} */
        const config =
          data && typeof data === 'object' && 'remark' in data
            ? // @ts-expect-error: hush we just checked.
              data.remark
            : undefined
        Object.assign(this.options, config || {})
        // Like the source:
        // <https://github.com/syntax-tree/mdast-util-frontmatter/blob/583ae25/lib/to-markdown.js#L28>
        return '---' + (node.value ? '\n' + node.value : '') + '\n---'
      }
    }
  }

  const extensions = /** @type {Extension[]} */ (
    // Other extensions
    /* c8 ignore next 2 */
    data.toMarkdownExtensions
      ? data.toMarkdownExtensions
      : (data.toMarkdownExtensions = [])
  )

  extensions.push(yamlConfig)
}
