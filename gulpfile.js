var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var htmlmin = require('gulp-htmlmin');
var path = require('path');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var del = require('del');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');

// Nén file js và css, copy index.html sang thư mục public
gulp.task('compress', function () {
    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', minify({
			ext:{ min: '.js' },
			mangle: false,
			noSource: true
        })))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('public'));
});

// Copy file trong thư mục assets sang public
gulp.task('copy', function () {
    gulp.src(['src/assets/fonts/**/*', 'src/assets/css/icons/font-awesome/fonts/**/*', 'src/assets/css/icons/glyphicons/**/*', 'src/assets/css/icons/icomoon/fonts/**/*'])
        .pipe(gulp.dest('public/fonts'))
        .pipe(gulp.dest('public/css/fonts'))
        .pipe(gulp.dest('public/css/icons/glyphicons'));

    gulp.src(['src/assets/images/**/*'])
        // .pipe(gulp.dest('public/assets/images'))
        .pipe(gulp.dest('public/images'));
});

// Nén các file html template vào trong file templates.js
gulp.task('templates', function () {
    return gulp.src(['src/app/**/*.html', 'src/pdf/**/*.html'])
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(templateCache({
            root: 'app',
            standalone: true,
            transformUrl: function (url) {
                return url.replace(path.dirname(url), '.');
            }
        }))
        .pipe(gulp.dest('src/app'));
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.html', function () {
        runSequence('templates', 'browserReload');
    });
    gulp.watch(['src/**/*', '!src/app/templates.js', '!src/**/*.html'], ['browserReload']);
});

gulp.task('serve', function () {
    browserSync.init({
        port: 4000,
        notify: false,
        server: {
            baseDir: './src'
        }
    });
});

gulp.task('browserReload', function () {
    browserSync.reload();
});

gulp.task('default', ['templates'], function () {
    runSequence('serve', 'watch');
});

// Build toàn bộ mã nguồn trong thư mục ./src sang thư mục ./public
gulp.task('build', function (callback) {
    del.sync('public');
    runSequence('templates', ['compress', 'copy'], callback);
});