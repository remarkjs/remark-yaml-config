/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module remark:yaml-config
 * @fileoverview Configure remark with YAML front-matter.
 */

'use strict';

/* Dependencies. */
var jsYAML = require('js-yaml');

/* Expose. */
module.exports = yamlConfig;

/**
 * Modify remark to read configuration from comments.
 *
 * @param {Unified} processor - Instance.
 */
function yamlConfig(processor) {
  var Parser = processor.Parser;
  var Compiler = processor.Compiler;
  var parser = Parser && Parser.prototype.blockTokenizers;
  var compiler = Compiler && Compiler.prototype.visitors;

  if (parser && parser.yamlFrontMatter) {
    parser.yamlFrontMatter = factory(parser.yamlFrontMatter);
  }

  if (compiler && compiler.yaml) {
    compiler.yaml = factory(compiler.yaml);
  }
}

/* Wrapper factory. */
function factory(original) {
  replacement.locator = original.locator;

  return replacement;

  /* Replacer for tokeniser or visitor. */
  function replacement(node) {
    var self = this;
    var result = original.apply(self, arguments);
    var marker = result && result.type ? result : node;
    var data;

    try {
      data = jsYAML.safeLoad(marker.value);
      data = data && data.remark;

      if (data) {
        self.setOptions(data);
      }
    } catch (err) {
      self.file.fail(err.message, marker);
    }

    return result;
  }
}
