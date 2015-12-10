(function($) {

	/**
	 * Functionality for hero banner area
	 */

	var $heroProducts = $('.hero-product-solutions');
	if ($heroProducts.length) {
		$('.close-hero').click(function() {
			$heroProducts.siblings('.overview').show();
			$heroProducts.siblings('.server-rack, .video').hide();
		});

		$('.request').click(function() {
			$heroProducts.siblings('.server-rack').show();
			$heroProducts.siblings('.overview, .video').hide();
		});

		$('.btn-play-video').click(function() {
			console.log('play');
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
		}
	});

	var waypoint2 = new Waypoint({
		element: document.getElementById('features-benefits'),
		handler: function(direction) {
			setActiveLi.call(this);
		}
	});

	var waypoint3 = new Waypoint({
		element: document.getElementById('resources'),
		handler: function(direction) {
			setActiveLi.call(this);
		}
	});

	var waypoint4 = new Waypoint({
		element: document.getElementById('tech-specifications'),
		handler: function(direction) {
			setActiveLi.call(this);
		}
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

		var el = $(this).attr('href').substring(1);

		$(window).scrollTo(document.getElementById(el), 1000);
	});

})(jQuery);
