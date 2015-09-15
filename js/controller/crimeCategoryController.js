mobileApp.controller('crimeCategoryController', function($scope, $rootScope, $translate, appService, $q) {
    $scope.pageClass 		= 'slideLeft';
	$rootScope.appTitle	 	= $translate.instant('load.promo.Title');
	$scope.serviceApi		= serviceApi;
	$scope.GetServiceApi	= GetServiceApi;

	appService.HttpRequest('GET',GetServiceApi+'service/get_crime_category?token='+token).success(function(data) {
		$scope.requestPromo = data;
    });

});