var path = require('path')
var fs = require('fs')
var gulp = require('gulp')
var ora = require('ora')
var nop = require('gulp-nop')
var gulpLess = require('gulp-less')
var autoprefixer = require('gulp-autoprefixer')
var cssmin = require('gulp-cssmin')
const uglify = require('gulp-uglifycss')
const clean = require('gulp-clean')
var config = require('./config')


//生成主题的gulp任务
exports.build = function (opts) {
    var spin = ora(opts.message).start()//为让命令行看起来更友好，命令运行时会有一个“\”符号在旋转
    var stream
    var components
    var cssFiles = '*'
    //指定特定某些组件
    if (config.components) {
      components = config.components.concat(['base'])
      cssFiles = '{' + components.join(',') + '}'
    }
    // 默认主题的scss变量文件路径
    var varsPath = path.resolve(config.themePath, './lib/style/themes/default.less')
    //将自定义scss变量文件的变量写入到默认主题的变量文件var.scss中去
    fs.writeFileSync(varsPath, fs.readFileSync(path.resolve(process.cwd(), opts.config || config.config)), 'utf-8')
    //构建流，读取所有需要构建的scss文件
    stream = gulp.src([opts.config || config.config, path.resolve(config.themePath, './lib/' + cssFiles + '.less')])
      .pipe(gulpLess())
      //自动加上前缀
      .pipe(autoprefixer({
        browsers: config.browsers,
        cascade: false
      }))
      //编译得到css
      .pipe((opts.minimize || config.minimize) ? cssmin({showLog: false}) : nop())
      .pipe(uglify())
      //输入到对应的目录
      .pipe(gulp.dest(opts.out || config.out))
      //结束
      .on('end', function () {
        spin.succeed()
      })
  
    return stream
  }