"use strict";
Object.defineProperties(exports, {
  defaultSelectConfig: {get: function() {
      return defaultSelectConfig;
    }},
  __esModule: {value: true}
});
var $___46__46__47_components__,
    $__angular__,
    $___46__46__47__46__46__47_services_47_config_47_config__,
    $___46__46__47_menu_47_menu__,
    $___46__46__47_item_47_item__;
var materialComponents = ($___46__46__47_components__ = require("../components"), $___46__46__47_components__ && $___46__46__47_components__.__esModule && $___46__46__47_components__ || {default: $___46__46__47_components__}).materialComponents;
var angular = ($__angular__ = require("angular"), $__angular__ && $__angular__.__esModule && $__angular__ || {default: $__angular__}).default;
($___46__46__47__46__46__47_services_47_config_47_config__ = require("../../services/config/config"), $___46__46__47__46__46__47_services_47_config_47_config__ && $___46__46__47__46__46__47_services_47_config_47_config__.__esModule && $___46__46__47__46__46__47_services_47_config_47_config__ || {default: $___46__46__47__46__46__47_services_47_config_47_config__});
($___46__46__47_menu_47_menu__ = require("../menu/menu"), $___46__46__47_menu_47_menu__ && $___46__46__47_menu_47_menu__.__esModule && $___46__46__47_menu_47_menu__ || {default: $___46__46__47_menu_47_menu__});
($___46__46__47_item_47_item__ = require("../item/item"), $___46__46__47_item_47_item__ && $___46__46__47_item_47_item__.__esModule && $___46__46__47_item_47_item__ || {default: $___46__46__47_item_47_item__});
var ID_GENERATOR = 1;
var defaultSelectConfig = {
  valueField: 'value',
  labelField: 'label',
  emptyText: '',
  menuCls: '',
  autoAdjust: true
};
materialComponents.directive('materialSelect', ['materialConfigService', 'materialMenuService', function(configs, menus) {
  return {
    restrict: 'EA',
    scope: {
      options: '=options',
      selectId: '@'
    },
    require: '^ngModel',
    template: ['<material-menu class="material-select-menu {{_menuCls}}" menu-id="{{selectId}}" menu-config="_menuConfig">', '<material-item ', 'data-index="{{$index}}" ', 'ng-if="options" ', 'ng-repeat="option in options" ', 'ng-class="{selected:option === selected}" ', 'ng-click="select(option[_valueField] || option)">', '{{option[_labelField] || option}}', '</material-item>', '<material-item ng-if="!options.length && _emptyText.length">{{_emptyText}}</material-item>', '</material-menu>'].join(''),
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
        configs.bridgeConfigs($scope, $attrs, 'menuConfig', {
          autoAdjust: false,
          autoPosition: false,
          appendToBody: true
        });
        $scope.$watch('options', function() {
          ngModelCtrl.$render();
        }, true);
        function getSelectedOptionIndex() {
          return $scope.selected ? $scope.options.indexOf($scope.selected) : -1;
        }
        function getSelectedOptionEl() {
          var menuEl = menu.element;
          var selectedIndex = getSelectedOptionIndex();
          return (selectedIndex !== -1) ? menuEl[0].querySelector('material-item[data-index="' + selectedIndex + '"]') : null;
        }
        function selectValue(value) {
          ngModelCtrl.$setViewValue(value);
          ngModelCtrl.$render();
          getSelectedOptionEl().scrollIntoView(false);
        }
        menu.on('beforeopen', function() {
          var menuEl = menu.element;
          var containerRect = $element[0].getBoundingClientRect();
          var topPosition = containerRect.top;
          if ($scope._autoAdjust) {
            var innerMenuHeight = menuEl[0].scrollHeight;
            var maxHeight = document.documentElement.clientHeight - 20;
            var selectedOptionEl = getSelectedOptionEl();
            if (innerMenuHeight > maxHeight) {
              menuEl.css('height', maxHeight + 'px');
              topPosition = 10;
              if (selectedOptionEl) {
                menuEl[0].scrollTop = selectedOptionEl.offsetTop - containerRect.top;
              } else {
                menuEl[0].scrollTop = 0;
              }
            } else if (selectedOptionEl) {
              topPosition -= selectedOptionEl.offsetTop;
            }
          }
          menuEl.css({
            width: $element[0].clientWidth + 'px',
            top: topPosition + 'px',
            right: (document.documentElement.clientWidth - containerRect.right) + 'px'
          });
        });
        menu.on('selectnext', function() {
          var option = $scope.options[getSelectedOptionIndex() + 1];
          if (!option) {
            option = $scope.options[0];
          }
          selectValue((angular.isObject(option) && option[$scope._valueField]) || option);
        });
        menu.on('selectprev', function() {
          var option = $scope.options[getSelectedOptionIndex() - 1];
          if (!option) {
            option = $scope.options[$scope.options.length - 1];
          }
          selectValue((angular.isObject(option) && option[$scope._valueField]) || option);
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
          selectValue(value);
          menu.close();
        };
      };
    }
  };
}]);
