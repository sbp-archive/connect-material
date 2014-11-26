define([
    '../material',
    'angular',
], function (material, ng) {
    'use strict';
    material.directive('materialItem', [
        function () {
            return {
                restrict: 'EA',
                transclude: true,
                template: '<div class="material-text" ng-transclude></div>'
            }
        }
    ]);
});