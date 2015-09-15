mobileApp.controller('nearbyController', function($scope, $compile, $translate, $rootScope, appService, $window) {
     
    $scope.pageClass 			= 'slideLeft';
	$rootScope.appTitle	 		= $translate.instant('load.home.BtnProfile');
    
    $scope.serviceApi		= serviceApi;
	$scope.GetServiceApi	= GetServiceApi;

    $scope.lat = -25;
    $scope.lot = 28;
     
     
    $scope.infoWindow = {
      title: 'title',
      content: 'content'
    };
     
     $scope.markers = [];
     
     appService.HttpRequest('GET',GetServiceApi+'service/get_reportedincidents').success(function(data) {
		$scope.requestReportedIncidents = data;
        
        angular.forEach($scope.requestReportedIncidents, function(item) {
                    
            $scope.markers.push({
                                title: item.description,
                                content: item.location,
                                location: [item.lat, item.lot]
                            });
            
     });
    });

      $scope.showMarker = function(event){

          $scope.marker = $scope.markers[this.id];
          $scope.infoWindow = {
          title: $scope.marker.title,
          content: $scope.marker.content
        };
        $scope.$apply();
        $scope.showInfoWindow(event, 'marker-info', this.getPosition());

      }

  });