//Fixture service pulls the album data into our application
(function() {
     function Fixtures() {
       var Fixtures = {};
       var albumPicasso = {
         title: 'The Colors',
         artist: 'Pablo Picasso',
         label: 'Cubism',
         year: '1881',
         albumArtUrl: '/assets/images/album_covers/01.png',
         songs: [
             { title: 'Blue', duration: '161.71', audioUrl: '/assets/music/blue' },
             { title: 'Green', duration: '103.96', audioUrl: '/assets/music/green' },
             { title: 'Red', duration: '268.45', audioUrl: '/assets/music/red' },
             { title: 'Pink', duration: '153.14', audioUrl: '/assets/music/pink' },
             { title: 'Magenta', duration: '374.22', audioUrl: '/assets/music/magenta' }
         ]
       };

       var albumMarconi = {
           title: 'The Telephone',
           artist: 'Guglielmo Marconi',
           label: 'EM',
           year: '1909',
           albumArtUrl: '/assets/images/album_covers/20.png',
           songs: [
               { title: 'Hello, Operator?', duration: '1:01' },
               { title: 'Ring, ring, ring', duration: '5:01' },
               { title: 'Fits in your pocket', duration: '3:21' },
               { title: 'Can you hear me now?', duration: '3:14' },
               { title: 'Wrong phone number', duration: '2:15' }
           ]
       };

       Fixtures.getAlbum = function() {
           return albumPicasso;
       };

       //add second public method named getCollection that takes one argument number of albums
       Fixtures.getCollection = function(numberOfAlbums) {
         //return an array with the specified number of albumPicasso objects pushed to it
         //create an a collection array
         var collection_array = [];
         var i = 0;
         //loop through argument numberOfAlbums and push albumPicasso objects
         while (i < numberOfAlbums) {
           collection_array.push(albumPicasso);
           i++
         }
         //return array
         return collection_array;
       }

       return Fixtures;
     }

     angular
         .module('blocJams')
         .factory('Fixtures', Fixtures);
 })();
