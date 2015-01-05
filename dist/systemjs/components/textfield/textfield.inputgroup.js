System.register(["../components"], function($__export) {
  "use strict";
  var materialComponents;
  return {
    setters: [function(m) {
      materialComponents = m.materialComponents;
    }],
    execute: function() {
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
    }
  };
});
