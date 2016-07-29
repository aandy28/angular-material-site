'use strict';
app.controller('GalleryCtrl', function($scope, $http, $stateParams, FlickrService) {
	$scope.results = [];

	$scope.photosetid = $stateParams.photosetid;
	console.log($scope.photosetid);
    
    FlickrService.getAlbumPhotos($scope.photosetid).then(function(data){
        $scope.results = data;
    });

    // for (var i = $scope.results.photosets.photo.length - 1; i >= 0; i--) {
    //     console.log($scope.results.photosets.photo[i]);
    // }
        // $http({
        //     method: 'GET',
        //     url: 'https://api.flickr.com/services/rest',
        //     params: {
        //         method: 'flickr.photosets.getPhotos',
        //         api_key: '5f1fc83583ecf2d1ba87d603691d3088',
        //         user_id: '142517182@N04',
        //         photoset_id: $scope.photosetid,
        //         format: 'json',
        //         nojsoncallback: 1
        //     }
        // }).success(function(data) {
        //     $scope.results = data;
            

        // }).error(function(error) {
        //     console.error(error);
           
        // });
    });