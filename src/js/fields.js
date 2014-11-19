define([
    './directive',
    'angular',
], function (directive, ng) {
    'use strict';

    var FIELD_ID_COUNTER = 0;

    directive('textField', [
        '$parse'
    ], function ($parse) {
        return {
            restrict: 'EA',
            replace: true,
            scope : {
                fid : '@?fieldId',
                label : '@?',
                value : '=ngModel'
            },
            compile : function(element, attr) {
                if (ng.isUndefined(attr.fieldId)) {
                    attr.fieldId = 'field-' + ++FIELD_ID_COUNTER;
                }

                return function(scope, element, attrs) {
                    var disabledParsed = $parse(attrs.ngDisabled);
                    scope.isDisabled = function() {
                        return disabledParsed(scope.$parent);
                    };

                    scope.inputType = attrs.type || "text";
                };
            },
            template: [
                '<material-input-group>',
                '   <label for="{{fid}}" >{{label}}</label>',
                '   <material-input id="{{fid}}" ng-disabled="isDisabled()" ng-model="value" type="{{inputType}}"></material-input>',
                '</material-input-group>'
            ].join('')
        };
    });

    directive('inputGroup', [
        '$parse'
    ], function ($parse) {
        return {
            restrict: 'CE',
            controller: ['$element', function($element) {
                this.setFocused = function(isFocused) {
                    $element.toggleClass('material-input-focused', !!isFocused);
                };                
                this.setHasValue = function(hasValue) {
                    $element.toggleClass('material-input-has-value', hasValue);
                };
            }]
        };
    });

    directive('input', [
        '$parse'
    ], function ($parse) {
        return {
            restrict: 'E',
            replace: true,
            template: '<input >',
            require: [
                '^?materialInputGroup', '?ngModel'
            ],
            link: function(scope, element, attr, ctrls) {
                if (!ctrls[0]) {
                    return;
                }

                var inputGroupCtrl = ctrls[0];
                var ngModelCtrl = ctrls[1];

                scope.$watch(scope.isDisabled, function(isDisabled) {
                    element.attr('aria-disabled', !!isDisabled);
                    element.attr('tabindex', !!isDisabled);
                });
                element.attr('type', attr.type || element.parent().attr('type') || "text");

                // When the input value changes, check if it "has" a value, and
                // set the appropriate class on the input group
                if (ngModelCtrl) {
                    //Add a $formatter so we don't use up the render function
                    ngModelCtrl.$formatters.push(function(value) {
                        inputGroupCtrl.setHasValue(isNotEmpty(value));
                        return value;
                    });
                }

                element
                    .on('input', function() {
                        inputGroupCtrl.setHasValue(isNotEmpty());
                    })
                    .on('focus', function(e) {
                        // When the input focuses, add the focused class to the group
                        inputGroupCtrl.setFocused(true);
                    })
                    .on('blur', function(e) {
                        // When the input blurs, remove the focused class from the group
                        inputGroupCtrl.setFocused(false);
                        inputGroupCtrl.setHasValue(isNotEmpty());
                    });

                scope.$on('$destroy', function() {
                    inputGroupCtrl.setFocused(false);
                    inputGroupCtrl.setHasValue(false);
                });

                function isNotEmpty(value) {
                    value = angular.isUndefined(value) ? element.val() : value;
                    return (angular.isDefined(value) && (value !== null) &&
                        (value.toString().trim() !== ""));
                }
            }
        };
    });
});