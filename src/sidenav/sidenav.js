define([
    '../material',
    'angular',
    '../icon/icon',
    '../menu/menu',
    '../button/button'
], function (material, ng) {
    'use strict';

    material.directive('materialSidenavButton', [        
        '$rootScope',
        '$parse',
        'materialConfigService',
        'materialMenuService',
        function ($rootScope, $parse, configs, menus) {
            var ID_GENERATOR = 1;

            return {
                restrict: 'EA',
                transclude: true,
                scope: {
                    menuId: '@',
                    currentPage: '@'
                },
                template: [
                    '<material-button ng-click="openMenu($event)" button-config="{icon:\'navigation-white:menu_white\'}"></material-button>',
                    '<material-menu menu-id="{{menuId}}" menu-config="_menuConfig">',
                        '<material-title material-icon="navigation-black:menu_black">{{pageName}}</material-title>',
                        '<ng-transclude></ng-transclude>',
                    '</material-menu>'
                ].join(''),

                compile: function($element, $attrs) {
                    if (ng.isUndefined($attrs.menuId)) {
                        $attrs.menuId = 'material-sidenav-' + ID_GENERATOR++;
                    }

                    return function ($scope, $element, $attrs) {
                        configs.bridge($scope, $attrs, 'menuConfig');

                        $scope.$watch('currentPage', function() {
                            var itemElement = $element[0].querySelector('[page="' + $scope.currentPage + '"]');
                            if (itemElement) {
                                $scope.pageName = itemElement.innerText;
                            }
                        });

                        $scope.openMenu = function(e) {
                            e.stopPropagation();
                            menus.open($scope.menuId);
                        };                    
                    }
                }                
            };
        }
    ]);
});