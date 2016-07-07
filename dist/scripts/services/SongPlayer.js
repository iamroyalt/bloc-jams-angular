(function() {
     function SongPlayer() {
          var SongPlayer = {};

          /**
          *@desc current song object
          *@type object
          */
          var currentSong = null;

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
                  currentSong.playing = null;
              }

              currentBuzzObject = new buzz.sound(song.audioUrl, {
                  formats: ['mp3'],
                  preload: true
              });

              currentSong = song;
          };

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
             if (currentSong !== song) {
                 setSong(song);
                 //replace 2 lines of repetitive code with playSong function
                 playSong(song);

             } else if (currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     playSong(song);
                 }
               }
          };

          SongPlayer.pause = function(song) {
              currentBuzzObject.pause();
              song.playing = false;
          };

          return SongPlayer;
          }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
