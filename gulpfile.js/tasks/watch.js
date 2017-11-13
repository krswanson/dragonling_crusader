import build from './build'
import gulp from 'gulp'

function watch () {
	gulp.watch(['index.html', 'index.css', 'app.js', 'src/**/*.js', 'images/**/*.png'], build);
}

gulp.task('watch', watch)
