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


	if($('.navContain').length!==0){
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

	};

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

	$('.stickyNav a').on('click', function(e){
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
	});


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
        }, 500);
	}, false);


    setTimeout(function(){
    	equalColumns('.cs-selections .cs-selection-box');
        equalColumns('.mes-section .product-box');
    }, 500);

})(jQuery);