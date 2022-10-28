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
            baseDir: "Pulsemeters/dist"
        }
    });
    gulp.watch("Pulsemeters/src/*.html").on("change", browserSync.reload);  
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
        .pipe(gulp.dest("Pulsemeters/dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('Pulsemeters/src/**/*.+(scss|sass|css)', gulp.parallel("styles"));
    gulp.watch("Pulsemeters/src/*.html").on("change", gulp.parallel('html'));  
});

gulp.task('html', function() {
    return gulp.src("Pulsemeters/src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('Pulsemeters/dist/'));
});

gulp.task('scripts', function() {
    return gulp.src("Pulsemeters/src/js/**/*.js")
        .pipe(gulp.dest('Pulsemeters/dist/js'));
});

gulp.task('icons', function() {
    return gulp.src("Pulsemeters/src/icons/**/*")
        .pipe(gulp.dest('Pulsemeters/dist/icons'));
});

gulp.task('mailer', function() {
    return gulp.src("Pulsemeters/src/mailer/**/*")
        .pipe(gulp.dest('Pulsemeters/dist/mailer'));
});

gulp.task('images', function() {
    return gulp.src("Pulsemeters/src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest('Pulsemeters/dist/img'));
});

gulp.task('fonts', function() {
    return gulp.src("Pulsemeters/src/fonts/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest('Pulsemeters/dist/fonts'));
});



gulp.task('default', gulp.parallel('server', 'styles', 'watch', 'html', 'scripts', 'icons', 'mailer', 'images', 'fonts'));
