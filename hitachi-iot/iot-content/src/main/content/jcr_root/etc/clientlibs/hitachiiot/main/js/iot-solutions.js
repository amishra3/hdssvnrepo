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
        	}, 1000
        );
    });
	}
});



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
			equalColumns('.solution-section .solution-category-box');
			equalColumns('.stay_touch_container .comment_box');
			equalColumns('.product-list-section .panel-box');
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
		equalColumns('.solution-section .solution-category-box');
		equalColumns('.stay_touch_container .comment_box');
		equalColumns('.product-list-section .panel-box');
    }, 500);



})(jQuery);