# antd-theme
###antd-theme-generator

自定义主题生成工具，参照**element-theme**编写, 通过命令行的方式自动生成antd主题样式


## Installation
install local or global
```shell
npm i antd-theme -D
```


## CLI
```shell
# init variables file
at --init [file path]

# watch then build
at --watch [--config variable file path] [--out theme path]

# build
at [--config variable file path] [--out theme path] [--minimize]
```

## Node API
```javascript
var at = require('antd-theme')

// watch mode
at.watch({
  config: 'variables/path',
  out: 'output/path'
})

// build
at.run({
  config: 'variables/path',
  out: 'output/path',
  minimize: true
})
```

## Options
### config
Variable file path, default `./custome-variables.css`.

### out
Theme output path, default `./theme`.

### minimize
Compressed file.

### browsers
set browsers, default `['ie > 9', 'last 2 versions']`.

### watch
watch variable file changes then build.

### components
A lists of components that you want to generate themes for.  All by default.

## Config
You can configure some options in `antd-theme` by putting it in package.json:
```json
{
  "antd-theme": {
    "browsers": ["ie > 9", "last 2 versions"],
    "out": "./theme",
    "config": "./custome-variables.css",
    "theme": "antd-theme-chalk",
    "minimize": false,
    "components": ["button", "input"]
  }
}
```

## License
MIT