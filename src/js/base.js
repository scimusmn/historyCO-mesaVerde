/**
 * Render content from templates on the page and handle navigation
 */

$(function() {

  Handlebars.registerHelper('setIndex', function(value){
    this.index = Number(value + 1); // Human-readable value, not zero-based
    return this.index;
  });

  // Get our step 1 template and turn it into HTML
  var source   = $('#template-1').html();
  var template = Handlebars.compile(source);

  // Pull in the content object from content.js
  $('#step-1-output').html(template(content));

  // Samesies for step 2 template (TODO - loop these)
  var step_2_source = $('#template-2').html();
  var step_2_template = Handlebars.compile(step_2_source);
  $('#step-2-output').html(step_2_template(content));

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
