'use strict';

angular.module('spadecoreApp')
    .controller('NavbarController', function ($scope, $location, $state, Auth, Principal) {
        $scope.isAuthenticated = Principal.isAuthenticated;
        $scope.isInRole = Principal.isInRole;
        $scope.$state = $state;

//        $scope.logout = function () {
//            Auth.logout();
//            $state.go('home');
//        };
        
        $scope.logout = function () {
            Auth.logout();
            $state.go('login');
        };
        
        $scope.monitor = function () {
            $state.go('monitor2');
        }
        
        $scope.stats = function () {
            $state.go('stats');
        };
        
        $scope.templates = function () {
            $state.go('templates');
        };
    });
