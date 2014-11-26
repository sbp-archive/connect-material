define([
    '../material',
    'angular'
], function (material, ng) {
    'use strict';

    material.directive('materialDialog', [
        '$state',
        '$parse',
        function ($state, $parse) {
            return function(scope, element, attrs) {
                console.log('TODO: implement drawer');
            };
            // var doc = document,
            //     body = doc.body,
            //     active = false,
            //     backdrop = doc.createElement('div'),
            //     element = ng.element;
            // //set classes for backdrop
            // element(backdrop).addClass('material-overlay-backdrop hide');
            // body.appendChild(backdrop);
            // //directive
            // directive('overlay', function () {
            //     return function ($scope, $lement) {
            //         element(backdrop).removeClass('hide');
            //         body.appendChild(elm[0]);
            //         //remove
            //         scope.$on('$destroy', function () {
            //             active = false;
            //             body.removeChild(elm[0]);
            //             element(backdrop).addClass('hide');
            //         });
            //     };
            // });
        }
    ]);
});