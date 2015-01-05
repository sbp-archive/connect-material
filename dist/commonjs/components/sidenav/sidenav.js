"use strict";
var $___46__46__47_components__,
    $__angular__,
    $___46__46__47__46__46__47_services_47_config_47_config__,
    $___46__46__47_icon_47_icon__,
    $___46__46__47_menu_47_menu__,
    $___46__46__47_button_47_button__;
var materialComponents = ($___46__46__47_components__ = require("../components"), $___46__46__47_components__ && $___46__46__47_components__.__esModule && $___46__46__47_components__ || {default: $___46__46__47_components__}).materialComponents;
var angular = ($__angular__ = require("angular"), $__angular__ && $__angular__.__esModule && $__angular__ || {default: $__angular__}).default;
($___46__46__47__46__46__47_services_47_config_47_config__ = require("../../services/config/config"), $___46__46__47__46__46__47_services_47_config_47_config__ && $___46__46__47__46__46__47_services_47_config_47_config__.__esModule && $___46__46__47__46__46__47_services_47_config_47_config__ || {default: $___46__46__47__46__46__47_services_47_config_47_config__});
($___46__46__47_icon_47_icon__ = require("../icon/icon"), $___46__46__47_icon_47_icon__ && $___46__46__47_icon_47_icon__.__esModule && $___46__46__47_icon_47_icon__ || {default: $___46__46__47_icon_47_icon__});
($___46__46__47_menu_47_menu__ = require("../menu/menu"), $___46__46__47_menu_47_menu__ && $___46__46__47_menu_47_menu__.__esModule && $___46__46__47_menu_47_menu__ || {default: $___46__46__47_menu_47_menu__});
($___46__46__47_button_47_button__ = require("../button/button"), $___46__46__47_button_47_button__ && $___46__46__47_button_47_button__.__esModule && $___46__46__47_button_47_button__ || {default: $___46__46__47_button_47_button__});
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
