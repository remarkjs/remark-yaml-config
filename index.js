import jsYaml from 'js-yaml'

// Modify remark to read configuration from comments.
export default function remarkYamlConfig() {
  const data = this.data()

  // Other extensions
  /* c8 ignore next */
  if (!data.toMarkdownExtensions) data.toMarkdownExtensions = []

  data.toMarkdownExtensions.push({handlers: {yaml: yamlConfig}})

  function yamlConfig(node) {
    const data = jsYaml.load(node.value)
    Object.assign(this.options, (data && data.remark) || {})
    // Like the source:
    // <https://github.com/syntax-tree/mdast-util-frontmatter/blob/583ae25/lib/to-markdown.js#L28>
    return '---' + (node.value ? '\n' + node.value : '') + '\n---'
  }
}
