// Project Specific Variables
const projectPath 		= './';
const devPath 			= projectPath + '_dev';
const buildPath 		= projectPath + 'assets';
//const projectURL 		= 'http://local.gitmerge';

// Global Gulp Dependency
const gulp 				= require('gulp');
const gulpLoadPlugins 	= require('gulp-load-plugins');
const rename			= require('gulp-rename');
const newer				= require('gulp-newer');
const path 				= require('path');

// Styles Task Dependencies
const sass 				= require('gulp-sass');
const autoprefixer		= require('gulp-autoprefixer');
const cleanCSS 			= require('gulp-clean-css');

// Scripts Task Dependencies
const concat 			= require('gulp-concat');
const uglify			= require('gulp-uglify');


// Images Task Dependencies
const imagemin			= require('gulp-imagemin');
const pngquant			= require('imagemin-pngquant');

// SVG Task Dependencies
const svgstore			= require('gulp-svgstore');
const svgmin			= require('gulp-svgmin');
const cheerio 			= require('gulp-cheerio');

const $ = gulpLoadPlugins();

// Server Task Dependencies
const browserSync		= require('browser-sync').create();
const reload = browserSync.reload;

// Styles Gulp task, run by calling 'gulp styles' in CLI
gulp.task('styles', function() {
	gulp.src([devPath + '/scss/index.scss'])
	.pipe(rename({ basename: "main" }))
	.pipe(sass({includePaths: ['node_modules/']}).on('error', sass.logError))
	.pipe(autoprefixer({ browsers: ['last 2 versions', 'ie 8', 'ie 9'] }))
	.pipe(cleanCSS())
	.pipe(gulp.dest(buildPath + '/css/'))
});


// Scripts Gulp task, run by calling 'gulp scripts' in CLI
gulp.task('scripts', function() {
	var scriptsToConcat = [
		devPath + '/js/main.js'
	];
	gulp.src(scriptsToConcat)
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest(buildPath + '/js/'))
});

// Images Gulp task, run by calling 'gulp images' in CLI
gulp.task('images', function() {
	gulp.src([devPath + '/images/**/*.{png,jpg,gif,ico,svg}'])
	.pipe(newer(buildPath + '/images/'))
	.pipe(imagemin({
		progressive: true,
		use: [pngquant()]
	}))
	.pipe(gulp.dest(buildPath + '/images/'))
});

// Move fonts
gulp.task('fonts', function () {
  return gulp.src([devPath + '/fonts/**/*'])
    .pipe( gulp.dest(buildPath + '/fonts/') );
});


// SVG Gulp task, run by calling 'gulp svg' in CLI
gulp.task('svg', function() {
	gulp.src([devPath + '/images/svgs/*.svg'])
	.pipe(svgmin(function(file) {
		var prefix = path.basename(file.relative, path.extname(file.relative));
		return {
			plugins: [{
				cleanupIDs: {
					prefix: prefix + 'shape-',
					minify: true,
				}
			}]
		}
	}))
	.pipe(cheerio({
		run: function ($) {
			$('[fill]').removeAttr('fill');
		},
		parserOptions: { xmlMode: true }
	}))
	.pipe(rename({prefix: 'shape-'}))
	.pipe(svgstore({ inlineSvg: true }))
	.pipe(gulp.dest(buildPath + '/images/svgs'))
});

// Watch Gulp task, run by calling 'gulp watch' in CLI
gulp.task('watch', function() {
	gulp.watch(devPath + '/scss/**/*.scss', ['styles']);
	gulp.watch(devPath + '/js/main.js', ['scripts']);
});

// Server Gulp task, run by calling 'gulp server' in CLI
gulp.task('server', function() {
	browserSync.init({
		open: false,
		server: {baseDir: '_site/'},
		injectChanges: true,
		logSnippet: false
	})
	gulp.watch('_site/**/*.*').on('change', browserSync.reload);
	gulp.watch('_site/*.*').on('change', browserSync.reload);
});

// Default Gulp task, run by calling 'gulp' in CLI
gulp.task('default', ['styles', 'scripts', 'svg', 'images', 'fonts', 'watch', 'server'])
