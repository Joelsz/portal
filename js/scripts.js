var IO = angular.module('IO', [ 'ngRoute', 'ngResource', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);
	var path = '/portal/pages/';
	IO.config(['$routeProvider',
	function($routeProvider) {
	  $routeProvider.
	    when('/', {
	      templateUrl: path + 'portalHome.html',
	      controller: 'PortalHomeController'
	  }).when('/addHomePageBanner/:id?/:clone?', {
	      templateUrl: path + 'addHomePageBanner.html',
	      controller: 'AddImageBannerController'
	  }).when('/addHTMLBanner/:id?/:clone?', {
	      templateUrl: path + '//addHTMLBanner.html',
	      controller: 'AddHTMLBannerController'
	  }).when('/dashboard', {
	      templateUrl: path + 'dashboard.html',
	      controller: 'DashboardController'
	  }).when('/addNote/:id?/:clone?', {
	      templateUrl: path + 'addNote.html',
	      controller: 'AddNoteController'
	  }).when('/addCheckoutAgreement/:id?/:clone?', {
	      templateUrl: path + 'addCheckoutAgreement.html',
	      controller: 'AddCheckoutAgreementController'
	  }).when('/addDepartmentClosedAlert/:id?/:clone?', {
	      templateUrl: path + 'addDepartmentClosedAlert.html',
	      controller: 'AddDepartmentClosedAlertController'
	  }).when('/addDoodle/:id?/:clone?', {
	      templateUrl: path + 'addDoodle.html',
	      controller: 'AddDoodleController'
	  }).when('/groups/:id?', {
	      templateUrl: path + 'groups.html',
	      controller: 'GroupsCountroller'
	  }).when('/giftCards', {
	      templateUrl: path + 'giftCards.html',
	      controller: 'GiftCardsCountroller'
	  });
	}]);		

IO.controller('PortalHomeController', function($scope){

	var day_data = [
		{"elapsed": "2013 - 01", "value": 24, b:2},
		{"elapsed": "2013 - 02", "value": 34, b:22},
		{"elapsed": "2013 - 03", "value": 33, b:7},
		{"elapsed": "2013 - 04", "value": 22, b:6},
		{"elapsed": "2013 - 05", "value": 28, b:17},
		{"elapsed": "2013 - 06", "value": 60, b:15},
		{"elapsed": "2013 - 07", "value": 60, b:17},
		{"elapsed": "2013 - 08", "value": 70, b:7},
		{"elapsed": "2013 - 09", "value": 67, b:18},
		{"elapsed": "2013 - 10", "value": 86, b: 18},
		{"elapsed": "2013 - 11", "value": 86, b: 18},
		{"elapsed": "2013 - 12", "value": 113, b: 29},
		{"elapsed": "2014 - 01", "value": 130, b: 23},
		{"elapsed": "2014 - 02", "value": 114, b:10},
		{"elapsed": "2014 - 03", "value": 80, b:22},
		{"elapsed": "2014 - 04", "value": 109, b:7},
		{"elapsed": "2014 - 05", "value": 100, b:6},
		{"elapsed": "2014 - 06", "value": 105, b:17},
		{"elapsed": "2014 - 07", "value": 110, b:15},
		{"elapsed": "2014 - 08", "value": 102, b:17},
		{"elapsed": "2014 - 09", "value": 107, b:7},
		{"elapsed": "2014 - 10", "value": 60, b:18},
		{"elapsed": "2014 - 11", "value": 67, b: 18},
		{"elapsed": "2014 - 12", "value": 76, b: 18},
		{"elapsed": "2015 - 01", "value": 73, b: 29},
		{"elapsed": "2015 - 02", "value": 94, b: 13},
		{"elapsed": "2015 - 03", "value": 79, b: 24}
	];

	var chart = Morris.Area({
		element: 'morris-chart-network',
		data: day_data,
		axes:false,
		xkey: 'elapsed',
		ykeys: ['value', 'b'],
		labels: ['Download Speed', 'Upload Speed'],
		yLabelFormat :function (y) { return y.toString() + ' Mb/s'; },
		gridEnabled: false,
		gridLineColor: 'transparent',
		lineColors: ['#8eb5e3','#1b72bc'],
		lineWidth:0,
		pointSize:0,
		pointFillColors:['#3e80bd'],
		pointStrokeColors:'#3e80bd',
		fillOpacity:.7,
		gridTextColor:'#999',
		parseTime: false,
		resize:true,
		behaveLikeLine : true,
		hideHover: 'auto'
	});




	// Services chart ( Morris Donut Chart )
	// =================================================================
	// Require MorrisJS Chart
	// -----------------------------------------------------------------
	// http://morrisjs.github.io/morris.js/
	// =================================================================
	Morris.Donut({
		element: 'demo-morris-donut',
		data: [
			{label: "Supports", value: 12},
			{label: "Sales", value: 30},
			{label: "Comments", value: 20}
		],
		colors: [
			'#c686be',
			'#986291',
			'#ab6fa3'
		],
		resize:true
	});

});
	
IO.controller('AppController', function($scope, $modal, Groups) {
		
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
	
IO.controller('AddImageBannerController', function($scope, $routeParams, Banner, $filter) {	
	$scope.formData = {};
	$scope.formData.type = 'homebanner';
	$scope.formData.item = {};
	$scope.formData.item.imagePath = "http://www.bhphotovideo.com/bimages/";
	$scope.formData.item.variants = [{}];
	
	$scope.submitted = false;

	$scope.state = 'form';
	
	if($routeParams.id) {
		Banner.get({id: $routeParams.id}, function(response) {
			if($routeParams.clone)
				delete response.alertId;
			if(response.alertId)
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

IO.controller('AddHTMLBannerController', function($scope, $routeParams, Banner, $filter) {	
	$scope.formData = {};
	$scope.formData.type = 'HTMLBanner';
	$scope.formData.item = {};
	$scope.formData.item.variants = [{}];
	
	$scope.submitted = false;

	if($routeParams.id) {
		Banner.get({id: $routeParams.id}, function(response) {
			if($routeParams.clone)
				delete response.alertId;
			if(response.alertId)
				$scope.submitTitle = 'Update Banner';
			$scope.formData = response;	
			$scope.formData.startDate = new Date(response.startDate);
			$scope.formData.endDate = new Date(response.endDate);
		});
	}	
	
	$scope.state = 'form';
	
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

IO.controller('AddNoteController', function($scope, $routeParams, Banner, $filter, $modal) {
	
	$scope.formData = {};
	$scope.formData.type = 'note';
	$scope.formData.item = {};
	$scope.formData.item.variants = [{}];
	
	$scope.submitted = false;
	
	$scope.showShipCutOffWidget = false;
	
	if($routeParams.id) {
		Banner.get({id: $routeParams.id}, function(response) {
			if($routeParams.clone)
				delete response.alertId;
			if(response.alertId)
				$scope.submitTitle = 'Update Note';
			$scope.formData = response;	
			$scope.formData.startDate = new Date(response.startDate.replace(/-/g, '/'));
			$scope.formData.endDate = new Date(response.endDate.replace(/-/g, '/'));
			
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
				Banner.update($.param({'json': angular.toJson($scope.formData)}), function() {
					$scope.state = 'submitted';
				});
			} else {
				Banner.save($.param({'json': angular.toJson($scope.formData)}), function() {
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

IO.controller('AddCheckoutAgreementController', function($scope, $routeParams, Banner, $filter, $modal) {
	$scope.formData = {};
	$scope.formData.type = 'checkoutAgreement';
	$scope.formData.item = {};
	
	$scope.submitted = false;
	
	if($routeParams.id) {
		Banner.get({id: $routeParams.id}, function(response) {
			if($routeParams.clone)
				delete response.alertId;
			if(response.alertId)
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

IO.controller('AddDepartmentClosedAlertController', function($scope, $routeParams, Banner, $filter, $modal) {
	
	$scope.formData = {};
	$scope.formData.type = 'departmentClosed';
	$scope.formData.item = {};
	$scope.formData.item.departments = [{}];
	
	$scope.submitted = false;
	
	$scope.addDept = function(){
		$scope.formData.item.departments.push({});	
	}
	$scope.removeDept = function(i){
		$scope.formData.item.departments.splice(i, 1);
	}
	
	if($routeParams.id) {
		Banner.get({id: $routeParams.id}, function(response) {
			if($routeParams.clone)
				delete response.alertId;
			if(response.alertId)
				$scope.submitTitle = 'Update Department Closed Alert';
			$scope.formData = response;	
			$scope.formData.startDate = new Date(response.startDate);
			$scope.formData.endDate = new Date(response.endDate);
		});
	}	
	
	$scope.state = 'form';
	$scope.duplicateDept = false;
	
	$scope.submitForm = function (form) {
		$scope.submitted = true;
		
		var values = $.map($scope.formData.item.departments, function(o) { return o["department"]; })
		$.each(values, function(i, val){
			var vals = values.slice();
			vals.splice(i,1);
			$scope.duplicateDept = (vals.indexOf(val) != -1);
			if(vals.indexOf(val) != -1)
				return false;
		});
		
		if($scope.duplicateDept)
			return;
		
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

IO.controller('AddDoodleController', function($scope, $routeParams, Banner, $filter) {
	$scope.formData = {};
	$scope.formData.type = 'doodle';
	$scope.formData.item = {};
	
	$scope.submitted = false;
	
	if($routeParams.id) {
		Banner.get({id: $routeParams.id}, function(response) {
			if($routeParams.clone)
				delete response.alertId;
			if(response.alertId)
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

IO.controller('DashboardController', function($scope, Alerts, $filter, $modal) {	
	Alerts.get(function(response) {
		 $scope.alerts = response.data;
	});
	
	$scope.getDateObj = function(string){
		return new Date(string);
	}
	
	$scope.tableHeader = [
	      {name: '', value: ''},
	      {name: 'Edit', value: ''},
	      {name: 'Remove', value: ''},
	      {name: 'Clone', value: ''},
	      {name: 'Type', value: 'type'},
	      {name: 'Description', value: 'item.description'},
	      {name: 'Start Date', value: 'startDate'},
	      {name: 'End Date', value: 'endDate'},
	      {name: 'Environments', value: 'environments'}
	];
	
	$scope.filterEnvironment = function(value) {
		$scope.selectedEnvironment = value;
		if(localStorage){
			localStorage.selectedEnvironment = value;
		}
	}
	
	$scope.sortReverse = false;
	
	$scope.sortAlerts = function(value){
		
		if($scope.selectedSort == value)
			$scope.sortReverse = !$scope.sortReverse;
		
		$scope.selectedSort = value;
		if(localStorage){
			localStorage.selectedSort = value;
		}
	}
	
	if(localStorage){
		if(localStorage.selectedEnvironment)
			$scope.filterEnvironment(localStorage.selectedEnvironment);
	
		if(localStorage.selectedSort)
			$scope.sortAlerts(localStorage.selectedSort);
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

IO.controller('GroupsCountroller', function($scope, Groups, Group, $routeParams, $filter, $location) {

	var setFormData = function() {
		$scope.formData = {};
		$scope.formData.item = {};
		$scope.formData.item.subgroups = [{}];
	}
	
	setFormData();
	
	if($routeParams.id) {
		Group.get({id: $routeParams.id}, function(response) {
			var formData = response;
			formData.item = response.item;
			$scope.submitTitle = 'Update Group';
				
			formData.startDate = new Date(response.startDate.replace(/-/g, '/'));
			formData.endDate = new Date(response.endDate.replace(/-/g, '/'));
			
			$.each(formData.item.subgroups, function(i, sub){
				formData.item.subgroups[i].startDate = new Date(formData.item.subgroups[i].startDate.replace(/-/g, '/'));
				formData.item.subgroups[i].endDate = new Date(formData.item.subgroups[i].endDate.replace(/-/g, '/'));
			});
			
			$scope.formData = formData;
		});
	}
	
	$scope.getDateTimeString = function(date){
		return $filter('date')(date, 'yyyy-MM-ddTHH:mm:ss');
	};
	
	$scope.addSubgroup = function(){
		$scope.formData.item.subgroups.push({});
		return false;
	};
	
	$scope.removeSubgroup = function(i){
		$scope.formData.item.subgroups.splice(i,1);
	};
	
	$scope.submitForm = function (form) {
		$scope.submitted = true;
		if(form.$valid) {
			var item = {};
			
			$.each($scope.formData.item.subgroups, function(i, sub){
				sub.startDate = $filter('date')(new Date(sub.startDate), 'yyyy-MM-dd');
				sub.endDate = $filter('date')(new Date(sub.endDate), 'yyyy-MM-dd');
			});
			
			$.each($scope.formData.item, function(key, value) {
			    if(value) {
			    	item[key] = value;
			    }
			});		
			
			$scope.formData.item = item;
			
			$scope.formData.startDate = $filter('date')(new Date($scope.formData.startDate), 'yyyy-MM-ddTHH:mm');
			$scope.formData.endDate = $filter('date')(new Date($scope.formData.endDate), 'yyyy-MM-ddTHH:mm');
			
			$scope.submitTitle = 'Updating...';
			//if update
			if($scope.formData.groupId) {		
				Group.update($.param({'json': angular.toJson($scope.formData)}), function() {
					$scope.state = 'submitted';
					$scope.submitTitle = '';
					$scope.fetchGroups();
					setFormData();
					$scope.form.$setPristine();
					$location.url('/groups');
				});
			} else {
				Group.save($.param({'json': angular.toJson($scope.formData)}), function() {
					$scope.state = '';
					$scope.submitTitle = '';
					$scope.fetchGroups();
					setFormData();
					$scope.form.$setPristine();
					$location.url('/groups');
				});
			}
		}
	};
});

IO.controller('GiftCardsCountroller', function($scope, SQA) {	
	SQA.query({'call': 'getActiveGiftCards'}, function(data) {
		$scope.cards = data;
	});
});

IO.factory('Banner', function($resource) {
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

IO.factory('Group', function($resource) {
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

IO.factory('Alerts', function($resource) {
	return $resource('/bnh/controller/home?O=home&A=GetAlerts&Q=json&filter=false');
});

IO.factory('Groups', function($resource) {
	return $resource('/bnh/controller/home?O=home&A=GetGroups&Q=json');
});

IO.factory('SQA', function($resource) {
    return $resource('/bnh/controller/home?O=home&Q=json&A=DoSQACall', {}, {
        save: {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        },
        update: {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        },
        get: {
            method: 'GET',
        }
    });
});

IO.directive('bpInfo', function(){
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

var getDateObj = function(string){
	return new Date(string);
}
