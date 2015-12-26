'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var test = require('tape');
var remark = require('remark');
var yamlConfig = require('./');

/**
 * Shortcut to process.
 *
 * @param {string} value - Markdown.
 * @param {Object?} [options] - Plug-in configuration.
 * @return {string} - Processed `value`.
 */
function yaml(value, options) {
    var parser = remark.use(yamlConfig, options);

    return parser.stringify(parser.parse(value));
}

/*
 * Tests.
 */

test('remark-yaml()', function (t) {
    t.equal(
        yaml('# Foo bar\n'),
        '# Foo bar\n',
        'should not fail without yaml'
    );

    t.equal(
        yaml([
            '---',
            'hello: "world"',
            '---',
            '',
            '# Foo bar',
            ''
        ].join('\n')),
        [
            '---',
            'hello: world',
            '---',
            '',
            '# Foo bar',
            ''
        ].join('\n'),
        'should parse and stringify yaml'
    );

    t.equal(
        yaml([
            '---',
            'remark:',
            '  commonmark: true',
            '---',
            '',
            '1)  Foo',
            ''
        ].join('\n')),
        [
            '---',
            'remark:',
            '  commonmark: true',
            '---',
            '',
            '1.  Foo',
            ''
        ].join('\n'),
        'should set parse options'
    );

    t.equal(
        yaml([
            '---',
            'remark:',
            '  bullet: "*"',
            '---',
            '',
            '-   Foo',
            ''
        ].join('\n')),
        [
            '---',
            'remark:',
            '  bullet: \'*\'',
            '---',
            '',
            '*   Foo',
            ''
        ].join('\n'),
        'should set stringification options'
    );

    t.throws(
        function () {
            yaml([
                '---',
                'remark:',
                '  bullet: "?"',
                '---',
                '',
                '-   Foo',
                ''
            ].join('\n'));
        },
        /1:1-4:4: Invalid value `\?` for setting `options\.bullet`/,
        'should throw exceptions with location information'
    );

    t.end();
});
