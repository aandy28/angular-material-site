app.directive('mdLightbox', ['$mdDialog', function($mdDialog) {
    return {
        link: function($scope, elem, attrs) {

            $scope.max = $scope.results.photoset.total - 1;
            
            $scope.selectedIndex = 0;

            elem.addClass('image-click');

            elem.on('click', function() {
                var image = attrs.src;
                var title = attrs.mdLightboxTitle;
                var index = attrs.mdIndex;
                showLightboxModal(image, title, index);


            });

            //Lightbox Modal
            function showLightboxModal(image, title, index) {
                var confirm = $mdDialog.confirm({
                    templateUrl: 'views/lightbox.html',
                    clickOutsideToClose: true,
                    controller: lightboxController
                });

                $mdDialog.show(confirm);

                function lightboxController($scope, $mdDialog) {
                    $scope.image = image;
                    $scope.title = title;
                    $scope.index = index;

                    console.log($scope.index);

                    $scope.cancel = function() {
                        $mdDialog.cancel();
                    };

                    $scope.nextImage = function(index) {
                        var newindex = (index == $scope.max) ? 0 : index + 1;
                        index = newindex;
                        console.log(index);
                    }

                    $scope.prevImage = function(index) {
                        var newindex = (index == $scope.max) ? 0 : index - 1;
                        index = newindex;
                    }

                }

            }
        }
    }
}]);
