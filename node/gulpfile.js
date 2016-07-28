var gulp    = require('gulp'),

    minify  = require('gulp-minify-css'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify'),
    ext_replace = require('gulp-ext-replace'),
    rename  = require('gulp-rename');

//  compilation css

gulp.task('css', function(){
	return gulp.src('public/css/**/*.css')
	.pipe(minify())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('../dist/public/css'))
});

//move des ressoures
gulp.task('font', function(){
	return gulp.src('public/fonts/*')
	.pipe(gulp.dest('../dist/public/fonts'))
});
gulp.task('assets', function(){
	return gulp.src('public/assets/**/*.*')
	.pipe(gulp.dest('../dist/public/assets'))
});
gulp.task('views', function(){
	return gulp.src('views/**/*')
	.pipe(gulp.dest('../dist/views'))
});
gulp.task('index', function(){
	return gulp.src('server.js')
	.pipe(ext_replace('.js','.min.js'))
	.pipe(uglify())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('../dist'))
	gulp.src('firstJson.json')
	.pipe(gulp.dest('../dist'))
});
gulp.task('index2', function(){
	return gulp.src('firstJson.json')
	.pipe(gulp.dest('../dist'))
});

// compilation js
gulp.task('js', function(){
	return gulp.src('public/js/**/*.js')
	.pipe(ext_replace('.js','.min.js'))
	.pipe(uglify())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('../dist/public/js'))
});
gulp.task('models', function(){
	return gulp.src('models/*.js')
	.pipe(ext_replace('.js','.min.js'))
	.pipe(uglify())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('../dist/models'))
});
gulp.task('vendor', function(){
	return gulp.src('public/js/vendor/*')
	.pipe(gulp.dest('../dist/public/js'))
});
// WATCH

gulp.task('watch',function(){
    gulp.watch('public/css/**/*.css', ['css']);
    gulp.watch('public/fonts/*.*',['font']);
    gulp.watch('public/assets/*.*',['assets']);
    gulp.watch('models/*.js',['models']);
    gulp.watch('*.*',['index','index2']);

    gulp.watch('public/js/*.js',['js']);
    gulp.watch('views/**/*.ejs',['views']);
    gulp.watch('public/js/vendor/*.js',['vendor']);
});
gulp.task('export',function(){

    gulp.watch('*.*',['assets']);
    gulp.watch('*.*',['models']);
    gulp.watch('*.*',['index','index2']);
    gulp.watch('*.*',['js']);
    gulp.watch('*.*',['vendor']);
    gulp.watch('*.*',['css']);
    gulp.watch('*.*',['font']);
    gulp.watch('*.*',['views']);
});

gulp.task('default', ['watch']);