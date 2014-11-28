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
                link: function($scope, $element, $attrs) {
                    configs.apply($scope, $attrs.menuConfig, {
                        icons: false
                    });

                    var id = $scope.menuId;
                    if (!id) {
                        id = $scope.menuId = 'material-menu-' + ID_GENERATOR++;
                    }

                    $scope._menu = menus.getMenu(id);

                    function onBodyClick(e) {
                        $scope.$apply(function() {
                            menus.close(id);
                        });
                    }

                    function prepareMenu() {
                        var containerRect = $element.parent()[0].getBoundingClientRect(),
                            viewportHeight = document.documentElement.clientHeight,
                            menuHeight = $element[0].scrollHeight;

                        if (containerRect.top + menuHeight > viewportHeight) {
                            $element[0].style.height = (viewportHeight - containerRect.top - 10) + 'px';
                        }
                        
                        $element[0].scrollTop = 0;
                    }

                    $scope.$watch('_icons', function(value) {
                        if (value) {
                            $element.addClass('material-menu-has-icons');
                        } else {
                            $element.removeClass('material-menu-has-icons');
                        }
                    });

                    $scope.$watch('_menu.opened', function(opened, wasOpened) {
                        if (opened) {
                            prepareMenu();
                            $animate.addClass($element, 'material-menu-opened').then(function() {
                                menus.setTransitionDone('open', id);
                            });
                            ng.element(window).on('click', onBodyClick);
                        } 
                        else if (wasOpened) {
                            $animate.removeClass($element, 'material-menu-opened').then(function() {
                                menus.setTransitionDone('close', id);
                            });
                            ng.element(window).off('click', onBodyClick);
                        }
                    });

                    $scope.$on('destroy', function() {
                        ng.element(window).off('click', onBodyClick);
                        menus.removeMenu(id);
                    });
                }
            };
        }
    ]);

    material.directive('materialMenuButton', [
        'materialConfigService',
        'materialMenuService',
        function(configs, menus) {
            var ID_GENERATOR = 1;

            return {
                restrict: 'EA',
                transclude: true,
                scope: {
                    menuId: '@'
                },
                template: [
                    '<material-button ng-click="openMenu($event)" button-config="_buttonConfig"></material-button>',
                    '<material-menu menu-id="{{menuId}}" menu-config="_menuConfig" ng-transclude></material-menu>'
                ].join(''),
                compile: function($element, $attrs) {
                    if (ng.isUndefined($attrs.menuId)) {
                        $attrs.menuId = 'material-menubutton-' + ID_GENERATOR++;
                    }

                    return function($scope, $element, $attrs) {
                        configs.bridge($scope, $attrs, 'buttonConfig');
                        configs.bridge($scope, $attrs, 'menuConfig');

                        $scope.openMenu = function(e) {
                            e.stopPropagation();
                            menus.open($scope.menuId);
                        };
                    }
                }
            }
        }
    ]);

    material.factory('materialMenuService', [
        '$q',
        function($q) {
            return (function() {
                var menus = {},
                    openMenuId = null;

                var self = {
                    getMenu: function(id) {
                        var menu = menus[id];

                        if (!menu) {
                            menu = menus[id] = {
                                id: id,
                                opened: false,
                                listeners: {
                                    open: [],
                                    close: []
                                },
                                deferred: {
                                    open: null,
                                    close: null 
                                }
                            };
                        }

                        return menu;
                    },

                    removeMenu: function(id) {
                        delete menus[id];
                    },

                    setTransitionDone: function(eventName, id) {
                        var menu = self.getMenu(id),
                            deferred = menu.deferred[eventName];

                        if (deferred) {
                            deferred.resolve();
                            menu.deferred[eventName] = null;
                            self.broadcast(eventName, id);
                        }
                    },

                    open: function(id) {
                        var menu = self.getMenu(id);

                        if (menu.opened && !menu.deferred.open) {
                            return $q.reject('Menu ' + id + 'already opened');
                        }

                        if (openMenuId && openMenuId !== id) {
                            self.close(openMenuId);
                        }

                        openMenuId = id;
                        if (!menu.deferred.open) {
                            menu.opened = true;                            
                            menu.deferred.open = $q.defer();
                        }

                        return menu.deferred.open.promise;
                    },

                    close: function(id) {
                        var menu = self.getMenu(id);

                        if (!menu.opened && !menu.deferred.close) {
                            return $q.reject('Menu ' + id + 'already closed');
                        }

                        if (openMenuId && openMenuId == id) {                            
                            openMenuId = null;
                        }

                        if (!menu.deferred.close) {
                            menu.opened = false;
                            menu.deferred.close = $q.defer();
                        }

                        return menu.deferred.close.promise;
                    },

                    on: function(eventName, id, callback) {
                        var menu = self.getMenu(id),
                            listeners = menu && menu.listeners && menu.listeners[eventName];

                        if (listeners) {
                            listeners.push(callback);

                            return function() {
                                listeners[eventName].splice(listeners[eventName].indexOf(callback), 1);
                            };
                        }       
                    },

                    broadcast: function(eventName, id) {
                        var menu = self.getMenu(id),
                            listeners = menu && menu.listeners && menu.listeners[eventName];

                        if (listeners) {
                            listeners.forEach(function(listener) {
                                listener.apply(self, Array.prototype.slice.call(arguments, 1));
                            });
                        }                          
                    }
                };

                return self;
            })();
        }
    ]);
});