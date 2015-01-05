System.register(["../components", "angular"], function($__export) {
  "use strict";
  var materialComponents,
      angular;
  return {
    setters: [function(m) {
      materialComponents = m.materialComponents;
    }, function(m) {
      angular = m.default;
    }],
    execute: function() {
      materialComponents.directive('materialIcon', function() {
        return function(scope, element, attrs) {
          if (angular.isDefined(attrs.materialIcon)) {
            var parts = attrs.materialIcon.split(':'),
                iconCls = 'icon-' + parts[0];
            iconCls += ' ' + iconCls + '-ic_' + parts[1] + '_24dp';
            element.prepend('<div class="material-icon ' + iconCls + '"></div>');
            element.addClass('material-has-icon');
          }
        };
      });
    }
  };
});
