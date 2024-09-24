const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const babel = require('gulp-babel');

function styles() {
    return gulp.src('lib/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({ basename: 'swift-select', extname: '.css' }))
        .pipe(gulp.dest('dist'));
}

function scripts() {
    return gulp.src('lib/index.js')
        .pipe(babel({
            presets: [
                ['@babel/preset-env', { modules: false }]
            ],
            comments: false

        }))
        .pipe(rename({ basename: 'swift-select', extname: '.js' }))
        .pipe(gulp.dest('dist'));
}

exports.build = gulp.series(styles, scripts);