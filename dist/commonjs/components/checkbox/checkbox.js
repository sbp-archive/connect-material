"use strict";
var $__angular__,
    $___46__46__47_components__,
    $___46__46__47__46__46__47_services_47_config_47_config__,
    $___46__46__47__46__46__47_utils_47_constant_47_constant__;
var angular = ($__angular__ = require("angular"), $__angular__ && $__angular__.__esModule && $__angular__ || {default: $__angular__}).default;
var materialComponents = ($___46__46__47_components__ = require("../components"), $___46__46__47_components__ && $___46__46__47_components__.__esModule && $___46__46__47_components__ || {default: $___46__46__47_components__}).materialComponents;
($___46__46__47__46__46__47_services_47_config_47_config__ = require("../../services/config/config"), $___46__46__47__46__46__47_services_47_config_47_config__ && $___46__46__47__46__46__47_services_47_config_47_config__.__esModule && $___46__46__47__46__46__47_services_47_config_47_config__ || {default: $___46__46__47__46__46__47_services_47_config_47_config__});
($___46__46__47__46__46__47_utils_47_constant_47_constant__ = require("../../utils/constant/constant"), $___46__46__47__46__46__47_utils_47_constant_47_constant__ && $___46__46__47__46__46__47_utils_47_constant_47_constant__.__esModule && $___46__46__47__46__46__47_utils_47_constant_47_constant__ || {default: $___46__46__47__46__46__47_utils_47_constant_47_constant__});
materialComponents.directive('materialCheckbox', ['materialConstants', 'materialConfigService', function(constants, configs) {
  return {
    restrict: 'EA',
    transclude: true,
    scope: {},
    require: '?ngModel',
    template: ['<div class="material-checkbox-container">', '<div class="material-checkbox-icon"></div>', '</div>', '<div class="material-text" ng-transclude></div>'].join(''),
    compile: function($element, $attrs) {
      $attrs.type = 'checkbox';
      $element.attr('type', $attrs.type);
      $element.attr('role', $attrs.type);
      $element.attr('tabIndex', 0);
      return function($scope, $element, $attrs, ngModelCtrl) {
        var checked = false;
        configs.applyConfigs($scope, $attrs.checkboxConfig, {
          trueValue: true,
          falseValue: false
        });
        ngModelCtrl = ngModelCtrl || {$setViewValue: function(value) {
            this.$viewValue = value;
          }};
        if (!angular.isDefined($attrs.ngClick)) {
          $element.on('click', clickHandler);
          $element.on('keypress', keypressHandler);
        }
        function clickHandler(e) {
          if (!$element[0].hasAttribute('disabled')) {
            e.stopPropagation();
            $scope.$apply(function() {
              checked = !checked;
              var value = checked ? $scope._trueValue : $scope._falseValue;
              ngModelCtrl.$setViewValue(value, e && e.type);
              ngModelCtrl.$render();
            });
          }
        }
        function keypressHandler(e) {
          if (e.which === constants.KEY_CODE.SPACE) {
            e.preventDefault();
            clickHandler(e);
          }
        }
        ngModelCtrl.$render = function() {
          checked = ngModelCtrl.$viewValue;
          if (checked) {
            $element.addClass('material-checkbox-checked');
          } else {
            $element.removeClass('material-checkbox-checked');
          }
        };
      };
    }
  };
}]);
