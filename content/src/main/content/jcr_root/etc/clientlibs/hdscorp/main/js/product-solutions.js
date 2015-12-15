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

	var stickyElement = function() {
		// element to be sticky
		var $stickyEl = $('.navContain');
		// element that will stop the sticky element
		var $stopEl = $('.stop');

		var sticky = new Waypoint.Sticky({
			element: $stickyEl,
			wrapper: false,
			stuckClass: 'sticky',
			offset: 0
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

	function setActiveLi() {
		var currentId = $(this.element).attr('id');
		$('.list-inline').find('li').removeClass('active');
		$('.list-inline').find('li.' + currentId).addClass('active');
	}

	var waypoint = new Waypoint({
		element: document.getElementById('overview'),
		handler: function(direction) {
			setActiveLi.call(this);
		},
		offset: 1
	});

	var waypointb = new Waypoint({
		element: document.getElementById('overview'),
		handler: function(direction) {
			setActiveLi.call(this);
		},
		offset: -136
	});

	var waypoint2 = new Waypoint({
		element: document.getElementById('features-benefits'),
		handler: function(direction) {
			setActiveLi.call(this);
		},
		offset: 34
	});

	var waypoint2b = new Waypoint({
		element: document.getElementById('features-benefits'),
		handler: function(direction) {
			setActiveLi.call(this);
		},
		offset: -136
	});

	var waypoint3 = new Waypoint({
		element: document.getElementById('resources'),
		handler: function(direction) {
			setActiveLi.call(this);
		},
		offset: 34
	});

	var waypoint3b = new Waypoint({
		element: document.getElementById('resources'),
		handler: function(direction) {
			setActiveLi.call(this);
		},
		offset: -136
	});

	var waypoint4 = new Waypoint({
		element: document.getElementById('tech-specifications'),
		handler: function(direction) {
			setActiveLi.call(this);
		},
		offset: 34
	});

	var waypoint4b = new Waypoint({
		element: document.getElementById('tech-specifications'),
		handler: function(direction) {
			setActiveLi.call(this);
		},
		offset: -136
	});

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
