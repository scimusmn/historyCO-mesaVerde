/**
 * Render content from templates on the page and handle navigation
 */

$(function() {

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
    $('#step-1-wrap').fadeOut('slow', function() {
      $('#step-2-wrap').fadeIn('fast');
    });
  });

});
