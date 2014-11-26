define([
    '../material',
    'angular',
], function (material, ng) {
    'use strict';

    material.factory('cmDrawerService', [
        '$q',
        function($q) {
            return (function() {
                var drawers = {};

                var self = {
                    addDrawer: function(id) {
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

                    setTransitionDone: function(event, id) {
                        var drawer = drawers[id],
                            deferred = drawer && drawer.deferred[event];

                        if (deferred) {
                            deferred.resolve();
                            drawer.deferred[event] = null;
                        }
                    },

                    open: function(id) {
                        var drawer = drawers[id];

                        if (!drawer) {
                            drawer = self.addDrawer(id);
                        }

                        if (drawer.deferred.open) {
                            return drawer.deferred.open.promise;
                        }
                        else {
                            drawer.opened = true;                            
                            drawer.deferred.open = $q.defer();
                            return drawer.deferred.open.promise;
                        }
                    },

                    close: function(id) {
                        var drawer = drawers[id];
                        if (!drawer) {
                            drawer = self.addDrawer(id);
                        }

                        if (drawer.deferred.close) {
                            return drawer.deferred.close.promise;
                        }
                        else {
                            drawer.opened = false;
                            drawer.deferred.close = $q.defer();
                            return drawer.deferred.close.promise;
                        }
                    },

                    on: function(event, id, callback) {
                        var drawer = drawers[id];
                        if (drawer && drawer[event]) {
                            drawer[event].push(callback);

                            return function() {
                                drawer[event].splice(drawer.open.indexOf(callback), 1);
                            };
                        }       
                    },
                };

                return self;
            })();
        }
    ]);

    material.directive('materialDrawer', [
        '$parse',
        '$animate',
        'cmDrawerService',
        function ($parse, $animate, cmDrawerService) {
            var ID_GENERATOR = 1;

            return {
                restrict: 'EA',
                scope: {
                    //modal: '@',
                    position: '@'
                },
                link: function(scope, element, attrs) {
                    var id = attrs.drawerId;
                    if (!id) {
                        id = 'material-drawer-' + ID_GENERATOR++;
                    }

                    scope.drawer = cmDrawerService.addDrawer(id);

                    // if (scope.modal) {
                    //     var backdrop = ng.element('<div class="material-backdrop"></div>');
                    // }

                    element.addClass('material-drawer-' + (attrs.position || 'right'));


                    scope.$watch('drawer.opened', function(opened) {
                        if (opened) {
                            // if (scope.modal) {
                            //     element.parent().append(backdrop);
                            //     $animate.addClass(backdrop, 'material-backdrop-opened');
                            // }

                            $animate.addClass(element, 'material-drawer-opened').then(function() {
                                cmDrawerService.setTransitionDone('open', id);
                            });
                        } 
                        else {
                            // if (scope.modal) {
                            //     $animate.removeClass(backdrop, 'material-backdrop-opened').then(function() {
                            //         backdrop.remove();
                            //     });
                            // }

                            $animate.removeClass(element, 'material-drawer-opened').then(function() {
                                cmDrawerService.setTransitionDone('close', id);
                            });
                        }
                    });

                    scope.$on('destroy', function() {
                        cmDrawerService.removeDrawer(id);
                    });
                }
            }
        }
    ]);
});