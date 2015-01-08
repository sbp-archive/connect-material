define(['../components', 'angular', './textfield.inputgroup', './textfield.input', './textfield.textarea'], function($__0,$__2,$__4,$__5,$__6) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  if (!$__5 || !$__5.__esModule)
    $__5 = {default: $__5};
  if (!$__6 || !$__6.__esModule)
    $__6 = {default: $__6};
  var materialComponents = $__0.materialComponents;
  var angular = $__2.default;
  $__4;
  $__5;
  $__6;
  var FIELD_ID_COUNTER = 1;
  materialComponents.directive('materialTextfield', ['$parse', function($parse) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        fid: '@?fieldId',
        label: '@?',
        value: '=ngModel',
        ngChange: '&'
      },
      compile: function(element, attr) {
        if (angular.isUndefined(attr.fieldId)) {
          attr.fieldId = 'textfield-' + FIELD_ID_COUNTER++;
        }
        return {pre: function($scope, $element, $attrs) {
            var disabledParsed = $parse($attrs.ngDisabled);
            $scope.isDisabled = function() {
              return disabledParsed($scope.$parent);
            };
            $scope.getTabIndex = function() {
              return !$scope.isDisabled() ? $attrs.tabindex : -1;
            };
            $scope.inputType = $attrs.type || 'text';
            $scope.required = angular.isDefined($attrs.required);
          }};
      },
      template: ['<material-input-group>', '   <label for="{{fid}}" >{{label}}</label>', '   <input material-input id="{{fid}}" ng-disabled="isDisabled()" ng-model="value" ng-change="ngChange()" type="{{inputType}}" ng-required="{{required}}" />', '</material-input-group>'].join('')
    };
  }]);
  return {};
});
