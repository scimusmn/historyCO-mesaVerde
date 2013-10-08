/**
 * Video playback functionality.
 * Allows video selection from the kiosk start page.
*/

$(function() {

  var $videoOption = $('.videoBox'),
    videoPlayer = videojs('videoPlayer'),
    // Path is relative to index.html
    videoPath = '../assets/videos/';

  // Initialize the Video.js plugin.
  videoPlayer.ready(function() {

    // Set the video source when one is selected
    $videoOption.click(function() {
      var video = $(this).attr('data-video-source');

      // Change the video source
      videoPlayer.src(videoPath + video);

      // Hide the buttons, show the video
      $('.wrapper').fadeOut(500, function() {
        $('.hidden').fadeIn('fast', function() {
          videoPlayer.play();
        });
      });

    });

    // Reload section when video ends
    this.on('ended', function(){
      reloadSection();
    });

  });

  // Find the current section, set a flag in the URL, and reload the page.
  // We reload the page right now because of Chrome stability issues.
  // In the future it would be nice to skip this to prevent the loading flash.
  var reloadSection = function() {
    currentSection = $('div.active').attr('current_section');
    window.location.hash = currentSection;
    location.reload();
  };

});
