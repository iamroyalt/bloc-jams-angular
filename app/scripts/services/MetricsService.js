(function() {
  function MetricsService($rootScope) {
    //holding data for songPlays
    $rootScope.songPlays = [];

    return {
      // Function that records a metric object by pushing it to the $rootScope array
      registerSongPlay: function(songObj) {
        console.log('registerSongPlay')
        // Add time to event register
        songObj['playedAt'] = new Date();
        $rootScope.songPlays.push(songObj);
      },
      listSongsPlayed: function() {
        var songs = [];
        angular.forEach($rootScope.songPlays, function(song) {
            songs.push(song.title);
        });
        console.log("list songs played");
        console.log(songs);
        return songs;
      }
    };
  }

  angular
    .module('blocJams')
    .service('MetricsService', ['$rootScope', MetricsService]);
})();
