define([
    'angular'
], function (ng) {
    'use strict';
    var module = ng.module('connectMaterialDirectives', [
    	'ngAnimate'
    ]);

    module.factory('materialConfigService', function() {
    	return {
			apply: function($scope, config, defaults) {				
				$scope.$parent.$watch(config, function(value) {
					value = ng.extend(ng.copy(defaults), ng.isObject(value) ? value : {});

                    Object.keys(value).forEach(function(key) {
                        $scope['_' + key] = value[key];
                    });
                }, true);
			}
		};
    });

    return module;
});