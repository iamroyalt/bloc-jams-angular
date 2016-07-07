(function() {
     //inject Fixture servce into SongPlayer service
     function SongPlayer(Fixtures) {
          var SongPlayer = {};

          //use getAlbum method to store the album information
          var currentAlbum = Fixtures.getAlbum();
          /**
          * @desc Buzz object audio file
          * @type {Object}
          */
          var currentBuzzObject = null;

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
              //update currentSong to SongPlayer.currentSong
              SongPlayer.currentSong = song;
          };



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

          SongPlayer.pause = function(song) {
              song = song || SongPlayer.currentSong;
              currentBuzzObject.pause();
              song.playing = false;
          };

          //write a method to go to the previous song utilizing ability to get song indexOf
          SongPlayer.previous = function() {
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex--;
              //logic for what should happen if previous song index is less than zero; stop playing current song and set value of currently playing song to zero
              if (currentSongIndex < 0) {
                  currentBuzzObject.stop();
                  SongPlayer.currentSong.playing = null;
                //in currengSongIndex is not less than zero,then it must be greater than zero
                //add conditional else that moves to the previous song and automatically plays it
                } else {
                      var song = currentAlbum.songs[currentSongIndex];
                      setSong(song);
                      playSong(song);
                }
          };

          return SongPlayer;
          }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
