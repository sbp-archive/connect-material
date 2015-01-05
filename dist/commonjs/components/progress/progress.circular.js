"use strict";
var $___46__46__47_components__,
    $___46__46__47__46__46__47_services_47_config_47_config__,
    $___46__46__47__46__46__47_utils_47_constant_47_constant__;
var materialComponents = ($___46__46__47_components__ = require("../components"), $___46__46__47_components__ && $___46__46__47_components__.__esModule && $___46__46__47_components__ || {default: $___46__46__47_components__}).materialComponents;
($___46__46__47__46__46__47_services_47_config_47_config__ = require("../../services/config/config"), $___46__46__47__46__46__47_services_47_config_47_config__ && $___46__46__47__46__46__47_services_47_config_47_config__.__esModule && $___46__46__47__46__46__47_services_47_config_47_config__ || {default: $___46__46__47__46__46__47_services_47_config_47_config__});
($___46__46__47__46__46__47_utils_47_constant_47_constant__ = require("../../utils/constant/constant"), $___46__46__47__46__46__47_utils_47_constant_47_constant__ && $___46__46__47__46__46__47_utils_47_constant_47_constant__.__esModule && $___46__46__47__46__46__47_utils_47_constant_47_constant__ || {default: $___46__46__47__46__46__47_utils_47_constant_47_constant__});
materialComponents.directive('materialProgressCircular', ['materialConfigService', 'materialConstants', function(configs, constants) {
  var fillRotations = new Array(101);
  var fixRotations = new Array(101);
  for (var i = 0; i < 101; i++) {
    var percent = i / 100;
    var rotation = Math.floor(percent * 180);
    fillRotations[i] = 'rotate(' + rotation.toString() + 'deg)';
    fixRotations[i] = 'rotate(' + (rotation * 2).toString() + 'deg)';
  }
  return {
    restrict: 'E',
    template: ['<div class="material-progress-wrapper">', '<div class="material-progress-inner">', '<div class="material-progress-gap"></div>', '<div class="material-progress-left">', '<div class="material-progress-half-circle"></div>', '</div>', '<div class="material-progress-right">', '<div class="material-progress-half-circle"></div>', '</div>', '</div>', '</div>'].join(''),
    compile: function($element, $attrs) {
      $element.attr('aria-valuemin', 0);
      $element.attr('aria-valuemax', 100);
      $element.attr('role', 'progressbar');
      return function($scope, $element, $attrs) {
        var circle = $element[0],
            fill = circle.querySelectorAll('.material-fill, .material-mask.material-full'),
            fix = circle.querySelectorAll('.material-fill.material-fix'),
            i,
            clamped,
            fillRotation,
            fixRotation;
        var diameter = $attrs.materialDiameter || 48;
        var scale = diameter / 48;
        circle.style[constants.CSS.TRANSFORM] = 'scale(' + scale.toString() + ')';
        $attrs.$observe('value', function(value) {
          clamped = clamp(value);
          fillRotation = fillRotations[clamped];
          fixRotation = fixRotations[clamped];
          $element.attr('aria-valuenow', clamped);
          for (i = 0; i < fill.length; i++) {
            fill[i].style[constants.CSS.TRANSFORM] = fillRotation;
          }
          for (i = 0; i < fix.length; i++) {
            fix[i].style[constants.CSS.TRANSFORM] = fixRotation;
          }
        });
        function clamp(value) {
          if (value > 100) {
            return 100;
          }
          if (value < 0) {
            return 0;
          }
          return Math.ceil(value || 0);
        }
      };
    }
  };
}]);
