autoprefixer = require 'autoprefixer'
babel = require 'gulp-babel'
cssnano = require 'gulp-cssnano'
del = require 'del'
gulp = require 'gulp'
gutil = require 'gulp-util'
htmlmin = require 'gulp-htmlmin'
htmlreplace = require 'gulp-html-replace'
rename = require 'gulp-rename'
rev = require 'gulp-rev'
revreplace = require 'gulp-rev-replace'
postcss = require 'gulp-postcss'
sass = require 'gulp-sass'
sasslint = require 'gulp-sass-lint'
sourcemaps = require 'gulp-sourcemaps'
ts = require 'gulp-typescript'
tslint = require 'gulp-tslint'
tsproject = ts.createProject 'tsconfig.json'
uglify = require 'gulp-uglify'
vinylpaths = require('vinyl-paths')
webserver = require 'gulp-webserver'

helpers =
  do: (env, truthy, falsy = gutil.noop()) ->
    if gutil.env.type is env then truthy else falsy

paths =
  ts:
    application: './src/ts/application.ts'
    all: './src/ts/**/*.ts'
  scss:
    application: './src/scss/application.scss'
    all: './src/scss/**/*.scss'
  html: './src/index.html'
  dist: './dist/'
  tmp: './tmp/'
  finalDest: -> helpers.do 'production', paths.dist, paths.tmp

gulp.task 'html', helpers.do('production', ['scss', 'ts'], []), ->
  del ["#{paths.finalDest()}*.html"]

  gulp.src paths.html
  .pipe helpers.do 'production', htmlreplace css: 'application.min.css', js: 'application.min.js'
  .pipe helpers.do 'production', revreplace manifest: gulp.src('./dist/rev-css.json')
  .pipe helpers.do 'production', revreplace manifest: gulp.src('./dist/rev-js.json')
  .pipe helpers.do 'production', htmlmin collapseInlineTagWhitespace: true, collapseWhitespace: true, removeComments: true
  .pipe gulp.dest paths.finalDest
  .pipe helpers.do 'production', vinylpaths -> del ['./dist/rev-css.json', './dist/rev-js.json']

gulp.task 'scss' , ->
  del ["#{paths.finalDest()}*.css", "#{paths.finalDest()}*.css.map"]

  gulp.src paths.scss.application
  .pipe sourcemaps.init()
  .pipe sass().on 'error', sass.logError
  .pipe postcss [autoprefixer(browsers: ['last 2 versions'])]
  .pipe helpers.do 'production', cssnano()
  .pipe helpers.do 'production', rename extname: '.min.css'
  .pipe helpers.do 'production', rev()
  .pipe sourcemaps.write '.', includeContent: false, sourceRoot: '/'
  .pipe gulp.dest paths.finalDest
  .pipe helpers.do 'production', rev.manifest './rev-css.json'
  .pipe gulp.dest paths.finalDest

gulp.task 'scsslint', ->
  gulp.src paths.scss.all
  .pipe sasslint configFile: '.scss-lint.yml'
  .pipe sasslint.format()
  .pipe sasslint.failOnError()

gulp.task 'ts', ->
  del ["#{paths.finalDest()}*.js", "#{paths.finalDest()}*.js.map"]

  gulp.src paths.ts.all
  .pipe sourcemaps.init()
  .pipe ts tsproject
  .pipe babel presets: ['es2015']
  .pipe helpers.do 'production', uglify wrap: true, screwIE8: true
  .pipe helpers.do 'production', rename extname: '.min.js'
  .pipe helpers.do 'production', rev()
  .pipe sourcemaps.write '.', includeContent: false, sourceRoot: '/'
  .pipe gulp.dest paths.finalDest
  .pipe helpers.do 'production', rev.manifest './rev-js.json'
  .pipe gulp.dest paths.finalDest

gulp.task 'tslint', ->
  gulp.src paths.ts.all
  .pipe tslint formatter: 'verbose'
  .pipe tslint.report()

gulp.task 'lint', ['tslint', 'scsslint']

gulp.task 'compile', ['scss', 'ts', 'html']

gulp.task 'serve', ->
  gulp.src './tmp/'
  .pipe webserver livereload: true, host: 'renuo-upload-demo.dev', port: '9321', open: true

gulp.task 'watch', ->
  gulp.watch [paths.ts.all], ['ts', 'tslint']
  gulp.watch [paths.scss.all], ['scss', 'scsslint']
  gulp.watch [paths.html], ['html']

gulp.task 'default', ['watch', 'serve']
