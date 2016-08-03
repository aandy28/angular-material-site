app.directive('mdLightbox', ['$mdDialog', function($mdDialog){
	return {
		link: function($scope, elem, attrs){

			elem.addClass('image-click');

		    elem.on('click',function(){		
		    	var image = attrs.src;
		    	var title = attrs.mdLightboxTitle;
		    	var index = attrs.index;
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

		            $scope.nextImage = function(index)
		            {

		            }

		            $scope.prevImage = function(index)
		            {
		            	
		            }

		        }

		    }			
		}
	}
}]);