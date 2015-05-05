'use strict';

angular.module('spadecoreApp')
    .controller('LoginController', function ($rootScope, $scope, $state, $timeout, $cookies, Auth, UserService) {
        $scope.user = {};
        $scope.errors = {};

        $scope.rememberMe = true;
        $timeout(function (){angular.element('[ng-model="username"]').focus();});
        $scope.login = function () {
            Auth.login({
                username: $scope.username,
                password: $scope.password,
                rememberMe: $scope.rememberMe
            }).then(function () {
                $scope.authenticationError = false;
                $cookies.currentUser = $scope.username;
                $scope.user = UserService.getUser();
                console.log($scope.user);
                $cookies.currentProject = $scope.user.default_project;
                $state.go("home");
                if ($rootScope.previousStateName === 'register') {
                    $state.go('home');
                } else {
                    $rootScope.back();
                }
            }).catch(function () {
                $scope.authenticationError = true;
            });
        };
    });