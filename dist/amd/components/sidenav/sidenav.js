define(['../components', 'angular', '../../services/config/config', '../icon/icon', '../menu/menu', '../button/button'], function($__0,$__2,$__4,$__5,$__6,$__7) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  if (!$__5 || !$__5.__esModule)
    $__5 = {default: $__5};
  if (!$__6 || !$__6.__esModule)
    $__6 = {default: $__6};
  if (!$__7 || !$__7.__esModule)
    $__7 = {default: $__7};
  var materialComponents = $__0.materialComponents;
  var angular = $__2.default;
  $__4;
  $__5;
  $__6;
  $__7;
  materialComponents.directive('materialSidenavButton', ['materialConfigService', 'materialMenuService', function(configs, menus) {
    var ID_GENERATOR = 1;
    return {
      restrict: 'EA',
      transclude: true,
      scope: {
        menuId: '@',
        currentPage: '@'
      },
      template: ['<material-button ng-click="openMenu($event)" icon="navigation-white:menu_white"></material-button>', '<material-menu menu-id="{{menuId}}" menu-config="_menuConfig">', '<material-title material-icon="navigation-black:menu_black">{{pageName}}</material-title>', '<ng-transclude></ng-transclude>', '</material-menu>'].join(''),
      compile: function($element, $attrs) {
        if (angular.isUndefined($attrs.menuId)) {
          $attrs.menuId = 'material-sidenav-' + ID_GENERATOR++;
        }
        return function($scope, $element, $attrs) {
          configs.bridgeConfigs($scope, $attrs, 'menuConfig');
          $scope.$watch('currentPage', function() {
            var itemElement = $element[0].querySelector('[page="' + $scope.currentPage + '"]');
            if (itemElement) {
              $scope.pageName = itemElement.innerText;
            }
          });
          $scope.openMenu = function(e) {
            e.stopPropagation();
            menus.open($scope.menuId);
          };
        };
      }
    };
  }]);
  return {};
});
