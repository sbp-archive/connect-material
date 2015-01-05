"use strict";
var $___46__46__47_services__,
    $__angular__,
    $___46__46__47_transition_47_transition__;
var materialServices = ($___46__46__47_services__ = require("../services"), $___46__46__47_services__ && $___46__46__47_services__.__esModule && $___46__46__47_services__ || {default: $___46__46__47_services__}).materialServices;
var angular = ($__angular__ = require("angular"), $__angular__ && $__angular__.__esModule && $__angular__ || {default: $__angular__}).default;
($___46__46__47_transition_47_transition__ = require("../transition/transition"), $___46__46__47_transition_47_transition__ && $___46__46__47_transition_47_transition__.__esModule && $___46__46__47_transition_47_transition__ || {default: $___46__46__47_transition_47_transition__});
materialServices.factory('materialDialogService', ['$rootScope', '$compile', '$q', 'materialTransitionService', function($rootScope, $compile, $q, TransitionService) {
  var service = new TransitionService('dialogs'),
      scopes = {},
      template = ['<material-dialog dialog-id="{{dialogId}}">', '<material-title>{{title}}</material-title>', '<material-content>{{message}}</material-content>', '<material-buttonbar>', '<material-button ng-if="buttons.cancel" ng-click="onButtonClick(\'cancel\')" class="material">Cancel</material-button>', '<material-button ng-if="buttons.no" ng-click="onButtonClick(\'no\')" class="material">No</material-button>', '<material-button ng-if="buttons.yes" ng-click="onButtonClick(\'yes\')" class="material-primary">Yes</material-button>', '<material-button ng-if="buttons.ok" ng-click="onButtonClick(\'ok\')" class="material-primary">Ok</material-button>', '</material-buttonbar>', '</material-dialog>'].join('');
  function dialogFactory(name, buttons) {
    return function(title, message) {
      var deferred = $q.defer(),
          dialogId = 'dialog-service-generated-' + name,
          $scope = scopes[name];
      if (!$scope) {
        $scope = scopes[name] = $rootScope.$new(true);
        $scope.dialogId = dialogId;
        $scope.buttons = buttons;
        $compile(template)($scope);
      }
      $scope.title = title;
      $scope.message = message;
      $scope.onButtonClick = function(value) {
        service.close(dialogId).then(function() {
          deferred.resolve(value);
        });
      };
      service.open(dialogId);
      return deferred.promise;
    };
  }
  angular.extend(service, {
    alert: dialogFactory('alert', {ok: true}),
    confirm: dialogFactory('confirm', {
      yes: true,
      no: true
    })
  });
  return service;
}]);
