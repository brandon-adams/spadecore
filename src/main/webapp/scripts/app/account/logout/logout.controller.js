'use strict';

angular.module('spadecoreApp')
    .controller('LogoutController', function ($scope, $rootScope, $state, $cookies, Auth, Principal) {
        Auth.logout();
        $scope.logout = function (){
        	Auth.logout();
        	$cookies.currentUser = 'undefined';
        	$cookies.currentProj = 'undefined';
        	$rootScope.currentUser = 'undefined';
        	$rootScope.currentProj = 'undefined';
        	$state.go('login');
        }
        
        $scope.isAuthenticated = Principal.isAuthenticated;
        $scope.isInRole = Principal.isInRole;
    });
