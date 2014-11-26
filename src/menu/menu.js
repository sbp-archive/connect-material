define([
    '../material',
    'angular',
    '../item/item'
], function (material, ng) {
    'use strict';
    material.directive('materialMenu', [
        '$animate',
        '$parse',
        function ($animate, $parse) {
            return {
                restrict: 'EA',
                scope: {
                    opened: '=opened'
                },
                link: function(scope, element, attrs) {
                    if ($parse(attrs.menuIcons)(scope.$parent)) {
                        element.addClass('material-menu-has-icons');
                    }

                    function onBodyClick(e) {
                        scope.$apply(function() {
                            scope.opened = false;
                        });
                    }

                    scope.$watch('opened', function(opened) {
                        if (opened) {
                            scope.$root.$broadcast('material-menu.show', element);
                            $animate.addClass(element, 'material-menu-opened');
                            ng.element(window).on('click', onBodyClick);
                        } 
                        else {
                            scope.$root.$broadcast('material-menu.hide', element);
                            $animate.removeClass(element, 'material-menu-opened');
                            ng.element(window).off('click', onBodyClick);
                        }
                    });

                    // If another menu opens we need to hide this menu
                    scope.$root.$on('material-menu.show', function(e, menuEl) {
                        if (element !== menuEl) {
                            scope.opened = false;
                        }
                    });
                }
            };
        }
    ]);

    material.directive('materialMenuButton', [
        function($rootScope) {
            return {
                restrict: 'EA',
                transclude: true,
                scope: {
                    opened: '@',
                    icon: '@',
                    menuIcons: '@'
                },
                template: [
                    '<material-button ng-click="openMenu($event)" material-icon="{{icon}}"></material-button>',
                    '<material-menu opened="opened" menu-icons="menuIcons" ng-transclude></material-menu>'
                ].join(''),
                link: function(scope, element) {
                    scope.openMenu = function(e) {
                        e.stopPropagation();
                        scope.opened = true;
                    };
                }
            }
        }
    ]);
});