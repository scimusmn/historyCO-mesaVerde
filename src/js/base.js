/**
 * Render content from templates on the page and handle navigation
 */

$(function() {

  // Add a human-readable value, not zero-based, index value
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

  // Back buttons
  $('.back').click(function() {
    var destination = $(this).attr('data-dest'); // where are we going?
    // Hide current screen and move to destination
    $('.active').fadeOut('fast', function() {
      $('.active .option').hide();
      $(this).removeClass('active');
      $('#' + destination + '-wrap').fadeIn('fast');
    });
  });

});
