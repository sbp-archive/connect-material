define([
    'underscore',
], function (_) {
    'use strict';
    return {
        /**
         * 
         * @param  {[type]} deps   [description]
         * @param  {[type]} method [description]
         * @return {[type]}        [description]
         */
        ngCurry: function (deps, method) {
            //curry
            if (_.isArray (deps)) {
                deps.push(method);
            } else {
                deps = [deps];
            }
            return deps;
        },
        /**
         * Creates a camelcase name of string
         * The best way to use this via Function.prototype.bind
         * @example
         * var controller = camelcase.bind(null, {
         *    prefix: 'Paas',
         *    postfix: 'Controller',
         *    separator: '/'
         * });
         * console.log(controller('test/extra')); //PaasTestExtraController
         * @param {String} conf.prefix
         * @param {String} conf.postfix
         * @param {String} [conf.separator=/]
         * @param {String} names
         * @return {String}
         */
        camelcase: function (conf, name) {
            var regex = '';
            if (!_.isUndefined(conf.prefix)) {
                regex += '^([a-z])|';
            }
            //default separator
            if (!conf.separator) {
                conf.separator = '/';
            }
            //needs escape
            if (~_.indexOf('.[]{}()|'.split(''), conf.separator)) {
                conf.separator = '\\' +  conf.separator;
            }
            regex += conf.separator + '([a-z])';
            //to camel-case
            name = name.replace(new RegExp(regex, 'g'), function (match, p1, p2) { 
                return (p2 || p1).toUpperCase();
            });
            //add postfix
            if (conf.postfix) {
                name += conf.postfix;
            }
            //add postfix
            if (conf.prefix) {
                name = conf.prefix + name;
            }
            //return new name
            return name;
        }
    };
});