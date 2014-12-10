define([
    '../material',
    'angular',
    '../item/item',
    '../button/button'
], function (material, ng) {
    'use strict';

    material.directive('materialMenu', [
        '$animate',
        '$parse',
        'materialConfigService',
        'materialMenuService',
        function ($animate, $parse, configs, menus) {
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
                            menu = $scope._menu = menus.create(id, $element),
                            originalParent = $element.parent();

                        configs.applyConfigs($scope, $attrs.menuConfig, {
                            appendToBody: false,
                            closeOnBodyClick: true,
                            closeOnMenuClick: true,
                            autoAdjust: true,
                            icons: false
                        });

                        function onBodyClick(e) {
                            if ($scope._closeOnBodyClick) {
                                $scope.$apply(function () {
                                    menu.close();
                                });
                            }
                        };

                        menu.on('open', function () {
                            ng.element(window).on('click', onBodyClick);
                        });

                        menu.on('close', function () {
                            if ($scope._appendToBody) {
                                if ($scope._autoAdjust) {
                                    var style = $element[0].style;
                                    style.top = null;
                                    style.right = null;
                                    style.height = null;
                                }
                                originalParent.append($element);
                            }

                            ng.element(window).off('click', onBodyClick);
                        });
                        
                        menu.on('beforeopen', function () {
                            if ($scope._appendToBody) {
                                ng.element(document.body).append($element);
                            }

                            if ($scope._autoAdjust) {
                                var containerRect = originalParent[0].getBoundingClientRect(),
                                    viewportHeight = document.documentElement.clientHeight,
                                    innerMenuHeight = $element[0].scrollHeight;

                                if ($scope._appendToBody) {
                                    $element.css({
                                        top: containerRect.top + 'px',
                                        right: (document.documentElement.clientWidth - containerRect.right) + 'px'
                                    }); 
                                }

                                if (containerRect.top + innerMenuHeight > viewportHeight) {
                                    $element.css('height', (viewportHeight - containerRect.top - 10) + 'px');
                                }                          
                            }

                            $element[0].scrollTop = 0;
                        });

                        $element.on('click', function(e) {
                            e.stopPropagation();
                            if ($scope._closeOnMenuClick) {
                                $scope.$apply(function() {
                                    menu.close();
                                });
                            }
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

                        $scope.$on('$destroy', function () {
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