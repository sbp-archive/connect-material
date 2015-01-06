define(['../services', 'angular'], function($__0,$__2) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  var materialServices = $__0.materialServices;
  var angular = $__2.default;
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
  return {};
});
