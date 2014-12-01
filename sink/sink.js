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
    'connect-material/searchfield/searchfield',
    'connect-material/select/select',
    'connect-material/checkbox/checkbox',
    'connect-material/dialog/dialog'
], function(ng, domReady) {
    'use strict';

    var module = ng.module('sink', [
        'connectMaterialDirectives'
    ]);

    module.controller('SinkCtrl', [
        '$scope', 
        'materialDrawerService',
        'materialDialogService',
        function($scope, drawers, dialogs) {
            $scope.openDrawer = function(id) {
                drawers.open(id);
            };

            $scope.closeDrawer = function(id) {
                drawers.close(id);
            };

            $scope.openDialog = function(id) {
                dialogs.open(id);
            };

            $scope.closeDialog = function(id) {
                dialogs.close(id);
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
                gender: null,
                receiveEmail: true,
                receiveNewsletter: false,
                dateOfBirth: new Date()
            };

            $scope.gridData = [
                {
                    "firstName": "Dominic",
                    "lastName": "Kent",
                    "dateOfBirth": "01-27-57",
                    "company": "Luctus Felis Purus LLP"
                },
                {
                    "firstName": "Xenos",
                    "lastName": "Mccall",
                    "dateOfBirth": "02-10-80",
                    "company": "Pede Malesuada Vel Inc."
                },
                {
                    "firstName": "Ulric",
                    "lastName": "Vargas",
                    "dateOfBirth": "03-05-82",
                    "company": "Enim LLC"
                },
                {
                    "firstName": "Zane",
                    "lastName": "Keller",
                    "dateOfBirth": "04-30-92",
                    "company": "Diam At Pretium Industries"
                },
                {
                    "firstName": "Dante",
                    "lastName": "Mitchell",
                    "dateOfBirth": "05-08-58",
                    "company": "Quisque Varius Consulting"
                },
                {
                    "firstName": "Sylvester",
                    "lastName": "Becker",
                    "dateOfBirth": "11-23-54",
                    "company": "Tincidunt Industries"
                },
                {
                    "firstName": "Phillip",
                    "lastName": "Bowman",
                    "dateOfBirth": "09-16-87",
                    "company": "Urna LLC"
                },
                {
                    "firstName": "Darius",
                    "lastName": "Whitney",
                    "dateOfBirth": "10-31-57",
                    "company": "Ante Ltd"
                },
                {
                    "firstName": "Jelani",
                    "lastName": "Stout",
                    "dateOfBirth": "09-20-60",
                    "company": "Scelerisque Corporation"
                },
                {
                    "firstName": "Rafael",
                    "lastName": "Stevenson",
                    "dateOfBirth": "04-09-80",
                    "company": "Phasellus Nulla Integer Industries"
                },
                {
                    "firstName": "Jameson",
                    "lastName": "Lee",
                    "dateOfBirth": "11-07-96",
                    "company": "Diam Dictum Institute"
                },
                {
                    "firstName": "Hop",
                    "lastName": "Ramsey",
                    "dateOfBirth": "11-08-91",
                    "company": "Semper Foundation"
                },
                {
                    "firstName": "Beau",
                    "lastName": "Whitney",
                    "dateOfBirth": "04-19-52",
                    "company": "Convallis Foundation"
                },
                {
                    "firstName": "Cadman",
                    "lastName": "Russell",
                    "dateOfBirth": "11-15-77",
                    "company": "Sit Ltd"
                },
                {
                    "firstName": "Colton",
                    "lastName": "Shaw",
                    "dateOfBirth": "01-02-66",
                    "company": "Eget Odio Ltd"
                },
                {
                    "firstName": "Plato",
                    "lastName": "Watkins",
                    "dateOfBirth": "12-01-61",
                    "company": "Viverra Donec Industries"
                },
                {
                    "firstName": "Thomas",
                    "lastName": "Scott",
                    "dateOfBirth": "12-19-61",
                    "company": "Facilisis Magna Tellus PC"
                },
                {
                    "firstName": "Grant",
                    "lastName": "Barrera",
                    "dateOfBirth": "11-05-93",
                    "company": "Neque Nullam Ut Corporation"
                },
                {
                    "firstName": "Malachi",
                    "lastName": "Cook",
                    "dateOfBirth": "09-22-74",
                    "company": "Nonummy Ipsum Non Foundation"
                },
                {
                    "firstName": "Slade",
                    "lastName": "Carpenter",
                    "dateOfBirth": "03-13-94",
                    "company": "Semper Pretium Limited"
                },
                {
                    "firstName": "Garth",
                    "lastName": "Schroeder",
                    "dateOfBirth": "01-22-54",
                    "company": "Ultrices Company"
                },
                {
                    "firstName": "Hakeem",
                    "lastName": "Cameron",
                    "dateOfBirth": "09-14-80",
                    "company": "Donec Luctus Aliquet LLP"
                },
                {
                    "firstName": "Mason",
                    "lastName": "Richards",
                    "dateOfBirth": "04-03-99",
                    "company": "Ipsum Primis Industries"
                },
                {
                    "firstName": "Fuller",
                    "lastName": "Shaffer",
                    "dateOfBirth": "08-05-87",
                    "company": "A Dui Cras Company"
                },
                {
                    "firstName": "Amir",
                    "lastName": "Mcdonald",
                    "dateOfBirth": "05-23-65",
                    "company": "Fermentum Convallis Foundation"
                },
                {
                    "firstName": "Quinlan",
                    "lastName": "Bonner",
                    "dateOfBirth": "04-29-89",
                    "company": "Aenean Sed Ltd"
                },
                {
                    "firstName": "Addison",
                    "lastName": "Moses",
                    "dateOfBirth": "07-23-83",
                    "company": "Purus Company"
                },
                {
                    "firstName": "Merritt",
                    "lastName": "Summers",
                    "dateOfBirth": "02-01-51",
                    "company": "Turpis In PC"
                },
                {
                    "firstName": "Carl",
                    "lastName": "Grant",
                    "dateOfBirth": "03-25-53",
                    "company": "Tellus Eu PC"
                },
                {
                    "firstName": "Isaiah",
                    "lastName": "Singleton",
                    "dateOfBirth": "09-03-61",
                    "company": "Suspendisse Ltd"
                },
                {
                    "firstName": "Lamar",
                    "lastName": "Ferguson",
                    "dateOfBirth": "08-13-81",
                    "company": "Lectus Sit Foundation"
                },
                {
                    "firstName": "Kadeem",
                    "lastName": "Mann",
                    "dateOfBirth": "08-28-79",
                    "company": "Elementum Purus Foundation"
                },
                {
                    "firstName": "Derek",
                    "lastName": "Sanders",
                    "dateOfBirth": "02-21-95",
                    "company": "Et Netus Et Foundation"
                },
                {
                    "firstName": "Clayton",
                    "lastName": "Stein",
                    "dateOfBirth": "05-20-97",
                    "company": "Congue In Scelerisque PC"
                },
                {
                    "firstName": "Edward",
                    "lastName": "Monroe",
                    "dateOfBirth": "03-12-78",
                    "company": "Eu Limited"
                },
                {
                    "firstName": "Hashim",
                    "lastName": "Hurley",
                    "dateOfBirth": "07-14-99",
                    "company": "Vehicula Aliquet Libero Consulting"
                },
                {
                    "firstName": "Ivor",
                    "lastName": "Mccullough",
                    "dateOfBirth": "04-04-56",
                    "company": "Mauris Quis Inc."
                },
                {
                    "firstName": "Basil",
                    "lastName": "Collins",
                    "dateOfBirth": "03-15-66",
                    "company": "Ipsum Institute"
                },
                {
                    "firstName": "Robert",
                    "lastName": "Pena",
                    "dateOfBirth": "11-19-78",
                    "company": "Et Eros Corporation"
                },
                {
                    "firstName": "Troy",
                    "lastName": "Carter",
                    "dateOfBirth": "03-22-81",
                    "company": "Tristique Institute"
                },
                {
                    "firstName": "Baker",
                    "lastName": "Griffith",
                    "dateOfBirth": "03-30-71",
                    "company": "Elit Etiam Laoreet Industries"
                },
                {
                    "firstName": "George",
                    "lastName": "French",
                    "dateOfBirth": "09-13-98",
                    "company": "Ac Mattis LLC"
                },
                {
                    "firstName": "Adam",
                    "lastName": "Sweeney",
                    "dateOfBirth": "06-28-74",
                    "company": "Faucibus Leo In Limited"
                },
                {
                    "firstName": "Barclay",
                    "lastName": "Bean",
                    "dateOfBirth": "10-01-78",
                    "company": "Et Magnis PC"
                },
                {
                    "firstName": "Gage",
                    "lastName": "Battle",
                    "dateOfBirth": "07-24-91",
                    "company": "Phasellus Nulla PC"
                },
                {
                    "firstName": "Wade",
                    "lastName": "England",
                    "dateOfBirth": "05-22-83",
                    "company": "Commodo Corp."
                },
                {
                    "firstName": "Erasmus",
                    "lastName": "Peterson",
                    "dateOfBirth": "05-21-73",
                    "company": "Curae; Phasellus Consulting"
                },
                {
                    "firstName": "Chester",
                    "lastName": "Hubbard",
                    "dateOfBirth": "06-26-55",
                    "company": "Nec Cursus A Industries"
                },
                {
                    "firstName": "Malik",
                    "lastName": "Marks",
                    "dateOfBirth": "11-18-92",
                    "company": "Mauris Corporation"
                },
                {
                    "firstName": "Lars",
                    "lastName": "Hebert",
                    "dateOfBirth": "09-04-60",
                    "company": "Donec At Arcu Ltd"
                },
                {
                    "firstName": "Chancellor",
                    "lastName": "Juarez",
                    "dateOfBirth": "04-28-73",
                    "company": "Aliquet LLC"
                },
                {
                    "firstName": "Jarrod",
                    "lastName": "Hobbs",
                    "dateOfBirth": "12-21-64",
                    "company": "Rutrum Non Hendrerit Institute"
                },
                {
                    "firstName": "Cooper",
                    "lastName": "Gould",
                    "dateOfBirth": "10-27-60",
                    "company": "Mi Company"
                },
                {
                    "firstName": "Aaron",
                    "lastName": "Skinner",
                    "dateOfBirth": "05-21-70",
                    "company": "Hendrerit Id Company"
                },
                {
                    "firstName": "Porter",
                    "lastName": "Day",
                    "dateOfBirth": "05-22-61",
                    "company": "Proin Associates"
                },
                {
                    "firstName": "Jelani",
                    "lastName": "Fitzgerald",
                    "dateOfBirth": "03-31-97",
                    "company": "Augue Eu LLC"
                },
                {
                    "firstName": "Keegan",
                    "lastName": "Austin",
                    "dateOfBirth": "04-02-76",
                    "company": "Sociis Natoque Industries"
                },
                {
                    "firstName": "Kibo",
                    "lastName": "Woodard",
                    "dateOfBirth": "04-22-59",
                    "company": "Amet Metus Incorporated"
                },
                {
                    "firstName": "Gray",
                    "lastName": "Mathews",
                    "dateOfBirth": "05-20-71",
                    "company": "Non Justo Foundation"
                },
                {
                    "firstName": "Thor",
                    "lastName": "Chambers",
                    "dateOfBirth": "11-10-82",
                    "company": "Malesuada Fringilla LLP"
                },
                {
                    "firstName": "Cullen",
                    "lastName": "Franco",
                    "dateOfBirth": "08-14-87",
                    "company": "Magna Foundation"
                },
                {
                    "firstName": "Barry",
                    "lastName": "Wagner",
                    "dateOfBirth": "01-03-82",
                    "company": "Tristique Pellentesque LLP"
                },
                {
                    "firstName": "Harrison",
                    "lastName": "Talley",
                    "dateOfBirth": "10-16-51",
                    "company": "Etiam Corp."
                },
                {
                    "firstName": "Garrett",
                    "lastName": "Velasquez",
                    "dateOfBirth": "10-15-73",
                    "company": "Ornare Foundation"
                },
                {
                    "firstName": "Cole",
                    "lastName": "Forbes",
                    "dateOfBirth": "10-14-62",
                    "company": "In Faucibus Foundation"
                },
                {
                    "firstName": "Armando",
                    "lastName": "Roman",
                    "dateOfBirth": "01-31-69",
                    "company": "Interdum Ligula Eu Incorporated"
                },
                {
                    "firstName": "Grant",
                    "lastName": "Estes",
                    "dateOfBirth": "09-04-81",
                    "company": "Id Risus Quis Incorporated"
                },
                {
                    "firstName": "Omar",
                    "lastName": "Lloyd",
                    "dateOfBirth": "10-13-66",
                    "company": "In Magna Phasellus LLC"
                },
                {
                    "firstName": "Oren",
                    "lastName": "Kidd",
                    "dateOfBirth": "01-17-73",
                    "company": "Fames Ac Turpis PC"
                },
                {
                    "firstName": "Elmo",
                    "lastName": "Sanders",
                    "dateOfBirth": "03-27-57",
                    "company": "Quam Company"
                },
                {
                    "firstName": "Ishmael",
                    "lastName": "Wood",
                    "dateOfBirth": "06-25-87",
                    "company": "Integer Eu Associates"
                },
                {
                    "firstName": "Berk",
                    "lastName": "Carrillo",
                    "dateOfBirth": "08-16-57",
                    "company": "Rutrum Eu PC"
                },
                {
                    "firstName": "Dorian",
                    "lastName": "Delgado",
                    "dateOfBirth": "06-04-59",
                    "company": "Eget Inc."
                },
                {
                    "firstName": "Scott",
                    "lastName": "Weiss",
                    "dateOfBirth": "06-01-61",
                    "company": "Sagittis Associates"
                },
                {
                    "firstName": "Elmo",
                    "lastName": "Roy",
                    "dateOfBirth": "05-16-63",
                    "company": "Nec Quam Curabitur Associates"
                },
                {
                    "firstName": "Geoffrey",
                    "lastName": "Guthrie",
                    "dateOfBirth": "06-07-59",
                    "company": "Proin Nisl Sem Inc."
                },
                {
                    "firstName": "Trevor",
                    "lastName": "Bowers",
                    "dateOfBirth": "05-20-93",
                    "company": "Nec Ligula Consulting"
                },
                {
                    "firstName": "Wayne",
                    "lastName": "Dominguez",
                    "dateOfBirth": "11-05-79",
                    "company": "Lacus Inc."
                },
                {
                    "firstName": "Coby",
                    "lastName": "Herrera",
                    "dateOfBirth": "07-15-58",
                    "company": "Mauris LLP"
                },
                {
                    "firstName": "Keith",
                    "lastName": "Lowe",
                    "dateOfBirth": "05-14-67",
                    "company": "Blandit Company"
                },
                {
                    "firstName": "Derek",
                    "lastName": "Gilliam",
                    "dateOfBirth": "10-28-76",
                    "company": "Non Bibendum Industries"
                },
                {
                    "firstName": "Phelan",
                    "lastName": "Fry",
                    "dateOfBirth": "03-16-58",
                    "company": "Auctor Non Institute"
                },
                {
                    "firstName": "Levi",
                    "lastName": "Baxter",
                    "dateOfBirth": "02-24-95",
                    "company": "Eu Institute"
                },
                {
                    "firstName": "Noble",
                    "lastName": "Baxter",
                    "dateOfBirth": "04-07-54",
                    "company": "Aliquam Corporation"
                },
                {
                    "firstName": "Arthur",
                    "lastName": "Mccall",
                    "dateOfBirth": "06-05-98",
                    "company": "Nec Euismod Limited"
                },
                {
                    "firstName": "Aquila",
                    "lastName": "Meyer",
                    "dateOfBirth": "10-27-73",
                    "company": "Nec Urna Associates"
                },
                {
                    "firstName": "Grant",
                    "lastName": "Adams",
                    "dateOfBirth": "02-20-87",
                    "company": "Pede Nec Ante Foundation"
                },
                {
                    "firstName": "Alfonso",
                    "lastName": "Jackson",
                    "dateOfBirth": "01-30-54",
                    "company": "Amet Limited"
                },
                {
                    "firstName": "Luke",
                    "lastName": "Klein",
                    "dateOfBirth": "08-27-76",
                    "company": "Ac Corp."
                },
                {
                    "firstName": "Mohammad",
                    "lastName": "Odonnell",
                    "dateOfBirth": "03-30-78",
                    "company": "Lacus Cras Interdum Incorporated"
                },
                {
                    "firstName": "Craig",
                    "lastName": "Page",
                    "dateOfBirth": "10-05-77",
                    "company": "Lectus Rutrum Company"
                },
                {
                    "firstName": "Tyler",
                    "lastName": "Hoffman",
                    "dateOfBirth": "05-07-52",
                    "company": "Sem Semper Erat Inc."
                },
                {
                    "firstName": "Palmer",
                    "lastName": "Becker",
                    "dateOfBirth": "05-09-83",
                    "company": "Phasellus Fermentum Incorporated"
                },
                {
                    "firstName": "Coby",
                    "lastName": "Underwood",
                    "dateOfBirth": "08-02-00",
                    "company": "Mauris Id Sapien Incorporated"
                },
                {
                    "firstName": "Marsden",
                    "lastName": "Allen",
                    "dateOfBirth": "02-12-95",
                    "company": "Dis Parturient LLP"
                },
                {
                    "firstName": "Jakeem",
                    "lastName": "Franklin",
                    "dateOfBirth": "12-02-77",
                    "company": "Dui Fusce Aliquam PC"
                },
                {
                    "firstName": "Rahim",
                    "lastName": "Weber",
                    "dateOfBirth": "03-08-53",
                    "company": "Vestibulum Accumsan Company"
                },
                {
                    "firstName": "Graiden",
                    "lastName": "Cohen",
                    "dateOfBirth": "05-13-83",
                    "company": "Enim Non Nisi Ltd"
                },
                {
                    "firstName": "Carl",
                    "lastName": "Carter",
                    "dateOfBirth": "08-25-58",
                    "company": "Aliquam Adipiscing Lobortis Incorporated"
                },
                {
                    "firstName": "Raymond",
                    "lastName": "Sears",
                    "dateOfBirth": "02-15-98",
                    "company": "Lectus Associates"
                }
            ];

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