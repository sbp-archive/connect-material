define([
    '../material',
    'angular'
], function (material, ng) {
    'use strict';

    material.directive('materialDrawer', [
        '$parse',
        '$animate',
        'materialConfigService',
        'materialDrawerService',
        function ($parse, $animate, configs, drawers) {
            var ID_GENERATOR = 1;

            return {
                restrict: 'EA',
                scope: {
                    drawerId: '@'
                },

                transclude: true,
                replace: true,
                template: [
                    '<div class="material-drawer-wrap">',
                        '<div ',
                            'ng-if="_modal" ',
                            'class="material-backdrop" ',
                            'ng-class="{\'material-opened\':_drawer.opened}" ',
                            'ng-click="onBackdropClick($event)" ',
                            'backdrop-for-drawer="{{dialogId}}">',
                        '</div>',
                        '<div class="material-drawer material-drawer-{{_position}}" ng-transclude></div>',
                    '</div>'
                ].join(''),

                compile: function ($element, $attrs) {                    
                    if (ng.isUndefined($attrs.drawerId)) {
                        $attrs.drawerId = 'material-drawer-' + ID_GENERATOR++;
                        $element.attr('drawer-id', $attrs.drawerId);
                    }

                    return function ($scope, $element, $attrs) {
                        var id = $attrs.drawerId,
                            backdrop = null,
                            innerDrawerEl = $element[0].querySelector('.material-drawer'),
                            drawer = $scope._drawer = drawers.create(id, innerDrawerEl);

                        configs.applyConfigs($scope, $attrs.drawerConfig, {
                            position: 'right',
                            modal: true,
                            closeOnBackdropClick: true
                        });

                        // This is a bit ugly I think but it solves the problem
                        // where the close was already called for this drawer
                        // before this link method is called
                        if (drawer.deferred.open) {
                            drawer.open();                 
                        }

                        $scope.onBackdropClick = function (e) {
                            if ($scope._closeOnBackdropClick) {
                                e.stopPropagation();
                                drawer.close();
                            }
                        }

                        $scope.$on('$destroy', function () {
                            drawers.remove(id);
                        });
                    };
                }
            }
        }
    ]);

    material.factory('materialDrawerService', [
        'materialTransitionService',
        function (TransitionService) {
            return TransitionService('drawers');
        }
    ]);
});