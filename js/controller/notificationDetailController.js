mobileApp.controller('notificationDetailController', function($scope, $translate, $rootScope, $routeParams, appService, $window, $filter) {
    $scope.pageClass 		= 'slideLeft';
	$rootScope.appTitle 	= $translate.instant('load.notifications.Title'); 
	$scope.serviceApi	= serviceApi;
	$scope.GetServiceApi	= GetServiceApi;
	$rootScope.itemID	= $routeParams.id;
	
	console.log("display " + $rootScope.itemID);
	
	var requestParams = {
        	"token": token,
		"id": $rootScope.itemID
    	};
    	
	appService.HttpRequest('POST',GetServiceApi+'service/get_notification_detail',requestParams).success(function(data) {
	
		$scope.requestDetail = data;
		
		console.log("We are displaying a notification \n title: " + data[0] );
		
		/*$scope.requestId = data[0].id;
		$scope.requestTitle = data[1].title;
		$scope.requestMessage = data[2].message;*/
		
		
	});
	
	/*console.log("We are displaying a notification \n title: " + $scope.requestId + " \n title: " + $scope.requestTitle + "\n Message " + $scope.requestMessage );*/
	
});