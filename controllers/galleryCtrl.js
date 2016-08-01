'use strict';
app.controller('GalleryCtrl', function($scope, $http, $stateParams, FlickrService) {
	$scope.results = [];
    $scope.slides = [];

	$scope.photosetid = $stateParams.photosetid;
	console.log($scope.photosetid);
    
    FlickrService.getAlbumPhotos($scope.photosetid).then(function(data){
        $scope.results = data;

        for (var i = $scope.results.length - 1; i >= 0; i--) {
            $scope.results[i]

            var slide = {
                src: 'https://farm'+$scope.results[i].farm+'.static.flickr.com/'+$scope.results[i].server+'/'+$scope.results[i].primary+'_'+$scope.results[i].secret+'_m.jpg',
                w:500,
                h:400,
                pid: $scope.results[i].title._content
            };

            $scope.slides.push(slide);
        }
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