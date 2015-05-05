'use strict';

angular.module('spadecoreApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('statstable', {
                parent: 'features',
                url: '/statstable',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/features/statstable/statstable.html',
                        controller: 'StatsTableController'
                    }
                },
                resolve: {
                	resolveUser:['UserService', function (userService) {
                        return userService.getUser();
                    }],
                    resolvePods:['PodService', function (podService) {
                        return podService.getPods();
                    }] 
                },
//                ,
//                resolve: {
//                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
//                        $translatePartialLoader.addPart('stats');
//                        return $translate.refresh();
//                    }]
//                }
            });
    });
