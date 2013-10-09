/**
 * @file mesa_verde.js
 * Code here renders the content into their Handlebars templates,
 * handles navigation between the menu and the topics, and allows
 * the user to select videos within the active topic.
 */
$(function() {

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
  $('.section').click(function() {
    selected_topic = $(this).attr('data-option-id');
    // Show the selected content
    $('#step-1-wrap').fadeOut('slow', function() {
      $('div[data-option-id="'+ selected_topic +'"]').add('#step-2-wrap .back').show();
      $('#step-2-wrap').fadeIn('fast', function() {
        $(this).attr('current_section', selected_topic).addClass('active');
      });
    });
  });

  // Set a hash in the URL to indicate which section page we're on.
  var hash = window.location.hash;
  if (hash) { // First kiosk load
    selected_topic = hash.substring(1);
    $('#step-1-wrap').hide(0, function() {
      $('div[data-option-id="'+ selected_topic +'"]').add('#step-2-wrap .back').show();
      $('#step-2-wrap').show(function() {
        $(this).attr('current_section', selected_topic).addClass('active');
      });
    });
  }

  // Set up some variables for videoJS
  var $videoOption = $('.question-box'),
      videoPlayer = videojs('videoPlayer');

  // Initialize the videoJS API
  videoPlayer.ready(function() {

    // Question selector for each topic screen
    $videoOption.click(function() {
      var selected_video = $(this).attr('data-video'),
          video_path = '../assets/videos/topic_' + selected_topic + '/' + selected_video + '.mp4';

      // Change the color of the selected question
      $('.active-question').removeClass('active-question');
      $(this).addClass('active-question');

      // Show and play the video
      $('.option img').fadeOut('fast', function() {
        $('#videoPlayer').fadeIn('fast', function() {
          videoPlayer.src(video_path).play();
        });
      });

      // Reload section when video ends
      videoPlayer.on('ended', function(){
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

    // "Back to menu" buttons
    $('.back').click(function() {
      restartKiosk();
    });

  });

  /**
   * Restart the kiosk:
   * Fade out the video screen, then reload the page.
   * Reset the hash to NULL. We use that to indicate which topic we are on.
   * The home page is not a section page.
   */
  var restartKiosk = function() {
    $('.step').fadeOut('fast', function() {
      window.location.hash = '';
      location.reload();
    });
  }

});
