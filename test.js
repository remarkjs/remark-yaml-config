'use strict';

/* eslint-env mocha */

/*
 * Dependencies.
 */

var assert = require('assert');
var mdast = require('mdast');
var yamlConfig = require('./');

/**
 * Shortcut to process.
 *
 * @param {string} value
 * @param {Object?} options
 * @return {string}
 */
function yaml(value, options) {
    var parser = mdast.use(yamlConfig, options);

    return parser.stringify(parser.parse(value));
}

/*
 * Tests.
 */

describe('mdast-yaml()', function () {
    it('should not fail without yaml', function () {
        assert(yaml('# Foo bar\n') === '# Foo bar\n');
    });

    it('should parse and stringify yaml', function () {
        assert(yaml([
            '---',
            'hello: "world"',
            '---',
            '',
            '# Foo bar',
            ''
        ].join('\n')) === [
            '---',
            'hello: world',
            '---',
            '',
            '# Foo bar',
            ''
        ].join('\n'));
    });

    it('should set parse options', function () {
        assert(yaml([
            '---',
            'mdast:',
            '  commonmark: true',
            '---',
            '',
            '1)  Foo',
            ''
        ].join('\n')) === [
            '---',
            'mdast:',
            '  commonmark: true',
            '---',
            '',
            '1.  Foo',
            ''
        ].join('\n'));
    });

    it('should set stringification options', function () {
        assert(yaml([
            '---',
            'mdast:',
            '  bullet: "*"',
            '---',
            '',
            '-   Foo',
            ''
        ].join('\n')) === [
            '---',
            'mdast:',
            '  bullet: \'*\'',
            '---',
            '',
            '*   Foo',
            ''
        ].join('\n'));
    });

    it('should throw exceptions with location information', function () {
        assert.throws(function () {
            yaml([
                '---',
                'mdast:',
                '  bullet: "?"',
                '---',
                '',
                '-   Foo',
                ''
            ].join('\n'));
        }, /Error: 1:1: Invalid value `\?` for setting `options\.bullet`/);
    });
});
