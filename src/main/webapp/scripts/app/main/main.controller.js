'use strict';

angular.module('spadecoreApp')
    .controller('MainController', function ($scope, $rootScope, $state, $cookies, $mdDialog, resolveUser, UserService, Principal, Auth, $http) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
        });
      //var currentUser = $cookies.get('currentUser');
    	//var currentProj = $cookies.get('currentProj');
    	$scope.currentUser = $cookies.currentUser;
    	$scope.currentProj = $cookies.currentProj;
    	$rootScope.currentUser = $cookies.currentUser;
    	$rootScope.currentProj = $cookies.currentProj;
    	
    	console.log($scope.currentUser+", "+$scope.currentProj);
    	
    	$scope.setCurrentProject = function(proj){
    		$scope.currentProj = proj;
    		$cookies.currentProj = proj;
    	}
    	
    	$scope.spadeInfo = function(ev) {
    		    $mdDialog.show(
    		      $mdDialog.alert()
    		        .title("SPADE")
    		        .content("NewWave’s Self-Service Portal And Dashboard Environment is a next generation provisioning, deployment, and monitoring dashboard. " +
    		        		"SPADE manages the resources for each of your projects and allows you to monitor performance and metrics. \n" +
    		        		"SPADE puts the power of infrastructure management in the hands of your team with just few clicks. " +
    		        		"Applications built in container-based environments shift focus from technology maintenance to your business requirements. " +
    		        		"Multi-container environments combined with DevOps methodology significantly reduce the time and cost needed for setup and maintenance.")
    		        .ariaLabel("Spade Info")
    		        .ok("Welcome to SPADE!")
    		        .targetEvent(ev)
    		    );
    		  };
    		  
    		  $scope.user = resolveUser;
    		  $scope.projects = [];
    		  console.log($scope.user.projects);
    			for (var p in $scope.user.projects){
    				var proj = $scope.user.projects[p];
    				console.log(proj);
    				  $http.get("http://localhost:8080/spade/api/projects/"+proj)
    					.then(function(response) {
    							console.log(response.data);
    							$scope.projects.push(response.data.items[0]);
//    							$scope.info = data;
    					});
    			}
    		  
    		  console.log($scope.projects);

    			$scope.logout = function () {
    	            Auth.logout();
    	            $state.go('login');
    	        };
    			
    			Principal.identity().then(function(account) {
    				$scope.account = account;
    				$scope.isAuthenticated = Principal.isAuthenticated;
    			});
    		})
    		.factory('UserService', function ($http, $cookies) {
    			return {
    				getUser: function() {
    					var promise = $http.get("http://localhost:8080/spade/api/users/"+$cookies.currentUser)
    					.then(function(response) {
    						console.log(response.data.items[0]);
    						return response.data.items[0];
    					});
                 return promise;
             }
    	 }
    });
