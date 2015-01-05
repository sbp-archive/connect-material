define(['../components', 'angular', '../../services/config/config', '../../services/drawer/drawer'], function($__0,$__2,$__4,$__5) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  if (!$__5 || !$__5.__esModule)
    $__5 = {default: $__5};
  var materialComponents = $__0.materialComponents;
  var angular = $__2.default;
  $__4;
  $__5;
  materialComponents.directive('materialDrawer', ['$parse', '$animate', 'materialConfigService', 'materialDrawerService', function($parse, $animate, configs, drawers) {
    var ID_GENERATOR = 1;
    return {
      restrict: 'EA',
      scope: {drawerId: '@'},
      transclude: true,
      replace: true,
      template: ['<div class="material-drawer-wrap">', '<div ', 'ng-if="_modal" ', 'class="material-backdrop" ', 'ng-class="{\'material-opened\':_drawer.opened}" ', 'ng-click="onBackdropClick($event)" ', 'backdrop-for-drawer="{{dialogId}}">', '</div>', '<div class="material-drawer material-drawer-{{_position}}" ng-transclude></div>', '</div>'].join(''),
      compile: function($element, $attrs) {
        if (angular.isUndefined($attrs.drawerId)) {
          $attrs.drawerId = 'material-drawer-' + ID_GENERATOR++;
          $element.attr('drawer-id', $attrs.drawerId);
        }
        return function($scope, $element, $attrs) {
          var id = $attrs.drawerId,
              innerDrawerEl = $element[0].querySelector('.material-drawer'),
              drawer = $scope._drawer = drawers.create(id, innerDrawerEl);
          configs.applyConfigs($scope, $attrs.drawerConfig, {
            position: 'right',
            modal: true,
            closeOnBackdropClick: true,
            onBackdropClick: null
          });
          if (drawer.deferred.open) {
            drawer.open();
          }
          $scope.onBackdropClick = function(e) {
            if ($scope._onBackDropClick) {
              $parse($scope._onBackdropClick)($scope.$parent, {$event: e});
            }
            if ($scope._closeOnBackdropClick) {
              drawer.close();
            }
          };
          $scope.$on('$destroy', function() {
            drawers.remove(id);
          });
        };
      }
    };
  }]);
  return {};
});
