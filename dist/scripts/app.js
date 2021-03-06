(function() {
     function config($stateProvider, $locationProvider) {
       $locationProvider
         .html5Mode({
             enabled: true,
             requireBase: false
         });

       $stateProvider
          .state('landing', {
             url: '/',
             controller: 'LandingCtrl as landing',
             templateUrl: '/templates/landing.html'
         })
          .state('album', {
             url: '/album',
             controller: 'AlbumCtrl as album',
             templateUrl: '/templates/album.html'
         })
          .state('collection', {
            url: '/collection',
            controller: 'CollectionCtrl as collection',
            templateUrl: '/templates/collection.html'
          })
          //added .state for metrics
          .state('metrics', {
            url: '/metrics',
            controller: 'MetricsCtrl as metrics',
            templateUrl: '/templates/metrics.html'
          })

     }

     angular
     //injected nvd3 into angular module
         .module('blocJams', ['ui.router', 'nvd3'])
         .config(config);
 })();
