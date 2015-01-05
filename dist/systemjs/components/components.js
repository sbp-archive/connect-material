System.register(["angular", "angular-animate", "../services/services", "../utils/utils"], function($__export) {
  "use strict";
  var angular,
      materialComponents;
  return {
    setters: [function(m) {
      angular = m.default;
    }, function(m) {}, function(m) {}, function(m) {}],
    execute: function() {
      materialComponents = $__export("materialComponents", angular.module('material.components', ['ngAnimate', 'material.services', 'material.utils']));
    }
  };
});
