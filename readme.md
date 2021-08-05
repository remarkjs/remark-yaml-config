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

## Important!

This plugin is affected by the new parser in remark
([`micromark`](https://github.com/micromark/micromark),
see [`remarkjs/remark#536`](https://github.com/remarkjs/remark/pull/536)).
Use version 4 while you’re still on remark 12.
Use version 5 for remark 13+.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install remark-yaml-config
```

## Use

Say we have the following file, `example.md`:

```markdown
---
remark:
  bullet: "*"
---

-   Hello
```

And our module, `example.js`, looks as follows:

```js
import {readSync} from 'to-vfile'
import {remark} from 'remark'
import remarkFrontmatter from 'remark-frontmatter'
import remarkYamlConfig from 'remark-yaml-config'

const file = readSync('example.md')

remark()
  .use(remarkFrontmatter)
  .use(remarkYamlConfig)
  .process(file)
  .then((file) => {
    console.log(String(file))
  })
```

Now, running `node example` yields:

```markdown
---
remark:
  bullet: "*"
---

*   Hello
```

## API

This package exports no identifiers.
The default export is `remarkYamlconfig`.

### `unified().use(remarkYamlconfig)`

Plugin to configure the processor with YAML frontmatter.
Takes the `'remark'` field in the frontmatter and passes it as configuration to
[`remark-stringify`][stringify-settings].

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

[build-badge]: https://github.com/remarkjs/remark-yaml-config/workflows/main/badge.svg

[build]: https://github.com/remarkjs/remark-yaml-config/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-yaml-config.svg

[coverage]: https://codecov.io/github/remarkjs/remark-yaml-config

[downloads-badge]: https://img.shields.io/npm/dm/remark-yaml-config.svg

[downloads]: https://www.npmjs.com/package/remark-yaml-config

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-yaml-config.svg

[size]: https://bundlephobia.com/result?p=remark-yaml-config

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[remark]: https://github.com/remarkjs/remark

[stringify-settings]: https://github.com/remarkjs/remark/blob/main/packages/remark-stringify/readme.md#options

[remark-comment-config]: https://github.com/remarkjs/remark-comment-config

[remark-frontmatter]: https://github.com/remarkjs/remark-frontmatter

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting
