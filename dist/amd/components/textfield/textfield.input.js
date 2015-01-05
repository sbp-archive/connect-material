define(['../components', 'angular'], function($__0,$__2) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  var materialComponents = $__0.materialComponents;
  var angular = $__2.default;
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
  return {};
});
