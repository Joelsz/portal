var bannerPortal = angular.module('bannerPortal', [ 'ngRoute', 'ngResource', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);
	var path = '/FrameWork/IO/pages/';
	bannerPortal.config(['$routeProvider',
	function($routeProvider) {
	  $routeProvider.
	    when('/addHomePageBanner/:id?', {
	      templateUrl: path + 'addHomePageBanner.html',
	      controller: 'AddImageBannerController'
	  }).when('/addHTMLBanner/:id?', {
	      templateUrl: path + '//addHTMLBanner.html',
	      controller: 'AddHTMLBannerController'
	  }).when('/', {
	      templateUrl: path + 'dashboard.html',
	      controller: 'DashboardController'
	  }).when('/addNote/:id?', {
	      templateUrl: path + 'addNote.html',
	      controller: 'AddNoteController'
	  }).when('/addCheckoutAgreement/:id?', {
	      templateUrl: path + 'addCheckoutAgreement.html',
	      controller: 'AddCheckoutAgreementController'
	  }).when('/addDepartmentClosedAlert/:id?', {
	      templateUrl: path + 'addDepartmentClosedAlert.html',
	      controller: 'AddDepartmentClosedAlertController'
	  }).when('/addDoodle/:id?', {
	      templateUrl: path + 'addDoodle.html',
	      controller: 'AddDoodleController'
	  }).when('/groups/:id?', {
	      templateUrl: path + 'groups.html',
	      controller: 'GroupsCountroller'
	  });
	}]);		
	
bannerPortal.controller('AppController', function($scope, $modal, Groups) {
		
	$scope.environments = [
	      {name: 'All', value: ''},
	      {name: 'Mobile', value: 'Mobile'},
	      {name: 'Android', value: 'Android'},
	      {name: 'IPhone', value: 'IPhone'},
	      {name: 'IPad', value: 'IPad'},
	      {name: 'Desktop', value: 'Desktop'}
	];
	
	$scope.alertTypes = [
	      {type: 'note', href: 'addNote', theme: {colorClass: 'bg-purple', iconClass: 'bullhorn'}},
	      {type: 'homebanner', href: 'addHomePageBanner', theme: {colorClass: 'bg-success', iconClass: 'picture'}},
	      {type: 'HTMLBanner', href: 'addHTMLBanner', theme: {colorClass: 'bg-mint', iconClass: 'screenshot'}},
	      {type: 'checkoutAgreement', href: 'addCheckoutAgreement', theme: {colorClass: 'bg-danger', iconClass: 'credit-card'}},
	      {type: 'departmentClosed', href: 'addDepartmentClosedAlert', theme: {colorClass: 'bg-warning', iconClass: 'ban-circle'}},
	      {type: 'doodle', href: 'addDoodle', theme: {colorClass: 'bg-danger', iconClass: 'picture'}}
	];
	
	$scope.getAlertTypeInfo = function(type) {
		return $scope.alertTypes.filter(function(elem) {return elem.type === type})[0];
	}
	
	$scope.generageQuery = function(scope) {
		$modal.open({
	      templateUrl: 'generateQuery.html',
	      controller: modalInstance,
	      scope: scope
	    });
	}
	
	$scope.fetchGroups = function() {
		Groups.get(function(response) {
			 $scope.groups = response.data;
		});
	}
	
	$scope.fetchGroups();
});
	
bannerPortal.controller('AddImageBannerController', function($scope, $routeParams, Banner, $filter) {	
	$scope.formData = {};
	$scope.formData.type = 'homebanner';
	$scope.formData.item = {};
	$scope.formData.item.imagePath = "http://www.bhphotovideo.com/bimages/";
	$scope.formData.item.variants = [{}];
	
	$scope.submitted = false;

	$scope.state = 'form';
	
	if($routeParams.id) {
		Banner.get({id: $routeParams.id}, function(response) {
			$scope.submitTitle = 'Update Banner';
			$scope.formData = response;	
			
			//support older versions
			if(!response.item.variants) {
				$scope.formData.item.variants = [];
				if(response.item.imageName) {
					$scope.formData.item.variants.push({imageName: response.item.imageName})
				}
			}	
			$scope.formData.startDate = new Date(response.startDate);
			$scope.formData.endDate = new Date(response.endDate);
		});
	}	
	
	$scope.addVariant = function() {
		$scope.formData.item.variants.push({});
		return false;
	}
	
	$scope.submitForm = function (form) {
		$scope.submitted = true;
		if(form.$valid) {
			var item = {};
			$.each($scope.formData.item, function(key, value) {
			    if(value) {
			    	item[key] = value;
			    }
			});		
			$scope.formData.item = item;
			
			$scope.formData.startDate = $filter('date')($scope.formData.startDate, 'yyyy-MM-ddTHH:mm');
			$scope.formData.endDate = $filter('date')($scope.formData.endDate, 'yyyy-MM-ddTHH:mm');
			
			$scope.submitTitle = 'Updating...';
			//if update
			if($scope.formData.alertId) {
				
				Banner.update($.param({'json': JSON.stringify($scope.formData)}), function() {
					$scope.state = 'submitted';
				});
			} else {
				Banner.save($.param({'json': JSON.stringify($scope.formData)}), function() {
					$scope.state = 'submitted';
				});
			}	
		}
	};    
});

bannerPortal.controller('AddHTMLBannerController', function($scope, $routeParams, Banner, $filter) {	
	$scope.formData = {};
	$scope.formData.type = 'HTMLBanner';
	$scope.formData.item = {};
	
	$scope.submitted = false;

	if($routeParams.id) {
		Banner.get({id: $routeParams.id}, function(response) {
			$scope.submitTitle = 'Update Banner';
			$scope.formData = response;	
			$scope.formData.startDate = new Date(response.startDate);
			$scope.formData.endDate = new Date(response.endDate);
		});
	}	
	
	$scope.state = 'form';
	$scope.submitForm = function (form) {
		$scope.submitted = true;
		if(form.$valid) {
			var item = {};
			$.each($scope.formData.item, function(key, value) {
			    if(value) {
			    	item[key] = value;
			    }
			});		
			$scope.formData.item = item;
			
			$scope.formData.startDate = $filter('date')($scope.formData.startDate, 'yyyy-MM-ddTHH:mm');
			$scope.formData.endDate = $filter('date')($scope.formData.endDate, 'yyyy-MM-ddTHH:mm');
			
			$scope.submitTitle = 'Updating...';
			//if update
			if($scope.formData.alertId) {
				
				Banner.update($.param({'json': JSON.stringify($scope.formData)}), function() {
					$scope.state = 'submitted';
				});
			} else {
				Banner.save($.param({'json': JSON.stringify($scope.formData)}), function() {
					$scope.state = 'submitted';
				});
			}	
		}
	};    
});

bannerPortal.controller('AddNoteController', function($scope, $routeParams, Banner, $filter, $modal) {
	$scope.formData = {};
	$scope.formData.type = 'note';
	$scope.formData.item = {};
	$scope.formData.item.variants = [{}];
	
	$scope.submitted = false;
	
	$scope.showShipCutOffWidget = false;
	
	if($routeParams.id) {
		Banner.get({id: $routeParams.id}, function(response) {
			$scope.submitTitle = 'Update Note';
			$scope.formData = response;	
			$scope.formData.startDate = new Date(response.startDate);
			$scope.formData.endDate = new Date(response.endDate);
			
			showWidgets();
		});
	}	
	
	$scope.previewVariant = function(count){
		$scope.variantToPreview = $scope.formData.item.variants[count];
		$modal.open({
	      templateUrl: 'preview.html',
	      controller: modalInstance,
	      scope: $scope,
	      windowClass: 'preview-dialog'
	    });
	}
	
	$scope.removeVariant = function(variant, count){
		$scope.variantCountForOutput = count + 1;
		if(angular.toJson(variant) != '{}'){
			$modal.open({
		      templateUrl: 'removeVariant.html',
		      controller: modalInstance,
		      scope: $scope
		    }).result.then(spliceVariants);
		}
		else {//dont warn
			spliceVariants();
		}
		function spliceVariants(){
			$scope.formData.item.variants.splice(count,1);
		}
	}
	
	$scope.addVariant = function() {
		$scope.formData.item.variants.push({});
		return false;
	}
	
	$scope.state = 'form';
	$scope.submitForm = function (form) {
		$scope.submitted = true;
		if(form.$valid) {
			$scope.formData.startDate = $filter('date')($scope.formData.startDate, 'yyyy-MM-ddTHH:mm');
			$scope.formData.endDate = $filter('date')($scope.formData.endDate, 'yyyy-MM-ddTHH:mm');
			$scope.submitTitle = 'Updating...';
			//if update
			if($scope.formData.alertId) {
				Banner.update($.param({'json': JSON.stringify($scope.formData)}), function() {
					$scope.state = 'submitted';
				});
			} else {
				Banner.save($.param({'json': JSON.stringify($scope.formData)}), function() {
					$scope.state = 'submitted';
				});
			}
		}		
	};    
	
	$scope.checkForWidgets = function() {
		showWidgets();
	};
	
	var showWidgets = function(text) {
		for(var i=0;i<$scope.formData.item.variants.length;i++) {
			var variant = $scope.formData.item.variants[i];
			
			if((variant.condensedNote && variant.condensedNote.indexOf('shipCutOffWidget') !== -1) || (variant.expandedNote && variant.expandedNote.indexOf('shipCutOffWidget') !== -1)) 
				variant.showShipCutOffWidget = true;
			else
				variant.showShipCutOffWidget = false;
		}
		
	};
	
	$scope.generageQuery = function() {
		$modal.open({
	      templateUrl: 'generateQuery.html',
	      controller: modalInstance,
	      scope: $scope
	    });
	}
});

bannerPortal.controller('AddCheckoutAgreementController', function($scope, $routeParams, Banner, $filter, $modal) {
	$scope.formData = {};
	$scope.formData.type = 'checkoutAgreement';
	$scope.formData.item = {};
	
	$scope.submitted = false;
	
	if($routeParams.id) {
		Banner.get({id: $routeParams.id}, function(response) {
			$scope.submitTitle = 'Update Checkout Agreement';
			$scope.formData = response;	
			$scope.formData.startDate = new Date(response.startDate);
			$scope.formData.endDate = new Date(response.endDate);
		});
	}	
	
	$scope.state = 'form';
	$scope.submitForm = function (form) {
		$scope.submitted = true;
		if(form.$valid) {
			$scope.formData.startDate = $filter('date')($scope.formData.startDate, 'yyyy-MM-ddTHH:mm');
			$scope.formData.endDate = $filter('date')($scope.formData.endDate, 'yyyy-MM-ddTHH:mm');
			$scope.submitTitle = 'Updating...';
			//if update
			if($scope.formData.alertId) {
				Banner.update($.param({'json': JSON.stringify($scope.formData)}), function() {
					$scope.state = 'submitted';
				});
			} else {
				Banner.save($.param({'json': JSON.stringify($scope.formData)}), function() {
					$scope.state = 'submitted';
				});
			}
		}		
	};    
	
	$scope.generageQuery = function() {
		$modal.open({
	      templateUrl: 'generateQuery.html',
	      controller: modalInstance,
	      scope: $scope
	    });
	}
});

bannerPortal.controller('AddDepartmentClosedAlertController', function($scope, $routeParams, Banner, $filter, $modal) {
	$scope.formData = {};
	$scope.formData.type = 'departmentClosed';
	$scope.formData.item = {};
	
	$scope.submitted = false;
	
	if($routeParams.id) {
		Banner.get({id: $routeParams.id}, function(response) {
			$scope.submitTitle = 'Update Department Closed Alert';
			$scope.formData = response;	
			$scope.formData.startDate = new Date(response.startDate);
			$scope.formData.endDate = new Date(response.endDate);
		});
	}	
	
	$scope.state = 'form';
	$scope.submitForm = function (form) {
		$scope.submitted = true;
		if(form.$valid) {
			$scope.formData.startDate = $filter('date')($scope.formData.startDate, 'yyyy-MM-ddTHH:mm');
			$scope.formData.endDate = $filter('date')($scope.formData.endDate, 'yyyy-MM-ddTHH:mm');
			$scope.submitTitle = 'Updating...';
			//if update
			if($scope.formData.alertId) {
				Banner.update($.param({'json': JSON.stringify($scope.formData)}), function() {
					$scope.state = 'submitted';
				});
			} else {
				Banner.save($.param({'json': JSON.stringify($scope.formData)}), function() {
					$scope.state = 'submitted';
				});
			}
		}		
	};    
	
	$scope.generageQuery = function() {
		$modal.open({
	      templateUrl: 'generateQuery.html',
	      controller: modalInstance,
	      scope: $scope
	    });
	}
});

bannerPortal.controller('AddDoodleController', function($scope, $routeParams, Banner, $filter) {
	$scope.formData = {};
	$scope.formData.type = 'doodle';
	$scope.formData.item = {};
	
	$scope.submitted = false;
	
	if($routeParams.id) {
		Banner.get({id: $routeParams.id}, function(response) {
			$scope.submitTitle = 'Update Doodle :)';
			$scope.formData = response;	
			$scope.formData.startDate = new Date(response.startDate);
			$scope.formData.endDate = new Date(response.endDate);
		});
	}	
	
	$scope.state = 'form';
	$scope.submitForm = function (form) {
		$scope.submitted = true;
		if(form.$valid) {
			$scope.submitTitle = 'Updating...';
			//if update
			if($scope.formData.alertId) {
				Banner.update($.param({'json': JSON.stringify($scope.formData)}), function() {
					$scope.state = 'submitted';
				});
			} else {
				Banner.save($.param({'json': JSON.stringify($scope.formData)}), function() {
					$scope.state = 'submitted';
				});
			}
		}		
	};    
});

bannerPortal.controller('DashboardController', function($scope, Alerts, $filter, $modal) {	
	Alerts.get(function(response) {
		 $scope.alerts = response.data;
	});
	
	$scope.getDateObj = function(string){
		return new Date(string);
	}
	
	$scope.sortTypes = [
	      {name: 'Default', value: ''},
	      {name: 'Type', value: 'type'},
	      {name: 'Description', value: 'item.description'},
	      {name: 'Start Date', value: 'startDate'},
	      {name: 'Environments', value: 'environments'}
	];
	
	var setSelectedEnvironment = function(value){
		if(localStorage){
			localStorage.selectedEnvironment = value;
		}
	}
	
	var filterEnvironment = function(value) {
		$scope.selectedEnvironment = value;
	}
	
	if(localStorage && localStorage.selectedEnvironment){
		filterEnvironment(localStorage.selectedEnvironment);
	}
	
	$scope.filterEnvironment = function(value){
		filterEnvironment(value);
		setSelectedEnvironment(value);
	}
	
	$scope.sortAlerts = function(sort){
		$scope.selectedSort = sort;
	}
	
	$scope.deleteAlert = function(alert) {
		
		$scope.deleteAlertId = alert.alertId;
		
		var deleteModal = $modal.open({
	      templateUrl: 'confirmDelete.html',
	      controller: modalInstance,
	      scope: $scope
	    });
		
		deleteModal.result.then(function () {
			console.log('delete alert...');
	    }, function () {
	    	console.log('cancelled');
	    });
	}
});

bannerPortal.controller('GroupsCountroller', function($scope, Groups, Group, $routeParams, $filter) {	

	var setFormData = function() {
		$scope.formData = {};
		$scope.formData.item = {};
	}
	
	setFormData();
	
	if($routeParams.id) {
		Group.get({id: $routeParams.id}, function(response) {
			$scope.submitTitle = 'Update Banner';
			$scope.formData = response;	
				
			$scope.formData.startDate = new Date(response.startDate);
			$scope.formData.endDate = new Date(response.endDate);
		});
	}
	
	$scope.submitForm = function (form) {
		$scope.submitted = true;
		if(form.$valid) {
			var item = {};
			$.each($scope.formData.item, function(key, value) {
			    if(value) {
			    	item[key] = value;
			    }
			});		
			$scope.formData.item = item;
			
			$scope.formData.startDate = $filter('date')($scope.formData.startDate, 'yyyy-MM-ddTHH:mm');
			$scope.formData.endDate = $filter('date')($scope.formData.endDate, 'yyyy-MM-ddTHH:mm');
			
			$scope.submitTitle = 'Updating...';
			//if update
			if($scope.formData.groupId) {		
				Group.update($.param({'json': JSON.stringify($scope.formData)}), function() {
					$scope.state = 'submitted';
					$scope.submitTitle = '';
					$scope.fetchGroups();
					setFormData();
					$scope.form.$setPristine();
				});
			} else {
				Group.save($.param({'json': JSON.stringify($scope.formData)}), function() {
					$scope.state = '';
					$scope.submitTitle = '';
					$scope.fetchGroups();
					setFormData();
					$scope.form.$setPristine();
				});
			}	
		}
	};
});

bannerPortal.factory('Banner', function($resource) {
    return $resource('/bnh/controller/home?O=home&Q=json:action', {}, {
        save: {
            method: 'POST',
            params: {action: '&A=InsertAlert'},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        },
        update: {
            method: 'POST',
            params: {action: '&A=UpdateAlert'},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        },
        get: {
            method: 'GET',
            params: {action: '&A=GetAlert'},
        }
    });
});

bannerPortal.factory('Group', function($resource) {
    return $resource('/bnh/controller/home?O=home&Q=json:action', {}, {
        save: {
            method: 'POST',
            params: {action: '&A=InsertGroup'},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        },
        update: {
            method: 'POST',
            params: {action: '&A=UpdateGroup'},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        },
        get: {
            method: 'GET',
            params: {action: '&A=GetGroup'},
        }
    });
});

bannerPortal.factory('Alerts', function($resource) {
	return $resource('/bnh/controller/home?O=home&A=GetAlerts&Q=json&filter=false');
});

bannerPortal.factory('Groups', function($resource) {
	return $resource('/bnh/controller/home?O=home&A=GetGroups&Q=json');
});

bannerPortal.directive('bpInfo', function(){
	return {
		restrict: 'A',
		link: function(scope, element){
			element.popover({
				html: true,
				trigger:"click hover"
			});
			/*element.on('shown.bs.popover', function () {
			})*/
		}
	}
});

var modalInstance = function ($scope, $modalInstance) {
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};
