System.register(["../components", "angular"], function($__export) {
  "use strict";
  var materialComponents,
      angular;
  return {
    setters: [function(m) {
      materialComponents = m.materialComponents;
    }, function(m) {
      angular = m.default;
    }],
    execute: function() {
      materialComponents.directive('materialTab', ['$compile', function($compile) {
        return {
          restrict: 'EA',
          controller: 'materialTabController',
          require: ['materialTab', '^materialTabs'],
          scope: {label: '@'},
          compile: function($element, $attrs) {
            var label = $element.find('material-tab-label');
            if (label.length) {
              label.remove();
            } else if (angular.isDefined($attrs.label)) {
              label = angular.element('<material-tab-label>').html($attrs.label);
            } else {
              label = angular.element('<material-tab-label>').append($element.contents().remove());
            }
            var content = $element.contents().remove();
            return function($scope, $element, $attrs, ctrls) {
              var tab = ctrls[0],
                  tabs = ctrls[1],
                  labelClone = label.clone(),
                  contentClone = content.clone();
              $element.append(labelClone);
              $compile(labelClone)($scope.$parent);
              tab.content = contentClone;
              tabs.add(tab);
              if (!angular.isDefined($attrs.ngClick)) {
                $element.on('click', function() {
                  $scope.$apply(function() {
                    tabs.select(tab);
                  });
                });
              }
              if (angular.isNumber($scope.$parent.$index)) {
                $scope.$watch('$parent.$index', function(newIndex) {
                  tabs.move(tab, newIndex);
                });
              }
              $scope.$on('$destroy', function() {
                tabs.remove(tab);
              });
            };
          }
        };
      }]);
      materialComponents.controller('materialTabController', ['$scope', '$element', '$animate', '$compile', function($scope, $element, $animate, $compile) {
        var self = this;
        angular.extend(self, {
          element: $element,
          contentEl: angular.element('<div class="material-tabcontent"></div>'),
          onAdd: function(containerEl) {
            if (self.content.length) {
              self.contentEl.append(self.content);
              self.contentScope = $scope.$parent.$new();
              containerEl.append(self.contentEl);
              $compile(self.contentEl)(self.contentScope);
              self.disconnectScope(self.contentScope);
            }
          },
          onRemove: function() {
            $animate.leave(self.contentEl).then(function() {
              if (self.contentScope) {
                self.contentScope.$destroy();
              }
              self.contentScope = null;
            });
          },
          onSelect: function() {
            self.reconnectScope(self.contentScope);
            $element.addClass('material-tab-active');
            $animate.addClass(self.contentEl, 'material-opened');
          },
          onDeselect: function() {
            self.disconnectScope(self.contentScope);
            $element.removeClass('material-tab-active');
            $animate.removeClass(self.contentEl, 'material-opened');
          },
          disconnectScope: function(scope) {
            if (!scope) {
              return;
            }
            if (scope.$root === scope) {
              return;
            }
            if (scope.$$destroyed) {
              return;
            }
            var parent = scope.$parent;
            scope.$$disconnected = true;
            if (parent.$$childHead === scope) {
              parent.$$childHead = scope.$$nextSibling;
            }
            if (parent.$$childTail === scope) {
              parent.$$childTail = scope.$$prevSibling;
            }
            if (scope.$$prevSibling) {
              scope.$$prevSibling.$$nextSibling = scope.$$nextSibling;
            }
            if (scope.$$nextSibling) {
              scope.$$nextSibling.$$prevSibling = scope.$$prevSibling;
            }
            scope.$$nextSibling = scope.$$prevSibling = null;
          },
          reconnectScope: function(scope) {
            if (!scope) {
              return;
            }
            if (scope.$root === scope) {
              return;
            }
            if (!scope.$$disconnected) {
              return;
            }
            var child = scope;
            var parent = child.$parent;
            child.$$disconnected = false;
            child.$$prevSibling = parent.$$childTail;
            if (parent.$$childHead) {
              parent.$$childTail.$$nextSibling = child;
              parent.$$childTail = child;
            } else {
              parent.$$childHead = parent.$$childTail = child;
            }
          }
        });
      }]);
    }
  };
});
