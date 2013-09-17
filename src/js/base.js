/**
 * @file base.js
 * Code here renders the content into their Handlebars templates,
 * handles navigation between the menu and the topics, and allows
 * the user to select videos within the active topic.
 */
$(function() {

  var $videoOption = $('.question-box'),
      videoPlayer = videojs('videoPlayer'),
      // Path is relative to index.html
      videoPath = '../assets/videos/';

  // Unbind video.js default behavior of rewinding the video when it ends
  // We're providing our own "ended" event.
  videoPlayer.off('ended', videoPlayer.ended);
  videoPlayer.off('ended', function() {
    if (this.options.loop) {
      this.currentTime(0);
      this.play();
    } else {
      this.pause();
    }
  });

  // Add a human-readable value, not zero-based, index value for use in templates
  Handlebars.registerHelper('setIndex', function(value){
    this.index = Number(value + 1);
    return this.index;
  });

  // Render step 1 and step 2 content in their Handlebars templates
  var i = 1;
  while (i <= 2) {
    var source = $('#template-' + i).html(),
        template = Handlebars.compile(source);
    $('#step-'+ i +'-output').html(template(content));
    i++;
  }

  // Navigation over to step 2
  $('div.section').click(function() {
    selected_topic = $(this).attr('data-option-id');
    // Show the selected content
    $('#step-1-wrap').fadeOut('slow', function() {
      $('div[data-option-id="'+ selected_topic +'"]').add('#step-2-wrap .back').show();
      $('#step-2-wrap').fadeIn('fast', function() {
        $(this).addClass('active');
      });
    });
  });

  // Initialize the videojs plugin.
  videoPlayer.ready(function() {

    // Question selector for each topic screen
    $('.question-box').click(function() {
      var selected_video = $(this).attr('data-video'),
          video_path = '../assets/videos/topic_' + selected_topic + '/' + selected_video + '.mp4';

      // Change the color of the selected question
      $('.active-question').removeClass('active-question');
      $(this).addClass('active-question');

      // Show the video
      console.log('Playing ' + video_path);
      $('video source').attr('src', video_path);
    });

    // "Back to menu" buttons
    $('.back').click(function() {
      restartKiosk();
    });

  });

  /**
   * Restart the kiosk:
   * Fade out the video screen, then reload the page.
   */
  var restartKiosk = function() {
    $('.step').fadeOut('fast', function() {
      location.reload();
    });
  }

});
