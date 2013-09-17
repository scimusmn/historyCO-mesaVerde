/**
 * @file base.js
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
  $('div.section').click(function() {
    var selected = $(this).attr('data-option-id');
    // Show the selected content
    $('#step-1-wrap').fadeOut('slow', function() {
      $('div[data-option-id="'+ selected +'"]').add('#step-2-wrap .back').show();
      $('#step-2-wrap').fadeIn('fast', function() {
        $(this).addClass('active');
      });
    });
  });

  // Question selector for each topic screen
  $('.question-box').click(function() {
    // Change the color of the selected question
    $('.active-question').removeClass('active-question');
    $(this).addClass('active-question');
    // Show the video
    $('.option img').hide();
    $('.hidden.video').show();
  });

  // Back buttons
  $('.back').click(function() {
    // Reset the button classes and the topic images
    $('.active-question').removeClass('active-question');
    $('.hidden.video').hide();
    $('.option img').show();

    var destination = $(this).attr('data-dest'); // where are we going?
    // Hide current screen and move to destination
    $('.active').fadeOut('fast', function() {
      $('.active .option').hide();
      $(this).removeClass('active');
      $('#' + destination + '-wrap').fadeIn('fast');
    });
  });

});
