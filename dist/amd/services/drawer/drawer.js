define(['../services', '../transition/transition'], function($__0,$__2) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  var materialServices = $__0.materialServices;
  $__2;
  materialServices.factory('materialDrawerService', ['materialTransitionService', function(TransitionService) {
    return new TransitionService('drawers');
  }]);
  return {};
});
