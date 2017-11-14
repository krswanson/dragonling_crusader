import build from './build'
import gulp from 'gulp'
import standard from 'gulp-standard'

function lint () {
  return gulp.src(['app.js', 'src/**/*.js', 'gulpfile.js/**/*.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: false,
      quiet: true
    }))
}

function watch () {
  gulp.watch(['index.html', 'index.css', 'app.js', 'src/**/*.js', 'images/**/*.png'], gulp.series(lint, build))
}

gulp.task('watch', gulp.series(lint, build, watch))
