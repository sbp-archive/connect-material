define([
    './directive',
    'angular'
], function (directive, ng) {
    'use strict';
    directive('menu', [
        '$rootScope'
    ], function (root) {
        ng.element(window).on('click', function (evnt) {
            root.$broadcast('material-menu.global-click', evnt);
        });
        return function (scope, elm) {
            var menuElm = ng.element(elm[0].querySelector('.material-menu'));
            //on click
            elm.on('click', function (evnt) {
                evnt.stopPropagation();
                //check of we have already a hide
                if (menuElm.hasClass('menu-hide')) {
                    menuElm.removeClass('menu-hide');
                    scope.$root.$broadcast('material-menu.show', menuElm);
                } else {
                    menuElm.addClass('menu-hide');
                }
            });
            //hide on global click
            scope.$on('material-menu.global-click', function () {
                menuElm.addClass('menu-hide');
            });
            //hide if other menu item is clicked
            scope.$on('material-menu.show', function (evnt, data) {
                if (data !== menuElm) {
                    menuElm.addClass('menu-hide');
                }
            });
        };
    });
});