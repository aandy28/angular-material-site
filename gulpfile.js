var gulp = require('gulp'),
	gutil = require('gulp-util'), 
	sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    runSequence = require('run-sequence'),
    ngAnnotate = require('gulp-ng-annotate'),
    angularTemplates = require('gulp-angular-templates');

// define the default task and add the watch task to it
gulp.task('default', ['build','watch'], function(callback){
	runSequence(['build','watch'],
    callback
  )
});

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', ngAnnotate()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

// gulp.task('build-css', function() {
//   return gulp.src('app/**/*.scss')
//   	.pipe(sourcemaps.init())  // Process the original sources
//     .pipe(sass())
//     .pipe(sourcemaps.write()) // Add the map to modified source.
//     .pipe(gulp.dest('dist/css'))
//     .pipe(browserSync.reload({
//       stream: true
//     }));
// });

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('vendor', function() {
  return gulp.src('app/vendor/**/*')
  .pipe(gulp.dest('dist/vendor'))
});

// gulp.task('build-js', function() {
//   return gulp.src('app/**/*.js')
//     .pipe(sourcemaps.init())
//       .pipe(concat('bundle.js'))
//       //only uglify if gulp is ran with '--type production'
//       .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('dist/javascript'));
// });

// gulp.task('browserSync', function() {
//   browserSync.init({
//     server: {
//       baseDir: 'app'
//     },
//   })
// });

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('html', function () {
    return gulp.src('app/views/**/*.html')
        .pipe(angularTemplates())
        .pipe(gulp.dest('dist/views'));
});


/* updated watch task to include sass */
// gulp.task('watch', ['browserSync', 'build-css'], function() {
gulp.task('watch', function() {
  gulp.watch('app/**/*.js', ['jshint']);
  // gulp.watch('app/**/*.scss', ['build-css']);
  // gulp.watch('app/**/*.js', ['build-js']);
  // gulp.watch('app/**/*.html', browserSync.reload); 
  // gulp.watch('app/**/*.js', browserSync.reload);
});

gulp.task('build', function (callback) {
  runSequence( 
    ['clean:dist', 'html' ,'useref', 'images', 'fonts', 'vendor'],
    callback
  )
});