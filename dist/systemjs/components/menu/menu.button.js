System.register(["../components", "angular", "../../services/config/config", "../../services/menu/menu", "../button/button"], function($__export) {
  "use strict";
  var materialComponents,
      angular;
  return {
    setters: [function(m) {
      materialComponents = m.materialComponents;
    }, function(m) {
      angular = m.default;
    }, function(m) {}, function(m) {}, function(m) {}],
    execute: function() {
      materialComponents.directive('materialMenuButton', ['materialConfigService', 'materialMenuService', function(configs, menus) {
        var ID_GENERATOR = 1;
        return {
          restrict: 'EA',
          transclude: true,
          scope: {
            menuId: '@',
            icon: '@',
            label: '@'
          },
          template: ['<material-button ng-click="openMenu($event)" icon="{{icon}}">{{label}}</material-button>', '<material-menu menu-id="{{menuId}}" menu-config="_menuConfig" ng-transclude></material-menu>'].join(''),
          compile: function($element, $attrs) {
            if (angular.isUndefined($attrs.menuId)) {
              $attrs.menuId = 'material-menubutton-' + ID_GENERATOR++;
            }
            return function($scope, $element, $attrs) {
              configs.bridgeConfigs($scope, $attrs, 'menuConfig');
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
