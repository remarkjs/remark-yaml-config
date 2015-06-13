'use strict';

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

    // it('should support empty yaml', function () {
    //     assert(yaml([
    //         '---',
    //         '---',
    //         '',
    //         '# Foo bar',
    //         ''
    //     ].join('\n')) === [
    //         '---',
    //         '---',
    //         '',
    //         '# Foo bar',
    //         ''
    //     ].join('\n'));
    // });
    //
    // it('should accept `parse` and `stringify`', function () {
    //     assert(yaml([
    //         '---',
    //         '"hello": "world"',
    //         '---',
    //         '',
    //         '# Foo bar',
    //         ''
    //     ].join('\n'), {
    //         'parse': 'load',
    //         'stringify': 'dump'
    //     }) === [
    //         '---',
    //         'hello: world',
    //         '---',
    //         '',
    //         '# Foo bar',
    //         ''
    //     ].join('\n'));
    // });
    //
    // it('should expose a `yaml` property', function () {
    //     var ast = yaml([
    //         '---',
    //         '"hello": "world"',
    //         '---',
    //         '',
    //         '# Foo bar',
    //         ''
    //     ].join('\n'), null, true).children[0];
    //
    //     assert('yaml' in ast);
    //     assert('hello' in ast.yaml);
    //     assert(ast.yaml.hello === 'world');
    // });
    //
    // it('should not stringify yaml when `prettify: false`', function () {
    //     assert(yaml([
    //         '---',
    //         '"hello": "world"',
    //         '---',
    //         '',
    //         '# Foo bar',
    //         ''
    //     ].join('\n'), {
    //         'prettify': false
    //     }) === [
    //         '---',
    //         '"hello": "world"',
    //         '---',
    //         '',
    //         '# Foo bar',
    //         ''
    //     ].join('\n'));
    // });
    //
    // it('should accept `library`', function () {
    //     var ast = yaml([
    //         '---',
    //         '"hello": "world"',
    //         '---',
    //         '',
    //         '# Foo bar',
    //         ''
    //     ].join('\n'), {
    //         'library': tjYAML,
    //         'parse': 'eval'
    //     }, true).children[0];
    //
    //     /*
    //      * TJs `js-yaml` is a bit lacking, such as not
    //      * supporting quoted keys.
    //      */
    //
    //     assert('yaml' in ast);
    //     assert(ast.yaml === 'hello');
    // });
    //
    // it('should accept `onparse`', function () {
    //     var isInvoked;
    //
    //     /**
    //      * Assertion.
    //      */
    //     function onparse(node) {
    //         assert(node.type === 'yaml');
    //         assert(node.value === '"hello": "world"');
    //         assert(node.yaml.hello === 'world');
    //
    //         isInvoked = true;
    //     }
    //
    //     yaml([
    //         '---',
    //         '"hello": "world"',
    //         '---',
    //         '',
    //         '# Foo bar',
    //         ''
    //     ].join('\n'), {
    //         'onparse': onparse
    //     });
    //
    //     assert(isInvoked === true);
    // });
    //
    // it('should accept `onstringify`', function () {
    //     var isInvoked;
    //
    //     /**
    //      * Assertion.
    //      */
    //     function onstringify(node) {
    //         assert(node.type === 'yaml');
    //         assert(node.value === 'hello: world');
    //         assert(node.yaml.hello === 'world');
    //
    //         isInvoked = true;
    //     }
    //
    //     yaml([
    //         '---',
    //         '"hello": "world"',
    //         '---',
    //         '',
    //         '# Foo bar',
    //         ''
    //     ].join('\n'), {
    //         'onstringify': onstringify
    //     });
    //
    //     assert(isInvoked === true);
    // });
});
