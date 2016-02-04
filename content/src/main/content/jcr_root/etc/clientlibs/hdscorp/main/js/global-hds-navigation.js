var hds = window.hds || {};

(function(window, document, $, hds) {
    hds.buildShowNav = {
        init: function() {
            hds.buildShowNav.buildMobileNav();
            hds.buildShowNav.desktopMobileFunction();
            hds.buildShowNav.bindEvents();
        },
        openDropDown: function() {
            var $hdsMenu = $('.hds-MobileMenu');
            var $hdsBody = $('.hds-megaMenu-push');
            $hdsMenu.addClass('hds-megaMenu-open');
            $hdsBody.addClass('hds-MegaMenu-push-toleft');
        },
        closeDropDown: function() {
            var $hdsMenu = $('.hds-MobileMenu');
            var $hdsBody = $('.hds-megaMenu-push');
            $hdsMenu.removeClass('hds-megaMenu-open');
            $hdsBody.removeClass('hds-MegaMenu-push-toleft');
        },
        buildMobileNav: function() {

            $('.globalNavWrapper').clone().appendTo('.hds-mobile-navigation');
            var cloneTopnav = $('.hds-quick-navigation ul').find('li').clone().appendTo('.hds-mobile-navigation > ul.removePosRelative');
            $('ul.removePosRelative').find('li').removeClass('active');
            $('ul.removePosRelative').find('li.search').remove();

        },
        desktopMobileFunction: function() {
            $('.globalNavWrapper > li').hover(function() {
                $('.globalNavWrapper li').removeClass('open');                
                $('.hds-megaMenuWrapper', this).stop(true, true).delay(200).slideDown(200);
                $(this).addClass('open');
            }, function() {
                $(this).removeClass('open');
                $('.hds-megaMenuWrapper', this).stop(true, true).slideUp(200);
            });
        },
        bindEvents: function() {
            $(document).on('click', '#hdsMobileNaV', function(event) {
                hds.buildShowNav.openDropDown();
                event.preventDefault();
            });
            $(document).on('click', '#closeHDSMenu', function(event) {
                hds.buildShowNav.closeDropDown();
                event.preventDefault();
            });

        }


    }
}(window, document, jQuery, hds));


(function($, window, document, undefined) {
    $.fn.doubleTapToGo = function(params) {
        if (!('ontouchstart' in window) &&
            !navigator.msMaxTouchPoints &&
            !navigator.userAgent.toLowerCase().match(/windows phone os 7/i)) return false;

        this.each(function() {
            var curItem = false;

            $(this).on('click', function(e) {
                var item = $(this);
                if (item[0] != curItem[0]) {
                    e.preventDefault();
                    curItem = item;
                }
            });

            $(document).on('click touchstart MSPointerDown', function(e) {
                var resetItem = true,
                    parents = $(e.target).parents();

                for (var i = 0; i < parents.length; i++)
                    if (parents[i] == curItem[0])
                        resetItem = false;

                if (resetItem)
                    curItem = false;
            });
        });
        return this;
    };
})(jQuery, window, document);

$(function() {
	if($('.globalNavWrapper li:has(div.hds-megaMenuWrapper)')){
		hds.buildShowNav.init();	
    	$('.globalNavWrapper li:has(div.hds-megaMenuWrapper)').doubleTapToGo();	
    }
})
