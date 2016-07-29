'use strict';
app.controller('PhotoLocationsCtrl', function($scope, $http, $stateParams, $window, FlickrService) {
    $scope.markers = [];

    FlickrService.getAlbumLocation.then(function(data){
        $scope.markers = data;
    });
     
    $scope.map = { center: { latitude: 54.080743, longitude: -2.482910 }, zoom: 6 };
});
