var app = angular.module('app', ['ngRoute', 'chart.js']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/webapp/Angular/common/root-view.html',
            controller: 'root-list'
        })
        .when('/analyze', {
            templateUrl: '/webapp/Angular/bmcd/templates/analyze.html',
            controller: 'analyze-controller'
        })
        .when('/analyze/:id', {
            templateUrl: '/webapp/Angular/bmcd/templates/analyze.html',
            controller: 'analyze-controller-id'
        })
        .otherwise({
            redirectTo: '/'
        })
});


