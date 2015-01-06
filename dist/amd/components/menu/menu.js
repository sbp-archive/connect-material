define(['../components', 'angular', '../../services/config/config', '../../services/menu/menu', '../item/item', './menu.button'], function($__0,$__2,$__4,$__5,$__6,$__7) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  if (!$__5 || !$__5.__esModule)
    $__5 = {default: $__5};
  if (!$__6 || !$__6.__esModule)
    $__6 = {default: $__6};
  if (!$__7 || !$__7.__esModule)
    $__7 = {default: $__7};
  var materialComponents = $__0.materialComponents;
  var angular = $__2.default;
  $__4;
  $__5;
  $__6;
  $__7;
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
              var style = $element[0].style;
              style.top = null;
              style.right = null;
              style.height = null;
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
  return {};
});
