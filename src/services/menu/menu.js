import {materialServices} from '../services';
import angular from 'angular';

materialServices.factory('materialMenuService', [
    'materialTransitionService',
    function (TransitionService) {
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
            },
        });

        return service;
    }
]);
