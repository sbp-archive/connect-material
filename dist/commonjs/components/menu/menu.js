"use strict";
var $___46__46__47_components__,
    $__angular__,
    $___46__46__47__46__46__47_services_47_config_47_config__,
    $___46__46__47__46__46__47_services_47_menu_47_menu__,
    $___46__46__47_item_47_item__,
    $__menu_46_button__;
var materialComponents = ($___46__46__47_components__ = require("../components"), $___46__46__47_components__ && $___46__46__47_components__.__esModule && $___46__46__47_components__ || {default: $___46__46__47_components__}).materialComponents;
var angular = ($__angular__ = require("angular"), $__angular__ && $__angular__.__esModule && $__angular__ || {default: $__angular__}).default;
($___46__46__47__46__46__47_services_47_config_47_config__ = require("../../services/config/config"), $___46__46__47__46__46__47_services_47_config_47_config__ && $___46__46__47__46__46__47_services_47_config_47_config__.__esModule && $___46__46__47__46__46__47_services_47_config_47_config__ || {default: $___46__46__47__46__46__47_services_47_config_47_config__});
($___46__46__47__46__46__47_services_47_menu_47_menu__ = require("../../services/menu/menu"), $___46__46__47__46__46__47_services_47_menu_47_menu__ && $___46__46__47__46__46__47_services_47_menu_47_menu__.__esModule && $___46__46__47__46__46__47_services_47_menu_47_menu__ || {default: $___46__46__47__46__46__47_services_47_menu_47_menu__});
($___46__46__47_item_47_item__ = require("../item/item"), $___46__46__47_item_47_item__ && $___46__46__47_item_47_item__.__esModule && $___46__46__47_item_47_item__ || {default: $___46__46__47_item_47_item__});
($__menu_46_button__ = require("./menu.button"), $__menu_46_button__ && $__menu_46_button__.__esModule && $__menu_46_button__ || {default: $__menu_46_button__});
materialComponents.directive('materialMenu', ['$animate', '$parse', 'materialConfigService', 'materialMenuService', function($animate, $parse, configs, menus) {
  var ID_GENERATOR = 1;
  return {
    restrict: 'EA',
    scope: {menuId: '@'},
    compile: function($element, $attrs) {
      if (angular.isUndefined($attrs.menuId)) {
        $attrs.menuId = 'material-menu-' + ID_GENERATOR++;
        $element.attr('menu-id', $attrs.menuId);
      }
      return function($scope, $element, $attrs) {
        var id = $attrs.menuId,
            menu = $scope._menu = menus.create(id, $element),
            originalParent = $element.parent();
        configs.applyConfigs($scope, $attrs.menuConfig, {
          appendToBody: false,
          closeOnBodyClick: true,
          closeOnMenuClick: true,
          autoAdjust: true,
          autoPosition: true,
          icons: false
        });
        function onBodyClick() {
          if ($scope._closeOnBodyClick) {
            $scope.$apply(function() {
              menu.close();
            });
          }
        }
        menu.on('open', function() {
          angular.element(window).on('click', onBodyClick);
        });
        menu.on('close', function() {
          if ($scope._appendToBody) {
            var style = $element[0].style;
            style.top = null;
            style.right = null;
            style.height = null;
            originalParent.append($element);
          }
          angular.element(window).off('click', onBodyClick);
        });
        menu.on('beforeopen', function() {
          var containerRect = originalParent[0].getBoundingClientRect(),
              viewportHeight = document.documentElement.clientHeight,
              innerMenuHeight = $element[0].scrollHeight;
          if ($scope._appendToBody) {
            angular.element(document.body).append($element);
            if ($scope._autoPosition) {
              $element.css({
                top: containerRect.top + 'px',
                right: (document.documentElement.clientWidth - containerRect.right) + 'px'
              });
            }
          }
          if ($scope._autoAdjust && containerRect.top + innerMenuHeight > viewportHeight) {
            $element.css('height', (viewportHeight - containerRect.top - 10) + 'px');
          }
          $element[0].scrollTop = 0;
        });
        $element.on('click', function(e) {
          e.stopPropagation();
          if ($scope._closeOnMenuClick) {
            $scope.$apply(function() {
              menu.close();
            });
          }
        });
        if (menu.deferred.open) {
          menu.open();
        }
        $scope.$watch('_icons', function(value) {
          if (value) {
            $element.addClass('material-menu-has-icons');
          } else {
            $element.removeClass('material-menu-has-icons');
          }
        });
        $scope.$on('$destroy', function() {
          angular.element(window).off('click', onBodyClick);
          menus.remove(id);
        });
      };
    }
  };
}]);
