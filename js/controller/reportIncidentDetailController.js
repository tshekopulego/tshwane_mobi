mobileApp.controller('reportIncidentDetailController', function($scope, $translate, $rootScope, $routeParams, appService, $window, $filter, $http ) {
	var Camera              = navigator.camera;
    	var geocoder 		= new google.maps.Geocoder();
    	$scope.pageClass 	= 'slideLeft';
	$rootScope.appTitle	= $routeParams.title;
    	$scope.register 	= {};
	$scope.GetServiceApi	= GetServiceApi;
	$scope.serviceApi	= serviceApi;
	$rootScope.itemID	= $routeParams.id;
	
	
	var requestParams = {
        	"token": token,
		"id": ($rootScope.appTitle).replace(/\ /g,"_") 	
    	};
    	
    	
	appService.HttpRequest('POST',GetServiceApi+'service/get_categorytypebycrime',requestParams).success(function(data) {
	
		$scope.requestType = data;
		
	});
		
	
  
	$scope.getLocation  = function() {
        $window.navigator.geolocation.getCurrentPosition(function(position) {
            $scope.$apply(function() {
			
			    $scope.latitude = position.coords.latitude;
                $scope.longitude = position.coords.longitude;
                $scope.accuracy = position.coords.accuracy;
			
				var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				geocoder.geocode({ 'latLng': latlng }, function (results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						if (results[1]) {
							$scope.register.address = results[1].formatted_address;
                            $scope.register.lat = $scope.latitude;
                            $scope.register.lot = $scope.longitude;
							$scope.getLocation();
						} else {
							alert('Location not found');
						}
					} else {
						alert('Geocoder failed due to: ' + status);
					}
				});
            });
        }, function(error) {
             alert(error);
        });	
	};
    
   
	
	
	 $scope.getPhoto = function() {
	 alert("Comming Soon!");
        
    	}
	
	//Get the video
	$scope.getVideo = function() {
		alert("Comming Soon!");
	}
	
	//Get the Sound
	$scope.getSound = function() {
	alert("Almost there");	
		
	}
	
		
	$scope.goReportCrime  = function() {
		
			$scope.strSuccessAlert = "Mobi";
			
			$scope.appLocalStorageUser  = JSON.parse(localStorage.getItem('appLocalStorageUser'));
			
			$scope.channel = "Mobi";
				
			$scope.date = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');	
			
			
			console.log(
				"type " + $scope.register.categorytype
				);
				
				
			var requestParams = {
				"token": token,
				"description": $scope.register.details,
				"area": $rootScope.appTitle,
				"type": $scope.register.categorytype,
				"reportedon": $scope.date,
				"location": $scope.register.address,
				"lat": $scope.register.lat,
				"lot": $scope.register.lot,
				"reportedby": $scope.register.name,
				"mobile": $scope.register.mobile,
				"channel": $scope.channel
				
				};	
				
			//test category type its mandetory
			if(typeof $scope.register.categorytype === 'undefined')
			{
				alert("Kindly provide us with the incident type");
			}
			else if(typeof $scope.register.address === 'undefined')
			{
				alert("Kindly provide us with address of the incident");
				
				//add custom alert code here
				
				
			}
			else if(typeof $scope.register.details === 'undefined' )
			{
				alert("Please provide more \t• Details to the crime being reported");
				
			}
			else
			{
				
				localStorage.setItem('appLocalStorageUser', JSON.stringify(requestParams));
				
				appService.HttpRequest('POST',GetServiceApi+'service/send_crimereport',requestParams).success(function(data) {
					if(typeof $scope.register.name === 'undefined' && typeof $scope.register.mobile === 'undefined')
					{
						alert('Thank you for your report.');
					}else{
						alert('Thank you for your report. The serverity of the evidence provided will prompt the monitoring officer to contact you if necessary.');
					}
					
				});
			}
		}
		
		
});