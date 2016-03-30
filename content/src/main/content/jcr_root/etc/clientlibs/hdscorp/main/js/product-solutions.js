(function($) {

	/**
	 * Functionality for hero banner area
	 */

	var $heroProducts = $('.hero-product-solutions');
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
	
	
	jQuery(document).ready(function($){
	if($('.navContain').length!==0){
		var heroBannerClass;
        if($('.hero-product-solutions').length!==0){
			heroBannerClass=".hero-product-solutions";
        }else{
			heroBannerClass=".common-hero-banner";
        }


	var secondaryNav = $('.navContain'),
		secondaryNavTopPosition = secondaryNav.offset().top,
		taglineOffesetTop = $(heroBannerClass).offset().top + $(heroBannerClass).height() + parseInt($(heroBannerClass).css('paddingTop').replace('px', '')),
		contentSections = $('.accordion-level'),
		endScroll = $('.stop'),
		endScrollPos = endScroll.offset().top;

	$(window).on('scroll', function(){
		if($(window).scrollTop() > secondaryNavTopPosition && $(window).scrollTop() < endScrollPos) {
			secondaryNav.addClass('is-fixed sticky fadeInDown animated');
		}else if($(window).scrollTop() > endScrollPos ) {
			secondaryNav.removeClass('is-fixed sticky fadeInDown animated');
		} else {
			secondaryNav.removeClass('is-fixed sticky fadeInDown animated');
		}
		updateSecondaryNavigation();
	});

	function updateSecondaryNavigation() {
		contentSections.each(function(){
			var actual = $(this),
				actualHeight = actual.height() + parseInt(actual.css('paddingTop').replace('px', '')) + parseInt(actual.css('paddingBottom').replace('px', '')),
				actualAnchor = secondaryNav.find('a[href="#'+actual.attr('id')+'"]');
			if ( ( actual.offset().top - secondaryNav.height() <= $(window).scrollTop() ) && ( actual.offset().top +  actualHeight - secondaryNav.height() > $(window).scrollTop() ) ) {
				actualAnchor.addClass('active');
			}else {
				actualAnchor.removeClass('active');
			}			
		});
	}
	secondaryNav.find('ul a').on('click', function(event){
		event.preventDefault();
        var target= $(this.hash);
        $('body,html').animate({
			'scrollTop': target.offset().top + 4
        	}, 400
        );
    });
	}
});


	/*if($('.navContain').length!==0){
		$('.navContain').stickyNavbar();
		$('.navContain').stickyNavbar({
			activeClass: "active",          // Class to be added to highlight nav elements
			sectionSelector: "accordion-level",    // Class of the section that is interconnected with nav links
			animDuration: 250,              // Duration of jQuery animation
			startAt: 0,                     // Stick the menu at XXXpx from the top of the this() (nav container)
			easing: "linear",               // Easing type if jqueryEffects = true, use jQuery Easing plugin to extend easing types - gsgd.co.uk/sandbox/jquery/easing
			animateCSS: true,               // AnimateCSS effect on/off
			animateCSSRepeat: false,        // Repeat animation everytime user scrolls
			cssAnimation: "fadeInDown",     // AnimateCSS class that will be added to selector
			jqueryEffects: false,           // jQuery animation on/off
			jqueryAnim: "slideDown",        // jQuery animation type: fadeIn, show or slideDown
			selector: "li",                  // Selector to which activeClass will be added, either "a" or "li"
			mobile: false,                  // If false nav will not stick under 480px width of window
			mobileWidth: 480,               // The viewport width (without scrollbar) under which stickyNavbar will not be applied (due usability on mobile devices)
			zindex: 9999,                   // The zindex value to apply to the element: default 9999, other option is "auto"
			stickyModeClass: "sticky",      // Class that will be applied to 'this' in sticky mode
			unstickyModeClass: "unsticky"   // Class that will be applied to 'this' in non-sticky mode
		});

        var stopPos = $('.stop').eq(0).offset().top;
	    $(window).scroll(function(e){
		var cScroll = $(window).scrollTop();
		if(cScroll >= stopPos){
		    $('.navContain').removeClass('sticky').addClass('unsticky').removeAttr('style');
		}
		e.stopPropagation();
	})

	};*/

	/* sticky nav code end here */

	// Get text values from Sticky Nav, apply to Accordion labels
	$("ul.stickyNav li a").each(function(i) {
		var stickyLabel = $(this).text();
		$("#stickyNav-"+i).text(stickyLabel);
	});

	var allMenus = $('.accordion-menu-container');
	var allContents = $('.accordion-content');

	$(document).on('click','.accordion-level > .accordion-menu-container' , function(event) {
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

	/**
	 * stickyNav scrolling functionality
	 */

	/*$('.stickyNav a').on('click', function(e){
		e.preventDefault();
		var
		 	scrollOffset = 0,
			el = $(this).attr('href').substring(1),
			stickyNavHeight = $('.navContain .stickyNav').outerHeight(),
			stickyNavPosition = $( '.navContain .stickyNav' ).offset().top,
			element = document.getElementById( el ),
			elementPosition = element.getBoundingClientRect()
		;

		if ( stickyNavPosition < elementPosition ) { scrollOffset = stickyNavHeight; }
		else { scrollOffset = 0; }

		$(window).scrollTo( element, 1000, { offset: scrollOffset } );
	});*/


	/* Read More Less Code Start */
	var deviceAgent = navigator.userAgent.toLowerCase();
	var agentID = deviceAgent.match(/(iphone|ipad|android)/);      
	if (agentID) {
		$(".product-desc").each(function( index ) {
			pCount = $(this).children("p").length
			if(pCount > 1){
				$(this).find('p:not(:first-child)').hide();
				$(this).find('p:first-child').css({'margin-bottom':'0'}).append('..<a href="javascript:void(0);" class="read-more">read more</a>');
				$(this).find('p:last-child').append('..<a href="javascript:void(0);" class="read-less">read less</a>');
			}	
		})

		$('.read-more').click(function(){
			$(this).parent().siblings().show();
			$(this).parent().parent().find('p:first-child').css({'margin-bottom':'30px'}).show();
			$(this).hide();
		})

		$('.read-less').click(function(){
			$(this).parent().parent().find('p').hide();
			$(this).parent().parent().find('p:first-child, a.read-more').css({'margin-bottom':'0'}).show();
		})
	}
	/* Read More Less Code End */

	/* Product & Solution Active Tab */
	if(window.location.href.indexOf("products-solutions") > -1) {
       $('.sub-navigation ul li:first-child a').addClass('active');
    }

})(jQuery);
if($('.accordion-level').length!==0){
	$( ".contentarea .accordion-level" ).last().addClass("accordion-level-last");
}
/* equal column height start */
if( $(window).width() > 1209){
if($('.fb-category-container').length!==0){

			$('div[class="fb-category-container "]').each(function(index,item){

				this.id = 'fixedRate' + index;

				var callheightinner = 0;
				for(var i=0;i<$("#fixedRate"+index+" .fb-category-points-box").size();i++){
					if($("#fixedRate"+index+" .fb-category-points-box:eq("+i+")").height()>=callheightinner){
							callheightinner=$("#fixedRate"+index+" .fb-category-points-box:eq("+i+")").height();
						}
				}
				$("#fixedRate"+index+" .fb-category-points-box").height(callheightinner);
				
				/*var callheightinnerhead=0;
				for(var i=0;i<$("#fixedRate"+index+" .fb-category-points-box-heading").size();i++){
					if($("#fixedRate"+index+" .fb-category-points-box-heading:eq("+i+")").height()>=callheightinnerhead){
							callheightinnerhead=$("#fixedRate"+index+" .fb-category-points-box-heading:eq("+i+")").height();
						}
				}
				$("#fixedRate"+index+" .fb-category-points-box-heading").height(callheightinnerhead);*/
			});

}
}

/*if( $(window).width() > 1209){
if($('.mes-section').length!==0){

				var resheightinner = 0;
				for(var i=0;i<$(".product-box .product-copy-main").size();i++){
					if($(".product-box .product-copy-main:eq("+i+")").height()>=resheightinner){
							resheightinner=$(".product-box .product-copy-main:eq("+i+")").height();
						}
				}
				$(".product-box .product-copy-main").height(resheightinner);
				
				var resheightinnerhead=0;
				for(var i=0;i<$(".product-box .product-copy-sub").size();i++){
					if($(".product-box .product-copy-sub:eq("+i+")").height()>=resheightinnerhead){
							resheightinnerhead=$(".product-box .product-copy-sub:eq("+i+")").height();
						}
				}
				$(".product-box .product-copy-sub").height(resheightinnerhead);
}
}

if( $(window).width() > 1209){
if($('.resources-section').length!==0){

				var setheightinner = 0;
				for(var i=0;i<$(".resources-category-box .resources-category-title").size();i++){
					if($(".resources-category-box .resources-category-title:eq("+i+")").height()>=setheightinner){
							setheightinner=$(".resources-category-box .resources-category-title:eq("+i+")").height();
						}
				}
				$(".resources-category-box .resources-category-title").height(setheightinner);
				
				var setheightinnerhead=0;
				for(var i=0;i<$(".resources-category-box .resources-category-description").size();i++){
					if($(".resources-category-box .resources-category-description:eq("+i+")").height()>=setheightinnerhead){
							setheightinnerhead=$(".resources-category-box .resources-category-description:eq("+i+")").height();
						}
				}
				$(".resources-category-box .resources-category-description").height(setheightinnerhead);
}
}*/






if($('.resources-category-box').length!==0){
	$('.resources-category .resources-category-box').each(function(index,item){
		this.id = 'fixedRes' + index;
	})
}

/* equal column height end */

/* Equal Columns Height */
(function($) {	
    function equalColumns(htmlElements){
		$(htmlElements).removeAttr('style');
		var heights = $(htmlElements).map(function() {
	        return $(this).height();
	    }).get(),
	    maxHeight = Math.max.apply(null, heights);
	    $(htmlElements).height(maxHeight);
	}

	window.addEventListener("resize", function() {
    	// Get screen size (inner/outerWidth, inner/outerHeight)
        setTimeout(function(){
			equalColumns('.cs-selections .cs-selection-box');
        	equalColumns('.mes-section .product-box');
			equalColumns('.community-common-box');
            equalColumns('.pr-explore-container .pr-common-box');
			equalColumns('.news-insight-explore .spotlight-content');
			equalColumns('.news-insight-explore .spotlight-normal .spotlight-content');
        	equalColumns('.about-hds-latest .about-hds-events-content');
            equalColumns('.services-list-section .section-service-col');
            equalColumns('.service-support-main .section-service-col');
            equalColumns('.explore-insight .insight-common-box');
			equalColumns('.detail-container .details-box');
			equalColumns('.train-resrcprdct-bx .prdct-inner');
			equalColumns('.resources-spotlight .spotlight-content');
			equalColumns('.service-infra .news-resources-col');
        }, 500);
	}, false);


    setTimeout(function(){
    	equalColumns('.cs-selections .cs-selection-box');
        equalColumns('.mes-section .product-box');
		equalColumns('.community-common-box');
        equalColumns('.pr-explore-container .pr-common-box');
		equalColumns('.news-insight-explore .spotlight-content');
		equalColumns('.news-insight-explore .spotlight-normal .spotlight-content');
        equalColumns('.about-hds-latest .about-hds-events-content');
        equalColumns('.services-list-section .section-service-col');
        equalColumns('.service-support-main .section-service-col');
        equalColumns('.explore-insight .insight-common-box');
        equalColumns('.detail-container .details-box');
        equalColumns('.train-resrcprdct-bx .prdct-inner');
		equalColumns('.resources-spotlight .spotlight-content');
		equalColumns('.service-infra .news-resources-col');
    }, 500);

})(jQuery);