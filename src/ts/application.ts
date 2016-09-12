/// <reference path="../../typings/all.d.ts" />
/// <reference path="services/renuo_upload_initializer.ts"/>
/// <reference path="services/image_manipulation_listener.ts"/>

$(() => {
  new RenuoUploadInitializer();
  new ImageManipulationListener();
});

$(document).ready(function () {
  window.scroll = function () {
    $('html, body').animate({
      'scrollTop': $('#top').offset().top
    }, 1000);
  };

  $('.renuo-upload').hover(function () {
    $('.info-text').removeClass('infinite');
  });
});
