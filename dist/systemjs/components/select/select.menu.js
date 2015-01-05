System.register(["../components", "angular", "../../services/config/config", "../menu/menu", "../item/item"], function($__export) {
  "use strict";
  var materialComponents,
      angular,
      ID_GENERATOR,
      defaultSelectConfig;
  return {
    setters: [function(m) {
      materialComponents = m.materialComponents;
    }, function(m) {
      angular = m.default;
    }, function(m) {}, function(m) {}, function(m) {}],
    execute: function() {
      ID_GENERATOR = 1;
      defaultSelectConfig = $__export("defaultSelectConfig", {
        valueField: 'value',
        labelField: 'label',
        emptyText: '',
        menuCls: ''
      });
      materialComponents.directive('materialSelect', ['materialConfigService', 'materialMenuService', function(configs, menus) {
        return {
          restrict: 'EA',
          scope: {
            options: '=options',
            selectId: '@'
          },
          require: '^ngModel',
          template: ['<material-menu class="material-select-menu {{_menuCls}}" menu-id="{{selectId}}" menu-config="_menuConfig">', '<material-item ', 'ng-if="options" ', 'ng-repeat="option in options | materialSelectSort:selected" ', 'ng-click="select(option[_valueField] || option)">', '{{option[_labelField] || option}}', '</material-item>', '<material-item ng-if="!options.length && _emptyText.length">{{_emptyText}}</material-item>', '</material-menu>'].join(''),
          compile: function($element, $attrs) {
            if (angular.isUndefined($attrs.selectId)) {
              $attrs.selectId = 'material-select-' + ID_GENERATOR++;
            }
            if (angular.isUndefined($attrs.options)) {
              console.warn('You defined a select without binding options to it...');
              $attrs.options = [];
            }
            return function($scope, $element, $attrs, ngModelCtrl) {
              var menu = menus.get($attrs.selectId);
              configs.applyConfigs($scope, $attrs.selectConfig, defaultSelectConfig);
              configs.bridgeConfigs($scope, $attrs, 'menuConfig');
              $scope.$watch('options', function() {
                ngModelCtrl.$render();
              }, true);
              menu.on('beforeopen', function() {
                menu.element.css('width', $element[0].clientWidth + 'px');
              });
              ngModelCtrl.$render = function() {
                var value = ngModelCtrl.$modelValue,
                    options = $scope.options,
                    ln = options && options.length,
                    isValid = false,
                    i,
                    option;
                for (i = 0; i < ln; i++) {
                  option = options[i];
                  if ((angular.isObject(option) && option[$scope._valueField] === value) || option === value) {
                    isValid = true;
                    break;
                  }
                }
                $scope.selected = isValid ? option : null;
                ngModelCtrl.$setValidity('select', isValid);
              };
              $scope.select = function(value) {
                ngModelCtrl.$setViewValue(value);
                ngModelCtrl.$render();
                menu.close();
              };
            };
          }
        };
      }]);
      materialComponents.filter('materialSelectSort', function() {
        return function(options, selected) {
          if (angular.isUndefined(selected) || selected === null) {
            return options;
          }
          var results = options.slice();
          results.splice(options.indexOf(selected), 1);
          results.unshift(selected);
          return results;
        };
      });
    }
  };
});
