'use strict';

angular.module('spadecoreApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('modal', {
                parent: 'features',
                url: '/modal',
                data: {
                    roles: [], 
                    pageTitle: 'modal.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/features/iaas/iaas.html',
                        controller: 'ModalCtrl'
                    }
                },
                resolve: {
//                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
//                        $translatePartialLoader.addPart('iaas');
//                        return $translate.refresh();
//                    }]

                    resolveImages:['ImageService', function (imageService) {
                    	return imageService.getImages();
//                        return slaveService.getSlaves();
                    }]
                }
            });
    });
