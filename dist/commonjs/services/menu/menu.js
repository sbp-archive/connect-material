"use strict";
var $___46__46__47_services__,
    $__angular__;
var materialServices = ($___46__46__47_services__ = require("../services"), $___46__46__47_services__ && $___46__46__47_services__.__esModule && $___46__46__47_services__ || {default: $___46__46__47_services__}).materialServices;
var angular = ($__angular__ = require("angular"), $__angular__ && $__angular__.__esModule && $__angular__ || {default: $__angular__}).default;
materialServices.factory('materialMenuService', ['materialTransitionService', function(TransitionService) {
  var service = new TransitionService('menus', {forceSingle: true});
  service.extendTransition = function(menu) {
    menu.select = function(option) {
      menu.broadcast('select', option);
    };
    menu.selectNext = function() {
      menu.broadcast('selectnext');
    };
    menu.selectPrevious = function() {
      menu.broadcast('selectprev');
    };
  };
  angular.extend(service, {
    select: function(id, option) {
      var menu = service.get(id);
      if (menu) {
        menu.select(option);
      }
    },
    selectNext: function(id) {
      var menu = service.get(id);
      if (menu) {
        menu.selectNext();
      }
    },
    selectPrevious: function(id) {
      var menu = service.get(id);
      if (menu) {
        menu.selectPrevious();
      }
    }
  });
  return service;
}]);
