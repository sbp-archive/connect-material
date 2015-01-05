define(['../components', 'angular', '../../services/config/config', '../../services/menu/menu', '../textfield/textfield', './select.menu'], function($__0,$__2,$__4,$__5,$__6,$__7) {
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
  var defaultSelectConfig = $__7.defaultSelectConfig;
  var ID_GENERATOR = 1;
  materialComponents.directive('materialSelectsearch', ['materialConfigService', 'materialMenuService', 'materialConstants', function(configs, menus, Constants) {
    return {
      restrict: 'EA',
      scope: {
        selectId: '@?',
        fieldLabel: '@?label',
        value: '=ngModel',
        results: '=results'
      },
      require: '?ngModel',
      template: ['<material-textfield ng-model="label" label="{{fieldLabel}}" field-config="_fieldConfig"></material-textfield>', '<div class="material-select-carret material-icon icon-navigation-black icon-navigation-black-ic_arrow_drop_down_black_24dp"></div>', '<material-select select-id="{{selectId}}" menu-config="_menuConfig" select-config="_selectConfig" ng-model="value" options="results"></material-select>'].join(''),
      compile: function($element, $attrs) {
        if (angular.isUndefined($attrs.selectId)) {
          $attrs.selectId = 'material-selectsearch-' + ID_GENERATOR++;
          $element.attr('select-id', $attrs.selectId);
        }
        if (angular.isUndefined($attrs.results)) {
          $attrs.results = [];
        }
        return function($scope, $element, $attrs, ngModelCtrl) {
          configs.applyConfigs($scope, $attrs.selectConfig, defaultSelectConfig);
          configs.bridgeConfigs($scope, $attrs, 'menuConfig', {
            appendToBody: true,
            autoAdjust: false
          });
          configs.bridgeConfigs($scope, $attrs, 'fieldConfig');
          configs.bridgeConfigs($scope, $attrs, 'selectConfig', {
            emptyText: 'No results found...',
            menuCls: 'material-selectsearch-menu'
          });
          var input = angular.element($element[0].querySelector('input'));
          input.on('click', function(e) {
            e.stopPropagation();
          });
          input.on('focus', function() {
            input[0].setSelectionRange(0, input.val().length);
            $scope.$apply(function() {
              menus.open($scope.selectId);
            });
          });
          input.on('input', function() {
            var value = input.val();
            if (value.length && $attrs.onSearch) {
              $scope.$apply(function() {
                $scope.$parent.$eval($attrs.onSearch, {$query: input.val()});
              });
            }
          });
          input.on('keypress', function(e) {
            if (e.keyCode === Constants.KEY_CODE.ENTER && $scope.results.length) {
              var value = $scope.results[0][$scope._valueField];
              ngModelCtrl.$setViewValue(value);
              ngModelCtrl.$render();
              renderValue(value);
              menus.close($scope.selectId);
              input[0].blur();
            }
          });
          function renderValue(value) {
            if (angular.isDefined(value) && $scope.results && $scope.results.length) {
              var result = $scope.results.filter(function(option) {
                if ((angular.isObject(option) && option[$scope._valueField] === value) || option === value) {
                  return true;
                }
              })[0] || null;
              $scope.label = angular.isObject(result) && result[$scope._labelField] || result;
            } else {
              $scope.label = null;
            }
            return value;
          }
          if (ngModelCtrl) {
            ngModelCtrl.$formatters.push(renderValue);
          }
        };
      }
    };
  }]);
  return {};
});
