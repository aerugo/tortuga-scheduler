'use strics'

var gulp = require('gulp');
var livereload = require('gulp-livereload');
var spawn = require('child_process').spawn;
var shell = require('shelljs');
var chalk = require('chalk');
var path = require('path');
var fs = require('fs');

// Used for running Node instance
var node;

var p_json = require('./package.json');

// Task to run the server
gulp.task('serve', function() {
    // Restart Node if running
    if (node) {node.kill(); }

    // Run Node command on main of app.
    node = spawn('node', [(p_json.main || 'server.js')], {stdio: 'inherit'});

    // An error occured
    node.on('close', function (code) {
        if (code === 8) {
        gulp.log('Error detected, waiting for changes...');
        }
    });
});

// Runs the front end building tool chain
gulp.task('build:frontend', function () {
  var c = shell.exec('npm run build:frontend').output;


  // Copy the file
  shell.cp('./www/index.html', './bin/index.html');

  livereload.reload();
});

gulp.task('reload', function () {
  livereload.reload();
});

// Runs the backend building tool chain
gulp.task('build:server', function () {
  shell.exec('npm run build:server');
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(['./server/**', './server.js'], ['build:server', 'serve']);
  gulp.watch(['./www/**'], ['build:frontend']);
});

// Create a basis build task
gulp.task('build', ['build:server', 'build:frontend']);

gulp.task('default', ['build', 'watch', 'serve', 'reload'])
