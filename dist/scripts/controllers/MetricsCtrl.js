(function() {
    function MetricsCtrl($scope, MetricsService){
      console.log("Metrics page works");
      console.log(MetricsService);
      //call this as metrics.songs in metrics.html
      this.songs = MetricsService.listSongsPlayed();
      console.log(this.songs);

    //create bar chart to show how many times each song played
    /*
        $scope.data = {
            type: 'multiBarHorizontalChart',
            height: 500,
            //song name
            x: function(d){return d.name;},
            //song count
            y: function(d){return d.count;},
            showControls: false,
            showValues: true,
            duration: 500,
            xAxis: {
                showMaxMin: false
            },
            yAxis: {
                axisLabel: 'Plays',
            }
        }
        */
    };

angular
    .module('blocJams')
    .controller('MetricsCtrl', ['$scope','MetricsService', MetricsCtrl]);
})();
