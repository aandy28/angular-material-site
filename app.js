var app = angular.module('flickrApp', ['ui.router', 'ngMaterial', 'ngMessages', 'uiGmapgoogle-maps','ngPhotoswipe']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state("home", {
        url: "/",
        controller: "HomeCtrl",
        templateUrl: "views/home.html"
    })
    $stateProvider.state("about", {
        url: "/about",
        controller: "AboutCtrl",
        templateUrl: "views/about.html"
    })
    $stateProvider.state("contact", {
        url: "/contact",
        controller: "ContactCtrl",
        templateUrl: "views/contact.html"
    })
    $stateProvider.state("photoLocations", {
        url: "/photoLocations",
        controller: "PhotoLocationsCtrl",
        templateUrl: "views/photoLocations.html"
    })
    $stateProvider.state("gallery", {
        url: "/gallery?photosetid",
        controller: "GalleryCtrl",
        templateUrl: "views/gallery.html"
    })

    // use the HTML5 History API
        $locationProvider.html5Mode(true);

        // google api key AIzaSyAQ9IW7_K5YkfRX7FEqBi_qoSRbzFLP-Rg
});