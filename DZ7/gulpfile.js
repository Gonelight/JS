var gulp = require('gulp');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var rename = require("gulp-rename");
var smaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var cssmin = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var imgmin = require("gulp-imagemin");
var plumber = require('gulp-plumber');

gulp.task('allconcat', ['jsconcat', 'cssconcat', 'imgmin'], function () {  
  return gulp.src('app/index.html')
  	.pipe(plumber())
  	.pipe(htmlmin({collapseWhitespace: true}))
  		.pipe(rename({
    		basename: "file",
    		prefix: "good-",
  		}))   
    .pipe(gulp.dest('dist'));
});

gulp.task('cssconcat', ['sass-compile'], function () {  
  return gulp.src('app/styles/*.css')
    .pipe(plumber())  	
  	.pipe(smaps.init()) //зачем нужно?
    	.pipe(concat('total.css'))
      .pipe(cssmin({compatibility: 'ie8'})) //вернго писать именнго в таком пояркде? 
    .pipe(smaps.write('maps'))    
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('sass-compile', function() {
return gulp.src('app/styles/*.sass')
  	.pipe(plumber())
	.pipe(sass())
	.pipe(gulp.dest('app/styles'))
})

gulp.task('jsconcat', function() {
  return gulp.src('app/js/*.js')
    .pipe(plumber())  
  	.pipe(smaps.init())
    	.pipe(concat('total.js')) //вернго писать именнго в таком пояркде? 
      .pipe(uglify()) 
    .pipe(smaps.write('maps'))    
    .pipe(gulp.dest('dist/js'));
});

gulp.task('imgmin', function() {
  return gulp.src('app/images/*.png') //чет не шибко уменьшило
	.pipe(imgmin())
    .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function () {
  gulp.watch('app/**/*.+(css|sass|html|js)', ['allconcat']);
});
