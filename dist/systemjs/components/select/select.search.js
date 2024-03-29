System.register(["../components", "angular", "../../services/config/config", "../../services/menu/menu", "../../utils/constant/constant", "../textfield/textfield", "./select.menu"], function($__export) {
  "use strict";
  var materialComponents,
      angular,
      defaultSelectConfig,
      ID_GENERATOR;
  return {
    setters: [function(m) {
      materialComponents = m.materialComponents;
    }, function(m) {
      angular = m.default;
    }, function(m) {}, function(m) {}, function(m) {}, function(m) {}, function(m) {
      defaultSelectConfig = m.defaultSelectConfig;
    }],
    execute: function() {
      ID_GENERATOR = 1;
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
              configs.bridgeConfigs($scope, $attrs, 'menuConfig', {autoAdjust: true});
              configs.bridgeConfigs($scope, $attrs, 'fieldConfig');
              configs.bridgeConfigs($scope, $attrs, 'selectConfig', {
                autoAdjust: false,
                emptyText: 'No results found...',
                menuCls: 'material-selectsearch-menu'
              });
              var input = angular.element($element[0].querySelector('input'));
              var hasRenderedValue = false;
              function selectInputText() {
                setTimeout(function() {
                  input[0].setSelectionRange(0, input.val().length);
                }, 0);
              }
              input.on('click', function(e) {
                e.stopPropagation();
              });
              input.on('focus', function(e) {
                e.preventDefault();
                selectInputText();
                $scope.$apply(function() {
                  menus.open($scope.selectId);
                });
              });
              input.on('input', function() {
                hasRenderedValue = false;
                if ($attrs.onSearch) {
                  $scope.$apply(function() {
                    $scope.$parent.$eval($attrs.onSearch, {$query: input.val()});
                  });
                }
              });
              input.on('keypress', function(e) {
                if (e.keyCode === Constants.KEY_CODE.ENTER) {
                  $scope.$evalAsync(function() {
                    if (!hasRenderedValue && $scope.results.length) {
                      var value = $scope.results[0][$scope._valueField];
                      menus.select($scope.selectId, value);
                    } else {
                      menus.close($scope.selectId);
                    }
                    input[0].blur();
                  });
                }
              });
              input.on('keydown', function(e) {
                if (e.keyCode === Constants.KEY_CODE.DOWN_ARROW) {
                  e.preventDefault();
                  $scope.$evalAsync(function() {
                    menus.selectNext($scope.selectId);
                    selectInputText();
                  });
                } else if (e.keyCode === Constants.KEY_CODE.UP_ARROW) {
                  e.preventDefault();
                  $scope.$evalAsync(function() {
                    menus.selectPrevious($scope.selectId);
                    selectInputText();
                  });
                }
              });
              function selectValue(value) {
                var result = $scope.results.filter(function(option) {
                  if ((angular.isObject(option) && option[$scope._valueField] === value) || option === value) {
                    return true;
                  }
                })[0] || null;
                $scope.label = angular.isObject(result) && result[$scope._labelField] || result;
              }
              function renderValue(value) {
                $scope.label = null;
                hasRenderedValue = false;
                if (angular.isDefined(value) && $scope.results && $scope.results.length) {
                  selectValue(value);
                  hasRenderedValue = true;
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
    }
  };
});
