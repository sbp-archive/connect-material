System.register(["../components", "angular", "../../services/config/config", "../../services/dialog/dialog"], function($__export) {
  "use strict";
  var materialComponents,
      angular;
  return {
    setters: [function(m) {
      materialComponents = m.materialComponents;
    }, function(m) {
      angular = m.default;
    }, function(m) {}, function(m) {}],
    execute: function() {
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
    }
  };
});
