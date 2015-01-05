"use strict";
var $___46__46__47_components__,
    $__angular__;
var materialComponents = ($___46__46__47_components__ = require("../components"), $___46__46__47_components__ && $___46__46__47_components__.__esModule && $___46__46__47_components__ || {default: $___46__46__47_components__}).materialComponents;
var angular = ($__angular__ = require("angular"), $__angular__ && $__angular__.__esModule && $__angular__ || {default: $__angular__}).default;
materialComponents.directive('materialInput', ['$parse', function() {
  return {
    restrict: 'A',
    replace: true,
    require: ['^?materialInputGroup', '?ngModel'],
    link: function(scope, element, attr, ctrls) {
      if (!ctrls[0]) {
        return;
      }
      var inputGroupCtrl = ctrls[0];
      var ngModelCtrl = ctrls[1];
      scope.$watch(scope.isDisabled, function(isDisabled) {
        element.attr('aria-disabled', !!isDisabled);
      });
      scope.$watch(scope.getTabIndex, function(tabindex) {
        element.attr('tabindex', tabindex);
      });
      element.attr('type', attr.type || element.parent().attr('type') || 'text');
      if (ngModelCtrl) {
        ngModelCtrl.$formatters.push(function(value) {
          inputGroupCtrl.setHasValue(isNotEmpty(value));
          return value;
        });
      }
      element.on('input', function() {
        inputGroupCtrl.setHasValue(isNotEmpty());
      }).on('focus', function() {
        inputGroupCtrl.setFocused(true);
      }).on('blur', function() {
        inputGroupCtrl.setFocused(false);
        inputGroupCtrl.setHasValue(isNotEmpty());
      });
      scope.$on('$destroy', function() {
        inputGroupCtrl.setFocused(false);
        inputGroupCtrl.setHasValue(false);
      });
      function isNotEmpty(value) {
        value = angular.isUndefined(value) ? element.val() : value;
        return (angular.isDefined(value) && (value !== null) && (value.toString().trim() !== ''));
      }
    }
  };
}]);
