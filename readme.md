# mdast-yaml-config [![Build Status](https://img.shields.io/travis/wooorm/mdast-yaml-config.svg?style=flat)](https://travis-ci.org/wooorm/mdast-yaml-config) [![Coverage Status](https://img.shields.io/coveralls/wooorm/mdast-yaml-config.svg?style=flat)](https://coveralls.io/r/wooorm/mdast-yaml-config?branch=master)

Configure **mdast** with YAML front-matter.

## Installation

[npm](https://docs.npmjs.com/cli/install)

```bash
npm install mdast-yaml-config
```

[Component.js](https://github.com/componentjs/component)

```bash
component install wooorm/mdast-yaml-config
```

[Bower](http://bower.io/#install-packages)

```bash
bower install mdast-yaml-config
```

[Duo](http://duojs.org/#getting-started)

```javascript
var yamlConfig = require('wooorm/mdast-yaml-config');
```

UMD: globals, AMD, and CommonJS ([uncompressed](mdast-yaml-config.js) and [compressed](mdast-yaml-config.min.js)):

```html
<script src="path/to/mdast.js"></script>
<script src="path/to/mdast-yaml-config.js"></script>
<script>
  mdast.use(mdastYAMLConfig);
</script>
```

## Table of Contents

*   [Usage](#usage)

*   [API](#api)

    *   [mdast.use(yamlConfig, options)](#mdastuseyamlconfig-options)

*   [License](#license)

## Usage

```javascript
var yamlConfig = require('mdast-yaml-config');
var mdast = require('mdast').use(yamlConfig);
var input = [
    '---',
    'mdast:',
    '  commonmark: true',
    '  bullet: "*"',
    '---',
    '',
    '1) Commonmark list (this is a parse setting)',
    '',
    '- Hello (this is a stringification setting)',
    ''
].join('\n');
var tree = mdast.parse(input);
```

Stringifying the document yields:

```javascript
var doc = mdast.stringify(tree);
```

```markdown
---
mdast:
  commonmark: true
  bullet: '*'
---

1.  Commonmark list (this is a parse setting)

*   Hello (this is a stringification setting)
```

## API

### [mdast](https://github.com/wooorm/mdast#api).[use](https://github.com/wooorm/mdast#mdastuseplugin-options)(yamlConfig, options)

Passes the [configuration](https://github.com/wooorm/mdast/blob/master/doc/Options.md)
found in YAML front-matter (under the `mdast` key) to **mdast**.

This is especially useful if you’re using **mdast**’s [CLI](https://github.com/wooorm/mdast#cli),
which allows multiple documents to be processed in one go, but you’d like
certain files to have different formatting.

**Signatures**

*   `mdast = mdast.use(yamlConfig, options?)`.

**Parameters**

*   `yamlConfig` — This plugin;
*   `options` (`Object?`) — Passed to [mdast-yaml](https://github.com/wooorm/mdast-yaml#mdastuseyaml-options).

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
