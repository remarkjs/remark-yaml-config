'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var test = require('tape');
var remark = require('remark');
var yamlConfig = require('./');

/*
 * Tests.
 */

test('remark-yaml-config', function (t) {
    t.equal(
        remark().use(yamlConfig).process('# Foo bar\n'),
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
        remark().use(yamlConfig).process([
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
            ].join('\n'));
        },
        /1:1-4:4: Invalid value `\?` for setting `options\.bullet`/,
        'should throw exceptions with location information'
    );

    t.end();
});
