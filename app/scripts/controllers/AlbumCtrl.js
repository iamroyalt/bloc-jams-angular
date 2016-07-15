(function() {
  function AlbumCtrl(Fixtures, SongPlayer, MetricsService) {
    this.albumData = Fixtures.getAlbum();
    this.songPlayer = SongPlayer;
  }

  angular
    .module('blocJams')
    .controller('AlbumCtrl', ['Fixtures', 'SongPlayer','Metrics', AlbumCtrl]);
  })();
