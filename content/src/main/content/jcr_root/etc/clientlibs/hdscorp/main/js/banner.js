(function($) {

	var $heroHomepage = $('.hero-homepage');
	var $generalList = $('ul.general-list li a');
	var $listContent = $('.hiddencontent');

	if ($heroHomepage.length) {
		$('.list-content-container').on('click', '.close-hero', function() {
			$heroHomepage.siblings('.general').fadeIn(1000);
			$heroHomepage.siblings('.list-content-container').removeClass().addClass('hero-homepage list-content-container').empty();
			$heroHomepage.siblings('.list-content-container').hide();
		})

		$generalList.click(function(event){
			event.preventDefault();
			var tabClass = $(this).attr('data-class');
			var tabHtml = $(this).next('.hiddencontent').html();
			$heroHomepage.siblings('.list-content-container').addClass(tabClass).append(tabHtml).fadeIn(1000);
			$heroHomepage.siblings('.general').hide();
		})
	}

})(jQuery);