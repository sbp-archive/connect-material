"use strict";
Object.defineProperties(exports, {
  defaultSelectConfig: {get: function() {
      return defaultSelectConfig;
    }},
  __esModule: {value: true}
});
var $___46__46__47_components__,
    $__angular__,
    $___46__46__47__46__46__47_services_47_config_47_config__,
    $___46__46__47_menu_47_menu__,
    $___46__46__47_item_47_item__;
var materialComponents = ($___46__46__47_components__ = require("../components"), $___46__46__47_components__ && $___46__46__47_components__.__esModule && $___46__46__47_components__ || {default: $___46__46__47_components__}).materialComponents;
var angular = ($__angular__ = require("angular"), $__angular__ && $__angular__.__esModule && $__angular__ || {default: $__angular__}).default;
($___46__46__47__46__46__47_services_47_config_47_config__ = require("../../services/config/config"), $___46__46__47__46__46__47_services_47_config_47_config__ && $___46__46__47__46__46__47_services_47_config_47_config__.__esModule && $___46__46__47__46__46__47_services_47_config_47_config__ || {default: $___46__46__47__46__46__47_services_47_config_47_config__});
($___46__46__47_menu_47_menu__ = require("../menu/menu"), $___46__46__47_menu_47_menu__ && $___46__46__47_menu_47_menu__.__esModule && $___46__46__47_menu_47_menu__ || {default: $___46__46__47_menu_47_menu__});
($___46__46__47_item_47_item__ = require("../item/item"), $___46__46__47_item_47_item__ && $___46__46__47_item_47_item__.__esModule && $___46__46__47_item_47_item__ || {default: $___46__46__47_item_47_item__});
var ID_GENERATOR = 1;
var defaultSelectConfig = {
  valueField: 'value',
  labelField: 'label',
  emptyText: '',
  menuCls: ''
};
materialComponents.directive('materialSelect', ['materialConfigService', 'materialMenuService', function(configs, menus) {
  return {
    restrict: 'EA',
    scope: {
      options: '=options',
      selectId: '@'
    },
    require: '^ngModel',
    template: ['<material-menu class="material-select-menu {{_menuCls}}" menu-id="{{selectId}}" menu-config="_menuConfig">', '<material-item ', 'ng-if="options" ', 'ng-repeat="option in options | materialSelectSort:selected" ', 'ng-click="select(option[_valueField] || option)">', '{{option[_labelField] || option}}', '</material-item>', '<material-item ng-if="!options.length && _emptyText.length">{{_emptyText}}</material-item>', '</material-menu>'].join(''),
    compile: function($element, $attrs) {
      if (angular.isUndefined($attrs.selectId)) {
        $attrs.selectId = 'material-select-' + ID_GENERATOR++;
      }
      if (angular.isUndefined($attrs.options)) {
        console.warn('You defined a select without binding options to it...');
        $attrs.options = [];
      }
      return function($scope, $element, $attrs, ngModelCtrl) {
        var menu = menus.get($attrs.selectId);
        configs.applyConfigs($scope, $attrs.selectConfig, defaultSelectConfig);
        configs.bridgeConfigs($scope, $attrs, 'menuConfig');
        $scope.$watch('options', function() {
          ngModelCtrl.$render();
        }, true);
        menu.on('beforeopen', function() {
          menu.element.css('width', $element[0].clientWidth + 'px');
        });
        ngModelCtrl.$render = function() {
          var value = ngModelCtrl.$modelValue,
              options = $scope.options,
              ln = options && options.length,
              isValid = false,
              i,
              option;
          for (i = 0; i < ln; i++) {
            option = options[i];
            if ((angular.isObject(option) && option[$scope._valueField] === value) || option === value) {
              isValid = true;
              break;
            }
          }
          $scope.selected = isValid ? option : null;
          ngModelCtrl.$setValidity('select', isValid);
        };
        $scope.select = function(value) {
          ngModelCtrl.$setViewValue(value);
          ngModelCtrl.$render();
          menu.close();
        };
      };
    }
  };
}]);
materialComponents.filter('materialSelectSort', function() {
  return function(options, selected) {
    if (angular.isUndefined(selected) || selected === null) {
      return options;
    }
    var results = options.slice();
    results.splice(options.indexOf(selected), 1);
    results.unshift(selected);
    return results;
  };
});
