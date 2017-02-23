# remark-yaml-config [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

Configure [**remark**][remark] with YAML front-matter.

## Installation

[npm][]:

```bash
npm install remark-yaml-config
```

## Usage

```javascript
var remark = require('remark');
var config = require('remark-yaml-config');

var file = remark().use(config).processSync([
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

console.log(String(file));
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

Passes the configuration at the `remark` field as [parse][parse-settings]
and [stringify][stringify-settings] settings.

Just like [**remark-comment-config**][remark-comment-config], but YAML is
more visible.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/wooorm/remark-yaml-config.svg

[build-status]: https://travis-ci.org/wooorm/remark-yaml-config

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/remark-yaml-config.svg

[coverage-status]: https://codecov.io/github/wooorm/remark-yaml-config

[chat-badge]: https://img.shields.io/gitter/room/wooorm/remark.svg

[chat]: https://gitter.im/wooorm/remark

[license]: LICENSE

[author]: http://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[remark]: https://github.com/wooorm/remark

[parse-settings]: https://github.com/wooorm/remark/blob/master/packages/remark-parse/readme.md#options

[stringify-settings]: https://github.com/wooorm/remark/blob/master/packages/remark-stringify/readme.md#options

[remark-comment-config]: https://github.com/wooorm/remark-comment-config
