System.register(["../components", "angular", "./textfield.textarea", "./textfield.inputgroup", "./textfield.input"], function($__export) {
  "use strict";
  var materialComponents,
      angular,
      FIELD_ID_COUNTER;
  return {
    setters: [function(m) {
      materialComponents = m.materialComponents;
    }, function(m) {
      angular = m.default;
    }, function(m) {}, function(m) {}, function(m) {}],
    execute: function() {
      FIELD_ID_COUNTER = 1;
      materialComponents.directive('materialTextarea', ['$parse', function($parse) {
        return {
          restrict: 'EA',
          replace: true,
          scope: {
            fid: '@?fieldId',
            label: '@?',
            value: '=ngModel'
          },
          compile: function(element, attr) {
            if (angular.isUndefined(attr.fieldId)) {
              attr.fieldId = 'textarea-' + FIELD_ID_COUNTER++;
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
          template: ['<material-input-group>', '   <label for="{{fid}}" >{{label}}</label>', '   <textarea material-input id="{{fid}}" ng-disabled="isDisabled()" ng-model="value" type="{{inputType}}" ng-required="{{required}}"></textarea>', '</material-input-group>'].join('')
        };
      }]);
    }
  };
});
