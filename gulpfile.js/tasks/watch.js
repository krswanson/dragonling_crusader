import gulp from 'gulp'
import build from './build'
import test from './test'

function watch () {
  gulp.watch(['index.html', 'index.less', 'app.js', 'src/**/*.js', 'images/**/*.png', 'test/**/*.js'], gulp.series(test, build))
}

gulp.task('watch', gulp.series(test, build, watch))
