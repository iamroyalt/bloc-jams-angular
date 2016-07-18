(function() {
    function MetricsCtrl(MetricsService){
      console.log("Metrics page works");
      console.log(MetricsService);
      this.songs = MetricsService.listSongsPlayed();
      console.log(this.songs);
    }




angular
    .module('blocJams')
    .controller('MetricsCtrl', ['MetricsService', MetricsCtrl]);
})();
