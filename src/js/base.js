/**
 * Render content from templates on the page and handle navigation
 */

$(function() {

  // Get our template and turn it into HTML
  var source   = $('#template-1').html();
  var template = Handlebars.compile(source);

  // Pull in the content object from content.js
  $('#step-1-output').html(template(content));

});
