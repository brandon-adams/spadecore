'use strict';

angular.module('spadecoreApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('features', {
                abstract: true,
                parent: 'site'
            });
    });
