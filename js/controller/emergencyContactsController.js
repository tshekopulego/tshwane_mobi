mobileApp.controller('emergencyContactsController', function($scope, $rootScope, $translate, appService) {
    $scope.pageClass 		= 'slideLeft';
	$rootScope.appTitle	 	= $translate.instant('load.home.BtnBestSeller');
	$scope.serviceApi		= serviceApi;
	$scope.GetServiceApi	= GetServiceApi;

	appService.HttpRequest('GET',GetServiceApi+'service/get_emergencycontacts?token='+token).success(function(data) {
		$scope.requestContacts = data;
		
    });
});