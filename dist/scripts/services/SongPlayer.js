(function() {
     //inject Fixture servce into SongPlayer service
     //METRICS - added MetricService to function
     function SongPlayer($rootScope, Fixtures, MetricsService) {
          console.log('MetricsService: ');
          console.log(MetricsService);

          var SongPlayer = {};

          //use getAlbum method to store the album information
          var currentAlbum = Fixtures.getAlbum();
          /**
          * @desc Buzz object audio file
          * @type {Object}
          */
          var currentBuzzObject = null;

          /**
          * @desc set current song volume
          * @type {Number} volume
          */
          var currentVolume = 80;
          SongPlayer.initialVolume = 80;
          SongPlayer.maxVolume = 100;



          /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */
          var setSong = function(song) {
              if (currentBuzzObject) {
                  currentBuzzObject.stop();
                  SongPlayer.currentSong.playing = null;
              }

              currentBuzzObject = new buzz.sound(song.audioUrl, {
                  formats: ['mp3'],
                  preload: true
              });

              currentBuzzObject.bind('timeupdate', function() {
                  $rootScope.$apply(function() {
                      SongPlayer.currentTime = currentBuzzObject.getTime();
                  });
              });
              //Extra credit
              currentBuzzObject.bind('ended', function(event){
                  SongPlayer.next();
              });

              //update currentSong to SongPlayer.currentSong
              SongPlayer.currentSong = song;

              MetricsService.registerSongPlay(song);
          };

              /**
              * @desc Current playback time (in seconds) of currently playing song
              * @type {Number}
              */
              SongPlayer.currentTime = null;

              /**
              * @function getSongIndex
              * @desc gets the index of song from currentAlbum.songs array
              * @param {Object} song
              */
              //write function to get index of a song
              var getSongIndex = function(song) {
                return currentAlbum.songs.indexOf(song);
              }

              /**
              *@desc current song object
              *@type object
              */
              //made this a public attribute - changed from var currentSong = null
              SongPlayer.currentSong = null;

              /**
              * @function playSong
              * @desc Plays currently the audio file as currentBuzzObject and sets the .playing attribute to true
              * @param {Object} song
              */
              //write private playSong function
              var playSong = function(song) {
                  //play the current buzz object
                  currentBuzzObject.play();
                  //set playing property of the song object to true
                  song.playing = true
              };

              SongPlayer.play = function(song) {
                 //use || to tell the function to assign the value of song or the value of SongPlayer.currenSong to the song variable
                 //first occurs when call methods from album view song rows, second when call methods from plyer bar
                 song = song || SongPlayer.currentSong;
                 if (SongPlayer.currentSong !== song) {
                     setSong(song);
                     //replace 2 lines of repetitive code with playSong function
                     playSong(song);

                 ////update currentSong to SongPlayer.currentSong
                 } else if (SongPlayer.currentSong === song) {
                     if (currentBuzzObject.isPaused()) {
                         playSong(song);
                     }
                   }
              };

              /**
              *@function pauseSong
              *@description stops the currentBuzzObject and sets the playing variable to false
              *@param {Object} song
              */
              SongPlayer.pause = function(song) {
                  song = song || SongPlayer.currentSong;
                  currentBuzzObject.pause();
                  song.playing = false;
              };

              /**
              *@function stopSong
              *@description stops the currentBuzzObject and sets the playing variable to null
              *@param {Object} song
              */
              var stopSong = function(song) {
                  currentBuzzObject.stop();
                  SongPlayer.currentSong.playing = null;
              }

              /**
              *@function songPlayer.previous
              *@description uses getSongIndex function, subtracts 1 from index, moving to previous song in currentAlbum.songs array
              * if index goes below 0,it stops the song and sets currentSong to null, otherwise it plays the previous song
              *@returns the previous song on album
              */
              //write a method to go to the previous song utilizing ability to get song indexOf
              SongPlayer.previous = function() {
                  var currentSongIndex = getSongIndex(SongPlayer.currentSong);
                  currentSongIndex--;
                  //logic for what should happen if previous song index is less than zero; stop playing current song and set value of currently playing song to zero
                  if (currentSongIndex < 0) {
                      stopSong(SongPlayer.currentSong);
                    //in currengSongIndex is not less than zero,then it must be greater than zero
                    //add conditional else that moves to the previous song and automatically plays it
                    } else {
                          var song = currentAlbum.songs[currentSongIndex];
                          setSong(song);
                          playSong(song);

                    }
              };


              /**
              *@function songPlayer.next
              *@description uses getSongIndex function,adds 1 to index, moving to next song in currentAlbum.songs array
              * if the index is >= to the amount of songs, it stops the song and sets currentSong to null, otherwise it plays next song
              *@returns the next song on album
              */
              //write a method to go to the next song utilizing ability to get song indexOf
              SongPlayer.next = function () {
                  var currentSongIndex = getSongIndex(SongPlayer.currentSong);
                  currentSongIndex++;
                  //
                  if (currentSongIndex > currentAlbum.songs.length) {
                      stopSong(SongPlayer.currentSong);
                      } else {
                          var song = currentAlbum.songs[currentSongIndex];
                          setSong(song);
                          playSong(song);

                  }

                  /**
                  * @function setCurrentTime
                  * @desc Set current time (in seconds) of currently playing song
                  * @param {Number} time
                  */
                  SongPlayer.setCurrentTime = function(time) {
                      if (currentBuzzObject) {
                      currentBuzzObject.setTime(time);
                      }
                  };
              };
              SongPlayer.volume = null;
              /**
              * @function setVolume
              * @desc set volume on currently playing song
              * @param {Number} volume
              */
              SongPlayer.setVolume = function(volume) {
                if (currentBuzzObject) {
                  currentBuzzObject.setVolume(volume);
                }
                SongPlayer.volume = volume;
              };


              return SongPlayer;
            }

     angular
         .module('blocJams')
         .factory('SongPlayer',['$rootScope', 'Fixtures', 'MetricsService', SongPlayer]);
 })();
