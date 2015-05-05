'use strict';

angular.module('spadecoreApp')

.controller('TemplatesController', function($rootScope, $scope, $state, $timeout, Auth,$http,$mdDialog,$modal,templateService, resolveTemplates,ngTableParams,$filter) {
		
	$scope.templatesInfo = function(ev) {
	    $mdDialog.show(
	      $mdDialog.alert()
	        .title("Templates")
	        .content("The Templates screen lists your available application stack templates. These describe predefined configurations" +
	        		"you can use to quickly launch infrastructure stacks. Press edit to launch the creation screen with all options preconfigured. " +
	        		"You can make any neccessary changes, then press launch to create the specified stack.")
	        .ariaLabel("Templates Info")
	        .ok("Close")
	        .targetEvent(ev)
	    );
	  };
	
		$http.get("http://localhost:8080/spade/api/stack_templates")
		.success(function(data) {
				$scope.plates = data.items;
			})
			
//		.error(function(data, status, headers, config) {
////			$scope.info = data;
//			$scope.plates = data.items;
//			
//			console.log("ERROR");
////			$scope.plates = [{
////				  "id": "Template A",
////				  "project": "Demo Project",
////				  "templates": [
////				    {
////				      "name": "Web Server",
////				      "os": "ubuntu",
////				      "app": "apache",
////				      "replicas": 1
////				    },
////				    {
////				      "name": "App Server",
////				      "os": "fedora",
////				      "app": "wildfly",
////				      "replicas": 1
////				    },
////				    {
////				      "name": "Database",
////				      "os": "fedora",
////				      "app": "mongoDB",
////				      "replicas": 1
////				    }
////				  ]
////				},
////				{
////					  "id": "Template B",
////					  "project": "Demo Project B",
////					  "templates": [
////					    {
////					      "name": "Web Server",
////					      "os": "fedora",
////					      "app": "tomcat",
////					      "replicas": 1
////					    },
////					    {
////					      "name": "App Server",
////					      "os": "ubuntu",
////					      "app": "nginx",
////					      "replicas": 1
////					    },
////					    {
////					      "name": "Database",
////					      "os": "fedora",
////					      "app": "mysql",
////					      "replicas": 1
////					    }
////					  ]
////					}
////				];
//	
//			
//			
//			
//			console.log(data);
////			console.log(data);
//			console.log(status);
//			console.log(headers);
//			console.log(config);
//		})
	
	$scope.labelFormat = { "web":"Web Server", "app":"App Server", "db":"Database"}
	 
	$scope.plates2 = [{
		  "id": "Template A",
		  "project": "Demo Project",
		  "templates": [
		    {
		      "name": "Web Server",
		      "os": "ubuntu",
		      "app": "nginx",
		      "replicas": 1
		    },
		    {
		      "name": "App Server",
		      "os": "fedora",
		      "app": "wildfly",
		      "replicas": 1
		    },
		    {
		      "name": "Database",
		      "os": "fedora",
		      "app": "mongoDB",
		      "replicas": 1
		    }
		  ]
		},
		{
			  "id": "Template B",
			  "project": "Demo Project B",
			  "templates": [
			    {
			      "name": "Web Server",
			      "os": "ubuntu",
			      "app": "nginx",
			      "replicas": 1
			    },
			    {
			      "name": "App Server",
			      "os": "fedora",
			      "app": "wildfly",
			      "replicas": 1
			    },
			    {
			      "name": "Database",
			      "os": "fedora",
			      "app": "mongoDB",
			      "replicas": 1
			    }
			  ]
			},
			{
			      "id": "Wildfly",
			      "project": "demo",
			      "templates": [
			        {
			          "name": "wildfly-apache",
			          "os": "ubuntu",
			          "app": "apache",
			          "replicas": 1,
			          "label": "web"
			        },
			        {
			          "name": "wildfly-wildfly",
			          "os": "fedora",
			          "app": "wildfly",
			          "replicas": 1,
			          "label": "app"
			        },
			        {
			          "name": "wildfly-mongodb",
			          "os": "ubuntu",
			          "app": "mongodb",
			          "replicas": 1,
			          "label": "db"
			        }
			      ]
			    },
				{
					  "id": "Template B",
					  "project": "Demo Project B",
					  "templates": [
					    {
					      "name": "Web Server",
					      "os": "ubuntu",
					      "app": "nginx",
					      "replicas": 1
					    },
					    {
					      "name": "App Server",
					      "os": "fedora",
					      "app": "wildfly",
					      "replicas": 1
					    },
					    {
					      "name": "Database",
					      "os": "fedora",
					      "app": "mongoDB",
					      "replicas": 1
					    }
					  ]
					},
					{
					      "id": "Wildfly",
					      "project": "demo",
					      "templates": [
					        {
					          "name": "wildfly-apache",
					          "os": "ubuntu",
					          "app": "apache",
					          "replicas": 1,
					          "label": "web"
					        },
					        {
					          "name": "wildfly-wildfly",
					          "os": "fedora",
					          "app": "wildfly",
					          "replicas": 1,
					          "label": "app"
					        },
					        {
					          "name": "wildfly-mongodb",
					          "os": "ubuntu",
					          "app": "mongodb",
					          "replicas": 1,
					          "label": "db"
					        }
					      ]
					    }
		];

   $scope.closeAlert = function () {
	   $scope.reason = null;
   };	

   $scope.templateFactoryService = templateService;
	 
   $scope.open2 = function (template) {
	   console.log(template);
	   $scope.templateFactoryService.addItem(template);
       var modalInstance = $modal.open({
           templateUrl: 'scripts/app/features/iaas/iaas.html',
           controller: 'ModalCtrl',
           controllerAs: 'modal'
       });

       modalInstance.result
           .then(function (data) {
        	   $scope.closeAlert();
        	   $scope.summary = data;
        	   
           }, function (reason) {
        	   $scope.reason = reason;
//        	   $state.go($state.current, {}, { "reload": true })
           });
   };
			    
			    
   $scope.templates2 = resolveTemplates.items;
	$scope.headers = [
	    "Id",
	    "Project",
	    "Name",
	    "Web",
	    "App",
	    "DB"	    
	];
	
	$scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        filter: {
            //stack: 'M'       // initial filter
        },
        sorting: {
            //name: 'asc'     // initial sorting
        }
    }, {
        total: $scope.templates2.length, // length of data
        getData: function ($defer, params) {
            // use build-in angular filter
            var filteredData = params.filter() ?
                    $filter('filter')($scope.templates2, params.filter()) :
                    $scope.templates2;
            var orderedData = params.sorting() ?
                    $filter('orderBy')(filteredData, params.orderBy()) :
                    $scope.templates2;

            params.total(orderedData.length); // set total for recalc pagination
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
	
	$scope.changeSelection = function(template) {
		if (template.$selected){
			$scope.selectedTemplate = template;
			alert($scope.selectedTemplate)
		} else {
			$scope.selectedTemplate = {};
		}
	}
		
	$scope.confirmDel = function(ev, template) {
		if (template === undefined || template === null || template.$selected === undefined){
			var confirm = $mdDialog.confirm()
		      //.parent(angular.element(document.body))
		      .title("No Template Selected")
		      .content("There is nothing selected")
		      .ariaLabel("Deleting template")
		      .ok("Back")
		      .targetEvent(ev);
		    $mdDialog.show(confirm)
		      .then(function() {
		      $mdDialog.hide();
		      $state.go('templates', { "reload": true })
		    }, function() {
		      $mdDialog.hide();
		    });
		} else {
	    var confirm = $mdDialog.confirm()
	      //.parent(angular.element(document.body))
	      .title("Confirm deletion?")
	      .content("This operation cannot be undone")
	      .ariaLabel("Deleting template")
	      .ok("Delete")
	      .cancel("Cancel")
	      .targetEvent(ev);
	    $mdDialog.show(confirm)
	      .then(function() {
	      //$scope.delTemplate(template);
	      $scope.showSimpleToast();
	      $state.go('templates', { "reload": true })
	    }, function() {
	      $mdDialog.hide();
	    });
		}
	  };
	$scope.delTemplate = function(template){
		var req = {
				 method: "DELETE",
				 url: "http://192.168.4.8:8080/spade/api/demo/controllers/" + template.labels.controller
		};
		console.log(template)
//		$http(req).then(function(response) {
//			$scope.delRes = response.data;
//			console.log(response.data);
//		});
	}
	
	$scope.displayedTemplates = [].concat($scope.templates2);
	
	$scope.logout = function () {
        Auth.logout();
        $state.go('login');
    };
})


.factory('TemplateService2', function($http) {
	return {
		getPods : function() {
			var promise = $http.get("http://192.168.4.8:8080/spade/api/stack_templates")
			.then(function(response) {
				return response.data;
			});
			return promise;
		}
	}
})
.directive('mdTable', function () {
 return {
   restrict: 'E',
   scope: { 
     headers: '=', 
     content: '=', 
     sortable: '=', 
     filters: '=',
     customClass: '=customClass',
     thumbs:'=', 
     count: '=' 
   },
   controller: function ($scope,$filter,$window) {
     var orderBy = $filter('orderBy');
     $scope.tablePage = 0;
     $scope.nbOfPages = function () {
       return Math.ceil($scope.content.length / $scope.count);
     },
     	$scope.handleSort = function (field) {
         if ($scope.sortable.indexOf(field) > -1) { return true; } else { return false; }
     };
     $scope.order = function(predicate, reverse) {
         $scope.content = orderBy($scope.content, predicate, reverse);
         $scope.predicate = predicate;
     };
     $scope.order($scope.sortable[0],false);
     $scope.getNumber = function (num) {
     			    return new Array(num);
     };
     $scope.goToPage = function (page) {
       $scope.tablePage = page;
     };
   },
   template: angular.element(document.querySelector('#md-table-template')).html()
 }
})
.directive('mdColresize', function ($timeout) {
 return {
   restrict: 'A',
   link: function (scope, element, attrs) {
     scope.$evalAsync(function () {
       $timeout(function(){ $(element).colResizable({
         liveDrag: true,
         fixed: true
         
       });},100);
     });
   }
 }
})
.filter('startFrom',function (){
 return function (input,start) {
   start = +start;
   return input.slice(start);
 }
})
.controller('ModalCtrl2', function ($modalInstance,$scope,$mdDialog,$http,templateService,$rootScope,appService,$mdToast, $animate,$state) {
	$scope.toastPosition = {
		    bottom: false,
		    top: true,
		    left: false,
		    right: true
		  };
	
	$scope.getToastPosition = function() {
	    return Object.keys($scope.toastPosition)
	      .filter(function(pos) { return $scope.toastPosition[pos]; })
	      .join(' ');
	  };
	  
	  $scope.showToast = false;
	  
	  $scope.showCustomToast = function() {
//		    $mdToast.show({
//		      controller: 'ToastCtrl',
//		      templateUrl: 'scripts/app/features/iaas/toast-template.html',
//		      hideDelay: 6000,
//		      position: $scope.getToastPosition()
//		    });
		  $scope.showToast = true;  
		  };
		  
	console.log($scope.images);
	console.log($scope.$parent.images);
	
//	$scope.applications = resolveImages;
//	console.log($scope.applications);
//	var getApps = function(){
//		var deffered;
//	}
	console.log(appService.getItems());
	
	$scope.applications = $rootScope.resolveImages;
	 
	 	console.log($scope.$parent.apps);
	 
//	 $scope.imageService = ImageService;
//	 
//	$scope.getApplications = function(){
//		if($scope.imageService.getImages().length != 0 ){
//			$scope.applications = $scope.imageService.getImages();
//		}
//	}
	
	
//	$scope.getApplications();
	
//	$http.get("http://192.168.0.95:8080/spade/api/images")
//	.success(function(data) {
//		console.log(data);
//			$scope.applications = data;
//		})
	
//	$scope.applications = $rootScope.applications;
	
//	$scope.$on('testObj', function(response) {
//	      alert(response);
//	})
	
	
	$scope.osOptions = ['Ubuntu','Fedora'];
//	console.log($scope.osOptions);
	$scope.oneOS;
	
	$scope.applications = 
	{
			  "api": "v0.0.4",
			  "time": 1427390606456,
			  "label": "extra",
			  "items": [
			    {
			      "image": "sewatech\/modcluster",
			      "os": "ubuntu",
			      "app": "apache",
			      "type": "web",
			      "info": [
			        {
			          "key": "app_version",
			          "val": "6.8"
			        },
			        {
			          "key": "heap_size",
			          "val": "1024MB"
			        },
			        {
			          "key": "storage_size",
			          "val": "100MB"
			        }
			      ]
			    },
			    {
			      "image": "bradams\/devops:nginx-ubuntu",
			      "os": "ubuntu",
			      "app": "nginx",
			      "type": "web",
			      "info": [
			        {
			          "key": "app_version",
			          "val": "1.1.2"
			        },
			        {
			          "key": "heap_size",
			          "val": "1024MB"
			        },
			        {
			          "key": "storage_size",
			          "val": "100MB"
			        }
			      ]
			    },
			    {
			      "image": "bradams\/devops:wildfly-ubuntu",
			      "os": "ubuntu",
			      "app": "wildfly",
			      "type": "app",
			      "info": [
			        {
			          "key": "app_version",
			          "val": "8.0.0"
			        },
			        {
			          "key": "heap_size",
			          "val": "1024MB"
			        },
			        {
			          "key": "storage_size",
			          "val": "100MB"
			        }
			      ]
			    },
			    {
			      "image": "bradams\/devops:tomcat-ubuntu",
			      "os": "ubuntu",
			      "app": "tomcat",
			      "type": "app",
			      "info": [
			        {
			          "key": "app_version",
			          "val": "8.5.5"
			        },
			        {
			          "key": "heap_size",
			          "val": "1024MB"
			        },
			        {
			          "key": "storage_size",
			          "val": "100MB"
			        }
			      ]
			    },
			    {
			      "image": "partlab\/ubuntu-mongodb",
			      "os": "ubuntu",
			      "app": "mongodb",
			      "type": "db",
			      "info": [
			        {
			          "key": "app_version",
			          "val": "7.1.0"
			        },
			        {
			          "key": "heap_size",
			          "val": "1024MB"
			        },
			        {
			          "key": "storage_size",
			          "val": "100MB"
			        }
			      ]
			    },
			    {
			      "image": "bradams\/devops:mysql-ubuntu",
			      "os": "ubuntu",
			      "app": "mysql",
			      "type": "db",
			      "info": [
			        {
			          "key": "app_version",
			          "val": "5.5"
			        },
			        {
			          "key": "heap_size",
			          "val": "1024MB"
			        },
			        {
			          "key": "storage_size",
			          "val": "100MB"
			        }
			      ]
			    },
			    {
			      "image": "bradams\/devops:apache-fedora",
			      "os": "fedora",
			      "app": "apache",
			      "type": "web",
			      "info": [
			        {
			          "key": "app_version",
			          "val": "7.0"
			        },
			        {
			          "key": "heap_size",
			          "val": "1024MB"
			        },
			        {
			          "key": "storage_size",
			          "val": "100MB"
			        }
			      ]
			    },
			    {
			      "image": "bradams\/devops:nginx-fedora",
			      "os": "fedora",
			      "app": "nginx",
			      "type": "web",
			      "info": [
			        {
			          "key": "app_version",
			          "val": "2.0.3"
			        },
			        {
			          "key": "heap_size",
			          "val": "1024MB"
			        },
			        {
			          "key": "storage_size",
			          "val": "100MB"
			        }
			      ]
			    },
			    {
			      "image": "bradams\/devops:cluster",
			      "os": "fedora",
			      "app": "wildfly",
			      "type": "app",
			      "info": [
			        {
			          "key": "app_version",
			          "val": "7.8.3"
			        },
			        {
			          "key": "heap_size",
			          "val": "1024MB"
			        },
			        {
			          "key": "storage_size",
			          "val": "100MB"
			        }
			      ]
			    },
			    {
			      "image": "bradams\/devops:tomcat-fedora",
			      "os": "fedora",
			      "app": "tomcat",
			      "type": "app",
			      "info": [
			        {
			          "key": "app_version",
			          "val": "7.0.3"
			        },
			        {
			          "key": "heap_size",
			          "val": "1024MB"
			        },
			        {
			          "key": "storage_size",
			          "val": "100MB"
			        }
			      ]
			    },
			    {
			      "image": "bradams\/devops:mongodb-fedora",
			      "os": "fedora",
			      "app": "mongodb",
			      "type": "db",
			      "info": [
			        {
			          "key": "app_version",
			          "val": "6.3.0"
			        },
			        {
			          "key": "heap_size",
			          "val": "1024MB"
			        },
			        {
			          "key": "storage_size",
			          "val": "100MB"
			        }
			      ]
			    },
			    {
			      "image": "jdeathe\/centos-ssh-mysql",
			      "os": "fedora",
			      "app": "mysql",
			      "type": "db",
			      "info": [
			        {
			          "key": "app_version",
			          "val": "5.5"
			        },
			        {
			          "key": "heap_size",
			          "val": "1024MB"
			        },
			        {
			          "key": "storage_size",
			          "val": "100MB"
			        }
			      ]
			    }
			  ]
			}
	
	
	$scope.lamp = true;
	
	$scope.webDisabled = false;
	$scope.appDisabled = false;
	$scope.dbDisabled = false;
	
//	$scope.dbDisabled = false;
	
	$scope.switchdbDisabled = function(){
		console.log($scope.dbDisabled);
		return $scope.dbDisabled = !$scope.dbDisabled;
	}

//	$scope.test = {};
//	$scope.test.dbDisabled = false;
	
	$scope.disableDB = function() {
		console.log($scope.dbDisabled);
        return $scope.dbDisabled = !$scope.dbDisabled;
    };
	
	console.log($scope.webDisabled);
	console.log($scope.appDisabled);
	console.log($scope.dbDisabled);
	var appFilter = function(){
		var n = {},uniqueApps = [];
//		var defaultApp = {
//				"image": "",
//	              "os": "",
//	              "app": "Select an Application"	
//		}
//		uniqueApps.push(defaultApp);
		
		for(var i = 0; i < $scope.applications.items.length; i++){
			if(!n[$scope.applications.items[i].app]){
				n[$scope.applications.items[i].app] = true;
				uniqueApps.push($scope.applications.items[i]);
			}
		}
		
		
		return uniqueApps;
	}
	
	$scope.uniqueApps = appFilter();
	
	$scope.switchLamp = function(){
		console.log($scope.lamp);
		return $scope.lamp = !$scope.lamp;
	}
	
	$scope.appTypeFiler = function(){
		var webApps = [];
		var appApps = [];
		var dbApps = [];
		
		
		for(var i = 0; i < $scope.uniqueApps.length; i++){
			if($scope.uniqueApps[i].type == 'web'){
				webApps.push($scope.uniqueApps[i]);
			} else {
				if($scope.uniqueApps[i].type == 'app'){
					appApps.push($scope.uniqueApps[i]);
				} else {
					if($scope.uniqueApps[i].type == 'db'){
    					dbApps.push($scope.uniqueApps[i]);
				}
			}
		}
	}
		$scope.webApps = webApps;
		$scope.appApps = appApps;
		$scope.dbApps = dbApps;
}
	
	$scope.appTypeFiler();
	
	console.log("Web apps " + $scope.webApps);
	console.log("App apps " + $scope.appApps);
	console.log("DB apps " + $scope.dbApps);
	
	
	for(var i = 0; i < $scope.uniqueApps.length;i++){
		console.log($scope.uniqueApps[i]);
	}
	
	for(var i = 0; i < $scope.uniqueApps.length;i++){
		if($scope.uniqueApps[i].type == 'web')
		console.log($scope.uniqueApps[i]);
	}
	
//	console.log($scope.uniqueApps);

	$scope.isDisabled = true;
	
	$scope.defaultPod = {
			name : '',
			os: 'None Selected',
          	app : 'None Selected',
          	replicas : 0
          };
	
	$scope.pod = {
			name : $scope.defaultPod.name,
			os: $scope.defaultPod.os,
          	app : $scope.defaultPod.app,
          	replicas : $scope.defaultPod.replicas
          };
	
	$scope.appPod = {
			name : $scope.defaultPod.name,
			os: $scope.defaultPod.os,
          	app : $scope.defaultPod.app,
          	replicas : $scope.defaultPod.replicas
          };
	
	
	$scope.webPod = {
			name : $scope.defaultPod.name,
			os: $scope.defaultPod.os,
          	app : $scope.defaultPod.app,
          	replicas : $scope.defaultPod.replicas
          };
	
	
	
	$scope.dbPod = {
			name : $scope.defaultPod.name,
			os: $scope.defaultPod.os,
          	app : $scope.defaultPod.app,
          	replicas : $scope.defaultPod.replicas
          };
	
	$scope.setPodsOS = function(os){
		$scope.webPod.os = os;
		$scope.appPod.os = os;
		$scope.dbPod.os = os;
		
		console.log($scope.oneOS);
	};
	
$scope.conf = false;
	
	$scope.setWebConfig = function(item){
		var conf = [];
		for(i in $scope.webApps){
			if($scope.webApps[i].app == item){
				for(var x = 0; x <  $scope.webApps[i].info.length; x++){
					conf.push($scope.webApps[i].info[x]);
				}
			}
		}
		
		$scope.webConfig = conf;
		for(var y = 0; y < $scope.webConfig.length; y++){
			console.log($scope.webConfig[y]);
		}
	};
	
	$scope.setAppConfig = function(item){
		var conf = [];
		for(i in $scope.appApps){
			if($scope.appApps[i].app == item){
				for(var x = 0; x <  $scope.appApps[i].info.length; x++){
					conf.push($scope.appApps[i].info[x]);
				}
			}
		}
		
		$scope.appConfig = conf;
		console.log('*****');
		console.log($scope.appConfig);
		
		for(var y = 0; y < $scope.appConfig.length; y++){
			console.log($scope.appConfig[y]);
		}
	};
	
   	$scope.setDBConfig = function(item){
		console.log(item);
   		var conf = [];
		for(i in $scope.dbApps){
			if($scope.dbApps[i].app == item){
				for(var x = 0; x <  $scope.dbApps[i].info.length; x++){
					conf.push($scope.dbApps[i].info[x]);
				}
			}
		}
		
		$scope.dbConfig = conf;
		console.log('+++++');
		console.log($scope.dbConfig);
		
		for(var y = 0; y < $scope.dbConfig.length; y++){
			console.log($scope.dbConfig[y]);
		}
	};
	
	console.log(templateService.items());
	
	if(templateService.items().length > 0){
		$scope.webPod = templateService.items()[0].templates[0];
		$scope.appPod = templateService.items()[0].templates[1];
		$scope.dbPod = templateService.items()[0].templates[2];
		
//		console.log(templateService.items()[0].templates[0].app);
//		console.log(templateService.items()[0].templates[1].app);
//		console.log(templateService.items()[0].templates[2].app);
		
//		var webApp = templateService.items()[0].templates[0].app;
//		var appApp = templateService.items()[0].templates[1].app
//		var dbApp = templateService.items()[0].templates[2].app
		
		$scope.webConfig = $scope.setWebConfig(templateService.items()[0].templates[0].app); 
		$scope.appConfig = $scope.setAppConfig(templateService.items()[0].templates[1].app);
		$scope.dbConfig = $scope.setDBConfig(templateService.items()[0].templates[2].app);
	}
	
	
	
	
	
	$scope.podArray = new Array(3);
	$scope.podArray[0] = $scope.webPod;
	$scope.podArray[1] = $scope.appPod
	$scope.podArray[2] = $scope.dbPod;
	
 	
	$scope.webPodNameError = false;
    $scope.webPodOSError = false;
    $scope.webPodAppError = false;

    $scope.appPodNameError = false;
    $scope.appPodOSError = false;
    $scope.appPodAppError = false;

    $scope.dbPodNameError = false;
    $scope.dbPodOSError = false;
    $scope.dbPodAppError = false;
    
    $scope.payload = {
    		  id: "",
    		  project: "demo",
    		  controllers: $scope.podArray
    		}
    
    $scope.showAlert = showAlert;
    
    function showAlert() {
       var confirm = $mdDialog.confirm()
          .title('Success, your server has been launched')
          .content('Click \'View Server\' to view your server')
          .ok('View Server')
          .cancel('Close');

        $mdDialog
            .show( confirm ).then(function(){
            	$state.go('stats');
            })
            
      }
 	  
      
 	 $scope.launch = function(){
 		console.log($scope.payload);
 		
// 		$scope.showCustomToast();
 		 	$http.post("http://192.168.4.8:8080/spade/api/demo/stacks", $scope.payload)
     		 	.success(function(data){
     		 		$modalInstance.dismiss();
     	     		$scope.showAlert();
     		 		console.log("success data returned ====> " + data);
     		 });	
  	}
 	 
// 	$scope.deletePod = function(pod){
// 		 console.log(pod);
// 		 $http.delete("http://192.168.0.95:8080/spade/api/env", pod)
// 		 	.success(function(data){
// 		 		console.log("successfully deleted ====> " + data.name + '\npod.appName');
// 		 });
// 	}
 	 
// 	$scope.alert = '';
// 	  $scope.showAlert = function() {
// 	    $mdDialog.show(
// 	      $mdDialog.alert()
// 	        .title('This is an alert title')
// 	        .content('You can specify some description text in here.')
// 	        .ariaLabel('Password notification')
// 	        .ok('Got it!')
//// 	        .targetEvent(ev)
// 	    );
// 	  };
 	  
 	  
	var modal = this;

    modal.steps = ['one', 'two', 'three'];
    modal.step = 0;


    modal.isFirstStep = function () {
        return modal.step === 0;
    };

    modal.isLastStep = function () {
        return modal.step === (modal.steps.length - 1);
    };

    modal.isCurrentStep = function (step) {
        return modal.step === step;
    };

    modal.setCurrentStep = function (step) {
        modal.step = step;
    };

    modal.getCurrentStep = function () {
        return modal.steps[modal.step];
    };

    modal.getNextLabel = function () {
    	if(modal.isLastStep()){
    		$scope.isDisabled = !modal.launchReady();
    		return 'Launch';
    	} else{
    		return 'Next'
    	}
//        return (modal.isLastStep()) ? 'Launch' : 'Next';
    };
    
    
    modal.launchReady = function(){
    	if(angular.equals($scope.pod.os,$scope.defaultPod.os) ||
    			angular.equals($scope.pod.app,$scope.defaultPod.app) ||
    			angular.equals($scope.pod.name,$scope.defaultPod.name) ||
    			angular.equals($scope.pod.replicas,$scope.defaultPod.replicas ||
    			$scope.pod.replicas < 0		) 
    	){
    		return false;
    	} else {
    		return true;
    	}
    }
    
   
    
    
    modal.isWebPodReady = function(){
    	if($scope.webPod.replicas > 0){
    		if(angular.equals($scope.webPod.name,$scope.defaultPod.name)){
    			//add to web error messages list
    			$scope.webPodNameError = false;
    	        
    			
    		}
    		if(angular.equals($scope.webPod.os,$scope.defaultPod.os)){
    			//add to web error messages list
    			$scope.webPodOSError = false;
    	        $scope.webPodAppError = false;
    		}
    		if(angular.equals($scope.webPod.app,$scope.defaultPod.app)){
    			//add to web error messages list
    		}
    		
    	}
    	
    	if($scope.webPodErrors.length > 0){
    		return false;
    	} else{
    		return true;
    	}
    }

    modal.handlePrevious = function () {
        modal.step -= (modal.isFirstStep()) ? 0 : 1;
    };

    modal.handleNext = function () {
        if (modal.isLastStep()) {
            $modalInstance.close(modal.wizard);
        } else {
            modal.step += 1;
        }
    };
    


    modal.dismiss = function(reason) {
        $modalInstance.dismiss(reason);
    };
    
    $scope.data = {
		      selectedIndex : 0,
		      secondLocked : false,
		      secondLabel : "Item Two"
		    };
		    $scope.next = function() {
		    	modal.handleNext();
		      $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
		    };
		    $scope.previous = function() {
		      $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
		    };
})