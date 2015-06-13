'use strict';

/*
 * Dependencies.
 */

var yaml = require('mdast-yaml');

/**
 * No-operation.
 */
function noop() {}

/**
 * Wrapper factory.
 *
 * @param {function(Node, Parser|Compiler)} method
 * @return {function(Node, Parser|Compiler)}
 */
function factory(method) {
    var callback = method || noop;

    return function (node, instance) {
        var config = node.yaml && node.yaml.mdast;

        if (config) {
            try {
                instance.setOptions(config);
            } catch (exception) {
                instance.file.fail(exception.message, node);
            }
        }

        callback.apply(this, arguments);
    };
}

/**
 * Modify mdast to parse/stringify YAML.
 *
 * @param {MDAST} mdast
 * @param {Object?} options
 */
function attacher(mdast, options) {
    var settings = options || {};

    settings.onparse = factory(settings.onparse);
    settings.onstringify = factory(settings.onstringify);

    mdast.use(yaml, settings);
}

/*
 * Expose.
 */

module.exports = attacher;
