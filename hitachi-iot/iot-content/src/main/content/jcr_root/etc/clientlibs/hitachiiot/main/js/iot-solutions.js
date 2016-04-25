(function($) {


	/**
	 * Functionality for hero banner area
	 */


	var $marketLeaderImage = $('.solutions-page.market-leader ');
	if ($marketLeaderImage.length) {
		$('.solutions-overlay .close-hero').click(function() {
			$marketLeaderImage.siblings('.solutions-overlay').hide();
			$marketLeaderImage.siblings('.inner-content').hide();
		});

		$('.solutions-page.market-leader .btn-play-video').click(function() {
			$marketLeaderImage.siblings('.solutions-overlay').show();
			$marketLeaderImage.siblings('.inner-content').hide();
		});
	}

	var $heroSolutions = $('.hero-solutions');
	if ($heroSolutions.length) {
		$('.close-overlay').click(function() {
			$heroSolutions.siblings('.hds-overlay').hide();
			$heroSolutions.siblings('.inner-content').hide();
		});

		$('.hero-solutions .btn-play-video').click(function() {
			$heroSolutions.siblings('.hds-overlay').show();
			$heroSolutions.siblings('.inner-content').show();
		});
	}



 
	var stickyElement = function() {
		// element to be sticky
		var $stickyEl = $('.navContain');
		// element that will stop the sticky element
		var $stopEl = $('.stop');

		var sticky = new Waypoint.Sticky({
			element: $stickyEl,
			wrapper: false,
			stuckClass: 'sticky',
			offset: 43
		});

		$stopEl.waypoint(function(direction) {
			if (direction === 'down') {
				// when scrolling down
				// replace pos:fixed with absolute and set top value to
				// the distance from $stopEl to viewport top minus the
				// height of the stickyElement
				// var footerOffset = $stopEl.offset();
				$stickyEl.css({
					position: 'absolute',
					top: 0
						//top: footerOffset.top - $stickyEl.outerHeight()
				});
			} else if (direction === 'up') {
				// remove the inline styles so sticky styles apply again
				$stickyEl.attr('style', '');
			}

		}, {
			// trigger the waypoint when the bottom of stickyEl touches top of stopEl
			offset: function() {
				return $stickyEl.outerHeight();
			}
		});
	};

	stickyElement();

	// Get text values from Sticky Nav, apply to Accordion labels
	$("ul.stickyNav li a").each(function(i) {
		var stickyLabel = $(this).text();
		$("#stickyNav-"+i).text(stickyLabel);
	});

	var allMenus = $('.accordion-menu-container');
	var allContents = $('.accordion-content');

	$('.accordion-content').on('click', function(event){
		event.stopPropagation();
		return false;
	});

	$('.accordion-level').on('click', function(event) {
		var $currentMenu = $(this).find('.accordion-menu-container');
		var $currentContent = $(this).find('.accordion-content');

		if ($currentMenu.hasClass('open')) {
			$currentMenu.removeClass('open');
			$currentContent.removeClass('open');
			return false;
		}
		// allMenus.removeClass('open');
		// allContents.removeClass('open');
		$currentMenu.toggleClass('open');
		$currentContent.toggleClass('open');
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

})(jQuery);