mobileApp.controller('notificationsController', function($scope, $rootScope, $translate, appService, $window) {
    $scope.pageClass 		= 'slideLeft';
	$rootScope.appTitle	= $translate.instant('load.notifications.Title');
	$scope.serviceApi	= serviceApi;
	$scope.GetServiceApi	= GetServiceApi;
	

	appService.HttpRequest('GET',GetServiceApi+'service/get_notifications').success(function(data) {
		$scope.requestCategory = data;
		
    });
    
    $scope.getIds = function() {
    $rootScope.itemID		= $routeParams.id;
		alert("Almost there" + $rootScope.itemID);
	}
});