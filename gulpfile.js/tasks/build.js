import gulp from 'gulp'
import browserify from 'browserify'
import through2 from 'through2'
import fs from 'fs'
import path from 'path'
import less from 'less'

function lessToCss (callback) {
  fs.unlink(path.resolve('dist/index.css'), function (err) { if (err) console.warn('No dist/index.css file found: creating it...') })
  fs.readFile(path.resolve('index.less'), 'utf8', function (err, data) {
    if (err) throw err
    less.render(data, function (err, output) {
      if (err) {
        console.error(err)
        return callback()
      }
      fs.writeFile('dist/index.css', output.css, function (err) {
        if (err) throw err
        return callback()
      })
    })
  })
}

function browserifyJS () {
  fs.unlink(path.resolve('dist/index.js'), function (err) { if (err) console.warn('No dist/index.js file found: creating it...') })
  return gulp.src(['./src/index.js'])
    .pipe(through2.obj(function (file, enc, next) {
      browserify(file.path)
      .bundle(function (err, res) {
        if (err) throw err
        // assumes file.contents is a Buffer
        file.contents = res
        next(null, file)
      })
    }))
    .pipe(gulp.dest('./dist/'))
}
let build = gulp.series([browserifyJS, gulp.series(lessToCss)])
gulp.task('build', build)

module.exports = build
