/*
Author       : Dreamguys
Template Name: Ventura - Bootstrap Admin Template
Version      : 1.0
*/

(function ($) {
  "use strict";
  $(document).ready(function () {
    $('[data-toggle="collapse-1"]').click(function () {
      $(this).toggleClass("active");
      if ($(this).hasClass("active")) {
        $(this).text("Hide");
      } else {
        $(this).text("Datails");
      }
    });
  });
})(jQuery);
