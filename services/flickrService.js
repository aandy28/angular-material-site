//function FlickrService($http, $sce, config) {

// function albums() {
//     return getData('posts?filter[category_name]=post');
// }

// function albumImages() {
//     return getData('posts?filter[category_name]=post');
// }
// function userInfo() {
//     return getData('posts?filter[category_name]=post');
// }

// function getData(url) {
//     return $http
//         .get(config.API_URL + url, { cache: true })
//         .then(function(response) {
//             if (response.data instanceof Array) {
//                 var items = response.data.map(function(item) {
//                     return decorateResult(item);
//                 });
//                 return items;
//             } else {
//                 return decorateResult(response.data);
//             }
//         });
// }

// return {
//     allPosts: allPosts,
//     allPostsByTag: allPostsByTag,
//     allLatest: allLatest,
//     allPostsBySearchTerm: allPostsBySearchTerm,
//     featuredPosts: featuredPosts,
//     post: post
// };


//}

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

        // getAlbumPhotos: (function(albumId, response) {
        //     var slides = [];
        //     return $http({
        //         method: 'GET',
        //         url: url,
        //         params: {
        //             method: 'flickr.photosets.getPhotos',
        //             api_key: apiKey,
        //             user_id: userId,
        //             photoset_id: albumId,
        //             format: 'json',
        //             nojsoncallback: 1
        //         }
        //     }).then(function(response) {
        //         // console.log(response);
        //         for (var i = response.data.photoset.photo.length - 1; i >= 0; i--) {

        //             var slide = {
        //                 src: 'https://farm'+response.data.photoset.photo[i].farm+'.static.flickr.com/'+response.data.photoset.photo[i].server+'/'+response.data.photoset.photo[i].id+'_'+response.data.photoset.photo[i].secret+'_b.jpg',
        //                 w:500,
        //                 h:400,
        //                 pid: response.data.photoset.photo[i].id
        //             };

        //             slides.push(slide);
        //         }
        //         return slides;
        //     });
        // })(),

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
