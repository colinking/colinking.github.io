var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var pug = require('gulp-pug');

// Compile Pug templates to HTML.
gulp.task('pug', function buildHTML() {
	return gulp.src(['pug/*.pug', '!pug/_*.pug'])
	.pipe(pug())
	.pipe(gulp.dest('.'));
});

// Compile Sass stylesheets.
gulp.task('sass', function (){
	gulp.src(['./sass/**/*.scss', '!./sass/_variables.scss'])
		.pipe(sass({
			includePaths: ['./sass'],
			outputStyle: 'expanded'
		}))
		.pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
		.pipe(cleancss())
		.pipe(gulp.dest('./public'));
});

// Minimize images.
gulp.task('imagemin', function () {
	gulp.src('./img/**/*')
	// .pipe(imagemin())
	.pipe(gulp.dest('./public'));
});

gulp.task('default', ['imagemin', 'sass', 'pug'], function(){
	gulp.watch("./sass/**/*.scss", function(event){
		gulp.run('sass');
	});
	gulp.watch("./img/**/*", function(event){
		gulp.run('imagemin');
	});
	gulp.watch("./pug/**/*", function(event){
		gulp.run('pug');
	});
});
