require.config({
    paths: {
        'angular':              'bower_components/angular/angular',
        'angular-animate':      'bower_components/angular-animate/angular-animate',
        'requirejs-domready':   'bower_components/requirejs-domready/domReady',
        'connect-material':     '../src'
    },
    shim   : {
        'angular': {
            exports: 'angular'
        },
        'angular-animate'   : ['angular']
    }
});

define([
    'angular',
    'requirejs-domready',
    'angular-animate',

    'connect-material/sidenav/sidenav',
    'connect-material/pickers/pickers',
    'connect-material/drawer/drawer',
    'connect-material/textfield/textfield'
], function(ng, domReady) {
    'use strict';

    var module = ng.module('sink', [
        'connectMaterialDirectives'
    ]);

    module.controller('SinkCtrl', [
        '$scope', 
        'cmDrawerService',
        function($scope, drawers) {
            drawers.open('main').then(function() {
                alert('drawer opened!');

                drawers.close('main').then(function() {
                    alert('drawer closed');
                });
            });

            drawers.on('open', 'main', function() {
                console.log('main drawer open event');
            });

            drawers.on('close', 'main', function() {
                console.log('main drawer closed event');        
            });
        }
    ]);

    domReady(function() {
        ng.bootstrap(document, ['sink']);
    });
});