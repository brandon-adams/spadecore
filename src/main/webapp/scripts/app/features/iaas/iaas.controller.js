'use strict';

angular.module('spadecoreApp')
     .controller('IaasController', ["$mdDialog","$modal","$scope","$rootScope","resolveImages", function ($mdDialog,$modal, $scope,$rootScope,resolveImages) {
        
    	 
    	 
    	 
    	 console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    	 
    	 var app = this;
    	 
    	 $scope.images = resolveImages.items;
    	 console.log("test testtest testtest test");
//    	 console.log($scope.images);
    	 
//    	 console.log(app.apps);

        app.closeAlert = function () {
            app.reason = null;
        };	


        app.open = function () {
        	console.log("------------------------------------------------------------");
    	 $scope.apps = resolveImages.items;
    	 $scope.images = resolveImages.items;
    	 
    	 console.log($scope.apps);
        	
            var modalInstance = $modal.open(
            		{
            	
                templateUrl: 'scripts/app/features/iaas/iaas.html',
                controller: 'ModalCtrl',
                controllerAs: 'modal',
//                resolve: {
//                  resolveImages2:['ImageService', function (imageService) {
//                  	return imageService.getImages();
////                      return slaveService.getSlaves();
//                  }]
//              }
            });

            modalInstance.result
                .then(function (data) {
                    app.closeAlert();
                    app.summary = data;
                }, function (reason) {
                    app.reason = reason;
                });
        };
        
//        $rootScope.$on('openModal', function () {
//
//            app.open();
//        });
    }])
.config(function($mdThemingProvider) {
  })
    .controller('ModalCtrl', function ($modalInstance,$scope,$mdDialog,$http,templateService,$rootScope,appService,$state,ImageService,$interval,$cookies) {
    		  
    	console.log($scope.images);
    	console.log($scope.$parent.images);
    	
//    	$scope.applications = resolveImages;
//    	console.log($scope.applications);
//    	var getApps = function(){
//    		var deffered;
//    	}
    	console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    	var images = ImageService.getImages();
    	console.log(images.items);
    	console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    	console.log(appService.getItems());
    	console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    	console.log(appService.items);
    	
    	$scope.applications = $rootScope.resolveImages;
   	 
   	 	console.log($scope.$parent.apps);
   	 
//   	 $scope.imageService = ImageService;
//   	 
//   	$scope.getApplications = function(){
//   		if($scope.imageService.getImages().length != 0 ){
//   			$scope.applications = $scope.imageService.getImages();
//   		}
//   	}
   	
   	
//   	$scope.getApplications();
    	
//    	$http.get("http://192.168.0.95:8080/spade/api/images")
//		.success(function(data) {
//			console.log(data);
//				$scope.applications = data;
//			})
    	
//    	$scope.applications = $rootScope.applications;
    	
//    	$scope.$on('testObj', function(response) {
//    	      alert(response);
//    	})
    	
    	
    	$scope.osOptions = ['Ubuntu','Fedora'];
//    	console.log($scope.osOptions);
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
    	
//    	$scope.dbDisabled = false;
    	
    	$scope.switchdbDisabled = function(){
    		console.log($scope.dbDisabled);
    		return $scope.dbDisabled = !$scope.dbDisabled;
    	}

//    	$scope.test = {};
//    	$scope.test.dbDisabled = false;
    	
    	$scope.disableDB = function() {
    		console.log($scope.dbDisabled);
            return $scope.dbDisabled = !$scope.dbDisabled;
        };
    	
    	console.log($scope.webDisabled);
    	console.log($scope.appDisabled);
    	console.log($scope.dbDisabled);
    	var appFilter = function(){
    		var n = {},uniqueApps = [];
//    		var defaultApp = {
//    				"image": "",
//    	              "os": "",
//    	              "app": "Select an Application"	
//    		}
//    		uniqueApps.push(defaultApp);
    		
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
    	
//    	console.log($scope.uniqueApps);

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
    	
    	console.log(templateService.items());
    	
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
    	
    	if(templateService.items().length > 0){
    		$scope.webPod = templateService.items()[0].templates[0];
    		$scope.appPod = templateService.items()[0].templates[1];
    		$scope.dbPod = templateService.items()[0].templates[2];
    		
//    		console.log(templateService.items()[0].templates[0].app);
//    		console.log(templateService.items()[0].templates[1].app);
//    		console.log(templateService.items()[0].templates[2].app);
    		
//    		var webApp = templateService.items()[0].templates[0].app;
//    		var appApp = templateService.items()[0].templates[1].app
//    		var dbApp = templateService.items()[0].templates[2].app
    		
    		console.log('entering setWebConfig w/ ' + templateService.items()[0].templates[0].app);
    		$scope.webConfig = $scope.setWebConfig(templateService.items()[0].templates[0].app);
    		
    		console.log('entering setAppConfig w/ ' + templateService.items()[0].templates[1].app);
    		$scope.appConfig = $scope.setAppConfig(templateService.items()[0].templates[1].app);
    		
    		console.log('entering setDBConfig w/ ' + templateService.items()[0].templates[2].app);
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
        		  project: $cookies.currentProj,
        		  controllers: $scope.podArray
        		}
        
        $scope.showAlert = showAlert;
        
        function showAlert() {
           var confirm = $mdDialog.confirm()
              .title('Success, your stack has been launched')
              .content('Click \'View Stack\' to view your stack')
              .ok('View Stack')
              .cancel('Close');

            $mdDialog
                .show( confirm ).then(function(){
                	$state.go('statstable');
                })
                
          }
     	  
          
     	 $scope.launch = function(){
     		//$scope.validate();
     		$scope.progress = true;
     		console.log($scope.payload);
     		//alert("CREATED");
     		$http.post("http://192.168.4.8:8080/spade/api/"+$cookies.currentProj+"/stacks", $scope.payload)
 		 	.success(function(data){
 		 		console.log("success data returned ====> " + data);
 		 	});

     		setTimeout(function(){
     			
 	     		$scope.showAlert();
 	     		modal.dismiss();
     		 }, 4000);
     			
      	}
     	 
//     	$scope.deletePod = function(pod){
//     		 console.log(pod);
//     		 $http.delete("http://192.168.0.95:8080/spade/api/env", pod)
//     		 	.success(function(data){
//     		 		console.log("successfully deleted ====> " + data.name + '\npod.appName');
//     		 });
//     	}
     	 
//     	$scope.alert = '';
//     	  $scope.showAlert = function() {
//     	    $mdDialog.show(
//     	      $mdDialog.alert()
//     	        .title('This is an alert title')
//     	        .content('You can specify some description text in here.')
//     	        .ariaLabel('Password notification')
//     	        .ok('Got it!')
////     	        .targetEvent(ev)
//     	    );
//     	  };
     	  
     	  
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
//            return (modal.isLastStep()) ? 'Launch' : 'Next';
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
        
    

        modal.dismiss = function() {
        	templateService.clear()
            $modalInstance.dismiss();
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
    
  .factory('ImageService', function ($http) {
	 return {
		    getImages: function() {
         	var promise = $http.get("http://192.168.4.8:8080/spade/api/images")
         	.then(function(response) {
         		return response.data;
         	});
         	
             return promise;
         }
	 }
	 
	 })