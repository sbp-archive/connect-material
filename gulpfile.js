/* jshint node:true */
'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var merge = require('merge-stream');
var extend = require('util')._extend;

// pass along gulp reference to have tasks imported
require('gulp-release-tasks')(gulp);

var traceurConfig = {
    script: false,
    strict: false,
    types: false,
    typeAssersions: false,
    annotations: false,
    memberVariables: true,
    debug: true
};

gulp.task('transpile.amd', function() {
    var config = extend({modules: 'amd'}, traceurConfig);
    return gulp.src('src/**/*.js')
        .pipe($.traceur(config))
        .pipe(gulp.dest('dist/amd'));
});

gulp.task('transpile.commonjs', function() {
    var config = extend({modules: 'commonjs'}, traceurConfig);
    return gulp.src('src/**/*.js')
        .pipe($.traceur(config))
        .pipe(gulp.dest('dist/commonjs'));
});

gulp.task('transpile.systemjs', function() {
    var config = extend({modules: 'instantiate'}, traceurConfig);
    return gulp.src('src/**/*.js')
        .pipe($.traceur(config))
        .pipe(gulp.dest('dist/systemjs'));
});

gulp.task('transpile', ['transpile.amd', 'transpile.commonjs', 'transpile.systemjs']);

gulp.task('styles', function() {
    return gulp.src('src/style/material.less')
        .pipe($.sourcemaps.init())
        .pipe($.less()).on('error', $.util.log)
        .pipe($.autoprefixer('last 1 version')).on('error', $.util.log)
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/'))
        .pipe($.size());
});

gulp.task('jshint', function() {
    return gulp.src('src/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('clean', require('del').bind(null, ['dist']));

gulp.task('build', ['clean', 'jshint'], function() {
    gulp.start('transpile');
    return gulp.src('dist/**/*').pipe($.size({
        title: 'build',
        gzip: true
    }));
});

gulp.task('watch', ['clean'], function() {
    gulp.start('styles');
    gulp.start('transpile');

    gulp.watch(['src/**/*.js', 'src/**/*.less'], ['transpile', 'styles']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});
