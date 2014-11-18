define([
    './directive',
    'angular',
    'rx',
    'rx.binding',
    'rx.async',
    'rx.time'
], function (directive, ng) {
    'use strict';
    var doc = document,
        backdrop = ng.element(doc.createElement('div'));

    //set classes for backdrop
    backdrop.addClass('material-drawer-backdrop');

    //directive
    directive('drawer', [
        '$state',
        '$parse'
    ], function ($state, $parse) {
        return function (scope, elm, args) {
            var drawer = ng.element(elm[0]),
                container = drawer.parent();

            function onBackdropClick() {
                var Observable = Rx.Observable;
                Observable.amb(
                    Observable.fromEvent(drawer, 'transitionend'),
                    Observable.fromEvent(drawer, 'webkitTransitionEnd'),
                    Observable.timer(900)
                ).subscribe(function () {
                    if (args.closeHandler !== undefined) {
                        $parse(args.closeHandler)(scope);
                    }
                });

                drawer.removeClass('material-drawer-open');
                backdrop.removeClass('material-drawer-backdrop-open');
            }

            backdrop.on('click', onBackdropClick);
            container.append(backdrop);

            setTimeout(function() {
                drawer.addClass('material-drawer-open');
                backdrop.addClass('material-drawer-backdrop-open');
            }, 1);

            //remove
            scope.$on('$destroy', function () {
                backdrop.off('click', onBackdropClick);
                backdrop.remove();
            });
        };
    });
});