define([
    '../material',
    'angular'
], function (material, ng) {
    'use strict';
    material.constant('datepickerConfig', {
        startingDay: 0,
        yearRange: 20,
        minDate: new Date(),
        maxDate: null
    });

    material.controller('DatepickerCtrl', [
        '$scope',
        '$attrs',
        '$parse',
        'dateFilter',
        'datepickerConfig',
        function($scope, $attrs, $parse, dateFilter, datepickerConfig) {
            var self = this,
                ngModelCtrl = {$setViewValue: angular.noop};

            // Configuration attributes
            angular.forEach(['startingDay', 'yearRange'], function(key) {
              this[key] = angular.isDefined($attrs[key]) ? $scope.$parent.$eval($attrs[key]) : datepickerConfig[key];
            }.bind(this));

            angular.forEach(['minDate', 'maxDate'], function(key) {
                if ($attrs[key]) {
                    $scope.$parent.$watch($parse($attrs[key]), function(value) {
                        self[key] = value ? new Date(value.toString()) : null;
                        self.refreshView();
                    });
                } else {
                    self[key] = datepickerConfig[key] ? new Date(datepickerConfig[key]) : null;
                }
            });

            this.activeDate = $scope.activeDate = new Date();

            $scope.datepickerMode = $scope.datepickerMode || 'day';

            $scope.isActive = function(dateObject) {
                if (self.compare(dateObject.date, self.activeDate) === 0) {
                    return true;
                }
                return false;
            };

            this.init = function(ngModelCtrl_) {
                ngModelCtrl = ngModelCtrl_;

                ngModelCtrl.$render = function() {
                    self.render();
                };
            };

            this.render = function() {
                if (ngModelCtrl.$modelValue) {
                    var date = new Date(ngModelCtrl.$modelValue),
                        isValid = !isNaN(date);

                    if (isValid) {
                        this.activeDate = $scope.activeDate = date;
                    } else {
                        console.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
                    }
                    ngModelCtrl.$setValidity('date', isValid);
                }
                this.refreshView();
            };

            this.refreshView = function() {
                if (this._refreshView) {
                    this._refreshView();
                }
            };

            this.createDateObject = function(date, format) {
                var model = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue) : null;
                return {
                    date: date,
                    label: dateFilter(date, format),
                    selected: model && this.compare(date, model) === 0,
                    disabled: this.isDisabled(date),
                    current: this.compare(date, new Date()) === 0
                };
            };

            this.isDisabled = function(date) {
                return ((this.minDate && this.compare(date, this.minDate) < 0) || (this.maxDate && this.compare(date, this.maxDate) > 0) || ($attrs.dateDisabled && $scope.dateDisabled({
                    date: date,
                    mode: $scope.datepickerMode
                })));
            };

            // Split array into smaller arrays
            this.split = function(arr, size) {
                var arrays = [];
                while (arr.length > 0) {
                    arrays.push(arr.splice(0, size));
                }
                return arrays;
            };

            $scope.select = function(date) {
                var dt = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue) : new Date(0, 0, 0, 0, 0, 0, 0);
                dt.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
                ngModelCtrl.$setViewValue(dt);
                ngModelCtrl.$render();
            };

            this.getDaysInMonth = function(year, month) {
                return new Date(year, month+1, 1, 0, 0, -1).getDate();
            };

            $scope.selectMonth = function(newDate) {
                var dt = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue) : new Date(0, 0, 0, 0, 0, 0, 0),
                    daysInNewMonth = self.getDaysInMonth(dt.getYear(), newDate.getMonth());

                if (daysInNewMonth < dt.getDate()) {
                    dt.setDate(daysInNewMonth);
                }
                dt.setMonth(newDate.getMonth());

                $scope.select(dt);
            };

            $scope.selectYear = function(newDate) {
                var dt = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue) : new Date(0, 0, 0, 0, 0, 0, 0),
                    daysInNewMonth = self.getDaysInMonth(newDate.getFullYear(), dt.getMonth());

                if (daysInNewMonth < dt.getDate()) {
                    dt.setDate(daysInNewMonth);
                }
                dt.setFullYear(newDate.getFullYear());

                $scope.select(dt);                   
            };

            $scope.setMode = function(mode) {
                $scope.datepickerMode = mode;
            };
        }
    ]);

    material.directive('materialDatepicker', function () {
        return {
            restrict: 'EA',
            require: ['materialDatepicker', '?^ngModel'],
            controller: 'DatepickerCtrl',
            scope: true,
            template: [
                '<div class="material-datepicker-date">',
                    '<h4>{{activeDate|date:\'EEEE\'}}</h4>',
                    '<h2 ng-class="{\'view-active\':datepickerMode==\'month\'}" ng-click="setMode(\'month\')">{{activeDate|date:\'MMM\'}}</h2>',
                    '<h1 ng-class="{\'view-active\':datepickerMode==\'day\'}" ng-click="setMode(\'day\')">{{activeDate|date:\'d\'}}</h1>',
                    '<h3 ng-class="{\'view-active\':datepickerMode==\'year\'}" ng-click="setMode(\'year\')">{{activeDate|date:\'yyyy\'}}</h3>',
                '</div>',
                '<div ng-switch="datepickerMode" class="material-datepicker-view">',
                    '<material-daypicker ng-switch-when="day"></material-daypicker>',
                    '<material-monthpicker ng-switch-when="month"></material-monthpicker>',
                    '<material-yearpicker ng-switch-when="year"></material-yearpicker>',
                '</div>',
            ].join(''),

            link : function(scope, element, attrs, ctrls) {
                var datePickerCtrl = ctrls[0],
                    ngModelCtrl = ctrls[1];

                if (ngModelCtrl) {
                    datePickerCtrl.init(ngModelCtrl);
                } else {
                    console.warn('You should set a ng-model on your DatePicker');
                }
            }
        };
    });
        
    material.directive('materialDaypicker', ['dateFilter', function(dateFilter) {
        return {
            restrict: 'EA',
            replace: true,
            require: '^materialDatepicker',
            template: [
                '<table class="material-datepicker-dayview">',
                    '<tr>',
                        '<th ng-repeat="label in labels track by $index">{{label}}</th>',
                    '</tr>',
                    '<tr ng-repeat="row in rows track by $index">',
                        '<td ng-repeat="dt in row track by dt.date">',
                            '<button ng-if="!dt.secondary" class="material-button" ',
                                'ng-class="{\'date-active\': isActive(dt)}" ',
                                'ng-click="select(dt.date)" ',
                                'ng-disabled="dt.disabled">',
                                    '<span ng-class="{\'date-current\': dt.current}">{{dt.label}}</span>',
                            '</button>',
                        '</td>',
                    '</tr>',
                '</table>'
            ].join(''),
            link: function(scope, element, attrs, ctrl) {
                function getDates(startDate, n) {
                    var dates = new Array(n),
                        current = new Date(startDate),
                        i = 0;
                    current.setHours(12); // Prevent repeated dates because of timezone bug
                    while (i < n) {
                        dates[i++] = new Date(current);
                        current.setDate(current.getDate() + 1);
                    }
                    return dates;
                }

                ctrl._refreshView = function() {
                    var year = ctrl.activeDate.getFullYear(),
                        month = ctrl.activeDate.getMonth(),
                        firstDayOfMonth = new Date(year, month, 1),
                        difference = ctrl.startingDay - firstDayOfMonth.getDay(),
                        numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : -difference,
                        firstDate = new Date(firstDayOfMonth);

                    if (numDisplayedFromPreviousMonth > 0) {
                        firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
                    }

                    // 42 is the number of days on a six-month calendar
                    var days = getDates(firstDate, 42);
                    for (var i = 0; i < 42; i++) {
                        days[i] = angular.extend(ctrl.createDateObject(days[i], 'd'), {
                            secondary: days[i].getMonth() !== month
                        });
                    }

                    scope.labels = new Array(7);
                    for (var j = 0; j < 7; j++) {
                        scope.labels[j] = dateFilter(days[j].date, 'EEE')[0];
                    }

                    scope.rows = ctrl.split(days, 7);
                };

                ctrl.compare = function(date1, date2) {
                    return (new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) - new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()));
                };

                ctrl.refreshView();
            }
        };
    }]);
        
    material.directive('materialMonthpicker', ['dateFilter', function(dateFilter) {
        return {
            restrict: 'EA',
            replace: true,
            require: '^materialDatepicker',
            template: [
                '<ul class="material-datepicker-monthview">',
                    '<li ng-repeat="dt in rows track by dt.date">',
                        '<button type="button" ',
                            'ng-class="{active: isActive(dt)}" ',
                            'ng-click="selectMonth(dt.date)" ',
                            'ng-disabled="dt.disabled">',
                                '<span ng-class="{\'date-current\': dt.current}">{{dt.label}}</span>',
                        '</button>',
                    '</li>',
                '</ul>'
            ].join(''),
            link: function(scope, element, attrs, ctrl) {
                ctrl._refreshView = function() {
                    var months = new Array(12),
                        year = ctrl.activeDate.getFullYear();

                    for (var i = 0; i < 12; i++) {
                        months[i] = ctrl.createDateObject(new Date(year, i, 1), 'MMMM');
                    }

                    scope.rows = months;
                };

                ctrl.compare = function(date1, date2) {
                    return new Date(date1.getFullYear(), date1.getMonth()) - new Date(date2.getFullYear(), date2.getMonth());
                };

                ctrl.refreshView();
            }
        };
    }]);

    material.directive('materialYearpicker', ['dateFilter', function(dateFilter) {
        return {
            restrict: 'EA',
            replace: true,
            require: '^materialDatepicker',
            template: [
                '<ul class="material-datepicker-yearview">',
                    '<li ng-repeat="dt in rows track by dt.date">',
                        '<button type="button" ',
                            'ng-class="{active: isActive(dt)}" ',
                            'ng-click="selectYear(dt.date)" ',
                            'ng-disabled="dt.disabled">',
                                '{{dt.label}}',
                        '</button>',
                    '</li>',
                '</ul>'
            ].join(''),
            link: function(scope, element, attrs, ctrl) {
                var minYear = ctrl.minDate.getFullYear(),
                    range = ctrl.yearRange;

                ctrl._refreshView = function() {
                    var years = new Array(range);

                    for (var i = 0; i < range; i++) {
                        years[i] = ctrl.createDateObject(new Date(minYear + i, 0, 1), 'yyyy');
                    }

                    scope.rows = years;
                };

                ctrl.compare = function(date1, date2) {
                    return date1.getFullYear() - date2.getFullYear();
                };

                ctrl.refreshView();
            }
        };
    }])

    material.constant('datepickerDialogConfig', {
        doneText: 'Ok',
        cancelText: 'Cancel'
    });

    material.directive('materialDatepickerDialog', [
        '$parse',
        '$compile',
        'dateFilter', 
        'datepickerDialogConfig', 
        'datepickerConfig',
        function($parse, $compile, dateFilter, datepickerDialogConfig, datepickerConfig) {
            return {
                restrict: 'EA',
                replace: true,
                scope: {
                    doneText: '@',
                    cancelText: '@',
                },
                require: '?^ngModel',
                template: [
                    '<div class="material-datepicker-dialog">',
                        '<div material-datepicker></div>',
                        '<div class="material-datepicker-bar">',
                            '<button class="material-btn btn-text" ng-click="cancelDate()">{{getText(\'cancel\')}}</button>',
                            '<button class="material-btn btn-text" ng-click="commitDate()">{{getText(\'done\')}}</button>',
                        '</div>',
                    '</div>'
                ].join(''),
                link: function(scope, element, attrs, ngModel) {
                    scope.getText = function(key) {
                        return scope[key + 'Text'] || datepickerDialogConfig[key + 'Text'];
                    };

                    function cameltoDash(string) {
                        return string.replace(/([A-Z])/g, function($1) {
                            return '-' + $1.toLowerCase();
                        });
                    }

                    scope.data = {};
                    scope.watchData = {};

                    // // Here we bind all the datepicker config attributes on this element to the 
                    // // inner datepicker element including watchers for when the values change
                    // var datepickerEl = angular.element('<div material-datepicker></div>');
                    // datepickerEl.attr('ng-model', 'data.date');                
                    // angular.forEach(datepickerConfig, function(index, key) {
                    //     if (attrs[key]) {
                    //         var getAttribute = $parse(attrs[key]);
                    //         scope.$parent.$watch(getAttribute, function(value) {
                    //             scope.watchData[key] = value;
                    //         });
                    //         datepickerEl.attr(cameltoDash(key), 'watchData.' + key);
                    //     }
                    // });

                    // var $datepicker = $compile(datepickerEl)(scope);
                    // datepickerEl.remove();
                    // element.prepend($datepicker);

                    // Outter change
                    ngModel.$render = function() {
                        scope.data.date = angular.isDefined(ngModel.$modelValue) ? new Date(ngModel.$modelValue) : new Date();
                    };

                    scope.commitDate = function() {
                        ngModel.$setViewValue(scope.data.date);
                        ngModel.$render();
                    }
                }
            }
        }
    ]);
});