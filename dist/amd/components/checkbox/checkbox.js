define(['angular', '../components', '../../services/config/config', '../../utils/constant/constant'], function($__0,$__2,$__4,$__5) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  if (!$__5 || !$__5.__esModule)
    $__5 = {default: $__5};
  var angular = $__0.default;
  var materialComponents = $__2.materialComponents;
  $__4;
  $__5;
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
  return {};
});
