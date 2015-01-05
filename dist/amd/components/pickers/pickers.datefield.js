define(['../components', 'angular', '../../services/config/config', '../button/button', '../textfield/textfield', '../menu/menu', './pickers.datepicker'], function($__0,$__2,$__4,$__5,$__6,$__7,$__8) {
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
  if (!$__8 || !$__8.__esModule)
    $__8 = {default: $__8};
  var materialComponents = $__0.materialComponents;
  var angular = $__2.default;
  $__4;
  $__5;
  $__6;
  $__7;
  $__8;
  materialComponents.directive('materialDatefield', ['$parse', 'dateFilter', 'materialConfigService', 'materialMenuService', function($parse, dateFilter, configs, menus) {
    var ID_GENERATOR = 1;
    return {
      restrict: 'E',
      scope: {
        menuId: '@?',
        label: '@?',
        value: '=ngModel'
      },
      require: '?ngModel',
      template: ['<material-textfield tabindex="-1" ng-model="dateDisplay" ng-disabled="isDisabled()" label="{{label}}" field-config="_fieldConfig"></material-textfield>', '<div class="material-select-carret material-icon icon-navigation-black icon-navigation-black-ic_arrow_drop_down_black_24dp"></div>', '<div class="material-datefield-mask" ng-click="openPicker($event)"></div>', '<material-menu class="material-datepicker-menu" menu-id="{{menuId}}" menu-config="_menuConfig">', '<material-datepicker ng-model="value" datepicker-config="_datepickerConfig"></material-datepicker>', '</material-menu>'].join(''),
      compile: function($element, $attrs) {
        if (angular.isUndefined($attrs.menuId)) {
          $attrs.menuId = 'material-datefield-' + ID_GENERATOR++;
          $element.attr('menu-id', $attrs.menuId);
        }
        return function($scope, $element, $attrs, ngModelCtrl) {
          var menu = menus.get($attrs.menuId);
          configs.applyConfigs($scope, $attrs.datefieldConfig, {displayFormat: 'dd-MM-yyyy'});
          configs.bridgeConfigs($scope, $attrs, 'fieldConfig');
          configs.bridgeConfigs($scope, $attrs, 'menuConfig', {
            appendToBody: true,
            closeOnMenuClick: false,
            autoAdjust: false
          });
          configs.bridgeConfigs($scope, $attrs, 'datepickerConfig');
          var disabledParsed = $parse($attrs.ngDisabled);
          $scope.isDisabled = function() {
            return disabledParsed($scope.$parent);
          };
          $scope.openPicker = function(e) {
            if (!$scope.isDisabled()) {
              e.stopPropagation();
              menu.open();
            }
          };
          if (ngModelCtrl) {
            ngModelCtrl.$formatters.push(function(value) {
              if (value) {
                var date = new Date(value),
                    isValid = !isNaN(date);
                if (isValid) {
                  $scope.dateDisplay = dateFilter(date, $scope._displayFormat);
                } else {
                  console.error('Datefield directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
                }
                ngModelCtrl.$setValidity('date', isValid);
                return date;
              }
              return value;
            });
          }
          angular.element($element[0].querySelector('material-menu .material-datepicker-view')).on('click', function(e) {
            if (angular.element(e.target).hasClass('material-button-day')) {
              $scope.$apply(function() {
                menu.close();
              });
            }
          });
          menu.on('beforeopen', function() {
            var containerRect = $element[0].getBoundingClientRect(),
                innerMenuHeight = menu.element[0].scrollHeight,
                newTop = Math.max((containerRect.top - (innerMenuHeight / 2)), 10);
            menu.element.css({
              top: newTop + 'px',
              right: (document.documentElement.clientWidth - containerRect.right) + 'px'
            });
          });
          menu.on('close', function() {
            var style = menu.element[0].style;
            style.top = null;
            style.right = null;
          });
        };
      }
    };
  }]);
  return {};
});
