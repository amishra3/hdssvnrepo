(function($) {

	var $heroHomepage = $('.hero-homepage');
	if ($heroHomepage.length) {
		$('.close-hero').click(function() {
			$heroHomepage.siblings('.general').fadeIn(1000);
			$heroHomepage.siblings('.healthcare').hide();
		});

		$('.general-healthcare').click(function() {
			$heroHomepage.siblings('.healthcare').fadeIn(1000);
			$heroHomepage.siblings('.general').hide();
		});
	}

})(jQuery);