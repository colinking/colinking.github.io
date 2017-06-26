var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');

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
	.pipe(imagemin())
	.pipe(gulp.dest('./public'));
});

gulp.task('default', function(){
	gulp.watch("./sass/**/*.scss", function(event){
		gulp.run('sass');
	});
	gulp.watch("./img/**/*", function(event){
		gulp.run('imagemin');
	});
});
