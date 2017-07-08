var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');

var paths = {
	allJs:  	[
		'src/js/vendors/*.js',
		'src/js/scripts/*.js'
				],
	scripts: 	['src/js/scripts/*.js'],
	sass: 		['src/sass/*.scss']
}

gulp.task('sass', function() {
  return gulp.src('src/sass/app.scss')
    .pipe(sass())
    .pipe(concat('src/css/app.css'))
    .pipe(gulp.dest('./'))
});

gulp.task('scripts', function() {
	return gulp.src(paths.allJs)
	.pipe(concat('main.js'))
	.pipe(gulp.dest('./js/'))
});

gulp.task('lint', () => {
    return gulp.src(paths.scripts)
        .pipe(eslint({
			'extends': 'eslint:recommended',
			'rules': {
				'no-console': 'off'
			}
		}))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('css', ['sass'], function() {
	return gulp.src([
		'src/css/app.css'
	])
	.pipe(concat('style.css'))
	.pipe(gulp.dest('./'))
});

gulp.task('minify-css', function() {
	return gulp.src('src/css/*.css')
	.pipe(minifycss())
	.pipe(concat('style.css'))
	.pipe(gulp.dest('./'));
});

gulp.task('minify-js', function() {
	return gulp.src(paths.allJs)
	.pipe(uglify())
	.pipe(concat('main.min.js'))
	.pipe(gulp.dest('./js/'))
});

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['lint', 'scripts']);
	gulp.watch(paths.sass, ['sass', 'css']);
});

gulp.task('default', ['css', 'lint', 'scripts']);
gulp.task('prod', ['minify-css', 'minify-js']);