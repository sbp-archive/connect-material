System.register(["../components", "angular", "./textfield.inputgroup", "./textfield.input", "./textfield.textarea"], function($__export) {
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
    }
  };
});
