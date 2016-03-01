$(function() {
    function checkWidth() {
        var imgName = "";
        var windowSize = $(window).width();
        if (windowSize <= 767) {
            imgName = $('.rsImg').attr('data-image-mobile');
            $('.rsImg').css("background", "url('"+imgName+"') no-repeat");
            return false;
        }
        else if (windowSize >= 768 &&  windowSize <= 991) {
           imgName = $('.rsImg').attr('data-image-tablet');
           $('.rsImg').css("background", "url('"+imgName+"') no-repeat");
           return false;
        }
        else if (windowSize > 992) {
           imgName = $('.rsImg').attr('data-image-desktop');
           $('.rsImg').css("background", "url('"+imgName+"') no-repeat");
           return false;
        }
    }

    // Execute on load
    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);
});