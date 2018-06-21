var path = require('path')
var fs = require('fs')
var ora = require('ora')
var config = require('./config')

var varsPath = path.resolve(config.themePath, './lib/style/themes/default.less') //antd默认的变量的目录
var filePath = path.resolve(process.cwd(), config.config) //自定义主题变量的目录

console.log(varsPath) 
exports.check = function () {
  if (!fs.existsSync(varsPath)) {
    ora('please install `' + config.themeName + '`').fail()
    process.exit(1)
  }
}

exports.init = function (_file) {
  var spinner = ora('Generator variables file').start()

  filePath = path.resolve(process.cwd(), _file ? _file : config.config)
  if (fs.existsSync(filePath)) {
    spinner.text = 'Variables file already exists.'
    spinner.fail()
  } else {
    fs.writeFileSync(filePath, fs.readFileSync(varsPath), 'utf-8') // 初始化时把antd的默认变量拷贝到我们设置的自定义变量的文件中
    spinner.succeed()
  }
  var defaultVarsPath = path.resolve(process.cwd(), './default.less')
  if (!fs.existsSync(defaultVarsPath)) { 
    fs.writeFileSync(defaultVarsPath, fs.readFileSync(varsPath), 'utf-8')
  }
}
