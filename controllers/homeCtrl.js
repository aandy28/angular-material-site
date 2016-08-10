(function() {
    'use strict';

    app.controller('HomeCtrl', ['$scope', '$http', '$mdSidenav', '$state', 'FlickrService', 'myutils', function($scope, $http, $mdSidenav, $state, FlickrService, myutils) {
        $scope.results = [];
        $scope.userIcon = "";
        $scope.menuItems = [
            { name: 'about', path: 'about' },
            { name: 'contact', path: 'contact' },
            { name: 'photo locations', path: 'photoLocations' },
        ];

        $scope.go = function(path, title) {
            $state.go(path);
            $scope.title = title;
        }

        $scope.openLeftMenu = function() {
            $mdSidenav('left').toggle();
        };

        $scope.toggleLeft = function() {
            $mdSidenav('left').toggle();
        }

        $scope.menuIcon = 'menu';
        $scope.menuToggle = function() {
            if ($scope.menuIcon == 'menu') {
                $mdSidenav('left')
                    .open();
                $scope.menuIcon = 'arrow_back';
            } else {
                $mdSidenav('left')
                    .close();
                $scope.menuIcon = 'menu';
            }
        }

        $scope.max = $scope.results.length -1;
        console.log( $scope.results.length);

        $scope.selectedIndex = 0;
        
        $scope.nextTab = function() {
            console.log("next clicked");
            var index = ($scope.selectedIndex == $scope.max) ? 0 : $scope.selectedIndex + 1;
            $scope.selectedIndex = index;
console.log($scope.selectedIndex);
        };

        $scope.prevTab = function() {
            console.log("previous clicked");
            var index = ($scope.selectedIndex == $scope.max) ? 0 : $scope.selectedIndex - 1;
            $scope.selectedIndex = index;

            console.log($scope.selectedIndex);

        };

        $scope.isSearching = false;

        FlickrService.getAlbums.then(function(data){
            $scope.results = data;
            //console.log(data);
        });

        FlickrService.getUserIcon.then(function(data){
            var iconFarm = data.person.iconfarm,
                iconServer = data.person.iconserver,
                nsid = data.person.nsid;
            $scope.userIcon = "http://farm" + iconFarm + ".staticflickr.com/" + iconServer + "/buddyicons/" + nsid + "_l.jpg";
        });

        
    }]);
})();
