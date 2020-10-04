'use strict'

var yaml = require('js-yaml')
var warningIssued

module.exports = yamlConfig

// Modify remark to read configuration from comments.
function yamlConfig() {
  var data = this.data()

  /* istanbul ignore next - old remark. */
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

  /* istanbul ignore next - other extensions */
  if (!data.toMarkdownExtensions) data.toMarkdownExtensions = []

  data.toMarkdownExtensions.push({handlers: {yaml: yamlConfig}})

  function yamlConfig(node) {
    var data = yaml.safeLoad(node.value)
    Object.assign(this.options, (data && data.remark) || {})
    // Like the source:
    // <https://github.com/syntax-tree/mdast-util-frontmatter/blob/583ae25/lib/to-markdown.js#L28>
    return '---' + (node.value ? '\n' + node.value : '') + '\n---'
  }
}
