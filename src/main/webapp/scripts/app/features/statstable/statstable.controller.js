'use strict'
angular.module('spadecoreApp')
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
	 
	 })
.controller('StatsTableController',
		["$scope", "$http", "$modal", "$filter", "$mdDialog", "$mdToast", "$state", "$cookies", "Auth", "resolveUser", "resolvePods", "ngTableParams", 
		function($scope, $http, $modal, $filter, $mdDialog, $mdToast, $state, $cookies, Auth, resolveUser, resolvePods, ngTableParams) {
	
			$scope.statsTableInfo = function(ev) {
			    $mdDialog.show(
			      $mdDialog.alert()
			        .title("Server Info")
			        .content("The Table view shows the application stacks your project is currently running. Each row represents a server " +
			        		"belonging to a stack. The servers on this page can be deleted individually, by selecting the desired server and " +
			        		"pressing the Delete button. You can also create new stacks by pressing the Create button.")
			        .ariaLabel("Stats Table Info")
			        .ok("Close")
			        .targetEvent(ev)
			    );
			  };
			
			$scope.user = resolveUser;
			$scope.pageName = "Table View";
			$scope.switchPages = { "Resource":"stats", "Table":"statstable" };
			
			$scope.switchProject = function(proj){
				$cookies.currentProj = proj;
				//$state.go($state.current, {}, {reload:true});
			}
			
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
            	$state.go($state.current, {}, { "reload": true })
            });
    };
    
    $scope.scale = function (ev, pod) {
    	if (pod === undefined || pod === null || pod.$selected === undefined){
    		var confirm = $mdDialog.confirm()
		      //.parent(angular.element(document.body))
		      .title("No Server Selected")
		      .content("There is nothing selected")
		      .ariaLabel("Editing resource")
		      .ok("Back")
		      .targetEvent(ev);
		    $mdDialog.show(confirm)
		      .then(function() {
		      $mdDialog.hide();
		    }, function() {
		      $mdDialog.hide();
		    });
    	} else {
    		var confirm = $mdDialog.confirm()
		      //.parent(angular.element(document.body))
		      .title("Scaling Placeholder")
		      .content("Scaling Placeholder")
		      .ariaLabel("Scaling resource")
		      .ok("Back")
		      .targetEvent(ev);
		    $mdDialog.show(confirm)
		      .then(function() {
		      $mdDialog.hide();
		    }, function() {
		      $mdDialog.hide();
		    });
//    		
//        var modalInstance = $modal.open({
//            templateUrl: 'scripts/app/features/statstable/scale.html',
//            controller: 'ScaleController',
//            controllerAs: 'modal'
//        });
//
//        modalInstance.result
//            .then(function (data) {
//                $scope.scale.closeAlert();
//                $scope.scale.summary = data;
//                $state.go($state.current, {}, { "reload": true })
//            }, function (reason) {
//            	$scope.scale.reason = reason;
//            	$state.go($state.current, {}, { "reload": true })
//            });
    	}
    };
    
	$scope.pods = resolvePods.items;
	
	$scope.isAppFunc = function(label){
		if (label === "apache" || label === "wildfly"){
			$scope.isApp = true;
		} else {
			$scope.isApp = false;
		}
	}
	
	$scope.headers = [
	    "Cluster",
	    "Server Id",
	    "Project",
	    "Stack",
	    "Containers",
	    "Host",
	    "Exposed Ports",
	    "Status"
	];
	//var displayedPods = [].concat($scope.pods);
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
        total: $scope.pods.length, // length of data
        getData: function ($defer, params) {
            // use build-in angular filter
            var filteredData = params.filter() ?
                    $filter('filter')($scope.pods, params.filter()) :
                    $scope.pods;
            var orderedData = params.sorting() ?
                    $filter('orderBy')(filteredData, params.orderBy()) :
                    $scope.pods;

            params.total(orderedData.length); // set total for recalc pagination
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
	
	$scope.changeSelection = function(pod) {
		if (pod.$selected){
			$scope.selectedPod = pod;
		} else {
			$scope.selectedPod = {};
		}
	}
	$scope.toastPosition = {
		    bottom: false,
		    top: false,
		    left: false,
		    right: true
	};
	$scope.getToastPosition = function() {
		    return Object.keys($scope.toastPosition)
		      .filter(function(pos) { return $scope.toastPosition[pos]; })
		      .join(' ');
	};
	$scope.showSimpleToast = function() {
	    $mdToast.show(
	      $mdToast.simple()
	        .content('Server Deleted!')
	        .position($scope.getToastPosition())
	        .hideDelay(2000)
	    );
	};
	
	$scope.showDelAlert = showDelAlert;
    
    function showDelAlert() {
       var confirm = $mdDialog.confirm()
          .title('Deletion Confirmed')
          .content('Cluster has been deleted')
          .ok('Close')
        $mdDialog
            .show( confirm ).then(function(){
            	$state.go($state.current, {}, { "reload": true })
            })
            
      }
$scope.showScaleAlert = showScaleAlert;
    
    function showScaleAlert() {
       var confirm = $mdDialog.confirm()
          .title('Scale Confirmed')
          .content('Server has been scaled')
          .ok('Close')
        $mdDialog
            .show( confirm ).then(function(){
            	$state.go($state.current, {}, { "reload": true })
            })
            
      }
	
	$scope.confirmDel = function(ev, pod) {
		if (pod === undefined || pod === null || pod.$selected === undefined){
			var confirm = $mdDialog.confirm()
		      //.parent(angular.element(document.body))
		      .title("No Cluster Selected")
		      .content("There is nothing selected")
		      .ariaLabel("Deleting resource")
		      .ok("Back")
		      .targetEvent(ev);
		    $mdDialog.show(confirm)
		      .then(function() {
		      $mdDialog.hide();
		    }, function() {
		      $mdDialog.hide();
		    });
		} else {
	    var confirm = $mdDialog.confirm()
	      //.parent(angular.element(document.body))
	      .title("Confirm deletion?")
	      .content("This operation cannot be undone")
	      .ariaLabel("Deleting resource")
	      .ok("Delete")
	      .cancel("Cancel")
	      .targetEvent(ev);
	    $mdDialog.show(confirm)
	      .then(function() {
	      $scope.delPod(pod);
	      $scope.showDelAlert();
	    }, function() {
	      $mdDialog.hide();
	    });
		}
	  };
	$scope.delPod = function(pod){
		var req = {
				 method: "DELETE",
				 url: "http://localhost:8080/spade/api/"+$cookies.currentProj+"/controllers/" + pod.labels.controller
		};
//		alert(pod.labels.controller);
		$http(req).then(function(response) {
			$scope.delRes = response.data;
			console.log(response.data);
		});
	}
	$scope.statusColors = {
			"Running":"green",
			"Waiting":"yellow",
			"Failed":"red"
	};
	$scope.logout = function () {
        Auth.logout();
        $state.go('login');
    };
	
}])
.controller('ScaleController', function($scope, $http, $mdDialog, $cookies){
	$scope.replicas;
})
.factory('PodService', function($http, $cookies) {
	return {
		getPods : function() {
			var promise = $http.get("http://localhost:8080/spade/api/"+$cookies.currentProj+"/pods")
			.then(function(response) {
				return response.data;
			});
			return promise;
		}
	}
})
.controller('TableCtrl', function ($scope) {

    $scope.tableRowExpanded = false;
    $scope.tableRowIndexCurrExpanded = "";
    $scope.tableRowIndexPrevExpanded = "";
    $scope.storeIdExpanded = "";
    $scope.dayDataCollapse = [true, true, true, true, true, true];


    $scope.transactionShow = 0;

    $scope.dayDataCollapseFn = function () {
        for (var i = 0; $scope.storeDataModel.storedata.length - 1; i += 1) {
            $scope.dayDataCollapse.append('true');
        }
    };



    $scope.selectTableRow = function (index, storeId) {
        if ($scope.dayDataCollapse === 'undefined') {
            $scope.dayDataCollapse = $scope.dayDataCollapseFn();
        } else {

            if ($scope.tableRowExpanded === false && $scope.tableRowIndexCurrExpanded === "" && $scope.storeIdExpanded === "") {
                $scope.tableRowIndexPrevExpanded = "";
                $scope.tableRowExpanded = true;
                $scope.tableRowIndexCurrExpanded = index;
                $scope.storeIdExpanded = storeId;
                $scope.dayDataCollapse[index] = false;
            } else if ($scope.tableRowExpanded === true) {
                if ($scope.tableRowIndexCurrExpanded === index && $scope.storeIdExpanded === storeId) {
                    $scope.tableRowExpanded = false;
                    $scope.tableRowIndexCurrExpanded = "";
                    $scope.storeIdExpanded = "";
                    $scope.dayDataCollapse[index] = true;
                } else {
                    $scope.tableRowIndexPrevExpanded = $scope.tableRowIndexCurrExpanded;
                    $scope.tableRowIndexCurrExpanded = index;
                    $scope.storeIdExpanded = storeId;
                    $scope.dayDataCollapse[$scope.tableRowIndexPrevExpanded] = true;
                    $scope.dayDataCollapse[$scope.tableRowIndexCurrExpanded] = false;
                }
            }
        }
    };

    $scope.storeDataModel = {
        "metadata": {
            "storesInTotal": "25",
                "storesInRepresentation": "6"
        },
            "storedata": [{
            "store": {
                "storeId": "1000",
                    "storeName": "Store 1",
                    "storePhone": "+46 31 1234567",
                    "storeAddress": "Avenyn 1",
                    "storeCity": "Gothenburg"
            },
                "data": {
                "startDate": "2013-07-01",
                    "endDate": "2013-07-02",
                    "costTotal": "100000",
                    "salesTotal": "150000",
                    "revenueTotal": "50000",
                    "averageEmployees": "3.5",
                    "averageEmployeesHours": "26.5",
                    "dayData": [{
                    "date": "2013-07-01",
                        "cost": "50000",
                        "sales": "71000",
                        "revenue": "21000",
                        "employees": "3",
                        "employeesHoursSum": "24",
                    showTransactions: false,
                    transactions: [{
                        employee: 'Anna Johannson',
                        transaction: 'Diamond ring #2512 ',
                        cost: 20000,
                        sale: 30000,
                        revenue: 10000
                    }, {
                        employee: 'Glenn Gustafsson',
                        transaction: 'Suit #1101',
                        cost: 25000,
                        sale: 35000,
                        revenue: 10000
                    }, {
                        employee: 'Linda Svensson',
                        transaction: 'Necklace #2303',
                        cost: 5000,
                        sale: 6000,
                        revenue: 1000
                    }]
                }, {
                    "date": "2013-07-02",
                        "cost": "50000",
                        "sales": "79000",
                        "revenue": "29000",
                        "employees": "4",
                        "employeesHoursSum": "29",
                    showTransactions: false,
                    transactions: [{
                        employee: 'Anna Johannson',
                        transaction: 'Diamond ring #2511',
                        cost: 21000,
                        sale: 32000,
                        revenue: 11000
                    }, {
                        employee: 'Linda Svensson',
                        transaction: 'Diamond ring #2599',
                        cost: 24000,
                        sale: 39000,
                        revenue: 15000
                    }, {
                        employee: 'Glenn Gustafsson',
                        transaction: 'Shirt #4308',
                        cost: 5000,
                        sale: 8000,
                        revenue: 3000
                    }]
                }]
            }
        }, {
            "store": {
                "storeId": "2000",
                    "storeName": "Store 2",
                    "storePhone": "+46 8 9876543",
                    "storeAddress": "Drottninggatan 100",
                    "storeCity": "Stockholm"
            },
                "data": {
                "startDate": "2013-07-01",
                    "endDate": "2013-07-02",
                    "costTotal": "170000",
                    "salesTotal": "250000",
                    "revenueTotal": "80000",
                    "averageEmployees": "4.5",
                    "averageEmployeesHours": "35",
                    "dayData": [{
                    "date": "2013-07-01",
                        "cost": "85000",
                        "sales": "120000",
                        "revenue": "35000",
                        "employees": "5",
                        "employeesHoursSum": "38",
                    showTransactions: false,
                    transactions: [{
                        employee: 'Lena Knutsson',
                        transaction: 'Diamond Ring #2587',
                        cost: 20000,
                        sale: 30000,
                        revenue: 10000
                    }, {
                        employee: 'Camilla Jonsson',
                        transaction: 'Necklace #2305',
                        cost: 25000,
                        sale: 35000,
                        revenue: 10000
                    }, {
                        employee: 'Karl Ledin',
                        transaction: 'Denim Jeans #5675',
                        cost: 5000,
                        sale: 6000,
                        revenue: 1000
                    }]
                }, {
                    "date": "2013-07-02",
                        "cost": "85000",
                        "sales": "130000",
                        "revenue": "45000",
                        "employees": "4",
                        "employeesHoursSum": "32",
                    showTransactions: false,
                    transactions: [{
                        employee: 'Camilla Jonsson',
                        transaction: 'Silver Jeans #5611',
                        cost: 20000,
                        sale: 30000,
                        revenue: 10000
                    }, {
                        employee: 'Karl Ledin',
                        transaction: 'Gold Jeans #5601',
                        cost: 25000,
                        sale: 35000,
                        revenue: 10000
                    }, {
                        employee: 'Karl Ledin',
                        transaction: 'Denim Jeans #5687',
                        cost: 5000,
                        sale: 6000,
                        revenue: 1000
                    }]
                }]
            }
        }, {
            "store": {
                "storeId": "3000",
                    "storeName": "Store 3",
                    "storePhone": "+1 99 555-1234567",
                    "storeAddress": "Elm Street",
                    "storeCity": "New York"
            },
                "data": {
                "startDate": "2013-07-01",
                    "endDate": "2013-07-02",
                    "costTotal": "2400000",
                    "salesTotal": "3800000",
                    "revenueTotal": "1400000",
                    "averageEmployees": "25.5",
                    "averageEmployeesHours": "42",
                    "dayData": [{
                    "date": "2013-07-01",
                        "cost": "1200000",
                        "sales": "1600000",
                        "revenue": "400000",
                        "employees": "23",
                        "employeesHoursSum": "41",
                    showTransactions: false,
                    transactions: [{
                        employee: 'John Doe',
                        transaction: 'Leather Jacket #8974',
                        cost: 20000,
                        sale: 30000,
                        revenue: 10000
                    }, {
                        employee: 'John Doe',
                        transaction: 'Gold Jeans #5601',
                        cost: 25000,
                        sale: 35000,
                        revenue: 10000
                    }, {
                        employee: 'Papa Joe',
                        transaction: 'Denim Jeans #5682',
                        cost: 5000,
                        sale: 6000,
                        revenue: 1000
                    }]
                }, {
                    "date": "2013-07-02",
                        "cost": "1200000",
                        "sales": "2200000",
                        "revenue": "1000000",
                        "employees": "28",
                        "employeesHoursSum": "43",
                    showTransactions: false,
                    transactions: [{
                        employee: 'John Doe',
                        transaction: 'Silver Jeans #5611',
                        cost: 20000,
                        sale: 30000,
                        revenue: 10000
                    }, {
                        employee: 'John Doe',
                        transaction: 'Leather Jacket #8971',
                        cost: 25000,
                        sale: 35000,
                        revenue: 10000
                    }, {
                        employee: 'Papa Joe',
                        transaction: 'Denim Jeans #5681',
                        cost: 5000,
                        sale: 6000,
                        revenue: 1000
                    }]
                }]
            }
        }, {
            "store": {
                "storeId": "4000",
                    "storeName": "Store 4",
                    "storePhone": "0044 34 123-45678",
                    "storeAddress": "Churchill avenue",
                    "storeCity": "London"
            },
                "data": {
                "startDate": "2013-07-01",
                    "endDate": "2013-07-02",
                    "costTotal": "1700000",
                    "salesTotal": "2300000",
                    "revenueTotal": "600000",
                    "averageEmployees": "13.0",
                    "averageEmployeesHours": "39",
                    "dayData": [{
                    "date": "2013-07-01",
                        "cost": "850000",
                        "sales": "1170000",
                        "revenue": "320000",
                        "employees": "14",
                        "employeesHoursSum": "39",
                    showTransactions: false,
                    transactions: [{
                        employee: 'Stephen Bollocks',
                        transaction: 'Necklace #2305',
                        cost: 20000,
                        sale: 30000,
                        revenue: 10000
                    }, {
                        employee: 'Jillian Keane',
                        transaction: 'Diamond Ring #2587',
                        cost: 25000,
                        sale: 35000,
                        revenue: 10000
                    }, {
                        employee: 'Hillary Shannessy',
                        transaction: 'Necklace #2387',
                        cost: 5000,
                        sale: 6000,
                        revenue: 1000
                    }]
                }, {
                    "date": "2013-07-02",
                        "cost": "850000",
                        "sales": "1130000",
                        "revenue": "280000",
                        "employees": "12",
                        "employeesHoursSum": "39",
                    showTransactions: false,
                    transactions: [{
                        employee: 'Jillian Keane',
                        transaction: 'Diamond Ring #2578',
                        cost: 20000,
                        sale: 30000,
                        revenue: 10000
                    }, {
                        employee: 'Hillary Shannessy',
                        transaction: 'Diamond Ring #2515',
                        cost: 25000,
                        sale: 35000,
                        revenue: 10000
                    }, {
                        employee: 'Stephen Bollocks',
                        transaction: 'Necklace #2389',
                        cost: 5000,
                        sale: 6000,
                        revenue: 1000
                    }]
                }]
            }
        }, {
            "store": {
                "storeId": "5000",
                    "storeName": "Store 5",
                    "storePhone": "+33 78 432-98765",
                    "storeAddress": "Le Big Mac Rue",
                    "storeCity": "Paris"
            },
                "data": {
                "startDate": "2013-07-01",
                    "endDate": "2013-07-02",
                    "costTotal": "1900000",
                    "salesTotal": "2500000",
                    "revenueTotal": "600000",
                    "averageEmployees": "16.0",
                    "averageEmployeesHours": "37",
                    "dayData": [{
                    "date": "2013-07-01",
                        "cost": "950000",
                        "sales": "1280000",
                        "revenue": "330000",
                        "employees": "16",
                        "employeesHoursSum": "37",
                    showTransactions: false,
                    transactions: [{
                        employee: 'Pierre Sartre',
                        transaction: 'Necklace #2337',
                        cost: 20000,
                        sale: 30000,
                        revenue: 10000
                    }, {
                        employee: 'Julianne Bischamps',
                        transaction: 'Diamond Ring #2515',
                        cost: 25000,
                        sale: 35000,
                        revenue: 10000
                    }, {
                        employee: 'Ada Parisienne',
                        transaction: 'Denim Jeans #5680',
                        cost: 5000,
                        sale: 6000,
                        revenue: 1000
                    }]
                }, {
                    "date": "2013-07-02",
                        "cost": "950000",
                        "sales": "1220000",
                        "revenue": "270000",
                        "employees": "16",
                        "employeesHoursSum": "37",
                    showTransactions: false,
                    transactions: [{
                        employee: 'Julianne Bischamps',
                        transaction: 'Necklace #2343',
                        cost: 20000,
                        sale: 30000,
                        revenue: 10000
                    }, {
                        employee: 'Julianne Bischamps',
                        transaction: 'Diamond Ring #2512',
                        cost: 25000,
                        sale: 35000,
                        revenue: 10000
                    }, {
                        employee: 'Ada Parisienne',
                        transaction: 'Denim Jeans #5679',
                        cost: 5000,
                        sale: 6000,
                        revenue: 1000
                    }]
                }]
            }
        }, {
            "store": {
                "storeId": "6000",
                    "storeName": "Store 6",
                    "storePhone": "+49 54 7624214",
                    "storeAddress": "Bier strasse",
                    "storeCity": "Berlin"
            },
                "data": {
                "startDate": "2013-07-01",
                    "endDate": "2013-07-02",
                    "costTotal": "1800000",
                    "salesTotal": "2200000",
                    "revenueTotal": "400000",
                    "averageEmployees": "11.0",
                    "averageEmployeesHours": "39",
                    "dayData": [{
                    "date": "2013-07-01",
                        "cost": "900000",
                        "sales": "1100000",
                        "revenue": "200000",
                        "employees": "12",
                        "employeesHoursSum": "39",
                    showTransactions: false,
                    transactions: [{
                        employee: 'Hans Landa',
                        transaction: 'Leather Robe #7654',
                        cost: 20000,
                        sale: 30000,
                        revenue: 10000
                    }, {
                        employee: 'Rutger Heimlich',
                        transaction: 'Manchester pants #5687',
                        cost: 5000,
                        sale: 6000,
                        revenue: 1000
                    }, {
                        employee: 'Chloe Schwimmer',
                        transaction: 'Diamond Ring #2510',
                        cost: 25000,
                        sale: 35000,
                        revenue: 10000
                    }]
                }, {
                    "date": "2013-07-02",
                        "cost": "900000",
                        "sales": "1100000",
                        "revenue": "200000",
                        "employees": "10",
                        "employeesHoursSum": "39",
                    showTransactions: false,
                    transactions: [{
                        employee: 'Hans Landa',
                        transaction: 'Boots #7659',
                        cost: 20000,
                        sale: 30000,
                        revenue: 10000
                    }, {
                        employee: 'Hans Landa',
                        transaction: 'Pants #5696',
                        cost: 25000,
                        sale: 35000,
                        revenue: 10000
                    }, {
                        employee: 'Chloe Schwimmer',
                        transaction: 'Plastic Ring #2589',
                        cost: 5000,
                        sale: 6000,
                        revenue: 1000
                    }]
                }]
            }
        }],
            "_links": {
            "self": {
                "href": "/storedata/between/2013-07-01/2013-07-02"
            }
        }
    };

});;