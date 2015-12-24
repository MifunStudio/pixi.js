var fs = require('fs');
var gulp = require('gulp');
var browserifyInc = require('browserify-incremental');
var globalShim = require('browserify-global-shim');
var watchify = require('watchify');
var babelify = require('babelify');

function task(entry, out, watch) {
  return function() {
    var bundler = browserifyInc(entry, {
      plugin: [watchify],
      debug: true,
      cache: {},
      pacakgeCache: {},
      fullPaths: true,
      fast: true
    }).transform(babelify.configure({
      presets: ['es2015']
    })).transform(globalShim.configure({
      'pixi.js': 'PIXI'
    }));

    function compile() {
      bundler.bundle().pipe(fs.createWriteStream(out));
    }

    if(watch) {
      bundler.on('update', compile);
      bundler.on('error', function(error) {
        console.error(error);
      });
    }
    compile();
  }
}

gulp.task('build', task('src/index.js', 'dist/mifun-game.js'));
gulp.task('default', task('src/index.js', 'dist/mifun-game.js', true));
