(function() {
  function MetricsService($rootScope) {
    //holding data in songPlays array
    $rootScope.songPlays = [];

    return {
      // Function that records a metric object by pushing it to the $rootScope array
      registerSongPlay: function(songObj) {

        // Add the time song played; playedAt is a value of object songObj
        songObj['playedAt'] = new Date();
        //adding song to list
        $rootScope.songPlays.push(songObj);
        //create song history
        return;
      },
      listSongsPlayed: function() {
        //create new array for list of songs played
        var songs = [];
        angular.forEach($rootScope.songPlays, function(song) {
            //add song title and played at to the songs array
            songs.push({title: song.title, playedAt: song.playedAt});
        });
        console.log("list songs played");
        console.log(songs);
        return songs;
      },
    summarizeSongsPlayed: function() {
        console.log("summarizeSongsPlayed");
        //create array to hold song title and count of songs played
        var summary = [];
        //use .forEach to iterate through songPlays array,
        angular.forEach($rootScope.songPlays, function(song) {
            //don't need to iterate through, duplicate of forEach
            //for (var i = 0; i < $rootscope.songPlays.length; i++)
            //value = $rootScope.songPlays[i];
            value = song.title; 
            if (typeof summary[value] === "undefined") {
                summary[value] = 1;
            } else {
                summary[value]++;
            }
        });
        console.log("summarizeSongsPlayed");
        console.log(summary);
        return summary;
      }
    };
  }

  angular
    .module('blocJams')
    .service('MetricsService', ['$rootScope', MetricsService]);
})();
