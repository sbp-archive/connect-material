"use strict";
var $__angular__,
    $___46__46__47_services__;
var angular = ($__angular__ = require("angular"), $__angular__ && $__angular__.__esModule && $__angular__ || {default: $__angular__}).default;
var materialServices = ($___46__46__47_services__ = require("../services"), $___46__46__47_services__ && $___46__46__47_services__.__esModule && $___46__46__47_services__ || {default: $___46__46__47_services__}).materialServices;
materialServices.factory('materialConfigService', function() {
  return {
    applyConfigs: function($scope, config, defaults) {
      if (angular.isDefined(config)) {
        $scope.$parent.$watch(config, function(value) {
          value = angular.extend(angular.copy(defaults), angular.isObject(value) ? value : {});
          Object.keys(value).forEach(function(key) {
            $scope['_' + key] = value[key];
          });
        }, true);
      } else if (angular.isDefined(defaults) && angular.isObject(defaults)) {
        Object.keys(defaults).forEach(function(key) {
          $scope['_' + key] = defaults[key];
        });
      }
    },
    bridgeConfigs: function($scope, $attrs, configName, defaults) {
      defaults = angular.isObject(defaults) ? angular.copy(defaults) : {};
      if (angular.isDefined($attrs[configName])) {
        $scope.$parent.$watch($attrs[configName], function(value) {
          $scope['_' + configName] = angular.extend(defaults, angular.copy(value));
        }, true);
      } else {
        $scope['_' + configName] = defaults;
      }
    }
  };
});
