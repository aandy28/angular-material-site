angular.module('undefined').run(['$templateCache', function($templateCache) {
    $templateCache.put('photoLocations.html',
        "<md-content>\r\n    <ui-gmap-google-map center='map.center' zoom='map.zoom' >\r\n    \t<ui-gmap-markers models=\"markers\" type=\"'cluster'\" coords=\"'self'\" icon=\"'icon'\" click=\"onClick\">\r\n    \t\t<ui-gmap-windows show=\"show\">\r\n                <div ng-non-bindable>{{title}}</div>\r\n            </ui-gmap-windows>\r\n    \t</ui-gmap-markers>\r\n    </ui-gmap-google-map>\r\n</md-content>\r\n");
}]);