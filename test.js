'use strict';

/* eslint-env mocha */

/*
 * Dependencies.
 */

var assert = require('assert');
var mdast = require('mdast');
var yamlConfig = require('./');

/*
 * Methods.
 */

var equal = assert.strictEqual;
var throws = assert.throws;

/**
 * Shortcut to process.
 *
 * @param {string} value - Markdown.
 * @param {Object?} [options] - Plug-in configuration.
 * @return {string}
 */
function yaml(value, options) {
    var parser = mdast.use(yamlConfig, options);

    return parser.stringify(parser.parse(value));
}

/*
 * Tests.
 */

describe('remark-yaml()', function () {
    it('should not fail without yaml', function () {
        equal(yaml('# Foo bar\n'), '# Foo bar\n');
    });

    it('should parse and stringify yaml', function () {
        equal(yaml([
            '---',
            'hello: "world"',
            '---',
            '',
            '# Foo bar',
            ''
        ].join('\n')), [
            '---',
            'hello: world',
            '---',
            '',
            '# Foo bar',
            ''
        ].join('\n'));
    });

    it('should set parse options', function () {
        equal(yaml([
            '---',
            'remark:',
            '  commonmark: true',
            '---',
            '',
            '1)  Foo',
            ''
        ].join('\n')), [
            '---',
            'remark:',
            '  commonmark: true',
            '---',
            '',
            '1.  Foo',
            ''
        ].join('\n'));
    });

    it('should set stringification options', function () {
        equal(yaml([
            '---',
            'remark:',
            '  bullet: "*"',
            '---',
            '',
            '-   Foo',
            ''
        ].join('\n')), [
            '---',
            'remark:',
            '  bullet: \'*\'',
            '---',
            '',
            '*   Foo',
            ''
        ].join('\n'));
    });

    it('should throw exceptions with location information', function () {
        throws(function () {
            yaml([
                '---',
                'remark:',
                '  bullet: "?"',
                '---',
                '',
                '-   Foo',
                ''
            ].join('\n'));
        }, /1:1-4:4: Invalid value `\?` for setting `options\.bullet`/);
    });
});
