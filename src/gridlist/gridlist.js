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
                    '<material-button icon="navigation-black:arrow_back_black" ng-click="previous()" ng-disabled="currentPage == 1"></material-button>',
                    '<material-title>{{currentPage}}</material-title>',
                    '<material-button icon="navigation-black:arrow_forward_black" ng-click="next()" ng-disabled="currentPage == totalPages"></material-button>',
                ].join(''),

                link: function ($scope, $element, $attrs) {
                    configs.applyConfigs($scope, $attrs.paginationConfig, {
                        pageSize: 25
                    });

                    $scope.sourceData = [];

                    $scope.$parent.$watch($attrs.inData, function (data) {
                        $scope.currentPage = 1;
                        $scope.totalPages = Math.ceil(data.length / $scope._pageSize);
                        $scope.sourceData = data;
                    }, true);

                    $scope.$watch('sourceData', applyPaging);
                    $scope.$watch('currentPage', applyPaging);

                    function applyPaging () {
                        var range = $scope.sourceData,
                            limit = $scope._pageSize,
                            start = ($scope.currentPage - 1) * limit,
                            end = start + limit;

                        end = Math.min(range.length - 1, end);

                        $scope.outData = range.slice(start, end);
                    };

                    $scope.previous = function () {
                        if ($scope.currentPage > 1) {
                            $scope.currentPage--;
                        }
                    };

                    $scope.next = function () {
                        if ($scope.currentPage < $scope.totalPages) {
                            $scope.currentPage++;
                        }
                    };

                    $scope.setPage = function (page) {
                        if (page >= 1 && page <= $scope.totalPages) {
                            $scope.currentPage = page;
                        }
                    };
                }
            }
        }
    ]);
});


