import gulp from 'gulp'
import browserify from 'browserify'
import through2 from 'through2'
import fs from 'fs'
import path from 'path'

function build () {
    fs.unlink(path.resolve('dist/index.js'), function (err) {});
    return gulp.src(['./src/index.js'])
        .pipe(through2.obj(function (file, enc, next){
            browserify(file.path)
                .bundle(function(err, res){
                    // assumes file.contents is a Buffer
                    file.contents = res;
                    next(null, file);
                })
        }))
    .pipe(gulp.dest('./dist/'))
}
gulp.task('build', build)

module.exports = build
