"use strict";
const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "Martian/dist"
        }
    });
    gulp.watch("Martian/src/*.html").on("change", browserSync.reload);  
});

gulp.task('styles', function() {
    return gulp.src("Martian/src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
          }))
          .pipe(autoprefixer({
			cascade: false
		}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("Martian/dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('Martian/src/**/*.+(scss|sass|css)', gulp.parallel("styles"));
    gulp.watch("Martian/src/*.html").on("change", gulp.parallel('html'));
    gulp.watch("Martian/src/js/**/*.js").on("change", gulp.parallel("scripts"));
    gulp.watch("Martian/src/icons/**/*").on('all', gulp.parallel('icons'));
    gulp.watch("Martian/src/img/**/*").on('all', gulp.parallel('images'));  
});

gulp.task('html', function() {
    return gulp.src("Martian/src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('Martian/dist/'));
});

gulp.task('scripts', function() {
    return gulp.src("Martian/src/js/**/*.js")
        .pipe(gulp.dest('Martian/dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('icons', function() {
    return gulp.src("Martian/src/icons/**/*")
        .pipe(gulp.dest('Martian/dist/icons'))
        .pipe(browserSync.stream());
});

gulp.task('mailer', function() {
    return gulp.src("Martian/src/mailer/**/*")
        .pipe(gulp.dest('Martian/dist/mailer'))
        .pipe(browserSync.stream());
});

gulp.task('images', function() {
    return gulp.src("Martian/src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest('Martian/dist/img'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
    return gulp.src("Martian/src/fonts/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest('Martian/dist/fonts'))
        .pipe(browserSync.stream());
});



gulp.task('default', gulp.parallel('server', 'styles', 'watch', 'html', 'scripts', 'icons', 'mailer', 'images', 'fonts'));
