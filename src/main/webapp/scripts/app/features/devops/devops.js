'use strict';

angular.module('spadecoreApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('devops', {
                parent: 'features',
                url: '/devops',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/features/devops/devops.html',
                        controller: 'DevopsController'
                    }
                }
//                ,
//                resolve: {
//                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
//                        $translatePartialLoader.addPart('stats');
//                        return $translate.refresh();
//                    }]
//                }
            });
    });
