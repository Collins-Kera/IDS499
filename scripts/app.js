'use strict';

/**
 * @ngdoc overview
 * @name angbaseApp
 * @description
 * # angbaseApp
 *
 * Main module of the application.
 */
angular
  .module('angbaseApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: ' '
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      //add a new route here for each new page added to the site
      .otherwise({
        redirectTo: '/'
      });
  });
