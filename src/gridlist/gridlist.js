define([
    '../material',
    'angular',
], function (material, ng) {
    'use strict';
    
    material.directive('materialGridlistPagination', [
        '$animate',
        'materialConfigService',
        function ($animate, configs) {
            return {
                restrict: 'EA',
                scope: {
                    outData: '=',
                    currentPage: '=?'
                },
                template: [
                    //'<material-button icon="navigation-black:arrow_back_black" ng-click="first()" ng-disabled="currentPage == 1"></material-button>',
                    '<material-button icon="navigation-black:chevron_left_black" ng-click="previous()" ng-disabled="currentPage == 1"></material-button>',
                    '<material-title>Page {{currentPage}}</material-title>',
                    '<material-button icon="navigation-black:chevron_right_black" ng-click="next()" ng-disabled="currentPage == totalPages"></material-button>',
                ].join(''),

                link: function ($scope, $element, $attrs) {
                    var innerPage = $scope.currentPage = $scope.currentPage || 1;

                    configs.applyConfigs($scope, $attrs.paginationConfig, {
                        pageSize: 25,
                        totalCount: null
                    });

                    $scope.$watch('currentPage', function (page, previousPage) {
                        if (page != previousPage) {
                            setPage(page);
                        }
                    });

                    $scope.$watch('_totalCount', function (value) {
                        if (ng.isNumber(value)) {
                            updateTotalPages();     
                        }
                    });

                    $scope.$watch('_pageSize', function (newValue, oldValue) {
                        if (oldValue != newValue) {
                            updateTotalPages();
                            updateDataPaging();                            
                        }
                    });

                    $scope.$parent.$watch($attrs.inData, function (data) {
                        if (ng.isArray(data)) {
                            $scope.sourceData = data.slice();

                            updateTotalPages();
                            updateDataPaging();
                        }
                    });

                    function setPage (page) {
                        if (page >= 1 && page <= $scope.totalPages && page != innerPage) {
                            $scope.currentPage = innerPage = page;
                            
                            updateDataPaging();

                            if (ng.isDefined($attrs.onPageChange)) {
                                $scope.$parent.$eval($attrs.onPageChange, {$page: page});
                            }
                        }
                    }

                    function updateTotalPages () {
                        var totalCount = ng.isArray($scope.sourceData) ? $scope.sourceData.length : $scope._totalCount;
                        $scope.totalPages = Math.ceil(totalCount / $scope._pageSize);
                    }

                    function updateDataPaging () {
                        var range = $scope.sourceData,
                            limit = $scope._pageSize,
                            start = (innerPage - 1) * limit,
                            end = start + limit;

                        if (ng.isArray(range) && ng.isDefined($attrs.outData)) {
                            end = Math.min(range.length, end);
                            $scope.outData = range.slice(start, end);
                        }
                    }

                    $scope.previous = function () {
                        setPage(innerPage - 1);
                    };

                    $scope.next = function () {
                        setPage(innerPage + 1);
                    };

                    $scope.first = function () {
                        setPage(1);
                    };
                }
            };
        }
    ]);
});


