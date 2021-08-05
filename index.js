import jsYaml from 'js-yaml'

var warningIssued

// Modify remark to read configuration from comments.
export default function remarkYamlConfig() {
  var data = this.data()

  // Old remark.
  /* c8 ignore next 11 */
  if (
    !warningIssued &&
    this.Compiler &&
    this.Compiler.prototype &&
    this.Compiler.prototype.visitors
  ) {
    warningIssued = true
    console.warn(
      '[remark-heading-gap] Warning: please upgrade to remark 13 to use this plugin'
    )
  }

  // Other extensions
  /* c8 ignore next */
  if (!data.toMarkdownExtensions) data.toMarkdownExtensions = []

  data.toMarkdownExtensions.push({handlers: {yaml: yamlConfig}})

  function yamlConfig(node) {
    var data = jsYaml.load(node.value)
    Object.assign(this.options, (data && data.remark) || {})
    // Like the source:
    // <https://github.com/syntax-tree/mdast-util-frontmatter/blob/583ae25/lib/to-markdown.js#L28>
    return '---' + (node.value ? '\n' + node.value : '') + '\n---'
  }
}
