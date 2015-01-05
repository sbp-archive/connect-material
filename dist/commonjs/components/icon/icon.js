"use strict";
var $___46__46__47_components__,
    $__angular__;
var materialComponents = ($___46__46__47_components__ = require("../components"), $___46__46__47_components__ && $___46__46__47_components__.__esModule && $___46__46__47_components__ || {default: $___46__46__47_components__}).materialComponents;
var angular = ($__angular__ = require("angular"), $__angular__ && $__angular__.__esModule && $__angular__ || {default: $__angular__}).default;
materialComponents.directive('materialIcon', function() {
  return function(scope, element, attrs) {
    if (angular.isDefined(attrs.materialIcon)) {
      var parts = attrs.materialIcon.split(':'),
          iconCls = 'icon-' + parts[0];
      iconCls += ' ' + iconCls + '-ic_' + parts[1] + '_24dp';
      element.prepend('<div class="material-icon ' + iconCls + '"></div>');
      element.addClass('material-has-icon');
    }
  };
});
