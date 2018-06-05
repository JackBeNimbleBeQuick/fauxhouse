// Include gulp
import gulp     from 'gulp';
import register from 'babel-register';

// Include Our Plugins
import sass    from 'gulp-sass';
import concat  from 'gulp-concat';
import uglify  from 'gulp-uglify';
import rename  from 'gulp-rename';
import ts      from "gulp-typescript";
import maps    from 'gulp-sourcemaps';

// Include useful stuff
import glob    from 'glob';
import path    from 'path';
import fs      from "fs";
import sh      from 'shelljs';
import ps      from 'child_process';

let exec = ps.exec;


import webpack from 'webpack-stream';


let tsProject  = ts.createProject("tsconfig.json");
let actions = [];

let sources = {
  styles:  `sass`,
  scripts: `ts/**/*.ts`
};

let targets = {
  index: '../public/index.html'
}

let cleanup =  [
  'js'
]

/**
 * @NOTE not needed in this context but here for reference
 * ..adjunct to transpile where you would wan to clean up /js
 * Put away the toys and sweep the floor
 * @param  {Function} done
 * @return done()
 */
let clean = (done) => {
  for(let i in cleanup){
    let _path = __dirname+'/'+cleanup[i];
    sh.rm('-rf', _path);
  }
  return done();
}

/**
 * Create / Overwrite public/css/main.css
 * @return {Void} results in compiled files place into public foler
 */
let css = () => gulp.src('sass/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('../public/css'));

/**
 * Webpack and move transpiled files to public
 * @param  {Function} fn just the gulp env function in case you need to return it 8^) ?
 * @return {Gulp} task
 */
let compile = (done) => {
  console.log('Moving transpiled js to public');
  require('./webpack.config');
  return done();
}

/**
 * @NOTE not needed in this context but here for reference
 * TS transpile step of a build
 * @param  {Function} done
 * @return {tsProject.result}
 */
let transpile = (done) => {
  console.log('Transpiling ts to js using tsconfig.json');
  let result = gulp
    .src(sources.scripts)
    .pipe(maps.init())
    .pipe(tsProject());

  return result.js
    .pipe(maps.write())
    .pipe(gulp.dest('js'));
}

let watchSass = (done) => {
  gulp.watch([
      sources.styles
  ], gulp.series([css,compile])(done));

}

/**
 * Series of js tasks that result in new webpack build
 * in public/js
 * @param  {Function} done
 * @return done()
 */
let js = (done) => {
  return gulp.series([transpile, compile, clean])(done);
}

/**
 * Does full build
 * @param  {Function} done
 * @return done()
 */
let build = (done) => {
  return gulp.series([ css, compile, watchSass])(done);
}


export {
  css,
  watchSass,
  compile,
  transpile,
  build,
  clean,
}
