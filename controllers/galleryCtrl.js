'use strict';
app.controller('GalleryCtrl', function($scope, $http, $stateParams, FlickrService, myutils) {
    $scope.results = [];
    $scope.allslides = [];
    $scope.photosetid = $stateParams.photosetid;

    // FlickrService.getAlbumPhotos($scope.photosetid).then(function(data){
    //     for (var i = data.photoset.photo.length - 1; i >= 0; i--) {

    //         var slide = {
    //             src: 'https://farm'+data.photoset.photo[i].farm+'.static.flickr.com/'+data.photoset.photo[i].server+'/'+data.photoset.photo[i].id+'_'+data.photoset.photo[i].secret+'_b.jpg',
    //             w:500,
    //             h:400,
    //             pid: data.photoset.photo[i].id
    //         };

    //         $scope.allslides.push(slide);
    //     }

    // });
    $scope.data_received = false;
    myutils.showWait();
    $http({
        method: 'GET',
        url: 'https://api.flickr.com/services/rest',
        params: {
            method: 'flickr.photosets.getPhotos',
            api_key: '5f1fc83583ecf2d1ba87d603691d3088',
            user_id: '142517182@N04',
            photoset_id: $scope.photosetid,
            format: 'json',
            nojsoncallback: 1
        }
    }).success(function(data) {
        $scope.results = data;

        for (var i = $scope.results.photoset.photo.length - 1; i >= 0; i--) {


            var slide = {
                src: 'https://farm' + $scope.results.photoset.photo[i].farm + '.static.flickr.com/' + $scope.results.photoset.photo[i].server + '/' + $scope.results.photoset.photo[i].id + '_' + $scope.results.photoset.photo[i].secret + '_h.jpg',
                pid: $scope.results.photoset.photo[i].id,
                thumb: 'https://farm' + $scope.results.photoset.photo[i].farm + '.static.flickr.com/' + $scope.results.photoset.photo[i].server + '/' + $scope.results.photoset.photo[i].id + '_' + $scope.results.photoset.photo[i].secret + '_s.jpg'
            };

            $scope.allslides.push(slide);
        }
        myutils.hideWait();

    }).error(function(error) {
        console.error(error);

    });
    
});
