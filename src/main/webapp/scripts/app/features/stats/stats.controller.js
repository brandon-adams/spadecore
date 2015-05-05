'use strict'
angular.module('spadecoreApp').controller('StatsController', 
		[ "$scope", "$http", "$modal", "$state", "$timeout", "$mdDialog", "$cookies", "Auth", "resolveUser","resolveSlaves", "resolveTasks", "resolvePods", "SlaveService", "TaskService", "PodService",
        function($scope, $http, $modal, $state, $timeout, $mdDialog, $cookies, Auth, resolveUser, resolveSlaves, resolveTasks, resolvePods, SlaveService, TaskService, PodService){
			
			$scope.user = resolveUser;
			alert($scope.user);
			
			$scope.statsInfo = function(ev) {
			    $mdDialog.show(
			      $mdDialog.alert()
			        .title("Resources")
			        .content("The Resources view describes the system resources your application stacks are currently consuming. " +
			        		"Each graph represents a physical/virtual host in your cloud. When you launch application stacks, each server " +
			        		"will take up a certain percentage of its hosts resources (CPU, Memory, and Storage). Stacks are color coded, with " +
			        		"all servers in the same stack colored the same. Only hosts that are currently occupied are shown on this page.")
			        .ariaLabel("Stats Info")
			        .ok("Close")
			        .targetEvent(ev)
			    );
			  };
			
			$scope.pageName = "Resource View";
			$scope.switchPages = { "Resource":"stats", "Table":"statstable" };
			
			$scope.newHostnames = {"mesos-slave-2":"Host-1","mesos-slave-3":"Host-2","mesos-slave-4":"Host-3",
			                        "mesos-slave-5":"Host-4","mesos-slave-6":"Host-5","mesos-slave-7":"Host-6"}
			
			$scope.switchProject = function(proj){
				$cookies.currentProj = proj;
				//$state.go($state.current, {}, {reload:true});
			}
			
			
	$scope.slaves = resolveSlaves.items;
	function compare(a,b) {
		  if (a.hostname < b.hostname)
		     return -1;
		  if (a.hostname > b.hostname)
		    return 1;
		  return 0;
	}
	$scope.slaves.sort(compare);
	$scope.tasks = resolveTasks.items;
	$scope.pods = resolvePods.items;
	
	$scope.updateSlaves = function(){
		SlaveService.getSlaves()
		.then(function(response){
			$scope.slaves = response.items;
			$scope.slaves.sort(compare);
		})
	}
	$scope.updateTasks = function(){
		TaskService.getTasks()
		.then(function(response){
			$scope.tasks = response.items;
		})
	}
	
	$scope.updatePods = function(){
		PodService.getPods()
		.then(function(response){
			$scope.pods = response.items;
		})
	}
	
	$scope.stackColors = function (){
		var colors = {};
		
		for (var i=0; i < $scope.pods.length; i++){
			var pod = $scope.pods[i];
			var stack = pod.labels.stack;
			var color = 'rgb(' + Math.floor(Math.random() * 255) 
			+ ',' + Math.floor(Math.random() * 255) 
			+ ',' + Math.floor(Math.random() * 255) + ')';
			if (!(stack in colors)){
				//alert("stack in colors " + stack);
				colors[stack] = color;
				//alert("color in colors " + color);
			}
			//alert(color);
		}
		return colors;
	}
	//$scope.stackColors = stackColors();
	//alert(stackColors());
	
	$scope.create = function () {
        var modalInstance = $modal.open({
            templateUrl: 'scripts/app/features/iaas/iaas.html',
            controller: 'ModalCtrl',
            controllerAs: 'modal'
        });

        modalInstance.result
            .then(function (data) {
                $scope.create.closeAlert();
                $scope.create.summary = data;
                $state.go($state.current, {}, { "reload": true })
            }, function (reason) {
            	$scope.create.reason = reason;
            	//$state.go($state.current, {}, { "reload": true })
            });
    };
	
    $scope.getColor = function (data){
    	//alert(data);
    	return function (d,i){
    		//alert(data[i].label);
    		//alert(data[i].color);
    		var color = data[i].color
    		//alert(color);
    		return color;
    	}
    }
    $scope.tooltipFunction = function(){
    	return function(key, x, y, e, graph) {
        	return  (y.point.podId !== undefined ? '<h4 style="text=align:center">Server Cluster: ' + key + '</h4>' +
             '<p style="text=align:center">Server Id: ' + y.point.podId + '</p>' : '<h4 style="text=align:center">' + key + '</h4>') +
                '<p style="text=align:center">' + x + '% of host</p>'
    	}
    }
	
	
	                  $scope.xFunction = function(){
	                      return function(d) {
	                          return d.label;
	                      };
	                  }
	                  $scope.yFunction = function(){
	                      return function(d) {
	                          return d.value;
	                      };
	                  }
	                  $scope.descriptionFunction = function(){
	                      return function(d){
	                          return d.label;
	                      }
	                  }
	                  
	var colors = $scope.stackColors();
	$scope.colors = colors;
	
	$scope.drawCharts = function (){
		console.log("DRAWING");
		for (var i=0; i < $scope.slaves.length; i++){
			var slave = $scope.slaves[i];
			slave.cpuData = [];
			slave.memData = [];
			slave.diskData = [];
			var cpuTotal = 0;
			var memTotal = 0;
			var diskTotal = 0;
			for (var j=0; j < $scope.tasks.length; j++){
				var task = $scope.tasks[j];
				if (task.slaveId === slave.id){
					cpuTotal += task.cpuPercent;
					memTotal += task.memPercent;
					diskTotal += task.diskPercent;
					for (var k=0; k < $scope.pods.length; k++){
						var pod = $scope.pods[k];
						//console.log(pod.labels.name);
						if (task.podName === pod.labels.name){
							var stack = pod.labels.stack;
							//console.log(stack + ":" + colors[stack]);
							slave.cpuData.push({label: task.podName, value: task.cpuPercent, podId: pod.id, color: colors[stack]});
							slave.memData.push({label: task.podName, value: task.memPercent, podId: pod.id, color: colors[stack]});
							slave.diskData.push({label: task.podName, value: task.diskPercent, podId: pod.id, color: colors[stack]});
						}
					}
				}
			}
			slave.cpuData.push({label: "unused", value: 100-cpuTotal, color: "grey"});
			slave.memData.push({label: "unused", value: 100-memTotal, color: "grey"});
			slave.diskData.push({label: "unused", value: 100-diskTotal, color: "grey"});
	}
	}
	
	$scope.drawCharts();
	
	$scope.refresh = function () {
    	//alert("TIMEOUT");
//    	$scope.updateTasks();
//    	$scope.updateSlaves();
//    	$scope.updatePods();
    	$scope.drawCharts();
    	$state.go($state.current, {}, {reload:true});
    	//$scope.api.refresh();
    };
    
    $scope.logout = function () {
        Auth.logout();
        $state.go('login');
    };
    
    $scope.$on('stateChange.directive', function(angularEvent, event){
    	console.log("CHANGED");
    });
    
    $scope.$on('beforeUpdate.directive', function(angularEvent, event){
    	console.log("CHANGED");
    });
    //$timeout($scope.refresh, 3000);
	
}])
.factory('SlaveService', function ($http) {
	 return {
		    getSlaves: function() {
         	var promise = $http.get("http://localhost:8080/spade/api/slaves")
         	.then(function(response) {
         		return response.data;
         	});
         	
             return promise;
         }
	 }
	 
	 })
	 
	 .factory('TaskService', function ($http) {
	 return {
		    getTasks: function() {
         	var promise = $http.get("http://localhost:8080/spade/api/tasks")
         	.then(function(response) {
         		return response.data;
         	});
         	
             return promise;
         }
	 }
	 
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
