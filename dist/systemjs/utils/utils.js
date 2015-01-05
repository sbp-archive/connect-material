System.register(["angular"], function($__export) {
  "use strict";
  var angular,
      materialUtils;
  return {
    setters: [function(m) {
      angular = m.default;
    }],
    execute: function() {
      materialUtils = $__export("materialUtils", angular.module('material.utils', []));
    }
  };
});
