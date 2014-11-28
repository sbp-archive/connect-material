/* jshint node: true */
'use strict';
module.exports = function (grunt) {
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
                    tasks: ['less:material']
                }
            },

            less: {
                material: {
                    files: {
                        'src/material.css': 'src/material.less'
                    }
                }
            }
        }
    );

    //load tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-release');

    //build task
    grunt.registerTask('build', [
        'less'
    ]);
};