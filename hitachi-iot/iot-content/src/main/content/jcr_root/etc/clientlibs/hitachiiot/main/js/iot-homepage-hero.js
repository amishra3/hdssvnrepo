// Set hero and children element heights to match
//
$(window).on("resize", function () {
  var highestCol = Math.max($('.iot-hero').height(),$('.hero-banner').height());
  $('.hero-banner, .hero-banner>img').height(highestCol);
}).resize();