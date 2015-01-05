System.register(["../components", "angular", "../../services/config/config", "../icon/icon", "../menu/menu", "../button/button"], function($__export) {
  "use strict";
  var materialComponents,
      angular;
  return {
    setters: [function(m) {
      materialComponents = m.materialComponents;
    }, function(m) {
      angular = m.default;
    }, function(m) {}, function(m) {}, function(m) {}, function(m) {}],
    execute: function() {
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
    }
  };
});
