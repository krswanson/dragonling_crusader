const gulp = require('gulp');
const browserify = require('browserify');
const glob = require('glob');
const through2 = require('through2');

function build () {
    return gulp.src(['./src/index.js'])
        .pipe(through2.obj(function (file, enc, next){
            browserify(file.path)
                .bundle(function(err, res){
                    // assumes file.contents is a Buffer
                    file.contents = res;
                    next(null, file);
                });
        }))
    .pipe(gulp.dest('./dist/'))
}
gulp.task('build', build);

gulp.watch(['index.html', 'index.css', 'app.js', 'src/**/*.js', 'images/**/*.png'], build);
// gulp.task('watch', gulp.parallel(['watch', 'build']));
