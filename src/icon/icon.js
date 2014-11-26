define([
    '../material',
    'angular'
], function (material, ng) {
    'use strict';

    material.directive('materialIcon', function() {
        return function(scope, element, attrs) {
            if (ng.isDefined(attrs.materialIcon)) {
                var parts = attrs.materialIcon.split(':'),
                    iconCls = 'icon-' + parts[0];

                iconCls += ' ' + iconCls + '-ic_' + parts[1] + '_24dp';
                element.prepend('<div class="material-icon ' + iconCls + '"></div>');
                element.addClass('material-has-icon');
            }
        }
    });
});