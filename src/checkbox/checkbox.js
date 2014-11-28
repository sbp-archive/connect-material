define([
    '../material',
    'angular',
], function (material, ng) {
    'use strict';
    
    material.directive('materialCheckbox', [
        'materialConfigService',
        function(configs) {
            return {
                restrict: 'EA',
                transclude: true,
                scope: {},
                require: '?ngModel',
                template: [
                    '<div class="material-checkbox-container">',
                        '<div class="material-checkbox-icon"></div>',
                    '</div>',
                    '<div class="material-text" ng-transclude></div>',
                ].join(''),

                compile: function($element, $attrs) {
                    $attrs.type = 'checkbox';
                    $element.attr('type', $attrs.type);
                    $element.attr('tabIndex', 0);
                    $element.attr('role', $attrs.type);

                    return function($scope, $element, $attrs, ngModelCtrl) {
                        var checked = false;

                        configs.apply($scope, $attrs.checkboxConfig, {
                            trueValue: true,
                            falseValue: false
                        });

                        ngModelCtrl = ngModelCtrl || {
                            $setViewValue: function(value) {
                                this.$viewValue = value;
                            }
                        };

                        $element.on('click', clickHandler);
                        $element.on('keypress', keypressHandler);

                        function clickHandler(e) {
                            if (!$element[0].hasAttribute('disabled')) {
                                $scope.$apply(function() {
                                    checked = !checked;

                                    var value = checked ? $scope._trueValue : $scope._falseValue;
                                    ngModelCtrl.$setViewValue(value, e && e.type);
                                    ngModelCtrl.$render();
                                });
                            }
                        }

                        function keypressHandler(e) {
                            // When space is pressed trigger the handler as well
                            if (e.which == 32) {
                                e.preventDefault();
                                clickHandler(e);
                            }
                        }

                        ngModelCtrl.$render = function() {
                            checked = ngModelCtrl.$viewValue;
                            if (checked) {
                                $element.addClass('material-checkbox-checked');
                            } 
                            else {
                                $element.removeClass('material-checkbox-checked');
                            }
                        }
                    }
                }
            }
        }
    ]);
});