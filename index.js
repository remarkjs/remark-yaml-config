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
        var position;
        var err;

        if (config) {
            try {
                instance.setOptions(config);
            } catch (exception) {
                position = node.position.start;

                err = new Error(
                    position.line + ':' + position.column + ': ' +
                    exception.message
                );

                err.reason = exception.message;
                err.line = position.line;
                err.column = position.column;

                throw err;
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
