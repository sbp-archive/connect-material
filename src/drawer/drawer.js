define([
    '../material',
    'angular',
], function (material, ng) {
    'use strict';

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

    material.directive('materialDrawer', [
        '$parse',
        '$animate',
        'materialDrawerService',
        function ($parse, $animate, drawers) {
            var ID_GENERATOR = 1;

            return {
                restrict: 'EA',
                scope: true,

                link: function($scope, $element, $attrs) {
                    // First we evaluate all configurations into our current scope
                    ['drawerId', 'modal', 'position'].forEach(function(config) {
                        if (ng.isDefined($attrs[config])) {
                            var value = $parse($attrs[config])($scope);
                            if (ng.isUndefined(value)) {
                                value = $attrs[config];
                            }
                            $scope['$' + config] = value;
                        }
                    });

                    var id = $scope.$drawerId;
                    if (!id) {
                        id = $scope.$drawerId = 'material-drawer-' + ID_GENERATOR++;
                    }

                    $scope.$drawer = drawers.getDrawer(id);

                    if ($scope.$modal) {
                        var backdrop = ng.element('<div class="material-backdrop"></div>');
                    }

                    $element.addClass('material-drawer-' + ($scope.$position || 'right'));

                    $scope.$watch('$drawer.opened', function(opened) {
                        if (opened) {
                            if ($scope.$modal) {
                                $element.parent().append(backdrop);

                                backdrop.one('click', function() {
                                    $scope.$apply(function() {
                                        drawers.close(id);
                                    });
                                });

                                $animate.addClass(backdrop, 'material-backdrop-opened');
                            }

                            $animate.addClass($element, 'material-drawer-opened').then(function() {
                                drawers.setTransitionDone('open', id);
                            });
                        } 
                        else {
                            if ($scope.$modal) {
                                $animate.removeClass(backdrop, 'material-backdrop-opened').then(function() {
                                    backdrop.remove();
                                });
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
});