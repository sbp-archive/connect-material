define(['../components'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var materialComponents = $__0.materialComponents;
  materialComponents.directive('materialItem', [function() {
    return {
      restrict: 'EA',
      transclude: true,
      scope: {icon: '@'},
      template: ['<div ng-if="icon" class="{{getIconClass()}}"></div>', '<div class="material-text" ng-transclude></div>'].join(''),
      link: function($scope) {
        $scope.getIconClass = function() {
          var parts = $scope.icon.split(':'),
              iconCls = 'icon-' + parts[0];
          iconCls += ' ' + iconCls + '-ic_' + parts[1] + '_24dp';
          return 'material-icon ' + iconCls;
        };
      }
    };
  }]);
  return {};
});
