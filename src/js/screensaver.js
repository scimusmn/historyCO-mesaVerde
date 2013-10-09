/**
 * screensaver.js
 * After 3 minutes of inactivity, show a full-screen video as a screensaver.
 * See http://stackoverflow.com/a/4029518
 */

var savedScreen = false; // Screen is initially not saved.

$(function () {

  // Start the clock
  idleTime = 0;

  // Increment the idle time counter every minute.
  var idleInterval = setInterval(timerIncrement, 60000); // 1 minute

  // Zero the idle timer on mouse movement.
  $(this).mousemove(function (e) {
    idleTime = 0;
  });
  $(this).keypress(function (e) {
    idleTime = 0;
  });

});


/**
 * Start the screensaver after 3 minutes of inactivity.
 */
function timerIncrement() {
  idleTime = idleTime + 1;
  if ((idleTime > 2) && (!playing) && (!savedScreen)) {
    screensaver();
  }
}


/**
 * Screensaver: Loop the screensaver video in full-screen mode.
 */
var screensaver = function() {

  // Make the video loop
  $('video').prop('loop', true);
  // Set the screensaver path and play it.
  videojs('videoPlayer').src('../assets/videos/screensaver.mp4').play();

  // Fade out content, show the screensaver video
  //$('.hidden').not('.back').not('.step').show();
  //$('.wrapper').fadeOut('fast', function() {

    //$('.hidden').not('.back').not('.step').show(function(){
      //console.log('showin');
    //});
  //});

  savedScreen = true; // The screen has been saved!

  // Commented out for testing
  //wakeUp(videojs('videoPlayer')); // Watch for action, which will reload the page

}


/**
 * Clear screensaver
 */
function wakeUp(videoPlayer) {
  // Refresh on mousemove
  $('body').mousemove(function (e) {
    location.reload();
  });
  // Refresh on error
  videoPlayer.on('error', function(){
    location.reload();
  });
}
