define([
    '../material',
    'angular',
    '../textfield/textfield'
], function (material, ng) {
    'use strict';

    var FIELD_ID_COUNTER = 0;

    material.directive('materialSearchfield', [
        '$parse',
        function ($parse) {
            return {
                restrict: 'EA',
                scope : {
                    fid : '@?fieldId',
                    value : '=ngModel',
                    placeholder: '@'
                },
                require: '?ngModel',
                template: [
                    '<div class="{{getIconCls(\'search\')}}"></div>',
                    '<div class="{{getIconCls(\'clear\')}}" ng-click="clearField($event)"></div>',
                    '<input ng-model="value" id="{{fid}}" ng-disabled="isDisabled()" type="text" placeholder="{{placeholder}}"></input>',
                ].join(''),
                compile : function ($element, $attrs) {
                    if (ng.isUndefined($attrs.fieldId)) {
                        $attrs.fieldId = 'material-searchfield-' + ++FIELD_ID_COUNTER;
                        $element.attr('searchfield-id', $attrs.fieldId);
                    }

                    return {
                        pre: function ($scope, $element, $attrs) {
                            var disabledParsed = $parse($attrs.ngDisabled);
                            $scope.isDisabled = function () {
                                return disabledParsed($scope.$parent);
                            };           
                        },

                        post: function($scope, $element, $attrs, ngModelCtrl) {
                            var input = ng.element($element[0].querySelector('input'));

                            $scope.$watch($scope.isDisabled, function (isDisabled) {
                                input.attr('aria-disabled', !!isDisabled);
                                input.attr('tabindex', !!isDisabled);
                            });

                            $scope.clearField = function(e) {
                                ngModelCtrl.$setViewValue('');
                                ngModelCtrl.$render();
                                setHasValue(false);
                            }

                            $scope.getIconCls = function(type) {
                                var iconCls = 'material-searchfield-' + type + ' material-icon ',
                                    isBlank = $element.hasClass('material-searchfield-blank'),
                                    theme = (isBlank ? 'white' : 'black'),
                                    baseCls = 'icon-action-' + theme;

                                switch (type) {
                                    case 'search':
                                        iconCls += baseCls + ' ' + baseCls + '-ic_search_' +  theme + '_24dp';
                                    break;

                                    case 'clear':
                                        iconCls += baseCls + ' ' + baseCls + '-ic_highlight_remove_' +  theme + '_24dp';
                                    break;
                                }

                                return iconCls;
                            }

                            function setFocused (isFocused) {
                                $element.toggleClass('material-input-focused', !!isFocused);
                            }

                            function setHasValue(hasValue) {
                                $element.toggleClass('material-input-has-value', hasValue);
                            }

                            function isNotEmpty(value) {
                                value = ng.isUndefined(value) ? input.val() : value;
                                return (ng.isDefined(value) && (value !== null) &&
                                    (value.toString().trim() !== ""));
                            }

                            if (ngModelCtrl) {
                                ngModelCtrl.$formatters.push(function (value) {
                                    setHasValue(isNotEmpty(value));
                                    return value;
                                });
                            }

                            input
                                .on('input', function () {
                                    setHasValue(isNotEmpty());
                                })
                                .on('focus', function (e) {
                                    setFocused(true);
                                })
                                .on('blur', function (e) {
                                    setFocused(false);
                                    setHasValue(isNotEmpty());
                                });

                            $scope.$on('$destroy', function () {
                                setFocused(false);
                                setHasValue(false);
                            });
                        }
                    }
                }
            };
        }
    ]);
});