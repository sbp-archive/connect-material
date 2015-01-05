define(['../components', 'angular', '../../services/config/config', '../button/button', '../dialog/dialog', './pickers.datepicker'], function($__0,$__2,$__4,$__5,$__6,$__7) {
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
  if (!$__7 || !$__7.__esModule)
    $__7 = {default: $__7};
  var materialComponents = $__0.materialComponents;
  var angular = $__2.default;
  $__4;
  $__5;
  $__6;
  $__7;
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
  return {};
});
