app.directive('mdLightbox', ['$mdDialog', function($mdDialog) {
    return {
        link: function($scope, elem, attrs) {

            elem.addClass('image-click');
            $scope.newIndex = 0;
            elem.on('click', function() {
                
                // console.log($scope.allslides);
                var image = attrs.src;
                var title = attrs.mdLightboxTitle;
                var index = attrs.mdIndex;
                var allSlides = $scope.allslides;
                var maxSlides = $scope.allslides.length - 1;
                console.log(index);
                showLightboxModal(image, title, allSlides, maxSlides, index);


            });

            //Lightbox Modal
            function showLightboxModal(image, title, allSlides, maxSlides, index) {
                var confirm = $mdDialog.confirm({
                    templateUrl: 'views/lightbox.html',
                    clickOutsideToClose: true,
                    controller: lightboxController
                });
                console.log(allSlides);
                $mdDialog.show(confirm);

                function lightboxController($scope, $mdDialog) {
                    $scope.image = image;
                    $scope.title = title;
                    $scope.newIndex= index;
                    $scope.lbSlides = allSlides;
                    $scope.maxSlides = maxSlides;


                    console.log($scope.newIndex);

                    $scope.cancel = function() {
                        $mdDialog.cancel();
                    };

                    $scope.nextTab = function() {

                        var test = ($scope.newIndex == $scope.maxSlides) ? 0 : $scope.newIndex + 1;
                        $scope.newIndex = test;

                    };

                    $scope.prevTab = function() {

                        var test = ($scope.newIndex == $scope.maxSlides) ? 0 : $scope.newIndex - 1;
                        $scope.newIndex = test;

                    };

                }

            }
        }
    }
}]);
