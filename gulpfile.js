var gulp = require('gulp');

/* uses 'require' & 'exports' keywords to translate the code into JavaScript our browser understands */
var browserify = require('browserify');

/* places browserified source code into a new file. */
var source = require('vinyl-source-stream');

/* consolidates multiple JS files into 1 to reduce load time. */
var concat = require('gulp-concat');

/* responsible for minification */
var uglify = require('gulp-uglify');

/* manages multiple utilities including environmental variables. */
var utilities = require('gulp-util');

/* tells which environment we are using */
var buildProduction = utilities.env.production;

/* cleans up our environment before we make a build */
var del = require('del');

/* a linter tool */
var jshint = require('gulp-jshint');

/* loads our js & css dependencies into 2 seperate files */
var lib = require('bower-files') ({
	"overrides": {
		"bootstrap": {
			"main": [
			"less/bootstrap.less",
			"dist/css/bootstrap.css",
			"dist/js/bootstrap.js"
			]
		}
	}
});

/* Implements a development server with live reloading */
var browserSync = require('browser-sync').create();


gulp.task('jsBrowserify', ['concatInterface'], function () {
	return browserify({ entries: ['./tmp/allConcat.js']})
	.bundle()
	.pipe(source('app.js'))
	.pipe(gulp.dest('./build/js'));
});

gulp.task('concatInterface', function () {
	return gulp.src(['./js/*-interface.js'])
	.pipe(concat('allConcat.js'))
	.pipe(gulp.dest('./tmp'));
});

gulp.task("minifyScripts", ["jsBrowserify"], function () {
	return gulp.src("./build/js/app.js")
	.pipe(uglify())
	.pipe(gulp.dest("./build/js"));
});

gulp.task("clean", function () {
	return del(['build', 'tmp']);
});

gulp.task("build", ['clean'], function () {
	if (buildProduction) {
		gulp.start('minifyScripts');
	} else {
		gulp.start('jsBrowserify');
	}
	gulp.start('bower');
});

gulp.task('jshint', function () {
	return gulp.src(['js/*.js'])
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

gulp.task('bowerJS', function () {
	return gulp.src(lib.ext('js').files)
	.pipe(concat('vendor.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./build/js'));
});

gulp.task('bowerCSS', function () {
	return gulp.src(lib.ext('css').files)
	.pipe(concat('vendor.css'))
	.pipe(gulp.dest('./build/css'));
});

gulp.task('bower', ['bowerJS', 'bowerCSS']);

gulp.task('serve', function () {
	browserSync.init ({
		server: {
			baseDir: "./",
			index: "index.html"
		}
	});

	gulp.watch(['js/*.js'], ['jsBuild']);
	gulp.watch(['bower.json'], ['bowerBuild']);
	gulp.watch(['*.html'], ['htmlBuild']);

});

gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function () {
	browserSync.reload();
});

gulp.task('bowerBuild', ['bower'], function () {
	browserSync.reload();
});

gulp.task('htmlBuild', function () {
	browserSync.reload();
});
vvvv
