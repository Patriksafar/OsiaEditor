var gulp = require('gulp');
var inline = require('gulp-inline');

gulp.task('build', function() {
  // place code for your default task here
  gulp.src('dist/index.html')
    .pipe(inline({
      base: 'dist/',
      disabledTypes: ['svg', 'img'], // Only inline css files
    }))
    .pipe(gulp.dest('build/'));

});
