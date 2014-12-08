define([
    '../material',
    'angular',
    '../menu/menu',
    '../textfield/textfield'
], function (material, ng) {
    'use strict';

    material.directive('materialSelectfield', [
        'materialConfigService',
        'materialMenuService',
        function (configs, menus) {
            var ID_GENERATOR = 1;

            return {
                restrict: 'EA',
                scope : {
                    selectId: '@?',
                    fieldLabel : '@?label',
                    value: '=ngModel',
                    options: '=options'
                },
                require: '?ngModel',
                template: [
                    '<material-textfield ng-model="label" label="{{fieldLabel}}" ng-click="openSelect($event)" field-config="_fieldConfig"></material-textfield>',
                    '<material-select select-id="{{selectId}}" menu-config="_menuConfig" ng-model="value" options="options"></material-select>'
                ].join(''),

                compile: function ($element, $attrs) {
                    if (ng.isUndefined($attrs.selectId)) {
                        $attrs.selectId = 'material-selectfield-' + ID_GENERATOR++;
                        $element.attr('select-id', $attrs.selectId);
                    }

                    if (ng.isUndefined($attrs.options)) {
                        console.warn('You defined a selectfield without binding options to it');
                        $attrs.options = [];
                    }

                    return function ($scope, $element, $attrs, ngModelCtrl) {
                        configs.bridgeConfigs($scope, $attrs, 'menuConfig');
                        configs.bridgeConfigs($scope, $attrs, 'fieldConfig');

                        $scope.$watch('options', function(options) {   
                            renderValue($scope.value);                       
                        }, true);

                        function renderValue(value) {
                            if (ng.isDefined(value) && $scope.options && $scope.options.length) {
                                var result = $scope.options.filter(function (option) {
                                    if ((ng.isObject(option) && option.value == value) || option == value) {
                                        return true;
                                    }
                                })[0] || null;
                                $scope.label = ng.isObject(result) && result.label || result;
                            }
                            else {
                                $scope.label = null;
                            }

                            return value;                            
                        }

                        if (ngModelCtrl) {
                            //Add a $formatter so we don't use up the render function
                            ngModelCtrl.$formatters.push(renderValue);
                        }

                        $scope.openSelect = function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                            menus.open($scope.selectId);
                        };
                    }
                }
            };
        }
    ]);

    material.directive('materialSelect', [
        'materialConfigService',
        'materialMenuService',
        function (configs, menus) {
            var ID_GENERATOR = 1;

            return {
                restrict: 'EA',
                scope : {
                    options: '=options',
                    selectId: '@'
                },
                require: '^ngModel',
                template: [
                    '<material-menu menu-id="{{selectId}}" menu-config="_menuConfig">',
                        '<material-item ',
                            'ng-if="options" ',
                            'ng-repeat="option in options | materialSelectSort:selected" ',
                            'ng-click="select(option.value || option)">',
                                '{{option.label || option}}',
                        '</material-item>',
                    '</material-menu>'
                ].join(''),

                compile: function ($element, $attrs) {
                    if (ng.isUndefined($attrs.selectId)) {
                        $attrs.selectId = 'material-select-' + ID_GENERATOR++;
                    }

                    if (ng.isUndefined($attrs.options)) {
                        console.warn('You defined a select without binding options to it...');
                        $attrs.options = [];
                    }

                    return function ($scope, $element, $attrs, ngModelCtrl) {
                        configs.bridgeConfigs($scope, $attrs, 'menuConfig');

                        $scope.$watch('options', function(value, oldValue) {
                            ngModelCtrl.$render();
                        }, true);

                        ngModelCtrl.$render = function () {
                            var value = ngModelCtrl.$modelValue,
                                options = $scope.options,
                                ln = options && options.length,
                                isValid = false,
                                i, option;

                            for (i = 0; i < ln; i++) {
                                option = options[i];
                                if ((ng.isObject(option) && option.value == value) || option == value) {
                                    isValid = true;
                                    break;
                                }
                            }

                            $scope.selected = isValid ? option : null;
                            ngModelCtrl.$setValidity('select', isValid);
                        }

                        $scope.select = function (value) {
                            ngModelCtrl.$setViewValue(value);
                            ngModelCtrl.$render();
                            menus.close($scope.selectId);
                        }
                    };
                }                
            };
        }
    ]);

    material.filter('materialSelectSort', function () {
        return function (options, selected) {
            if (ng.isUndefined(selected) || selected === null) {
                return options;
            }

            var results = options.slice();
            results.splice(options.indexOf(selected), 1);
            results.unshift(selected);
            return results;
        };
    });
});