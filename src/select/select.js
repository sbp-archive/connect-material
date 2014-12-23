define([
    '../material',
    'angular',
    '../menu/menu',
    '../textfield/textfield'
], function (material, ng) {
    'use strict';

    var defaultSelectConfig = {
        valueField: 'value',
        labelField: 'label',
        emptyText: '',
        menuCls: ''
    };

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
                    '<material-textfield ng-model="label" label="{{fieldLabel}}" field-config="_fieldConfig"></material-textfield>',
                    '<div class="material-select-carret material-icon icon-navigation-black icon-navigation-black-ic_arrow_drop_down_black_24dp"></div>',
                    '<material-select ng-click="openSelect($event)" select-id="{{selectId}}" menu-config="_menuConfig" select-config="_selectConfig" ng-model="value" options="options"></material-select>'
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
                        configs.applyConfigs($scope, $attrs.selectConfig, defaultSelectConfig);

                        configs.bridgeConfigs($scope, $attrs, 'menuConfig', {
                            appendToBody: true
                        });

                        configs.bridgeConfigs($scope, $attrs, 'fieldConfig');
                        configs.bridgeConfigs($scope, $attrs, 'selectConfig');

                        $scope.$watch('options', function() {   
                            renderValue($scope.value);                       
                        }, true);

                        function renderValue(value) {
                            if (ng.isDefined(value) && $scope.options && $scope.options.length) {
                                var result = $scope.options.filter(function (option) {
                                    if ((ng.isObject(option) && option[$scope._valueField] == value) || option == value) {
                                        return true;
                                    }
                                })[0] || null;
                                $scope.label = ng.isObject(result) && result[$scope._labelField] || result;
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
                            menus.open($scope.selectId);
                        };
                    };
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
                    '<material-menu class="material-select-menu {{_menuCls}}" menu-id="{{selectId}}" menu-config="_menuConfig">',
                        '<material-item ',
                            'ng-if="options" ',
                            'ng-repeat="option in options | materialSelectSort:selected" ',
                            'ng-click="select(option[_valueField] || option)">',
                                '{{option[_labelField] || option}}',
                        '</material-item>',
                        '<material-item ng-if="!options.length && _emptyText.length">{{_emptyText}}</material-item>',
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
                        var menu = menus.get($attrs.selectId);

                        configs.applyConfigs($scope, $attrs.selectConfig, defaultSelectConfig);
                        configs.bridgeConfigs($scope, $attrs, 'menuConfig');

                        $scope.$watch('options', function() {
                            ngModelCtrl.$render();
                        }, true);

                        menu.on('beforeopen', function () {
                            menu.element.css('width', $element[0].clientWidth + 'px');
                        });

                        ngModelCtrl.$render = function () {
                            var value = ngModelCtrl.$modelValue,
                                options = $scope.options,
                                ln = options && options.length,
                                isValid = false,
                                i, option;

                            for (i = 0; i < ln; i++) {
                                option = options[i];
                                if ((ng.isObject(option) && option[$scope._valueField] === value) || option == value) {
                                    isValid = true;
                                    break;
                                }
                            }

                            $scope.selected = isValid ? option : null;
                            ngModelCtrl.$setValidity('select', isValid);
                        };

                        $scope.select = function (value) {
                            ngModelCtrl.$setViewValue(value);
                            ngModelCtrl.$render();
                            menu.close();
                        };
                    };
                }                
            };
        }
    ]);

    material.directive('materialSelectsearch', [
        'materialConfigService',
        'materialMenuService',
        'materialConstants',
        function (configs, menus, Constants) {
            var ID_GENERATOR = 1;

            return {
                restrict: 'EA',
                scope : {
                    selectId: '@?',
                    fieldLabel : '@?label',
                    value: '=ngModel',
                    results: '=results'
                },
                require: '?ngModel',
                template: [
                    '<material-textfield ng-model="label" label="{{fieldLabel}}" field-config="_fieldConfig"></material-textfield>',
                    '<div class="material-select-carret material-icon icon-navigation-black icon-navigation-black-ic_arrow_drop_down_black_24dp"></div>',
                    '<material-select select-id="{{selectId}}" menu-config="_menuConfig" select-config="_selectConfig" ng-model="value" options="results"></material-select>'
                ].join(''),

                compile: function ($element, $attrs) {
                    if (ng.isUndefined($attrs.selectId)) {
                        $attrs.selectId = 'material-selectsearch-' + ID_GENERATOR++;
                        $element.attr('select-id', $attrs.selectId);
                    }

                    if (ng.isUndefined($attrs.results)) {
                        $attrs.results = [];
                    }

                    return function ($scope, $element, $attrs, ngModelCtrl) {
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

                        var input = ng.element($element[0].querySelector('input'));

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
                                ngModelCtrl.$setViewValue();
                                ngModelCtrl.$render();
                                renderValue(value);
                                menus.close($scope.selectId);
                                input[0].blur();
                            }
                        });

                        function renderValue(value) {
                            if (ng.isDefined(value) && $scope.results && $scope.results.length) {
                                var result = $scope.results.filter(function (option) {
                                    if ((ng.isObject(option) && option[$scope._valueField] === value) || option == value) {
                                        return true;
                                    }
                                })[0] || null;

                                $scope.label = ng.isObject(result) && result[$scope._labelField] || result;
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