var gulp 			= require('gulp'),
	sass 			= require('gulp-sass'),	
	autoprefixer	= require('gulp-autoprefixer'),
	cssnano 		= require('gulp-cssnano'),
	browserSync 	= require('browser-sync'),
	concat 			= require('gulp-concat'),
	uglify 			= require('gulp-uglifyjs'),
	rename 			= require('gulp-rename'),
	imagemin 		= require('gulp-imagemin'),
	pngquant 		= require('imagemin-pngquant'),
	cache 			= require('gulp-cache'),
	del 			= require('del');

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	})
});

gulp.task('sass', function () {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8'], {cascade: true}))
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function(){
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js'
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
});

gulp.task('clean', function () {
	return del.sync('dist');
})

gulp.task('clear', function () {
	return cache.clearAll();
})

gulp.task('img', function(){
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		une: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function () {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'sass', 'scripts', 'img'], function () {
	var buildCss = gulp.src('app/css/**/*')
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));
});

gulp.task('ticker', function () {

	const ba = require('bitcoinaverage');

	var publicKey = 'M2Y3ZDAzZDI0MmJjNGRmZTg5MzA4MWE3MzA3Y2UxZTY';
	var secretKey = 'MTA1OGZlNGFmYTNlNDFkYjhiZGU3MTZhMmMxMTFjMjBlNTVlYzYxMDlmY2E0MzQzYTVlM2IyMjMxYTAwM2JhMg';
	var restClient = ba.restfulClient(publicKey, secretKey);

	restClient.tickerLocalPerSymbol('BTCUSD', function (response) {
	    console.log(response[ask]);
	});
})
