(function() {
    function AnalyticsCtrl(MetricsService){
      console.log("Metrics page works");
    }



angular
    .module('blocJams')
    .controller('MetricsCtrl', ['Fixtures', MetricsCtrl]);
})();
