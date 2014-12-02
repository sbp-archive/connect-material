define([
    '../material',
    'angular'
], function (material, ng) {
    'use strict';

    material.directive('materialTabs', [
        function () {
        	return {
        		restrict: 'EA',
        		require: 'materialTabs',
        		controller: 'materialTabsController',
        		transclude: true,
        		scope: {
        			selectedIndex: '=?materialSelected'
        		},
        		template: [
        			'<div class="material-tabs-bar"></div>',
        			'<div class="material-tabs-content"></div>'
        		].join(''),
        		link: function ($scope, $element, $attrs, tabs, $transclude) {
	        		$transclude($scope.$parent, function(clone) {
	        			ng.element($element[0].querySelector('.material-tabs-bar')).append(clone);
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
        }
    ]);

    material.directive('materialTab', [
    	'$compile',
    	function($compile) {
    		return {
    			restrict: 'EA',
    			controller: 'materialTabController',
    			require: ['materialTab', '^materialTabs'],
    			scope: {
    				label: '@'
    			},
    			compile: function($element, $attrs) {
					var label = $element.find('material-tab-label');

					if (label.length) {
						label.remove();
					} 
					else if (ng.isDefined($attrs.label)) {
						label = ng.element('<material-tab-label>').html($attrs.label);
					} 
					else {
						// If nothing is found, use the tab's content as the label
						label = ng.element('<material-tab-label>').append($element.contents().remove());
					}

					// Everything that's left as a child is the tab's content.
					var content = $element.contents().remove();

    				return function($scope, $element, $attrs, ctrls) {
    					var tab = ctrls[0],
    						tabs = ctrls[1],
    						labelClone = label.clone(),
    						contentClone = content.clone();

    					// Clone the label and the content;
				        $element.append(labelClone);
				        $compile(labelClone)($scope.$parent);
				        tab.content = contentClone;

    					tabs.add(tab);

    					if (!ng.isDefined($attrs.ngClick)) {
    						$element.on('click', function () {
    							$scope.$apply(function () {
    								tabs.select(tab);
    							});
    						});
    					};

    					// If this tab is defined using an ng-repeat we need to set up a watcher
    					if (ng.isNumber($scope.$parent.$index)) {
					        scope.$watch('$parent.$index', function (newIndex) {
					        	tabsCtrl.move(tabItemCtrl, newIndex);
					        });
    					};

				        $scope.$on('$destroy', function() {
    						tabs.remove(tab);
    					});
    				}
    			}
    		}
    	}
    ]);

	material.controller('materialTabsController', [
		'$scope',
		'$element',
		function($scope, $element) {
			var self = this,
				tabs = [];

			ng.extend(self, {
				element: $element,
				contentEl: ng.element($element[0].querySelector('.material-tabs-content')),

				getTabAt: function(index) {
					return ng.isNumber(index) && index >= 0 ? tabs[index] : null;
				},

				getSelected: function() {
					return self.getTabAt($scope.selectedIndex);
				},

				indexOf: function(tab) {
					return tabs.indexOf(tab);
				},

				add: function(tab, index) {
					var selectedIndex = $scope.selectedIndex;

					index = ng.isNumber(index) ? index : tabs.length;
					tabs.splice(index, 0, tab);

					// Give the tabs ctrl the chance to act upon its own addition to the tabs container
					tab.onAdd(self.contentEl);

					if (selectedIndex === -1 || !ng.isNumber(selectedIndex) || selectedIndex === index) {
						self.select(tab);
					}
				},

				remove: function(tab, noSelectNext) {
					var index = tabs.indexOf(tab);

					if (index !== -1) {
						if (self.getSelected() === tab) {
							if (tabs.length > 1) {
								self.select(self.getPrevious() || self.getNext());
							}
							else {
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
		}
	]);

	material.controller('materialTabController', [
		'$scope',
		'$element',
		'$animate',
		'$compile',
		function($scope, $element, $animate, $compile) {
			var self = this;

			ng.extend(self, {
				element: $element,
				contentEl: ng.element('<div class="material-tabcontent"></div>'),	

				onAdd: function (containerEl) {
					if (self.content.length) {
						self.contentEl.append(self.content);
						self.contentScope = $scope.$parent.$new();
						containerEl.append(self.contentEl);

						$compile(self.contentEl)(self.contentScope);
						self.disconnectScope(self.contentScope);
					}
				},

				onRemove: function () {
					$animate.leave(self.contentEl).then(function() {
						self.contentScope && self.contentScope.$destroy();
						self.contentScope = null;
					});
				},

				onSelect: function () {
					self.reconnectScope(self.contentScope);
				    $element.addClass('material-tab-active');
				    $animate.addClass(self.contentEl, 'material-opened');
				},

				onDeselect: function () {
				    self.disconnectScope(self.contentScope);
				    $element.removeClass('material-tab-active');
				    $animate.removeClass(self.contentEl, 'material-opened');
				},

				// These two methods are copied from angular-material util.js
				// Stop watchers and events from firing on a scope without destroying it,
				// by disconnecting it from its parent and its siblings' linked lists.
				disconnectScope: function (scope) {
					if (!scope) return;

					// we can't destroy the root scope or a scope that has been already destroyed
					if (scope.$root === scope) return;
					if (scope.$$destroyed ) return;

					var parent = scope.$parent;
					scope.$$disconnected = true;

					// See Scope.$destroy
					if (parent.$$childHead === scope) parent.$$childHead = scope.$$nextSibling;
					if (parent.$$childTail === scope) parent.$$childTail = scope.$$prevSibling;
					if (scope.$$prevSibling) scope.$$prevSibling.$$nextSibling = scope.$$nextSibling;
					if (scope.$$nextSibling) scope.$$nextSibling.$$prevSibling = scope.$$prevSibling;

					scope.$$nextSibling = scope.$$prevSibling = null;
				},

				reconnectScope: function (scope) {
					if (!scope) return;

					if (scope.$root === scope) return;
					if (!scope.$$disconnected) return;

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
		}
	]);	
});