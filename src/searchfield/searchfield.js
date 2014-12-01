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
                    '<div class="material-searchfield-icon material-icon icon-action-white icon-action-white-ic_search_white_24dp"></div>',
                    '<div ng-click="clearField($event)" class="material-searchfield-clear material-icon icon-action-white icon-action-white-ic_highlight_remove_white_24dp"></div>',
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
                                e.stopPropagation();
                                input.val('');
                                setHasValue(false);
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