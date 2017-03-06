import gulp from 'gulp';
import gutil from 'gulp-util';
import del from 'del';
import browserify from 'browserify';
import runSequence from 'run-sequence';
import source from 'vinyl-source-stream';

gulp.task('clean', del.bind(null, ['dist']));

const bundleSubTasks = [];
function bundle(filename) {
    const taskName = 'bundle-task-' + filename;
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

gulp.task('copy-ext-src', () => {
    return gulp.src('ext-src/**').pipe(gulp.dest('dist'));
});

gulp.task('default', (callback) => {
    runSequence(
        'clean',
        ['bundle', 'copy-ext-src'],
        callback);
});

// Bundle main extension scripts
bundle('background.js');
bundle('devtools.js');
bundle('panel.js');

// Bundle content scripts
bundle('content-scripts/log-categories-count.js');
bundle('content-scripts/log-categories.js');
