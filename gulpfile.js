//gulp 停止维护了
//为什么用？已经很完善了， 简单，快
const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');

gulp.task('build:dev', () => {
    return watch('src/nodeuii/**/*.js', {
        ignoreInitial: false
    }, () => {
        gulp.src('src/nodeuii/**/*.js')
            .pipe(babel({
                babelrc: false,
                "plugins": ['transform-es2015-modules-commonjs']
            }))
            .pipe(gulp.dest('build'));
    })
});

gulp.task('build:prod', () => {

    gulp.src('src/nodeuii/**/*.js')
        .pipe(babel({
            babelrc: false,
            "plugins": ['transform-es2015-modules-commonjs']
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('build:config', () => {
    gulp.src('src/nodeuii/**/*.js')
        .pipe(rollup({
            output: {
                format: 'cjs'
            },
            input: 'src/nodeuii/config/index.js',
            plugins: [
                replace({
                    //gulp和node不是同一个进程，强制修改进程名
                    "process.env.NODE_ENV": JSON.stringify('production')
                })
            ]
        }))
        .pipe(gulp.dest('build'));
})


let _task = ['build:dev'];

if (process.env.NODE_ENV === 'production') {

    _task = ['build:prod'];
}

if (process.env.NODE_ENV === 'config') {

    _task = ['build:config'];
}


gulp.task('default', _task);