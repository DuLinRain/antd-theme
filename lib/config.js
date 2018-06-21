var path = require('path')

var pkg = {}

try {
  pkg = require(path.resolve(process.cwd(), 'package.json'))
} catch (err) {}
var config = Object.assign({
  browsers: ['ie > 9', 'last 2 versions'],
  out: './theme',
  config: './custom-variables.less',// 默认变量文件名
  theme: 'antd', //antd默认样式所在的目录
  minimize: false
}, pkg['ant-theme'])
exports.themePath = path.resolve(process.cwd(), './node_modules/' + config.theme)
exports.out = config.out
exports.config = config.config
exports.minimize = config.minimize
exports.browsers = config.browsers
exports.components = config.components
exports.themeName = config.theme