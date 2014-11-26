/* jshint node: true */
'use strict';
module.exports = function(grunt) {
    grunt.initConfig({
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
    });

    //load tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    //build task
    grunt.registerTask('build', [
        'less'
    ]);
};