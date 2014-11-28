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
        'materialDrawerService',
        function($scope, drawers) {
            $scope.data = {
                key: 'value'
            };

            $scope.openDrawer = function(id) {
                drawers.open(id);
            };

            $scope.closeDrawer = function(id) {
                drawers.close(id);
            };

            var hasIcons = true;
            $scope.toggleMenuIcons = function(e) {
                e.stopPropagation();
                hasIcons = !hasIcons;
            };
            $scope.hasMenuIcons = function() {
                return hasIcons;
            };

            var modal = true;
            $scope.toggleModal = function() {
                modal = !modal;
            };
            $scope.isModal = function() {
                return modal;
            };
        }
    ]);

    domReady(function() {
        ng.bootstrap(document, ['sink']);
    });
});