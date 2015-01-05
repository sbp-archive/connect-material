"use strict";
var $___46__46__47_components__,
    $__angular__,
    $__tabs_46_tab__;
var materialComponents = ($___46__46__47_components__ = require("../components"), $___46__46__47_components__ && $___46__46__47_components__.__esModule && $___46__46__47_components__ || {default: $___46__46__47_components__}).materialComponents;
var angular = ($__angular__ = require("angular"), $__angular__ && $__angular__.__esModule && $__angular__ || {default: $__angular__}).default;
($__tabs_46_tab__ = require("./tabs.tab"), $__tabs_46_tab__ && $__tabs_46_tab__.__esModule && $__tabs_46_tab__ || {default: $__tabs_46_tab__});
materialComponents.directive('materialTabs', [function() {
  return {
    restrict: 'EA',
    require: 'materialTabs',
    controller: 'materialTabsController',
    transclude: true,
    scope: {selectedIndex: '=?materialSelected'},
    template: ['<div class="material-tabs-bar"></div>', '<div class="material-tabs-content"></div>'].join(''),
    link: function($scope, $element, $attrs, tabs, $transclude) {
      $transclude($scope.$parent, function(clone) {
        angular.element($element[0].querySelector('.material-tabs-bar')).append(clone);
      });
      $scope.$watch('selectedIndex', function(newIndex, oldIndex) {
        tabs.deselect(tabs.getTabAt(oldIndex));
        var newTab = tabs.getTabAt(newIndex);
        if (newTab) {
          tabs.select(newTab);
        }
      });
    }
  };
}]);
materialComponents.controller('materialTabsController', ['$scope', '$element', function($scope, $element) {
  var self = this,
      tabs = [];
  angular.extend(self, {
    element: $element,
    contentEl: angular.element($element[0].querySelector('.material-tabs-content')),
    getTabAt: function(index) {
      return angular.isNumber(index) && index >= 0 ? tabs[index] : null;
    },
    getSelected: function() {
      return self.getTabAt($scope.selectedIndex);
    },
    indexOf: function(tab) {
      return tabs.indexOf(tab);
    },
    add: function(tab, index) {
      var selectedIndex = $scope.selectedIndex;
      index = angular.isNumber(index) ? index : tabs.length;
      tabs.splice(index, 0, tab);
      tab.onAdd(self.contentEl);
      if (selectedIndex === -1 || !angular.isNumber(selectedIndex) || selectedIndex === index) {
        self.select(tab);
      }
    },
    remove: function(tab) {
      var index = tabs.indexOf(tab);
      if (index !== -1) {
        if (self.getSelected() === tab) {
          if (tabs.length > 1) {
            self.select(self.getPrevious() || self.getNext());
          } else {
            self.deselect(tab);
          }
        }
        tabs.splice(index, 1);
        tab.onRemove();
      }
    },
    move: function(tab, newIndex) {
      var isSelected = self.getSelected() === tab,
          oldIndex = self.indexOf(tab);
      if (oldIndex > -1) {
        tabs.splice(oldIndex, 1);
        tabs.splice(newIndex, 0, tab);
        if (isSelected) {
          self.select(tab);
        }
      }
    },
    select: function(tab) {
      if (!tab || tab.isSelected || tabs.indexOf(tab) === -1) {
        return;
      }
      self.deselect(self.getSelected());
      $scope.selectedIndex = self.indexOf(tab);
      tab.isSelected = true;
      tab.onSelect();
    },
    deselect: function(tab) {
      if (!tab || !tab.isSelected || tabs.indexOf(tab) === -1) {
        return;
      }
      $scope.selectedIndex = -1;
      tab.isSelected = false;
      tab.onDeselect();
    },
    getPrevious: function(tab) {
      var index = self.indexOf(tab);
      return index >= 1 && tabs[index - 1] || null;
    },
    getNext: function(tab) {
      var index = self.indexOf(tab);
      return index < (tabs.length - 1) && tabs[index + 1] || null;
    }
  });
  $scope.$on('$destroy', function() {
    self.deselect(self.getSelected());
    tabs.forEach(function(tab) {
      self.remove(tab, true);
    });
  });
}]);
