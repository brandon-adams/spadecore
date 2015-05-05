'use strict';

angular.module('spadecoreApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('monitor', {
                parent: 'features',
                url: '/monitor',
                data: {
                    roles: [], 
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/features/monitor/monitor.html',
                        controller: 'MonitorController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('monitor');
                        return $translate.refresh();
                    }]
                }
            });
    });
