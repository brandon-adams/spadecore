'use strict';

angular.module('spadecoreApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('iaas', {
                parent: 'features',
                url: '/iaas',
                data: {
                    roles: [], 
                    pageTitle: 'iaas.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/features/iaas/iaas.html',
                        controller: 'IaasController'
                    }
                },
                resolve: {
                    resolveImages:['ImageService', function (imageService) {
                        return imageService.getImages();
                    }],
                }
            });
    });
