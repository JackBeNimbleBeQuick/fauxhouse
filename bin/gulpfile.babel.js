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
let express_ = null;

let sources = {
  express_port: 8092,
  styles:  `sass`,
  scripts: `ts/**/*.ts`,
  server: `ts/server/**/*.ts`,
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
 * @NOTE we are transpiling only server here
 * .webpack is handling the client React side of things
 */
let transpile = (done) => {
  console.log('Transpiling ts to js using tsconfig.json');
  let result = gulp
    .src(sources.server)
    .pipe(maps.init())
    .pipe(tsProject());

  result.js
    .pipe(maps.write())
    .pipe(gulp.dest('js/server'))
    .on('end', () => {
      return done();
    });
}

/**
 * restartServer provides wrapper for listening to the server
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 * adaption from: Akshendra Pratap  8^)
 * https://blog.cloudboost.io/reloading-the-express-server-without-nodemon-e7fa69294a96
 */
let restartServer = (done) =>{
  setTimeout(()=>{getServer().restart(); return done()}, 1000);
}

let reactServer = (done) => {
  require('./serve');
  return done();

}

let getServer = (done) => {
  if( ! express_){
    let RS = require('./js/server/bin/restartable');
    express_ = new RS.Restartable();
    express_.start();
  }
  return express_;
}

let watchServer = (done) => {
  getServer();
  gulp.watch([
      sources.server
  ]).on('change', ()=>{ gulp.series([transpile,restartServer])(done)});

}

let watchSass = (done) => {

  gulp.watch([
      sources.styles
  ]).on('change', ()=>{ gulp.series([css,compile])(done)});

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
  return gulp.series([ css, getServer, compile, reactServer])(done);
}


export {
  css,
  watchSass,
  watchServer,
  restartServer,
  compile,
  transpile,
  build,
  clean,
}
