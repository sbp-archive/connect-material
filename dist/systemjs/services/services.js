System.register(["angular", "angular-animate"], function($__export) {
  "use strict";
  var angular,
      materialServices;
  return {
    setters: [function(m) {
      angular = m.default;
    }, function(m) {}],
    execute: function() {
      materialServices = $__export("materialServices", angular.module('material.services', ['ngAnimate']));
    }
  };
});
