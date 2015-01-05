System.register(["../services"], function($__export) {
  "use strict";
  var materialServices;
  return {
    setters: [function(m) {
      materialServices = m.materialServices;
    }],
    execute: function() {
      materialServices.factory('materialMenuService', ['materialTransitionService', function(TransitionService) {
        return new TransitionService('menus', {forceSingle: true});
      }]);
    }
  };
});
