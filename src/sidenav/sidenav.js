define([
    '../material',
    'angular',
    '../icon/icon',
    '../menu/menu'
], function (material, ng) {
    'use strict';

    material.directive('materialSidenavButton', [        
        '$rootScope',
        '$parse',
        function ($rootScope, $parse) {
            return {
                restrict: 'EA',
                transclude: true,
                scope: {
                    modal: '@',
                    currentPage: '@',
                    opened: '@',
                    menuIcons: '@'
                },
                template: [
                    '<material-button ng-click="openMenu($event)" material-icon="navigation-white:menu_white"></material-button>',
                    '<material-menu opened="opened" menu-icons="menuIcons">',
                        '<material-title material-icon="navigation-black:menu_black">{{pageName}}</material-title>',
                        '<ng-transclude></ng-transclude>',
                    '</material-menu>'
                ].join(''),

                link: function (scope, element, attrs) {
                    scope.$watch('currentPage', function() {
                        var itemElement = element[0].querySelector('[page="' + scope.currentPage + '"]');
                        if (itemElement) {
                            scope.pageName = itemElement.innerText;
                        }
                    });

                    scope.openMenu = function(e) {
                        e.stopPropagation();
                        scope.opened = true;
                    };
                }
            };
        }
    ]);
});