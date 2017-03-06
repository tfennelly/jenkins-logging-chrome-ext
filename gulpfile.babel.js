import gulp from 'gulp';
import gutil from 'gulp-util';
import del from 'del';
import browserify from 'browserify';
import runSequence from 'run-sequence';
import source from 'vinyl-source-stream';

gulp.task('clean', del.bind(null, ['dist']));

const bundleSubTasks = [];
function bundle(filename) {
    const taskName = 'bundle: ' + filename;
    bundleSubTasks.push(taskName);
    gulp.task(taskName, () => {
        return browserify('./src/' + filename)
            .bundle()
            .on('error', function (e) {
                gutil.log(e);
            })
            .pipe(source(filename))
            .pipe(gulp.dest('./dist/scripts'));
    });
}
gulp.task('bundle', cb => {
    runSequence(bundleSubTasks, cb);
});
const copySubTasks = [];
function copy(from, to) {
    const taskName = 'copy: ' + from + ' --> ' + to;
    copySubTasks.push(taskName);
    gulp.task(taskName, () => {
        return gulp.src(from).pipe(gulp.dest(to));
    });
}
gulp.task('copy', cb => {
    runSequence(copySubTasks, cb);
});

gulp.task('default', (callback) => {
    runSequence(
        'clean',
        ['bundle', 'copy'],
        callback);
});

// Bundle main extension scripts
bundle('background.js');
bundle('devtools.js');
bundle('panel.js');

// Bundle content scripts
bundle('content-scripts/log-categories-count.js');
bundle('content-scripts/log-categories.js');

// Create copy tasks ...
copy('ext-src/**', 'dist');
copy('node_modules/materialize-css/dist/css/**', 'dist/styles');
copy('node_modules/materialize-css/dist/fonts/roboto/**', 'dist/fonts/roboto');
