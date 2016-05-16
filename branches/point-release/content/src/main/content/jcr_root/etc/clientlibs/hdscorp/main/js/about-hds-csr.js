$(function() {
	/**
	 * Functionality for hero banner area
	 */
	var $heroProducts = $('.about-hds-csr-eco');
	if ($heroProducts.length) {
		$('.close-hero').click(function() {
			$heroProducts.siblings('.server-rack').show();
			$heroProducts.siblings('.video').hide();
		});

		$('.btn-play-video').click(function() {
			$heroProducts.siblings('.video').show();
			$heroProducts.siblings('.server-rack').hide();
		});
	}
});
