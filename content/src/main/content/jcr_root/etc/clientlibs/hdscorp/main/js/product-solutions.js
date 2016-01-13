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

    if($('#overview').length  ){
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
    }
     if($('#features-benefits') > 0 ){
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
     }
if($('#resources') > 0 ){
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
}
if($('#tech-specifications') > 0 ){
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

}


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

	$(document).on('click','.accordion-level > .accordion-menu-container').on('click', function(event) {
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

})(jQuery);


var hds = window.hds || {};
(function(window, document, $, hds) {
    hds.equalColoumns = function(htmlElements) {
        var heights = $(htmlElements).map(function() {
                return $(this).height();
            }).get(),
            maxHeight = Math.max.apply(null, heights);
        	setTimeout(function(){
        		$(htmlElements).height(maxHeight);	
        	}, 1000);
    }
 }(window, document, jQuery, hds));

(function($) {
    hds.equalColoumns('.resources-category-box');
})(jQuery);