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
	
	/* calendar function */
     $("#date-range200").datepicker({
            dateFormat: "mm/dd/yy",
            minDate: 0,
            onSelect: function (date) {
                var dt2 = $('#date-range201');
                var hdsstartDate = $(this).datepicker('getDate');
                var minDate = $(this).datepicker('getDate');

                /* function to compare dates */
				var date_a = $('#date-range200').val().split('/');
				var date_b = $('#date-range201').val().split('/');
				var firstDate = new Date(date_a[2],(date_a[0] - 1 ),date_a[1]);
				var secondDate = new Date(date_b[2],(date_b[0] - 1 ),date_b[1]);
				/* function to compare dates */


				if($('#date-range201').val() != '' && firstDate <= secondDate){
					dt2.datepicker('option', 'minDate', minDate);
				}else{
					dt2.datepicker('setDate', minDate);
					dt2.datepicker('option', 'minDate', minDate);
				}
            }
        });
		$('#date-range201').datepicker({
            dateFormat: "mm/dd/yy",
			minDate: 0,
            onSelect: function (date) {
                var dt1 = $('#date-range200');
				var maxDate = $(this).datepicker('getDate');
				if($('#date-range200').val() == ''){
	                dt1.datepicker('setDate', $('#date-range201').val());
				}

            }
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
//    $('a.externalcontent:not(.isGatedLock)').each(function(index, el) {
//    	var extrnalLink = $(this).attr("data-target-url");
//    	$(this).attr("href",extrnalLink);
//    });
    
    externalGatedContHref();
    
	$(document).on('click','.isGatedLock',function(evt){
		//localStorage.setItem('parentPageRef', window.location.href);
        if(window.location.href.indexOf("digital-transformation") > -1) {
            document.cookie="dtGatedParentPageRef="+window.location.href+";domain=.hds.com;path=/";
        }else{
            document.cookie="hdsGatedParentPageRef="+window.location.href+";domain=.hds.com;path=/";
        }
    })
	
    if ($(".stickyNav")[0]){
    	var anchorVal = window.location.hash;
    	if(typeof anchorVal != 'undefined' && anchorVal.length > 0){
    		$('a[href^='+anchorVal+']').click();	
    	}
    } 
    
});

$( document ).ajaxComplete(function() {
	externalGatedContHref();
});

function externalGatedContHref(){
    $('a.externalcontent:not(.isGatedLock)').each(function(index, el) {
    	var extrnalLink = $(this).attr("data-target-url");
    	$(this).attr("href",extrnalLink);
    });
}


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