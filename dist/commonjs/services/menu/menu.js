"use strict";
var $___46__46__47_services__;
var materialServices = ($___46__46__47_services__ = require("../services"), $___46__46__47_services__ && $___46__46__47_services__.__esModule && $___46__46__47_services__ || {default: $___46__46__47_services__}).materialServices;
materialServices.factory('materialMenuService', ['materialTransitionService', function(TransitionService) {
  return new TransitionService('menus', {forceSingle: true});
}]);
