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
                    opened: '=opened',
                    modal: '@',
                    position: '@'
                },
                link: function(scope, element, attrs) {
                    if (scope.modal) {
                        var backdrop = ng.element('<div class="material-backdrop"></div>');
                        backdrop.on('click', onBackdropClick);
                    }

                    element.addClass('material-drawer-' + (attrs.position || 'right'));

                    function onBackdropClick(e) {
                        $animate.removeClass(element, 'material-drawer-opened').then(function() {
                            scope.$apply(function() {
                                scope.opened = false;
                            });
                        });
                        if (backdrop) {
                            $animate.removeClass(backdrop, 'material-backdrop-opened').then(function() {
                                backdrop.remove();
                            });
                        } else {
                            ng.element(window).off('click', onBackdropClick);
                        }
                        scope.$digest();
                    }

                    scope.$watch('opened', function(opened) {
                        if (opened) {
                            $animate.addClass(element, 'material-drawer-opened');
                            if (backdrop) {
                                element.parent().append(backdrop);
                                $animate.addClass(backdrop, 'material-backdrop-opened');
                            } else {
                                ng.element(window).on('click', onBackdropClick);
                            }

                            scope.$root.$broadcast('material-drawer.show', element);
                        } 
                        else {
                            console.log('locally notified of opened change');
                            scope.$root.$broadcast('material-drawer.hide', element);
                        }
                    });
                }
            }
        }
    ]);
});