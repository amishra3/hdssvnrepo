'use strict';
/*global jQuery*/

// console.log shorthand. use cl() in place of console.log()
if (typeof console !== 'undefined' && typeof console.dir.bind !== 'undefined') {
	window.cl = console.dir.bind(console);
}

var ResponsiveBootstrapToolkit = ResponsiveBootstrapToolkit || {};

// comment out viewport, ResponsiveBootstrapToolkit variable to pass eslint while unused
//(function( $, viewport ){
(function($) {
	
	/**
	 * Return to Top button funionality
	 */
	
	$(document).on('click','.cta-scroll-top, .cta-scroll-top-mobile', function() {
		$(window).scrollTo(0, 0, {
			duration: 1000
		});
	});

	$(window).scroll(function(){
		var $button = $('.cta-scroll-top'),
			scrollPos = $(window).scrollTop();

		if (scrollPos > 200 && !$button.hasClass('active')) {
			$button.addClass('active');
		} else if (scrollPos < 200 && $button.hasClass('active')) {
			$button.removeClass('active');
		}
	});


	/**
	 * Click to call phone number on mobile
	 */
    phoneDialNumber = ((/iphone|android|ie|blackberry|fennec/).test(navigator.userAgent.toLowerCase()) && 'ontouchstart' in document.documentElement);
	//})( jQuery, ResponsiveBootstrapToolkit );

})(jQuery);

/**
* Modal Box
*/
$(document).ready(function () {
    $('a[rel=modal]').on('click', function(evt) {
        evt.preventDefault();
        var modal = $('#modal').modal();
        modal
            .find('.modal-body')
            .load($(this).attr('href'), function (responseText, textStatus) {
                if ( textStatus === 'success' || textStatus === 'notmodified') 
                {
                    modal.show();
                }
        });
    });
});


/**
* Equal Column Height
*/
function equalColumns(htmlElements){
    $(htmlElements).removeAttr('style');
    var heights = $(htmlElements).map(function() {
        return $(this).height();
    }).get(),
        maxHeight = Math.max.apply(null, heights);
    $(htmlElements).height(maxHeight);
}
