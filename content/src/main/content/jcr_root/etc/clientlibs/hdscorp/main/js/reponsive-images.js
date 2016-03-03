$(function() {
    function checkWidth() {
    	var imgName = "";
        var windowSize = $(window).width();

        if (windowSize <= 320) {
		    imgName = $('.rsImg').attr('data-image-mobile');
			
			$('.rsImg').each(function (index, value){
				$(this).css("background-image", "url('"+imgName+"')");
			});
			
			return false;
        }
        else if (windowSize > 321) {
		   imgName = $('.rsImg').attr('data-image-desktop');
		   $('.rsImg').each(function (index, value){
			   $(this).css("background-image", "url('"+imgName+"')");
		   });

		   return false;
        }
    }

    // Execute on load
    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);
});