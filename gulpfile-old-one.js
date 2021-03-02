const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const purgecss = require('gulp-purgecss');
const { src, series, parallel, dist, watch } = require('gulp');

const jspath = "src/js/**/*.js";
const csspath = "src/css/**/*.css";

function copyhtml() {
    return src('src/*.html')
        .pipe(gulp.dest('dist'));
}

function compressImages() {
    return src('src/imgs/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/imgs'));
}

function minifyJs() {
    return src(jspath)
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.min.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
}

function minifyCss() {
    return src(csspath)
        .pipe(sourcemaps.init())
        .pipe(concat('styles.min.css'))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
}

function unCss() {
    return gulp.src(csspath)
        .pipe(purgecss({
            content: ['src/**/*.html'],
        }))
        // .pipe(gulp.dest('dist/css'))
        .pipe(sourcemaps.init())
        .pipe(concat('styles.min.css'))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
}
exports.jsTask = minifyJs;
exports.cssTask = minifyCss;
exports.imgTask = compressImages;
exports.unCss = unCss;
exports.default = parallel(copyhtml, compressImages, unCss, minifyJs);