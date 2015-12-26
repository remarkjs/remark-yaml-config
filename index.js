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

var yaml = require('remark-yaml');

/**
 * No-operation.
 */
function noop() {}

/**
 * Wrapper factory.
 *
 * @param {Function} method - Type to wrap.
 * @return {Function} - Wrapper.
 */
function factory(method) {
    var callback = method || noop;

    return function (node, instance) {
        var config = node.yaml && node.yaml.remark;

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
 * Modify remark to parse/stringify YAML.
 *
 * @param {Remark} remark - Instance.
 * @param {Object?} [options] - Plug-in configuration.
 */
function attacher(remark, options) {
    var settings = options || {};

    settings.onparse = factory(settings.onparse);
    settings.onstringify = factory(settings.onstringify);

    remark.use(yaml, settings);
}

/*
 * Expose.
 */

module.exports = attacher;
