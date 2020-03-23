# remark-yaml-config

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**remark**][remark] plugin to configure it with YAML frontmatter.
This requires [`remark-frontmatter`][remark-frontmatter] as well.

## Install

[npm][]:

```sh
npm install remark-yaml-config
```

## Use

Say we have the following file, `example.md`:

```markdown
---
remark:
  commonmark: true
  bullet: "*"
---

1)  Commonmark list (this is a parse setting)

*   Hello (this is a stringify setting)
```

And our script, `example.js`, looks as follows:

```js
var vfile = require('to-vfile')
var remark = require('remark')
var frontmatter = require('remark-frontmatter')
var yamlConfig = require('remark-yaml-config')

remark()
  .use(frontmatter)
  .use(yamlConfig)
  .process(vfile.readSync('example.md'), function(err, file) {
    if (err) throw err
    console.log(String(file))
  })
```

Now, running `node example` yields:

```markdown
---
remark:
  commonmark: true
  bullet: "*"
---

1.  Commonmark list (this is a parse setting)

*   Hello (this is a stringify setting)
```

## API

### `remark().use(yamlConfig)`

Plugin to configure the processor with YAML frontmatter.
Takes the `'remark'` field in the frontmatter and passes it as configuration to
[parse][parse-settings] and [stringify][stringify-settings].

Just like [`remark-comment-config`][remark-comment-config], but YAML is
more visible.

## Security

Use of `remark-yaml-config` can change how Markdown is parsed or compiled.
If the Markdown is user provided, this may open you up to a
[cross-site scripting (XSS)][xss] attack.

## Related

*   [`remark-comment-config`][remark-comment-config]
    — Configure with comments
*   [`remark-frontmatter`][remark-frontmatter]
    — Frontmatter support, including yaml, toml, and more

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/remarkjs/remark-yaml-config/master.svg

[build]: https://travis-ci.org/remarkjs/remark-yaml-config

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-yaml-config.svg

[coverage]: https://codecov.io/github/remarkjs/remark-yaml-config

[downloads-badge]: https://img.shields.io/npm/dm/remark-yaml-config.svg

[downloads]: https://www.npmjs.com/package/remark-yaml-config

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-yaml-config.svg

[size]: https://bundlephobia.com/result?p=remark-yaml-config

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/remark

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/master/contributing.md

[support]: https://github.com/remarkjs/.github/blob/master/support.md

[coc]: https://github.com/remarkjs/.github/blob/master/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[remark]: https://github.com/remarkjs/remark

[parse-settings]: https://github.com/remarkjs/remark/blob/master/packages/remark-parse/readme.md#options

[stringify-settings]: https://github.com/remarkjs/remark/blob/master/packages/remark-stringify/readme.md#options

[remark-comment-config]: https://github.com/remarkjs/remark-comment-config

[remark-frontmatter]: https://github.com/remarkjs/remark-frontmatter

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting
