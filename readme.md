# remark-yaml-config [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

Configure [**remark**][remark] with YAML front-matter.

## Installation

[npm][]:

```bash
npm install remark-yaml-config
```

## Usage

Say we have the following file, `example.md`:

```markdown
---
remark:
  commonmark: true
  bullet: "*"
---

1)  Commonmark list (this is a parse setting)

*   Hello (this is a stringification setting)
```

And our script, `example.js`, looks as follows:

```javascript
var vfile = require('to-vfile');
var remark = require('remark');
var yamlConfig = require('remark-yaml-config');

remark()
  .use(yamlConfig)
  .process(vfile.readSync('example.md'), function (err, file) {
    if (err) throw err;
    console.log(String(file));
  });
```

Now, running `node example` yields:

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
