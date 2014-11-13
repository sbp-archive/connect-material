define([
    './directive',
    'angular'
], function (directive, ng) {
    'use strict';
    directive('menu', function () {
        return function (scope, elm) {
            var menuElm = ng.element(elm[0].querySelector('.material-menu'));
            //on click
            elm.on('click', function () {
                //check of we have already a hide
                if (menuElm.hasClass('menu-hide')) {
                    menuElm.removeClass('menu-hide');
                    scope.$root.$broadcast('material-menu.show', menuElm);
                } else {
                    menuElm.addClass('menu-hide');
                }
            });

            scope.$on('material-menu.show', function (evnt, data) {
                if (data !== menuElm) {
                    menuElm.addClass('menu-hide');
                }
            });
        };
    });
});