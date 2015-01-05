"use strict";
var $___46__46__47_services__,
    $___46__46__47_transition_47_transition__;
var materialServices = ($___46__46__47_services__ = require("../services"), $___46__46__47_services__ && $___46__46__47_services__.__esModule && $___46__46__47_services__ || {default: $___46__46__47_services__}).materialServices;
($___46__46__47_transition_47_transition__ = require("../transition/transition"), $___46__46__47_transition_47_transition__ && $___46__46__47_transition_47_transition__.__esModule && $___46__46__47_transition_47_transition__ || {default: $___46__46__47_transition_47_transition__});
materialServices.factory('materialDrawerService', ['materialTransitionService', function(TransitionService) {
  return new TransitionService('drawers');
}]);
