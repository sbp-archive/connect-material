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
                if (ng.isDefined(config)) {
                    $scope.$parent.$watch(config, function(value) {
                        value = ng.extend(ng.copy(defaults), ng.isObject(value) ? value : {});

                        Object.keys(value).forEach(function(key) {
                            $scope['_' + key] = value[key];
                        });
                    }, true);
                }
                else if (ng.isDefined(defaults) && ng.isObject(defaults)) {
                    Object.keys(defaults).forEach(function(key) {
                        $scope['_' + key] = defaults[key];
                    });
                }
			},

            bridge: function($scope, $attrs, configName) {
                if (ng.isDefined($attrs[configName])) {
                    $scope.$parent.$watch($attrs[configName], function(value) {
                        $scope['_' + configName] = ng.copy(value);
                    }, true);
                }
                else {
                    $scope['_' + configName] = {};
                }
            }
		};
    });

    return module;
});