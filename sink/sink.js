require.config({
    paths: {
        'angular':              'bower_components/angular/angular',
        'angular-animate':      'bower_components/angular-animate/angular-animate',
        'requirejs-domready':   'bower_components/requirejs-domready/domReady',
        'connect-material':     '../src'
    },
    shim   : {
        'angular': {
            exports: 'angular'
        },
        'angular-animate'   : ['angular']
    }
});

define([
    'angular',
    'requirejs-domready',
    'angular-animate',

    'connect-material/sidenav/sidenav',
    'connect-material/pickers/pickers',
    'connect-material/drawer/drawer',
    'connect-material/textfield/textfield',
    'connect-material/select/select'
], function(ng, domReady) {
    'use strict';

    var module = ng.module('sink', [
        'connectMaterialDirectives'
    ]);

    module.controller('SinkCtrl', [
        '$scope', 
        'materialDrawerService',
        function($scope, drawers) {
            drawers.open('right');

            $scope.openDrawer = function(id) {
                drawers.open(id);
            };

            $scope.closeDrawer = function(id) {
                drawers.close(id);
            };

            var hasIcons = true;
            $scope.toggleMenuIcons = function(e) {
                e.stopPropagation();
                hasIcons = !hasIcons;
            };
            $scope.hasMenuIcons = function() {
                return hasIcons;
            };

            var modal = true;
            $scope.toggleModal = function() {
                modal = !modal;
            };
            $scope.isModal = function() {
                return modal;
            };

            $scope.user = {
                firstName: 'Tommy',
                lastName: null,
                address: 'Gedempte Oude Gracht 54a',
                city: 'Haarlem',
                state: 'NY',
                gender: null
            };;

            $scope.states = [
                {label: 'N/A', value: 'none'},
                {label: 'Alabama', value: 'AL'},
                {label: 'Alaska', value: 'AK'},
                {label: 'American Samoa', value: 'AS'},
                {label: 'Arizona', value: 'AZ'},
                {label: 'Arkansas', value: 'AR'},
                {label: 'California', value: 'CA'},
                {label: 'Colorado', value: 'CO'},
                {label: 'Connecticut', value: 'CT'},
                {label: 'Delaware', value: 'DE'},
                {label: 'District of Columbia', value: 'DC'},
                {label: 'Federated States of Micronesia', value: 'FM'},
                {label: 'Florida', value: 'FL'},
                {label: 'Georgia', value: 'GA'},
                {label: 'Guam', value: 'GU'},
                {label: 'Hawaii', value: 'HI'},
                {label: 'Idaho', value: 'ID'},
                {label: 'Illinois', value: 'IL'},
                {label: 'Indiana', value: 'IN'},
                {label: 'Iowa', value: 'IA'},
                {label: 'Kansas', value: 'KS'},
                {label: 'Kentucky', value: 'KY'},
                {label: 'Louisiana', value: 'LA'},
                {label: 'Maine', value: 'ME'},
                {label: 'Marshall Islands', value: 'MH'},
                {label: 'Maryland', value: 'MD'},
                {label: 'Massachusetts', value: 'MA'},
                {label: 'Michigan', value: 'MI'},
                {label: 'Minnesota', value: 'MN'},
                {label: 'Mississippi', value: 'MS'},
                {label: 'Missouri', value: 'MO'},
                {label: 'Montana', value: 'MT'},
                {label: 'Nebraska', value: 'NE'},
                {label: 'Nevada', value: 'NV'},
                {label: 'New Hampshire', value: 'NH'},
                {label: 'New Jersey', value: 'NJ'},
                {label: 'New Mexico', value: 'NM'},
                {label: 'New York', value: 'NY'},
                {label: 'North Carolina', value: 'NC'},
                {label: 'North Dakota', value: 'ND'},
                {label: 'Northern Mariana Islands', value: 'MP'},
                {label: 'Ohio', value: 'OH'},
                {label: 'Oklahoma', value: 'OK'},
                {label: 'Oregon', value: 'OR'},
                {label: 'Palau', value: 'PW'},
                {label: 'Pennsylvania', value: 'PA'},
                {label: 'Puerto Rico', value: 'PR'},
                {label: 'Rhode Island', value: 'RI'},
                {label: 'South Carolina', value: 'SC'},
                {label: 'South Dakota', value: 'SD'},
                {label: 'Tennessee', value: 'TN'},
                {label: 'Texas', value: 'TX'},
                {label: 'Utah', value: 'UT'},
                {label: 'Vermont', value: 'VT'},
                {label: 'Virgin Islands', value: 'VI'},
                {label: 'Virginia', value: 'VA'},
                {label: 'Washington', value: 'WA'},
                {label: 'West Virginia', value: 'WV'},
                {label: 'Wisconsin', value: 'WI'},
                {label: 'Wyoming', value: 'WY'}
            ];
        }
    ]);

    domReady(function() {
        ng.bootstrap(document, ['sink']);
    });
});