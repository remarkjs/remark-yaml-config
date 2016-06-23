'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var test = require('tape');
var unified = require('unified');
var remark = require('remark');
var html = require('remark-html');
var yamlConfig = require('./');

/*
 * Tests.
 */

test('remark-yaml-config', function (t) {
    t.equal(
        remark().use(yamlConfig).process('# Foo bar\n').toString(),
        '# Foo bar\n',
        'should not fail without yaml'
    );

    t.equal(
        remark().use(yamlConfig).process([
            '---',
            'remark:',
            '  commonmark: true',
            '---',
            '',
            '1)  Foo',
            ''
        ].join('\n')).toString(),
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
        remark().use(yamlConfig).process([
            '---',
            'remark:',
            '  bullet: "*"',
            '---',
            '',
            '-   Foo',
            ''
        ].join('\n')).toString(),
        [
            '---',
            'remark:',
            '  bullet: "*"',
            '---',
            '',
            '*   Foo',
            ''
        ].join('\n'),
        'should set stringification options'
    );

    t.throws(
        function () {
            remark().use(yamlConfig).process([
                '---',
                'remark:',
                '  bullet: "?"',
                '---',
                '',
                '-   Foo',
                ''
            ].join('\n')).toString();
        },
        /1:1-4:4: Invalid value `\?` for setting `options\.bullet`/,
        'should throw exceptions with location information'
    );

    t.doesNotThrow(
        function () {
            unified().use(yamlConfig)
        },
        'should not throw without parser / compiler'
    );

    t.equal(
        remark().use(html).use(yamlConfig).process([
            '---',
            'remark:',
            '  commonmark: true',
            '  bullet: "*"',
            '---',
            '',
            '1)  Foo',
            ''
        ].join('\n')).toString(),
        [
            '<ol>',
            '<li>Foo</li>',
            '</ol>',
            ''
        ].join('\n'),
        'should ignore missing compilers'
    );

    t.end();
});
