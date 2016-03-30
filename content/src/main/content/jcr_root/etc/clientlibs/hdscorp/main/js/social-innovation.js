$(function() {
	/**
	 * Functionality for hero banner area
	 */
	var $heroProducts = $('.common-hero-banner');
	if ($heroProducts.length) {
		$('.close-hero').click(function() {
			$heroProducts.siblings('.server-rack').show();
			$heroProducts.siblings('.overview, .video').hide();
		});

		$('.btn-play-video').click(function() {
			$heroProducts.siblings('.video').show();
			$heroProducts.siblings('.overview, .server-rack').hide()
		});
	}

	if(navigator.userAgent.indexOf('Mac') > 0) {		
		$('body').addClass('mac-os');
	}

    /* SI Today Equal Boxes */
    window.addEventListener("resize", function() {
        setTimeout(function(){
			equalColumns('.si-comm-box-content .description');
        }, 500);
	}, false);

    setTimeout(function(){
    	equalColumns('.si-comm-box-content .description');
    }, 500);

});



