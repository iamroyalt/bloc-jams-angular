(function() {
     //for directives, the callback function (seekBar) is a factory function.
     //It returns an object thta describe's the directives behavior to the HTML compiler
     // "$" jQuery wrapper for the browser's window.document object
     function seekBar($document) {
         var calculatePercent = function(seekBar, event) {
         var offsetX = event.pageX - seekBar.offset().left;
         var seekBarWidth = seekBar.width();
         var offsetXPercent = offsetX / seekBarWidth;
         offsetXPercent = Math.max(0, offsetXPercent);
         offsetXPercent = Math.min(1, offsetXPercent);
         return offsetXPercent;
     };



         return {
             //the object communicates the behavior through options
             //specifies a URL from which the directive will load a template
             templateUrl: '/templates/directives/seek_bar.html',
             //specifies what teh template shoud replace
             //if true, template replaces directive's element; if false, the template replaces the contents of the directive's element
             replace: true,
             //restricts directive to specific declaration style --> element
             restrict: 'E',
             //specifies a new scope be created for the object
             scope: { },
             //responsible for registering DOM listeners and updating the DOM. This is where most of directive logic goes
             link: function(scope, element, attributes) {
                 //holds value of seek bar, default value is 0
                 scope.value = 0;
                 //holds maximum value of song and volume seek bars
                 scope.max = 100;
                 //holds the element that matches the directive as a jQuery object so we can call jQuery methods
                 var seekBar = $(element);

                 //function that calculates a percent based on the value and maximum value of a seek bar
                 var percentString = function () {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + "%";
                  };
                //returns the width of the seek bar fill element based on the caluclated percent
                scope.fillStyle = function() {
                    return {width: percentString()};
                };

                //write method that updates the position of the seek bar thumb
                scope.thumbStyle = function () {
                    return {left: percentString()};
                };

                //updates the seek bar value based on the seek bar's width and the location of the user's click on the seek bar
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                };
                //uses $apply to constantly apply the change in value of scope.value as the user drags the seek bar thumb
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() {
                        scope.value = percent * scope.max;
                        });
                    });

                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };

             }
         }
     };

     angular
         .module('blocJams')
         .directive('seekBar', ['$document', seekBar]);
 })();
