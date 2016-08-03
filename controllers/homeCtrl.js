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


        $scope.isSearching = false;

        FlickrService.getAlbums.then(function(data){
            $scope.results = data;
        });

        FlickrService.getUserIcon.then(function(data){
            var iconFarm = data.person.iconfarm,
                iconServer = data.person.iconserver,
                nsid = data.person.nsid;
            $scope.userIcon = "http://farm" + iconFarm + ".staticflickr.com/" + iconServer + "/buddyicons/" + nsid + "_l.jpg";
        });

        
    }]);
})();
