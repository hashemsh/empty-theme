var gulp = require('gulp');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

gulp.task('concator', function() {
    return gulp.src('assets/public/css/seperated/*.css')
        .pipe(concat('theme.min.css'))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('assets/public/css'));
});

gulp.task('concator-admin', function() {
    return gulp.src('assets/admin/css/seperated/*.css')
        .pipe(concat('hwp.min.css'))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('assets/admin/css'));
});

gulp.task('minify-css', function() {
    return gulp.src('assets/public/css/*.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('assets/public/css'));
});

gulp.task('minify-css-admin', function() {
    return gulp.src('assets/admin/css/*.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('assets/admin/css'));
});

gulp.task('compresslibs', function() {
    return gulp.src('assets/public/js/seperated/*.js')
        .pipe(concat('libraries.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/public/js'));
});

gulp.task('compressTheme', function() {
    return gulp.src('assets/public/js/theme.js')
        .pipe(uglify())
        .pipe(rename(function (path) {
           path.basename += ".min";
           path.extname = ".js"
         }))
        .pipe(gulp.dest('assets/public/js'));
});

gulp.task('compressAdmin', function() {
    return gulp.src('assets/admin/js/hwp.js')
        .pipe(uglify())
        .pipe(rename(function (path) {
           path.basename += ".min";
           path.extname = ".js"
         }))
        .pipe(gulp.dest('assets/admin/js'));
});

/*gulp.task('minify-css-admin', function() {
    return gulp.src('assets/admin/css/seperated/!*.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(rename(function (path) {
           path.basename = "hwp.min";
           path.extname = ".css"
         }))
        .pipe(gulp.dest('assets/admin/css'));
});*/

gulp.task('run', function() {
    gulp.watch('assets/public/css/seperated/*.css', ['concator']);
    gulp.watch('assets/admin/css/seperated/*.css', ['concator-admin']);
    gulp.watch('assets/public/js/seperated/*.js', ['compresslibs']);
    gulp.watch('assets/public/js/theme.js', ['compressTheme']);
    gulp.watch('assets/admin/js/hwp.js', ['compressAdmin']);
    // gulp.watch('assets/admin/css/seperated/*.css', ['minify-css-admin']);
})
