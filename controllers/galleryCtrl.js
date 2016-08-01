'use strict';
app.controller('GalleryCtrl', function($scope, $http, $stateParams, FlickrService) {
    $scope.results = [];
    $scope.allslides = [];

    $scope.photosetid = $stateParams.photosetid;
    var vm = this;
    vm.title = 'ngPhotoswipe';

    vm.opts = {
        index: 0,
        history:false
    };

    // FlickrService.getAlbumPhotos($scope.photosetid).then(function(data){
    //     $scope.slides = data;

    // });

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
                src: 'https://farm' + $scope.results.photoset.photo[i].farm + '.static.flickr.com/' + $scope.results.photoset.photo[i].server + '/' + $scope.results.photoset.photo[i].id + '_' + $scope.results.photoset.photo[i].secret + '_b.jpg',
                w: 500,
                h: 400,
                pid: $scope.results.photoset.photo[i].id
            };

            $scope.allslides.push(slide);




        }
        // vm.slides = $scope.slides;
        console.log(vm);

    }).error(function(error) {
        console.error(error);

    });
    vm.showGallery = function(i) {
        console.log("open gallery");
        if (angular.isDefined(i)) {
            vm.opts.index = i;
        }
        vm.open = true;
    };

    vm.closeGallery = function() {
        console.log("close gallery");
        vm.open = false;
    };
    vm.slides = $scope.allslides;
});
