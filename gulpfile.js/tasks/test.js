import gulp from 'gulp'
import standard from 'gulp-standard'
import mocha from 'gulp-mocha'

function lint () {
  return gulp.src(['app.js', 'src/**/*.js', 'gulpfile.js/**/*.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: false,
      quiet: true
    }))
}

function unit () {
  return gulp.src(['test/**/*.js'], { read: false })
    .pipe(mocha({
      reporter: 'nyan',
      require: ['babel-core/register']
    }))
    .on('error', function () {})
}

const test = gulp.series([unit, lint])

gulp.task('test', test)

module.exports = test
