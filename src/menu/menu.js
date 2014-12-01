define([
    '../material',
    'angular',
    '../item/item',
    '../button/button'
], function (material, ng) {
    'use strict';

    material.directive('materialMenu', [
        '$animate',
        'materialConfigService',
        'materialMenuService',
        function ($animate, configs, menus) {
            var ID_GENERATOR = 1;

            return {
                restrict: 'EA',
                scope: {
                    menuId: '@'
                },
                compile: function ($element, $attrs) {                    
                    if (ng.isUndefined($attrs.menuId)) {
                        $attrs.menuId = 'material-menu-' + ID_GENERATOR++;
                        $element.attr('menu-id', $attrs.menuId);
                    }

                    return function ($scope, $element, $attrs) {
                        var id = $attrs.menuId,
                            menu = $scope._menu = menus.create(id, $element);

                        configs.applyConfigs($scope, $attrs.menuConfig, {
                            icons: false
                        });

                        function onBodyClick(e) {
                            $scope.$apply(function () {
                                menu.close();
                            });
                        }

                        menu.on('open', function () {
                            ng.element(window).on('click', onBodyClick);
                        });

                        menu.on('close', function () {
                            ng.element(window).off('click', onBodyClick);
                        });

                        menu.on('beforeopen', function () {
                            var containerRect = $element.parent()[0].getBoundingClientRect(),
                                viewportHeight = document.documentElement.clientHeight,
                                menuHeight = $element[0].scrollHeight;

                            if (containerRect.top + menuHeight > viewportHeight) {
                                $element[0].style.height = (viewportHeight - containerRect.top - 10) + 'px';
                            }
                            
                            $element[0].scrollTop = 0;
                        });

                        $element.on('click', function(e) {
                            e.stopPropagation();
                            e.preventDefault();
                        });

                        // This is a bit ugly I think but it solves the problem
                        // where the close was already called for this menu
                        // before this link method is called
                        if (menu.deferred.open) {
                            menu.open();                 
                        }

                        $scope.$watch('_icons', function (value) {
                            if (value) {
                                $element.addClass('material-menu-has-icons');
                            } else {
                                $element.removeClass('material-menu-has-icons');
                            }
                        });

                        $scope.$on('destroy', function () {
                            ng.element(window).off('click', onBodyClick);
                            menus.remove(id);
                        });
                    };
                }
            };
        }
    ]);

    material.directive('materialMenuButton', [
        'materialConfigService',
        'materialMenuService',
        function (configs, menus) {
            var ID_GENERATOR = 1;

            return {
                restrict: 'EA',
                transclude: true,
                scope: {
                    menuId: '@',
                    icon: '@'
                },
                template: [
                    '<material-button ng-click="openMenu($event)" icon="{{icon}}"></material-button>',
                    '<material-menu menu-id="{{menuId}}" menu-config="_menuConfig" ng-transclude></material-menu>'
                ].join(''),
                
                compile: function ($element, $attrs) {
                    if (ng.isUndefined($attrs.menuId)) {
                        $attrs.menuId = 'material-menubutton-' + ID_GENERATOR++;
                    }

                    return function ($scope, $element, $attrs) {
                        configs.bridgeConfigs($scope, $attrs, 'menuConfig');

                        $scope.openMenu = function (e) {
                            e.stopPropagation();
                            menus.open($scope.menuId);
                        };
                    }
                }
            }
        }
    ]);

    material.factory('materialMenuService', [
        'materialTransitionService',
        function (TransitionService) {
            return TransitionService('menus', {forceSingle: true});
        }
    ]);
});