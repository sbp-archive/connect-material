System.register(["../components", "angular", "../../services/config/config", "../../services/menu/menu", "../item/item", "./menu.button"], function($__export) {
  "use strict";
  var materialComponents,
      angular;
  return {
    setters: [function(m) {
      materialComponents = m.materialComponents;
    }, function(m) {
      angular = m.default;
    }, function(m) {}, function(m) {}, function(m) {}, function(m) {}],
    execute: function() {
      materialComponents.directive('materialMenu', ['$animate', '$parse', 'materialConfigService', 'materialMenuService', function($animate, $parse, configs, menus) {
        var ID_GENERATOR = 1;
        return {
          restrict: 'EA',
          scope: {menuId: '@'},
          compile: function($element, $attrs) {
            if (angular.isUndefined($attrs.menuId)) {
              $attrs.menuId = 'material-menu-' + ID_GENERATOR++;
              $element.attr('menu-id', $attrs.menuId);
            }
            return function($scope, $element, $attrs) {
              var id = $attrs.menuId,
                  menu = $scope._menu = menus.create(id, $element),
                  originalParent = $element.parent();
              configs.applyConfigs($scope, $attrs.menuConfig, {
                appendToBody: false,
                closeOnBodyClick: true,
                closeOnMenuClick: true,
                autoAdjust: true,
                autoPosition: true,
                icons: false
              });
              function onBodyClick() {
                if ($scope._closeOnBodyClick) {
                  $scope.$apply(function() {
                    menu.close();
                  });
                }
              }
              menu.on('open', function() {
                angular.element(window).on('click', onBodyClick);
              });
              menu.on('close', function() {
                if ($scope._appendToBody) {
                  if ($scope._autoAdjust) {
                    var style = $element[0].style;
                    style.top = null;
                    style.right = null;
                    style.height = null;
                  }
                  originalParent.append($element);
                }
                angular.element(window).off('click', onBodyClick);
              });
              menu.on('beforeopen', function() {
                var containerRect = originalParent[0].getBoundingClientRect(),
                    viewportHeight = document.documentElement.clientHeight,
                    innerMenuHeight = $element[0].scrollHeight;
                if ($scope._appendToBody) {
                  angular.element(document.body).append($element);
                  if ($scope._autoPosition) {
                    $element.css({
                      top: containerRect.top + 'px',
                      right: (document.documentElement.clientWidth - containerRect.right) + 'px'
                    });
                  }
                }
                if ($scope._autoAdjust && containerRect.top + innerMenuHeight > viewportHeight) {
                  $element.css('height', (viewportHeight - containerRect.top - 10) + 'px');
                }
                $element[0].scrollTop = 0;
              });
              $element.on('click', function(e) {
                e.stopPropagation();
                if ($scope._closeOnMenuClick) {
                  $scope.$apply(function() {
                    menu.close();
                  });
                }
              });
              if (menu.deferred.open) {
                menu.open();
              }
              $scope.$watch('_icons', function(value) {
                if (value) {
                  $element.addClass('material-menu-has-icons');
                } else {
                  $element.removeClass('material-menu-has-icons');
                }
              });
              $scope.$on('$destroy', function() {
                angular.element(window).off('click', onBodyClick);
                menus.remove(id);
              });
            };
          }
        };
      }]);
    }
  };
});
