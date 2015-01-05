define(['../services'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var materialServices = $__0.materialServices;
  materialServices.factory('materialMenuService', ['materialTransitionService', function(TransitionService) {
    return new TransitionService('menus', {forceSingle: true});
  }]);
  return {};
});
