'use strict';

angular.module('spadecoreApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('management', {
                parent: 'site',
                url: '/management',
                data: {
                    roles: [],
//                    requireLogin: true
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/admin/management/management.html',
                        controller: 'ManagementController'
                    }
                },
                resolve: {
                	resolveUsers:['UsersService', function (usersService) {
                        return usersService.getUsers();
                    }],
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('main');
                        return $translate.refresh();
                    }]
                }
            });
    });
