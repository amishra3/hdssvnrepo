$(function() {
    function checkWidth() {
    	var imgName = "";
        var windowSize = $(window).width();

        if (windowSize <= 320) {
			$('.rsImg').each(function (index, value){
				imgName = $(this).attr('data-image-mobile');
				$(this).css("background-image", "url('"+imgName+"')");
			});
			
			return false;
        }
        else if (windowSize > 321) {
		   $('.rsImg').each(function (index, value){
			   imgName = $(this).attr('data-image-desktop');
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