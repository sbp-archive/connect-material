define(['../services', 'angular', '../transition/transition'], function($__0,$__2,$__4) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  var materialServices = $__0.materialServices;
  var angular = $__2.default;
  $__4;
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
  return {};
});
