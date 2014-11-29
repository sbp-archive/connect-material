define([
    '../material',
    'angular',
], function (material, ng) {
    'use strict';
    
    material.directive('materialButton', [
        'materialConfigService',
        function (configs) {
            return {
                restrict: 'EA',
                transclude: true,
                scope: {},
                template: [
                    '<div ng-if="_icon" class="{{getIconClass()}}"></div>',
                    '<div class="material-text" ng-transclude></div>',
                ].join(''),
                link: function ($scope, $element, $attrs) {
                    configs.applyConfigs($scope, $attrs.buttonConfig, {
                        icon: false
                    });

                    $scope.getIconClass = function () {
                        var parts = $scope._icon.split(':'),
                            iconCls = 'icon-' + parts[0];

                        iconCls += ' ' + iconCls + '-ic_' + parts[1] + '_24dp';
                        return 'material-icon ' + iconCls;
                    };
                }
            }
        }
    ]);
});