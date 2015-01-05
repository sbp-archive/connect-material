System.register(["../services", "../transition/transition"], function($__export) {
  "use strict";
  var materialServices;
  return {
    setters: [function(m) {
      materialServices = m.materialServices;
    }, function(m) {}],
    execute: function() {
      materialServices.factory('materialDrawerService', ['materialTransitionService', function(TransitionService) {
        return new TransitionService('drawers');
      }]);
    }
  };
});
