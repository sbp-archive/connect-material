define([
    './directive',
    'angular'
], function (directive, ng) {
    'use strict';
    var doc = document,
        body = doc.body,
        active = false,
        backdrop = doc.createElement('div'),
        element = ng.element;
    //set classes for backdrop
    element(backdrop).addClass('material-overlay-backdrop hide');
    body.appendChild(backdrop);
    //directive
    directive('overlay', function () {
        return function (scope, elm) {
            element(backdrop).removeClass('hide');
            body.appendChild(elm[0]);
            //remove
            scope.$on('$destroy', function () {
                active = false;
                body.removeChild(elm[0]);
                element(backdrop).addClass('hide');
            });
            
        };
    });
});