import {materialComponents} from '../components';
import angular from 'angular';

import './textfield.textarea';
import './textfield.inputgroup';
import './textfield.input';

var FIELD_ID_COUNTER = 1;

materialComponents.directive('materialTextarea', [
    '$parse',
    function ($parse) {
        return {
            restrict: 'EA',
            replace: true,
            scope : {
                fid : '@?fieldId',
                label : '@?',
                value : '=ngModel',
                ngChange : '&'
            },
            compile : function (element, attr) {
                if (angular.isUndefined(attr.fieldId)) {
                    attr.fieldId = 'textarea-' + FIELD_ID_COUNTER++;
                }

                return {
                    pre: function ($scope, $element, $attrs) {
                        var disabledParsed = $parse($attrs.ngDisabled);
                        $scope.isDisabled = function () {
                            return disabledParsed($scope.$parent);
                        };
                        $scope.getTabIndex = function () {
                            return !$scope.isDisabled() ? $attrs.tabindex : -1;
                        };
                        $scope.inputType = $attrs.type || 'text';
                        $scope.required = angular.isDefined($attrs.required);
                    }
                };
            },
            template: [
                '<material-input-group>',
                '   <label for="{{fid}}" >{{label}}</label>',
                '   <textarea material-input id="{{fid}}" ng-disabled="isDisabled()" ng-change="ngChange()" ng-model="value" type="{{inputType}}" ng-required="{{required}}"></textarea>',
                '</material-input-group>'
            ].join('')
        };
    }
]);
