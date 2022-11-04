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
            baseDir: "Glopt/dist"
        }
    });
    gulp.watch("Glopt/src/*.html").on("change", browserSync.reload);  
});

gulp.task('styles', function() {
    return gulp.src("Glopt/src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
          }))
          .pipe(autoprefixer({
			cascade: false
		}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("Glopt/dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('Glopt/src/**/*.+(scss|sass|css)', gulp.parallel("styles"));
    gulp.watch("Glopt/src/*.html").on("change", gulp.parallel('html'));
    gulp.watch("Glopt/src/js/**/*.js").on("change", gulp.parallel("scripts"));
    gulp.watch("Glopt/src/icons/**/*").on('all', gulp.parallel('icons'));
    gulp.watch("Glopt/src/img/**/*").on('all', gulp.parallel('images'));  
});

gulp.task('html', function() {
    return gulp.src("Glopt/src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('Glopt/dist/'));
});

gulp.task('scripts', function() {
    return gulp.src("Glopt/src/js/**/*.js")
        .pipe(gulp.dest('Glopt/dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('icons', function() {
    return gulp.src("Glopt/src/icons/**/*")
        .pipe(gulp.dest('Glopt/dist/icons'))
        .pipe(browserSync.stream());
});

gulp.task('mailer', function() {
    return gulp.src("Glopt/src/mailer/**/*")
        .pipe(gulp.dest('Glopt/dist/mailer'))
        .pipe(browserSync.stream());
});

gulp.task('images', function() {
    return gulp.src("Glopt/src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest('Glopt/dist/img'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
    return gulp.src("Glopt/src/fonts/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest('Glopt/dist/fonts'))
        .pipe(browserSync.stream());
});



gulp.task('default', gulp.parallel('server', 'styles', 'watch', 'html', 'scripts', 'icons', 'mailer', 'images', 'fonts'));
