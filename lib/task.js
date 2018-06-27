var path = require('path')
var fs = require('fs')
var gulp = require('gulp')
var ora = require('ora')
var nop = require('gulp-nop')
var less = require('gulp-less')
const concat = require('gulp-concat')
var autoprefixer = require('gulp-autoprefixer')
var cssmin = require('gulp-cssmin')
var config = require('./config')

exports.fonts = function (opts) {
  var spin = ora(opts.message).start()
  var stream = gulp.src(path.resolve(config.themePath, './src/fonts/**'))
    .pipe((opts.minimize || config.minimize) ? cssmin({showLog: false}) : nop())
    .pipe(gulp.dest(path.resolve(opts.out || config.out, './fonts')))
    .on('end', function () {
      spin.succeed()
    })

  return stream
}

exports.build = function (opts) {
  var spin = ora(opts.message).start()
  var stream
  var components
  var cssFiles = '*'

  if (config.components) {
    components = config.components.concat(['base'])
    cssFiles = '{' + components.join(',') + '}'
  }
  console.log(opts)
  //把我们自定义的变量写入antd的默认的变量文件
  var varsPath = path.resolve(config.themePath, './lib/style/themes/default.less')
  var defaultVarsPath = path.resolve(process.cwd(), './default.less')
  if (!fs.existsSync(defaultVarsPath)) { 
    fs.writeFileSync(defaultVarsPath, fs.readFileSync(varsPath), 'utf-8') //保留一份副本
  }
  var customVarsPath = path.resolve(process.cwd(), opts.config || config.config)
  console.log(customVarsPath)
  var defaultVarsPath = path.resolve(process.cwd(), './default.less');
  if (!fs.existsSync(customVarsPath)) {
    fs.writeFileSync(customVarsPath, fs.readFileSync(defaultVarsPath), 'utf-8')
  }
  fs.writeFileSync(varsPath, fs.readFileSync(defaultVarsPath), 'utf-8')
  fs.appendFileSync(varsPath, fs.readFileSync(path.resolve(process.cwd(), opts.config || config.config)), 'utf-8')
  stream = gulp.src([path.resolve(config.themePath, './lib/' + cssFiles + '/style/index.less')])
    .pipe(less())
    .pipe(autoprefixer({
      browsers: config.browsers,
      cascade: false
    }))
    .pipe((opts.minimize || config.minimize) ? cssmin({showLog: false}) : nop())
    .pipe(concat(`style.css`))
    .pipe(gulp.dest(opts.out || config.out))
    .on('end', function () {
      spin.succeed()
    })

  return stream
}
