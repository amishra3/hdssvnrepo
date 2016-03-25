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

    /**
	 * Black Color Breadcrumb
	 */
    if (!$(".common-hero-banner, .common-hero-short-banner, .hero-product-solutions, .bannerCarsoul").length > 0){
        $('.breadcrumb-container .breadcrumb').addClass('black');
    }

	/**
	 * Breadcrumb Check for Specification Detail
	 */
    if ($("body#tech-specifications").length > 0){
        $('.breadcrumb-container .breadcrumb').removeClass('black');
    }

	/**
    * Global Mobile Search Mobile Code
    */
    $(document).on('click','.search-mobile',function(e){
        $(this).toggleClass('active');
        $('.search-mobile-container').slideToggle();
    })
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
	
	/*function to use on email address click to open*/
	$("a[rel=emailHome]").click(function(){
		var emailadd=$(this).attr("lang").replace("(at)","@");
		setTimeout(function(){
		window.open("mailto:"+emailadd,"_self");},
		1000);
	});
	
	
    $('a[rel=iframemodal]').on('click', function(evt) {
        evt.preventDefault();
        var modal = $('#modal').modal();
        var targetURL= $(this).attr('href');
        modal.find('.modal-body').html("<iframe src='"+targetURL+"' height='700px' frameborder='0'></iframe>");
        modal.show(); 
    });
    
    
    if($('#contentResourceLibrary').length < 1){
	    $('a.isGatedLock').each(function(index, el) {
	    	$(this).prepend("<span class='glyphicon glyphicon-lock' aria-hidden='true'></span>");
	    });
    }else{
	    $('#featuredCards a.isGatedLock, .resources-spotlight .spotlight-title a.isGatedLock').each(function(index, el) {
//	    	$(this).prepend("<span class='glyphicon gated-featured' aria-hidden='true'></span>");
	    	$(this).closest('.spotlight-content').find('.spotlight-image-icon').attr('src','/etc/clientlibs/hdscorp/main/images/gated-icon-white.png');
	    });
    }
    
    if ($(".stickyNav")[0]){
    	var anchorVal = window.location.hash;
    	if(typeof anchorVal != 'undefined' && anchorVal.length > 0){
    		$('a[href^='+anchorVal+']').click();	
    	}
    } 
    
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

