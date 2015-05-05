'use strict';

angular.module('spadecoreApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


