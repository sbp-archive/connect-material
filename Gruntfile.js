/* jshint node: true */
'use strict';
module.exports = function (grunt) {
    var autoprefixer = require('autoprefixer-core');
    
    grunt.initConfig(
        {
            release: {
                options: {
                    file: 'bower.json',
                    npm: false
                }
            },

            watch: {
                less: {
                    files: ['src/**/*.less'],
                    tasks: ['less', 'postcss']
                }
            },

            less: {
                material: {
                    files: {
                        'build/material.css': 'src/material.less'
                    },
                    options: {
                        sourceMap: true,
                        outputSourceFiles: true,
                        sourceMapFilename: 'build/material.css.map',
                        sourceMapURL: './material.css.map'
                    }
                }
            },

            postcss: {
                options: {
                    map: true,
                    processors: [
                        autoprefixer({ browsers: ['last 2 version'] }).postcss
                    ]
                },
                dist: { src: 'build/material.css' }
            }
        }
    );

    //load tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-release');
    grunt.loadNpmTasks('grunt-postcss');

    //build task
    grunt.registerTask('build', [
        'less',
        'postcss'
    ]);
};