app.factory('FlickrService', function($http, $sce) {
    var url = "https://api.flickr.com/services/rest",
        apiKey = "5f1fc83583ecf2d1ba87d603691d3088",
        userId = "142517182@N04";
    return {
        getAlbums: (function(response) {
            return $http({
                method: 'GET',
                url: url,
                params: {
                    method: 'flickr.photosets.getList',
                    api_key: apiKey,
                    user_id: userId,
                    format: 'json',
                    nojsoncallback: 1
                }
            }).then(function(response) {
                return response.data;
            });
        })(),

        getUserIcon: (
            function(response) {
                return $http({
                    method: 'GET',
                    url: url,
                    params: {
                        method: 'flickr.people.getInfo',
                        api_key: apiKey,
                        user_id: userId,
                        format: 'json',
                        nojsoncallback: 1
                    }
                }).then(function(response) {
                    return response.data;
                });
            })(),

        getAlbumPhotos: (function(albumId, response) {
            
            return $http({
                method: 'GET',
                url: url,
                params: {
                    method: 'flickr.photosets.getPhotos',
                    api_key: apiKey,
                    user_id: userId,
                    photoset_id: albumId,
                    format: 'json',
                    nojsoncallback: 1
                }
            }).then(function(response) {
                // console.log(response);
                
                return response.data;
            });
        })(),

        getAlbumLocation: (function(response) {
            var markers = [];
            return $http({
                method: 'GET',
                url: url,
                params: {
                    method: 'flickr.photosets.getList',
                    api_key: apiKey,
                    user_id: userId,
                    format: 'json',
                    nojsoncallback: 1
                }
            }).then(function(response) {
                var albumLat = null;
                var albumLong = null;
                for (var i = response.data.photosets.photoset.length - 1; i >= 0; i--) {
                    $http({
                        method: 'GET',
                        url: url,
                        params: {
                            method: 'flickr.photosets.getPhotos',
                            api_key: apiKey,
                            user_id: userId,
                            photoset_id: response.data.photosets.photoset[i].id,
                            has_geo: 1,
                            extras: 'geo',
                            format: 'json',
                            nojsoncallback: 1
                        }
                    }).then(function(dataPhoto) {

                        var ret = {
                            id: dataPhoto.data.photoset.id,
                            latitude: dataPhoto.data.photoset.photo[0].latitude,
                            longitude: dataPhoto.data.photoset.photo[0].longitude,
                            title: 'm' + dataPhoto.data.photoset.id
                        };

                        markers.push(ret);

                    });
                }

                return markers;
            });
        })()

    };
    return FlickrService;
});
