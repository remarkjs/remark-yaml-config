# remark-yaml-config [![Build Status](https://img.shields.io/travis/wooorm/remark-yaml-config.svg)](https://travis-ci.org/wooorm/remark-yaml-config) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/remark-yaml-config.svg)](https://codecov.io/github/wooorm/remark-yaml-config)

Configure **remark** with YAML front-matter.

## Installation

[npm](https://docs.npmjs.com/cli/install)

```bash
npm install remark-yaml-config
```

**remark-yaml-config** is also available for [duo](http://duojs.org/#getting-started),
and as an AMD, CommonJS, and globals module, [uncompressed and
compressed](https://github.com/wooorm/remark-yaml-config/releases).

## Table of Contents

*   [Usage](#usage)

*   [API](#api)

    *   [remark.use(yamlConfig, options)](#remarkuseyamlconfig-options)

*   [License](#license)

## Usage

```javascript
var yamlConfig = require('remark-yaml-config');
var remark = require('remark').use(yamlConfig);
var input = [
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
].join('\n');
var tree = remark.parse(input);
```

Stringifying the document yields:

```javascript
var doc = remark.stringify(tree);
```

```markdown
---
remark:
  commonmark: true
  bullet: '*'
---

1.  Commonmark list (this is a parse setting)

*   Hello (this is a stringification setting)
```

## API

### [remark](https://github.com/wooorm/remark#api).[use](https://github.com/wooorm/remark#remarkuseplugin-options)(yamlConfig, options)

Passes the [configuration](https://github.com/wooorm/remark/blob/master/doc/Options.md)
found in YAML front-matter (under the `remark` key) to **remark**.

This is especially useful if you’re using **remark**’s [CLI](https://github.com/wooorm/remark#cli),
which allows multiple documents to be processed in one go, but you’d like
certain files to have different formatting.

**Signatures**

*   `remark = remark.use(yamlConfig, options?)`.

**Parameters**

*   `yamlConfig` — This plugin;
*   `options` (`Object?`) — Passed to [remark-yaml](https://github.com/wooorm/remark-yaml#remarkuseyaml-options).

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
