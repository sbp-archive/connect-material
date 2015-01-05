"use strict";
var $___46__46__47_components__,
    $__angular__,
    $___46__46__47__46__46__47_services_47_config_47_config__,
    $___46__46__47__46__46__47_services_47_dialog_47_dialog__;
var materialComponents = ($___46__46__47_components__ = require("../components"), $___46__46__47_components__ && $___46__46__47_components__.__esModule && $___46__46__47_components__ || {default: $___46__46__47_components__}).materialComponents;
var angular = ($__angular__ = require("angular"), $__angular__ && $__angular__.__esModule && $__angular__ || {default: $__angular__}).default;
($___46__46__47__46__46__47_services_47_config_47_config__ = require("../../services/config/config"), $___46__46__47__46__46__47_services_47_config_47_config__ && $___46__46__47__46__46__47_services_47_config_47_config__.__esModule && $___46__46__47__46__46__47_services_47_config_47_config__ || {default: $___46__46__47__46__46__47_services_47_config_47_config__});
($___46__46__47__46__46__47_services_47_dialog_47_dialog__ = require("../../services/dialog/dialog"), $___46__46__47__46__46__47_services_47_dialog_47_dialog__ && $___46__46__47__46__46__47_services_47_dialog_47_dialog__.__esModule && $___46__46__47__46__46__47_services_47_dialog_47_dialog__ || {default: $___46__46__47__46__46__47_services_47_dialog_47_dialog__});
materialComponents.directive('materialDialog', ['$animate', 'materialConfigService', 'materialDialogService', function($animate, configs, dialogs) {
  var ID_GENERATOR = 1;
  return {
    restrict: 'EA',
    scope: {dialogId: '@'},
    transclude: true,
    replace: true,
    template: ['<div class="material-dialog-wrap">', '<div ', 'ng-if="_modal" ', 'class="material-backdrop" ', 'ng-class="{\'material-opened\':_dialog.opened}" ', 'ng-click="onBackdropClick($event)" ', 'backdrop-for-dialog="{{dialogId}}">', '</div>', '<div class="material-dialog" ng-transclude></div>', '</div>'].join(''),
    compile: function($element, $attrs) {
      if (angular.isUndefined($attrs.dialogId)) {
        $attrs.dialogId = 'material-dialog-' + ID_GENERATOR++;
        $element.attr('dialog-id', $attrs.dialogId);
      }
      return function($scope, $element, $attrs) {
        var id = $attrs.dialogId,
            originalParent = $element.parent(),
            innerDialogEl = $element[0].querySelector('.material-dialog'),
            dialog = $scope._dialog = dialogs.create(id, innerDialogEl);
        configs.applyConfigs($scope, $attrs.dialogConfig, {
          modal: true,
          appendToBody: true,
          closeOnBackdropClick: false
        });
        dialog.on('beforeopen', function() {
          $element.addClass('material-opened');
        });
        dialog.on('close', function() {
          $element.removeClass('material-opened');
        });
        if (dialog.deferred.open) {
          dialog.open();
        }
        $scope.onBackdropClick = function(e) {
          if ($scope._closeOnBackdropClick) {
            e.stopPropagation();
            dialog.close();
          }
        };
        $scope.$watch('_appendToBody', function(value, oldValue) {
          if (!value) {
            if (value !== oldValue) {
              originalParent.append($element);
            }
          } else {
            angular.element(document.body).append($element);
          }
        });
        $scope.$on('$destroy', function() {
          dialogs.remove(id);
        });
      };
    }
  };
}]);
