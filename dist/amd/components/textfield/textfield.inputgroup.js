define(['../components'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var materialComponents = $__0.materialComponents;
  materialComponents.directive('materialInputGroup', [function() {
    return {
      restrict: 'CE',
      controller: ['$element', function($element) {
        this.setFocused = function(isFocused) {
          $element.toggleClass('material-input-focused', !!isFocused);
        };
        this.setHasValue = function(hasValue) {
          $element.toggleClass('material-input-has-value', hasValue);
        };
      }]
    };
  }]);
  return {};
});
