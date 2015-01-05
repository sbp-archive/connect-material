"use strict";
var $___46__46__47_components__;
var materialComponents = ($___46__46__47_components__ = require("../components"), $___46__46__47_components__ && $___46__46__47_components__.__esModule && $___46__46__47_components__ || {default: $___46__46__47_components__}).materialComponents;
materialComponents.directive('materialButton', ['$animate', function($animate) {
  return {
    restrict: 'EA',
    transclude: true,
    scope: {icon: '@'},
    template: ['<div ng-if="icon" class="{{getIconClass()}}"></div>', '<div class="material-text" ng-transclude></div>'].join(''),
    link: function($scope, $element) {
      $animate.enabled(false, $element);
      $scope.getIconClass = function() {
        var parts = $scope.icon.split(':'),
            iconCls = 'icon-' + parts[0];
        iconCls += ' ' + iconCls + '-ic_' + parts[1] + '_24dp';
        return 'material-icon ' + iconCls;
      };
    }
  };
}]);
