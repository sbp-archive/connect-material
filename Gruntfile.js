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
                        'src/material.css': 'src/material.less'
                    }
                }
            },

            postcss: {
                options: {
                    processors: [
                        autoprefixer({ browsers: ['last 2 version'] }).postcss
                    ]
                },
                dist: { src: 'src/material.css' }
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