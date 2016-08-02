(function() {
    function MetricsCtrl(MetricsService){
      console.log("Metrics page works");
      console.log(MetricsService);
      //call this as metrics.songs in metrics.html
      this.songs = MetricsService.listSongsPlayed();
      console.log(this.songs);
      this.summary = MetricsService.summarizeSongsPlayed();
      console.log(this.summary);
      //[{title: "blue", count: 5}, {title: "pink", count: 4}]



    //create bar chart to show how many times each song played
      this.chartData = [{
          key: "Song Count",
          values: this.summary,
          color: '#FF7F0E',
        }];

        this.chartOptions = {
             chart: {
                 type: 'multiBarHorizontalChart',
                 height: 500,
                 //song name
                 x: function(d){return d.title;},
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
        };
    };

angular
    .module('blocJams')
    .controller('MetricsCtrl', [ 'MetricsService', MetricsCtrl]);
})();
