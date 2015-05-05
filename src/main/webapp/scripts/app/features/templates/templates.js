'use strict';

angular.module('spadecoreApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('templates', {
                parent: 'features',
                url: '/templates',
                data: {
                    roles: [], 
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/features/templates/templates.html',
                        controller: 'TemplatesController'
                    }
                },
                resolve: {
                    resolveTemplates:['TemplateService2', function (templateService2) {
                        return templateService2.getPods();
                    }] 
                },
//                ,
//                resolve: {
//                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
//                        $translatePartialLoader.addPart('monitor');
//                        return $translate.refresh();
//                    }]
//                }
            });
    });
