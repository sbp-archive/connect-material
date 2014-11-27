define([
    '../material',
    'angular',
], function (material, ng) {
    'use strict';

    material.directive('materialDrawer', [
        '$parse',
        '$animate',
        'materialDrawerService',
        'materialConfigService',
        function ($parse, $animate, drawers, configs) {
            var ID_GENERATOR = 1;

            return {
                restrict: 'EA',
                scope: {
                    drawerId: '@'
                },

                link: function($scope, $element, $attrs) {
                    var id = $scope.drawerId;
                    if (!id) {
                        id = $scope.drawerId = 'material-drawer-' + ID_GENERATOR++;
                    }

                    configs.apply($scope, $attrs.drawerConfig, {
                        position: 'right',
                        modal: true
                    });

                    $scope._drawer = drawers.getDrawer(id);

                    var backdrop = null;
                    $scope.$watch('_modal', function(value) {
                        if (!value && backdrop) {
                            backdrop.remove();
                            backdrop = null;
                        }
                        else if (value) {
                            backdrop = ng.element('<div class="material-backdrop"></div>');
                            if ($scope._drawer.opened) {
                                backdrop.addClass('material-backdrop-opened');
                            }
                            $element.parent().append(backdrop);
                            backdrop.on('click', function() {
                                $scope.$apply(function() {
                                    drawers.close(id);
                                });
                            });
                        }
                    });

                    $scope.$watch('_position', function(newPos, oldPos) {
                        $element.removeClass('material-drawer-' + oldPos);
                        $element.addClass('material-drawer-' + newPos);
                    });

                    $scope.$watch('_drawer.opened', function(opened, wasOpened) {
                        if (opened) {
                            if ($scope._modal) {
                                $animate.addClass(backdrop, 'material-backdrop-opened');
                            }

                            $animate.addClass($element, 'material-drawer-opened').then(function() {
                                drawers.setTransitionDone('open', id);
                            });
                        } 
                        else if (wasOpened) {
                            if ($scope._modal) {
                                $animate.removeClass(backdrop, 'material-backdrop-opened');
                            }

                            $animate.removeClass($element, 'material-drawer-opened').then(function() {
                                drawers.setTransitionDone('close', id);
                            });
                        }
                    });

                    $scope.$on('destroy', function() {
                        drawers.removeDrawer(id);
                    });
                }
            }
        }
    ]);

    material.factory('materialDrawerService', [
        '$q',
        function($q) {
            return (function() {
                var drawers = {};

                var self = {
                    getDrawer: function(id) {
                        var drawer = drawers[id];

                        if (!drawer) {
                            drawer = drawers[id] = {
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

                        return drawer;
                    },

                    removeDrawer: function(id) {
                        delete drawers[id];
                    },

                    setTransitionDone: function(eventName, id) {
                        var drawer = self.getDrawer(id),
                            deferred = drawer.deferred[eventName];

                        if (deferred) {
                            deferred.resolve();
                            drawer.deferred[eventName] = null;
                            self.broadcast(eventName, id);
                        }
                    },

                    open: function(id) {
                        var drawer = self.getDrawer(id);

                        if (!drawer.deferred.open) {
                            drawer.opened = true;                            
                            drawer.deferred.open = $q.defer();
                        }

                        return drawer.deferred.open.promise;
                    },

                    close: function(id) {
                        var drawer = self.getDrawer(id);

                        if (!drawer.deferred.close) {
                            drawer.opened = false;
                            drawer.deferred.close = $q.defer();
                        }           

                        return drawer.deferred.close.promise;
                    },

                    on: function(eventName, id, callback) {
                        var drawer = self.getDrawer(id),
                            listeners = drawer && drawer.listeners && drawer.listeners[eventName];

                        if (listeners) {
                            listeners.push(callback);

                            return function() {
                                listeners[eventName].splice(listeners[eventName].indexOf(callback), 1);
                            };
                        }       
                    },

                    broadcast: function(eventName, id) {
                        var drawer = self.getDrawer(id),
                            listeners = drawer && drawer.listeners && drawer.listeners[eventName];

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