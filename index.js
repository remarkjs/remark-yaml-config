/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module remark:yaml-config
 * @fileoverview Configure remark with YAML front-matter.
 */

'use strict';

/* eslint-env commonjs */

/*
 * Dependencies.
 */

var jsYAML = require('js-yaml');

/**
 * Wrapper factory.
 *
 * @param {Function} original - Spied on function.
 * @return {Function} - Spy.
 */
function factory(original) {
    /**
     * Replacer for tokeniser or visitor.
     *
     * @param {Node|Function} node - Node, when visitor,
     *   or `eat`.
     * @return {*} - Result of the spied on function.
     */
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
        } catch (exception) {
            self.file.fail(exception.message, marker);
        }

        return result;
    }

    replacement.locator = original.locator;

    return replacement;
}

/**
 * Modify remark to read configuration from comments.
 *
 * @param {Remark} remark - Instance.
 */
function attacher(remark) {
    var parser = remark.Parser.prototype.blockTokenizers;
    var compiler = remark.Compiler.prototype.visitors;

    parser.yamlFrontMatter = factory(parser.yamlFrontMatter);
    compiler.yaml = factory(compiler.yaml);
}

/*
 * Expose.
 */

module.exports = attacher;
