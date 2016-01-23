(function($) {
	/**
	 * Functionality for hero banner area
	 */
	var $heroProducts = $('.hero-social-innovation');
	if ($heroProducts.length) {
		$('.close-hero').click(function() {
			$heroProducts.siblings('.server-rack').show();
			$heroProducts.siblings('.overview, .video').hide();
		});

		$('.btn-play-video').click(function() {
			$heroProducts.siblings('.video').show();
			$heroProducts.siblings('.overview, .server-rack').hide();
		});
	}

	if(navigator.userAgent.indexOf('Mac') > 0) {		
		$('body').addClass('mac-os');
	}

})(jQuery);
