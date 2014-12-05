define([
    '../material',
    'angular'
], function (material, ng) {
    'use strict';

    material.directive('materialDialog', [
        '$animate',
        'materialConfigService',
        'materialDialogService',
        function ($animate, configs, dialogs) {
            var ID_GENERATOR = 1;

            return {
                restrict: 'EA',
                scope: {
                    dialogId: '@'
                },
                transclude: true,
                replace: true,
                template: [
                    '<div class="material-dialog-wrap">',
                        '<div ',
                            'ng-if="_modal" ',
                            'class="material-backdrop" ',
                            'ng-class="{\'material-opened\':_dialog.opened}" ',
                            'ng-click="onBackdropClick($event)" ',
                            'backdrop-for-dialog="{{dialogId}}">',
                        '</div>',
                        '<div class="material-dialog" ng-transclude></div>',
                    '</div>'
                ].join(''),

                compile: function ($element, $attrs) {
                    if (ng.isUndefined($attrs.dialogId)) {
                        $attrs.dialogId = 'material-dialog-' + ID_GENERATOR++;
                        $element.attr('dialog-id', $attrs.dialogId);
                    }

                    return function ($scope, $element, $attrs) {
                        var id = $attrs.dialogId,
                            backdrop = null,
                            originalParent = $element.parent(),
                            innerDialogEl = $element[0].querySelector('.material-dialog'),
                            dialog = $scope._dialog = dialogs.create(id, innerDialogEl);

                        configs.applyConfigs($scope, $attrs.dialogConfig, {
                            modal: true,
                            appendToBody: true,
                            closeOnBackdropClick: false
                        });

                        dialog.on('beforeopen', function () {
                            $element.addClass('material-opened');
                        });
                        dialog.on('close', function () {
                            $element.removeClass('material-opened');
                        });

                        // This is a bit ugly I think but it solves the problem
                        // where the close was already called for this dialog
                        // before this link method is called
                        if (dialog.deferred.open) {
                            dialog.open();
                        }

                        $scope.onBackdropClick = function (e) {
                            if ($scope._closeOnBackdropClick) {
                                e.stopPropagation();
                                dialog.close();
                            }
                        };

                        $scope.$watch('_appendToBody', function (value, oldValue) {
                            if (!value) {
                                if (value !== oldValue) {
                                    originalParent.append($element);
                                }
                            } else {
                                ng.element(document.body).append($element);
                            }
                        });

                        $scope.$on('$destroy', function () {
                            dialogs.remove(id);
                        });
                    };
                }
            };
        }
    ]);

    material.factory('materialDialogService', [
        '$rootScope',
        '$compile',
        '$q',
        'materialTransitionService',
        function ($rootScope, $compile, $q, TransitionService) {
            var service = TransitionService('dialogs'),
                scopes = {},
                template = [
                    '<material-dialog dialog-id="{{dialogId}}">',
                        '<material-title>{{title}}</material-title>',
                        '<material-content>{{message}}</material-content>',
                        '<material-buttonbar>',
                            '<material-button ng-if="buttons.cancel" ng-click="onButtonClick(\'cancel\')" class="material">Cancel</material-button>',
                            '<material-button ng-if="buttons.no" ng-click="onButtonClick(\'no\')" class="material">No</material-button>',
                            '<material-button ng-if="buttons.yes" ng-click="onButtonClick(\'yes\')" class="material-primary">Yes</material-button>',
                            '<material-button ng-if="buttons.ok" ng-click="onButtonClick(\'ok\')" class="material-primary">Ok</material-button>',
                        '</material-buttonbar>',
                    '</material-dialog>'
                ].join('');

            function dialogFactory (name, buttons) {
                return function (title, message) {
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

            // We extend the transition service with some default template methods for dialogs
            ng.extend(service, {
                alert: dialogFactory('alert', {ok: true}),
                confirm: dialogFactory('confirm', {yes: true, no: true})
            });

            return service;
        }
    ]);
});