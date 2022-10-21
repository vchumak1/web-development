"use strict";
const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "Pulsemeters/src"
        }
    });
});

gulp.task('styles', function() {
    return gulp.src("Pulsemeters/src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
          }))
          .pipe(autoprefixer({
			cascade: false
		}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("Pulsemeters/src/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('Pulsemeters/src/**/*.+(scss|sass)', gulp.parallel("styles"));
    gulp.watch("Pulsemeters/src/*.html").on("change", browserSync.reload); 
});

gulp.task('default', gulp.parallel('server', 'styles', 'watch'));
