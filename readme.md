# remark-yaml-config [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Configure **remark** with YAML front-matter.

## Installation

[npm][npm-install]:

```bash
npm install remark-yaml-config
```

**remark-yaml-config** is also available as an AMD, CommonJS, and
globals module, [uncompressed and compressed][releases].

## Usage

Dependencies:

```javascript
var remark = require('remark');
var config = require('remark-yaml-config');
```

Process:

```javascript
var file = remark().use(config).process([
    '---',
    'remark:',
    '  commonmark: true',
    '  bullet: "*"',
    '---',
    '',
    '1) Commonmark list (this is a parse setting)',
    '',
    '- Hello (this is a stringification setting)',
    ''
].join('\n'));
```

Yields:

```markdown
---
remark:
  commonmark: true
  bullet: "*"
---

1.  Commonmark list (this is a parse setting)

*   Hello (this is a stringification setting)
```

## API

### `remark.use(yamlConfig)`

Passes the [configuration][remark-config] found in YAML front-matter
(under the `remark` key) to **remark**.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/remark-yaml-config.svg

[travis]: https://travis-ci.org/wooorm/remark-yaml-config

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/remark-yaml-config.svg

[codecov]: https://codecov.io/github/wooorm/remark-yaml-config

[npm-install]: https://docs.npmjs.com/cli/install

[releases]: https://github.com/wooorm/remark-yaml-config/releases

[license]: LICENSE

[author]: http://wooorm.com

[remark-config]: https://github.com/wooorm/remark/blob/master/doc/remarksetting.7.md
