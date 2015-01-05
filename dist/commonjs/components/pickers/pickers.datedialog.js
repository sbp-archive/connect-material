"use strict";
var $___46__46__47_components__,
    $__angular__,
    $___46__46__47__46__46__47_services_47_config_47_config__,
    $___46__46__47_button_47_button__,
    $___46__46__47_dialog_47_dialog__,
    $__pickers_46_datepicker__;
var materialComponents = ($___46__46__47_components__ = require("../components"), $___46__46__47_components__ && $___46__46__47_components__.__esModule && $___46__46__47_components__ || {default: $___46__46__47_components__}).materialComponents;
var angular = ($__angular__ = require("angular"), $__angular__ && $__angular__.__esModule && $__angular__ || {default: $__angular__}).default;
($___46__46__47__46__46__47_services_47_config_47_config__ = require("../../services/config/config"), $___46__46__47__46__46__47_services_47_config_47_config__ && $___46__46__47__46__46__47_services_47_config_47_config__.__esModule && $___46__46__47__46__46__47_services_47_config_47_config__ || {default: $___46__46__47__46__46__47_services_47_config_47_config__});
($___46__46__47_button_47_button__ = require("../button/button"), $___46__46__47_button_47_button__ && $___46__46__47_button_47_button__.__esModule && $___46__46__47_button_47_button__ || {default: $___46__46__47_button_47_button__});
($___46__46__47_dialog_47_dialog__ = require("../dialog/dialog"), $___46__46__47_dialog_47_dialog__ && $___46__46__47_dialog_47_dialog__.__esModule && $___46__46__47_dialog_47_dialog__ || {default: $___46__46__47_dialog_47_dialog__});
($__pickers_46_datepicker__ = require("./pickers.datepicker"), $__pickers_46_datepicker__ && $__pickers_46_datepicker__.__esModule && $__pickers_46_datepicker__ || {default: $__pickers_46_datepicker__});
materialComponents.directive('materialDatepickerDialog', ['$parse', '$compile', 'materialConfigService', 'materialDialogService', function($parse, $compile, configs, dialogs) {
  var ID_GENERATOR = 1;
  return {
    restrict: 'EA',
    require: '?^ngModel',
    scope: {dialogId: '@'},
    template: ['<material-dialog dialog-id="{{dialogId}}" dialog-config="_dialogConfig">', '<material-datepicker ng-model="data.date" datepicker-config="_datepickerConfig"></material-datepicker>', '<material-buttonbar>', '<material-button ng-click="cancelDate()">Cancel</material-button>', '<material-button ng-click="commitDate()" class="material-primary">Done</material-button>', '</material-buttonbar>', '</material-dialog>'].join(''),
    compile: function($element, $attrs) {
      if (angular.isUndefined($attrs.dialogId)) {
        $attrs.dialogId = 'material-datepickerdialog-' + ID_GENERATOR++;
        $element.attr('dialog-id', $attrs.dialogId);
      }
      return function($scope, $element, $attrs, ngModelCtrl) {
        configs.bridgeConfigs($scope, $attrs, 'dialogConfig');
        configs.bridgeConfigs($scope, $attrs, 'datepickerConfig');
        $scope.data = {date: new Date()};
        ngModelCtrl.$render = function() {
          $scope.data.date = angular.isDefined(ngModelCtrl.$modelValue) ? new Date(ngModelCtrl.$modelValue) : new Date();
        };
        $scope.cancelDate = function() {
          ngModelCtrl.$render();
          dialogs.close($scope.dialogId);
        };
        $scope.commitDate = function() {
          ngModelCtrl.$setViewValue($scope.data.date);
          ngModelCtrl.$render();
          dialogs.close($scope.dialogId);
        };
      };
    }
  };
}]);
