define([
    'angular',
    './tools',
], function (ng, Tools) {
    'use strict';
    var module = ng.module('connectMaterialDirectives', []),
    directiveName = Tools.camelcase.bind(null, {
        prefix: 'material',
        separator: '-'
    });
    /**
     * Add a directive to the PAAS directives
     * @param  {String} name 
     * @param  {Array} deps
     * @param  {Function} directive
     */
    return function (name, deps, directive) {
        module.directive(directiveName(name), Tools.ngCurry(deps, directive));
    };
});