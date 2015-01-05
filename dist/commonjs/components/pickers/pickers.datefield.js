"use strict";
var $___46__46__47_components__,
    $__angular__,
    $___46__46__47__46__46__47_services_47_config_47_config__,
    $___46__46__47_button_47_button__,
    $___46__46__47_textfield_47_textfield__,
    $___46__46__47_menu_47_menu__,
    $__pickers_46_datepicker__;
var materialComponents = ($___46__46__47_components__ = require("../components"), $___46__46__47_components__ && $___46__46__47_components__.__esModule && $___46__46__47_components__ || {default: $___46__46__47_components__}).materialComponents;
var angular = ($__angular__ = require("angular"), $__angular__ && $__angular__.__esModule && $__angular__ || {default: $__angular__}).default;
($___46__46__47__46__46__47_services_47_config_47_config__ = require("../../services/config/config"), $___46__46__47__46__46__47_services_47_config_47_config__ && $___46__46__47__46__46__47_services_47_config_47_config__.__esModule && $___46__46__47__46__46__47_services_47_config_47_config__ || {default: $___46__46__47__46__46__47_services_47_config_47_config__});
($___46__46__47_button_47_button__ = require("../button/button"), $___46__46__47_button_47_button__ && $___46__46__47_button_47_button__.__esModule && $___46__46__47_button_47_button__ || {default: $___46__46__47_button_47_button__});
($___46__46__47_textfield_47_textfield__ = require("../textfield/textfield"), $___46__46__47_textfield_47_textfield__ && $___46__46__47_textfield_47_textfield__.__esModule && $___46__46__47_textfield_47_textfield__ || {default: $___46__46__47_textfield_47_textfield__});
($___46__46__47_menu_47_menu__ = require("../menu/menu"), $___46__46__47_menu_47_menu__ && $___46__46__47_menu_47_menu__.__esModule && $___46__46__47_menu_47_menu__ || {default: $___46__46__47_menu_47_menu__});
($__pickers_46_datepicker__ = require("./pickers.datepicker"), $__pickers_46_datepicker__ && $__pickers_46_datepicker__.__esModule && $__pickers_46_datepicker__ || {default: $__pickers_46_datepicker__});
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
