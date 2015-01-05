define(['../components', 'angular'], function($__0,$__2) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  var materialComponents = $__0.materialComponents;
  var angular = $__2.default;
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
  return {};
});
