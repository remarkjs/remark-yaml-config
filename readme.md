# remark-yaml-config [![Build Status](https://img.shields.io/travis/wooorm/remark-yaml-config.svg)](https://travis-ci.org/wooorm/remark-yaml-config) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/remark-yaml-config.svg)](https://codecov.io/github/wooorm/remark-yaml-config)

Configure **remark** with YAML front-matter.

> :warning: **mdast is currently being renamed to remark** :warning:
> 
> This means all plug-ins and relating projects change too, causing many
> changes across the ecosystem. Expect the dust to settle in roughly a day.
> 
> See this project at the previous stable commit
> [c4a51d1](https://github.com/wooorm/remark-github/commit/c4a51d1).

## Installation

[npm](https://docs.npmjs.com/cli/install)

```bash
npm install remark-yaml-config
```

[Component.js](https://github.com/componentjs/component)

```bash
component install wooorm/remark-yaml-config
```

[Bower](http://bower.io/#install-packages)

```bash
bower install remark-yaml-config
```

[Duo](http://duojs.org/#getting-started)

```javascript
var yamlConfig = require('wooorm/remark-yaml-config');
```

UMD: globals, AMD, and CommonJS ([uncompressed](remark-yaml-config.js) and [compressed](remark-yaml-config.min.js)):

```html
<script src="path/to/remark.js"></script>
<script src="path/to/remark-yaml-config.js"></script>
<script>
  remark.use(remarkYAMLConfig);
</script>
```

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
