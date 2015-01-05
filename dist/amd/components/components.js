define(['angular', 'angular-animate', '../services/services', '../utils/utils'], function($__0,$__2,$__3,$__4) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__3 || !$__3.__esModule)
    $__3 = {default: $__3};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  var angular = $__0.default;
  $__2;
  $__3;
  $__4;
  var materialComponents = angular.module('material.components', ['ngAnimate', 'material.services', 'material.utils']);
  return {
    get materialComponents() {
      return materialComponents;
    },
    __esModule: true
  };
});
