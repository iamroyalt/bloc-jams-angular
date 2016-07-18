(function() {
  function AlbumCtrl(Fixtures, SongPlayer, MetricsService) {
    this.albumData = Fixtures.getAlbum();
    this.songPlayer = SongPlayer;
    console.log('album control');
  }

  angular
    .module('blocJams')
    .controller('AlbumCtrl', ['Fixtures', 'SongPlayer','MetricsService', AlbumCtrl]);
  })();
