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

const jspath = ["src/js/jquery.min.js", "src/js/jquery.easing.1.3.js", "src/js/bootstrap.min.js", "src/js/jquery.waypoints.min.js", "src/js/jquery.countTo.js", "src/js/jquery.magnific-popup.min.js", "src/js/magnific-popup-options.js", "src/js/jquery.stellar.min.js", "src/js/main.js"];
// const csspath = "src/css/**/*.css";
const csspath = ["src/css/animate.css", "src/css/icomoon.css", "src/css/bootstrap.css", "src/css/magnific-popup.css", "src/css/style.css"];

function copyhtml() {
    return src('src/*.html')
        .pipe(gulp.dest('dist'));
}

function compressImages() {
    return src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
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

function purgeCss() {
    return gulp.src("dist/css/styles.min.css")
        .pipe(sourcemaps.init())
        .pipe(purgecss({
            content: ["src/**/*.html"],
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css/prod'));
}
exports.jsTask = minifyJs;
exports.copyhtml = copyhtml;
exports.cssTask = minifyCss;
exports.imgTask = compressImages;
exports.default = parallel(copyhtml, compressImages, minifyCss, minifyJs);