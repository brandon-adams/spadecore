'use strict';

angular.module('spadecoreApp')
	 .controller('ManagementController', function($scope, $state, $cookies, $mdDialog, resolveUsers, UserService, Principal, Auth, $http, templateService) {

	
	$scope.currentUser = $cookies.currentUser;
	$scope.currentProj = $cookies.currentProj;
	
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
		  
		  $scope.roles = [ "admin_role", "brad_role", "chris_role", "devin_role", "eric_role" ]
		  
		  $scope.selectedUser = {};
		  function selectUser(user){
			  $scope.selectedUser = user;
			  //$scope.selectedUser.selected = true;
		  }
		  
		  $scope.selectUser = selectUser;
		  
		  // Need to implement this for users
//		  $scope.changeSelection = function(pod) {
//				if (pod.$selected){
//					$scope.selectedPod = pod;
//				} else {
//					$scope.selectedPod = {};
//				}
//			}
		  
		  $scope.addRole = function(user, role){
			  var temp = JSON.parse(user);
			  console.log(temp);
			  console.log(role);
			  temp.roles.push(role);
			  console.log(temp);
			  // Send off updated user info to back end
		  }
		  
		  $scope.users = resolveUsers.map(function(item){
				return item;
			});
		  console.log($scope.users);
			$scope.logout = function () {
	            Auth.logout();
	            $state.go('login');
	        };
			
			Principal.identity().then(function(account) {
				$scope.account = account;
				$scope.isAuthenticated = Principal.isAuthenticated;
			});
		})
		.factory('UsersService', function ($http) {
			return {
				getUsers: function() {
					var temp = $http.get("http://localhost:8080/spade/api/users")
					.then(function(response) {
						console.log(response.data.items);
						return response.data.items;
					});
//					var promise = temp.map(function(item){
//						return JSON.parse(item);
//					});
             return temp;
         }
	 }
	 
	 });
