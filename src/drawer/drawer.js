define([
    '../material',
    'angular',
], function (material, ng) {
    'use strict';

    material.directive('materialDrawer', [
        '$parse',
        '$animate',
        function ($parse, $animate) {
            return {
                restrict: 'EA',
                scope: {
                    opened: '@',
                    modal: '@',
                    position: '@'
                },
                link: function(scope, element, attrs) {
                    if (attrs.modal) {
                        var backdrop = ng.element('<div class="material-backdrop"></div>');
                        backdrop.on('click', onBackdropClick);
                        element.parent().append(backdrop);
                    }

                    element.addClass('material-drawer-' + (attrs.position || 'right'));

                    function onBackdropClick(e) {
                        scope.$apply(function() {
                            scope.opened = false;
                        });
                    }

                    scope.$watch('opened', function(opened) {
                        if (opened === "true" || opened === true) {
                            $animate.addClass(element, 'material-drawer-opened');
                            if (backdrop) {
                                $animate.addClass(backdrop, 'material-backdrop-opened');
                            } else {
                                ng.element(window).on('click', onBackdropClick);
                            }

                            scope.$root.$broadcast('material-drawer.show', element);
                        } 
                        else {
                            $animate.removeClass(element, 'material-drawer-opened');
                            if (backdrop) {
                                $animate.removeClass(backdrop, 'material-backdrop-opened');
                            } else {
                                ng.element(window).off('click', onBackdropClick);
                            }

                            scope.$root.$broadcast('material-drawer.hide', element);
                        }
                    });
                }
            }
        }
    ]);
});