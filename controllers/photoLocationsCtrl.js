'use strict';
app.controller('PhotoLocationsCtrl', function($scope, $http, $stateParams, $window, FlickrService) {
    $scope.markers = [];

    FlickrService.getAlbumLocation.then(function(data){
        $scope.markers = data;

        //https://farm{{picture.farm}}.static.flickr.com/{{picture.server}}/{{picture.primary}}_{{picture.secret}}_b.jpg
    });
     
    $scope.map = { center: { latitude: 54.080743, longitude: -2.482910 }, zoom: 6 };
    $scope.onClick = function(marker, eventName, model) {
        // console.log("Clicked!");
        // console.log(model);
        model.show = !model.show;
    };
});
