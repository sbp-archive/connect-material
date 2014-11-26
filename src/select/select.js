define([
    '../material',
    'angular'
], function (material, ng) {
    'use strict';

    material.directive('materialSelect', [
        '$state',
        '$parse',
        function ($state, $parse) {
            return function(scope, element, attrs) {
                console.log('TODO: implement select');
            };
        }
    ]);
});