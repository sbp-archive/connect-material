"use strict";
var $___46__46__47_components__,
    $__angular__,
    $___46__46__47__46__46__47_services_47_config_47_config__,
    $___46__46__47__46__46__47_services_47_menu_47_menu__,
    $___46__46__47_textfield_47_textfield__,
    $__select_46_menu__;
var materialComponents = ($___46__46__47_components__ = require("../components"), $___46__46__47_components__ && $___46__46__47_components__.__esModule && $___46__46__47_components__ || {default: $___46__46__47_components__}).materialComponents;
var angular = ($__angular__ = require("angular"), $__angular__ && $__angular__.__esModule && $__angular__ || {default: $__angular__}).default;
($___46__46__47__46__46__47_services_47_config_47_config__ = require("../../services/config/config"), $___46__46__47__46__46__47_services_47_config_47_config__ && $___46__46__47__46__46__47_services_47_config_47_config__.__esModule && $___46__46__47__46__46__47_services_47_config_47_config__ || {default: $___46__46__47__46__46__47_services_47_config_47_config__});
($___46__46__47__46__46__47_services_47_menu_47_menu__ = require("../../services/menu/menu"), $___46__46__47__46__46__47_services_47_menu_47_menu__ && $___46__46__47__46__46__47_services_47_menu_47_menu__.__esModule && $___46__46__47__46__46__47_services_47_menu_47_menu__ || {default: $___46__46__47__46__46__47_services_47_menu_47_menu__});
($___46__46__47_textfield_47_textfield__ = require("../textfield/textfield"), $___46__46__47_textfield_47_textfield__ && $___46__46__47_textfield_47_textfield__.__esModule && $___46__46__47_textfield_47_textfield__ || {default: $___46__46__47_textfield_47_textfield__});
var defaultSelectConfig = ($__select_46_menu__ = require("./select.menu"), $__select_46_menu__ && $__select_46_menu__.__esModule && $__select_46_menu__ || {default: $__select_46_menu__}).defaultSelectConfig;
var ID_GENERATOR = 1;
materialComponents.directive('materialSelectsearch', ['materialConfigService', 'materialMenuService', 'materialConstants', function(configs, menus, Constants) {
  return {
    restrict: 'EA',
    scope: {
      selectId: '@?',
      fieldLabel: '@?label',
      value: '=ngModel',
      results: '=results'
    },
    require: '?ngModel',
    template: ['<material-textfield ng-model="label" label="{{fieldLabel}}" field-config="_fieldConfig"></material-textfield>', '<div class="material-select-carret material-icon icon-navigation-black icon-navigation-black-ic_arrow_drop_down_black_24dp"></div>', '<material-select select-id="{{selectId}}" menu-config="_menuConfig" select-config="_selectConfig" ng-model="value" options="results"></material-select>'].join(''),
    compile: function($element, $attrs) {
      if (angular.isUndefined($attrs.selectId)) {
        $attrs.selectId = 'material-selectsearch-' + ID_GENERATOR++;
        $element.attr('select-id', $attrs.selectId);
      }
      if (angular.isUndefined($attrs.results)) {
        $attrs.results = [];
      }
      return function($scope, $element, $attrs, ngModelCtrl) {
        configs.applyConfigs($scope, $attrs.selectConfig, defaultSelectConfig);
        configs.bridgeConfigs($scope, $attrs, 'menuConfig', {
          appendToBody: true,
          autoAdjust: false
        });
        configs.bridgeConfigs($scope, $attrs, 'fieldConfig');
        configs.bridgeConfigs($scope, $attrs, 'selectConfig', {
          emptyText: 'No results found...',
          menuCls: 'material-selectsearch-menu'
        });
        var input = angular.element($element[0].querySelector('input'));
        input.on('click', function(e) {
          e.stopPropagation();
        });
        input.on('focus', function() {
          input[0].setSelectionRange(0, input.val().length);
          $scope.$apply(function() {
            menus.open($scope.selectId);
          });
        });
        input.on('input', function() {
          var value = input.val();
          if (value.length && $attrs.onSearch) {
            $scope.$apply(function() {
              $scope.$parent.$eval($attrs.onSearch, {$query: input.val()});
            });
          }
        });
        input.on('keypress', function(e) {
          if (e.keyCode === Constants.KEY_CODE.ENTER && $scope.results.length) {
            var value = $scope.results[0][$scope._valueField];
            ngModelCtrl.$setViewValue(value);
            ngModelCtrl.$render();
            renderValue(value);
            menus.close($scope.selectId);
            input[0].blur();
          }
        });
        function renderValue(value) {
          if (angular.isDefined(value) && $scope.results && $scope.results.length) {
            var result = $scope.results.filter(function(option) {
              if ((angular.isObject(option) && option[$scope._valueField] === value) || option === value) {
                return true;
              }
            })[0] || null;
            $scope.label = angular.isObject(result) && result[$scope._labelField] || result;
          } else {
            $scope.label = null;
          }
          return value;
        }
        if (ngModelCtrl) {
          ngModelCtrl.$formatters.push(renderValue);
        }
      };
    }
  };
}]);
