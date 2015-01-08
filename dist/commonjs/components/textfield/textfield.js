"use strict";
var $___46__46__47_components__,
    $__angular__,
    $__textfield_46_inputgroup__,
    $__textfield_46_input__,
    $__textfield_46_textarea__;
var materialComponents = ($___46__46__47_components__ = require("../components"), $___46__46__47_components__ && $___46__46__47_components__.__esModule && $___46__46__47_components__ || {default: $___46__46__47_components__}).materialComponents;
var angular = ($__angular__ = require("angular"), $__angular__ && $__angular__.__esModule && $__angular__ || {default: $__angular__}).default;
($__textfield_46_inputgroup__ = require("./textfield.inputgroup"), $__textfield_46_inputgroup__ && $__textfield_46_inputgroup__.__esModule && $__textfield_46_inputgroup__ || {default: $__textfield_46_inputgroup__});
($__textfield_46_input__ = require("./textfield.input"), $__textfield_46_input__ && $__textfield_46_input__.__esModule && $__textfield_46_input__ || {default: $__textfield_46_input__});
($__textfield_46_textarea__ = require("./textfield.textarea"), $__textfield_46_textarea__ && $__textfield_46_textarea__.__esModule && $__textfield_46_textarea__ || {default: $__textfield_46_textarea__});
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
