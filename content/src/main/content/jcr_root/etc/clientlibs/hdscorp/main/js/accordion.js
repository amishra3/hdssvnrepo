(function($) {

	$('.accordion-level > .accordion-menu-container').on('click', function(event) {
	        //$(this).addClass('open');
	        //var $currentMenu = $(this).find('.accordion-menu-container');
	        var $currentContent = $(this).closest('div').next('div.accordion-content',this);
	        if ($(this).hasClass("open") && $(this).next().queue().length === 0) {
	            $currentContent.removeClass('open');
	            $(this).removeClass("open");
	        } else if (!$(this).hasClass("open") && $(this).next().queue().length === 0) {
	            $currentContent.addClass('open');
	            $(this).addClass("open");
	        }
	        return false;
	    });

})(jQuery);
