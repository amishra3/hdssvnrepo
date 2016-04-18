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
    var phoneDialNumber = ((/iphone|android|ie|blackberry|fennec/).test(navigator.userAgent.toLowerCase()) && 'ontouchstart' in document.documentElement);
	//})( jQuery, ResponsiveBootstrapToolkit );

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
	/* Cross Domain */
	if (window.location.href.match(/hds.com/gi)) {
        document.domain = "hds.com";
    }
	
	/**
	 * Black Color Breadcrumb
	 */
    if (!$(".common-hero-banner, .common-hero-short-banner, .hero-product-solutions, .bannerCarsoul, .hero-homepage").length > 0){
        $('.breadcrumb-container .breadcrumb').addClass('black');       
		$('.hds-main-navigation-container').addClass('navwithouthero');        
    }
	
	/**
	 * Breadcrumb Check for Specification Detail
	 */
    if ($("body#tech-specifications").length > 0){
        $('.breadcrumb-container .breadcrumb').removeClass('black');
    }
	
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
	

	/* function to open modal window start */
    $(document).on('click','a[rel=iframemodal]',function(evt){
        evt.preventDefault();
        var modal = $('#modal').modal();
        var formTitle = $(this).attr('data-formtitle'); 
        var targetURL= $(this).attr('href');
        modal.find('.modal-header .title').text('').append(formTitle);
        modal.find('.modal-body').html("<iframe src='"+targetURL+"' height='540' frameborder='0' scrolling='no' id='hdsModalWindow' onload='setIframeHeight(this.id)'></iframe><div id='modal-loading'></div>");
        modal.show();
		$('#modalValProp').show();
		// Code for iOS issue in overlay start
		if( navigator.userAgent.match(/iPhone|iPad|iPod/i) ) {
		   var styleEl = document.createElement('style'), styleSheet;
		   document.head.appendChild(styleEl);
		   styleSheet = styleEl.sheet;
		   styleSheet.insertRule(".modal { position:absolute; bottom:auto; }", 0);
		 }
		// Code for iOS issue in overlay end
    });

	$(document).on('click','.modal-header button.close',function(evt){
        $('#modal').find('.modal-body').html('');
    })
    $(window).resize(function() {
        if($(window).width() >= 768 ){
            //$('.modal-header button.close').trigger('click');
            //document.getElementById('hdsModalWindow').contentWindow.location.reload();
        }                
    });
    /* function to open modal window ends */
    
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
    
	$(document).on('click','.isGatedLock',function(evt){
		//localStorage.setItem('parentPageRef', window.location.href);
		document.cookie="hdsGatedParentPageRef="+window.location.href+"; path='/'";
    })
	
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

function getDocHeight(doc) {
    doc = doc || document;
    var body = doc.body, html = doc.documentElement;
    var height = Math.max( body.scrollHeight, body.offsetHeight, 
        html.clientHeight, html.scrollHeight, html.offsetHeight );
    return height;
}

function setIframeHeight(id) {
    var ifrm = document.getElementById(id);
    var doc = ifrm.contentDocument? ifrm.contentDocument: 
        ifrm.contentWindow.document;
    ifrm.style.visibility = 'hidden';
    ifrm.style.height = "10px";
    ifrm.style.height = getDocHeight( doc ) + 4 + "px";
    ifrm.style.visibility = 'visible';
	document.getElementById('modal-loading').style.display = 'none';
}

function gatedPdfIframeHeight(id) {
    var ifrm = document.getElementById(id);
    var doc = ifrm.contentDocument? ifrm.contentDocument: 
    ifrm.contentWindow.document;
    ifrm.style.visibility = 'hidden';
    ifrm.style.height = "10px";
    ifrm.style.height = getDocHeight( doc ) + 4 + "px";
    ifrm.style.visibility = 'visible';
    document.getElementById('gated-pdf-loader').style.display = 'none';
}


function isScrolledIntoView(elem) {
    var $window = $(window),
        docViewTop = $window.scrollTop(),
        docViewBottom = docViewTop + $window.height(),
        elemTop = $(elem).offset().top,
        elemBottom = elemTop + $(elem).outerHeight();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}