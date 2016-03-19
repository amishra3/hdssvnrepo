var hds = window.hds || {};

(function(window, document, $, hds) {
    hds.buildShowNav = {
        init: function(options) {
            var defaults = {
                is_touch_device: function(){return !!('ontouchstart' in window);},
            }
            this.options = $.extend(defaults, options);
            hds.buildShowNav.buildMobileNav();
            hds.buildShowNav.desktopMobileFunction();
            hds.buildShowNav.bindEvents();
            hds.buildShowNav.mobileMenu();
        },
        openDropDown: function() {
            var $hdsMenu = $('.hds-MobileMenu');
            var $hdsBody = $('.hds-megaMenu-push');
            $hdsMenu.addClass('hds-megaMenu-open');
            $hdsBody.addClass('hds-MegaMenu-push-toleft');
            $('.globalNavWrapper').find('.spotlightNavigation').each(function() { 
               $(this).css({
                'background-image':"url("+$(this).attr('data-style')+")",
                "background-repeat": 'no-repeat',
                "background-position": '50% 50%',
                "background-size": 'cover'
                });
            });
            hds.buildShowNav.buildMobileNav();
            $('#hdsMobileNaV').addClass('navOpen');
        },
        closeDropDown: function() {
            var $hdsMenu = $('.hds-MobileMenu');
            var $hdsBody = $('.hds-megaMenu-push');
            $hdsMenu.removeClass('hds-megaMenu-open');
            $hdsBody.removeClass('hds-MegaMenu-push-toleft');
            $('.hds-mobile-navigation').empty();
             $('body').removeAttr('style'); 
        },
        buildMobileNav: function() {
            $('.hds-mobile-navigation').html(" ");
            $('.globalNavWrapper').clone().appendTo('.hds-mobile-navigation');
            var cloneTopnav = $('.hds-quick-navigation ul').find('li').clone().appendTo('.hds-mobile-navigation > ul.removePosRelative');
            $('.hds-MobileMenu ul.removePosRelative').removeClass('hidden-xs hidden-sm');
            $('.hds-MobileMenu ul.removePosRelative').find('li').removeClass('active');
            $('.hds-MobileMenu ul.removePosRelative').find('li.search').remove();

        },
        desktopMobileFunction: function() {
            $('.no-touch .globalNavWrapper > li').hover(function() {
                $('.globalNavWrapper li').removeClass('open');                
                $('.hds-megaMenuWrapper', this).stop(true, true).delay(200).slideDown(200);
                var megaMenuWrapper = $(this).find( ".hds-megaMenuWrapper" ) ;
                var bgImgUrl = $(megaMenuWrapper).attr('data-bg-url'); 
                $(megaMenuWrapper).css("background-image", "url("+bgImgUrl+")");
                $(this).addClass('open');
            }, function() {
                $(this).removeClass('open');
                $('.hds-megaMenuWrapper', this).stop(true, true).slideUp(200);
            });
        },
        mobileMenu:function(){           
            if ($(window).width() <= 768) {
                $(document).on("click",'.hds-MobileMenu .globalNavWrapper > li', function() {
                    $(this).find('a').attr('href' ,'javascript:void(0);');
                    var self=$(this);
                    var slideOut =  $(this).find('.hds-megaMenuWrapper'),
                        tease = function () { 
                            slideOut.slideDown(300);
                            slideOut.delay(5000).slideUp(500);
                        };

                    $('.hds-megaMenuWrapper').clearQueue().slideUp("slow",function(){
                        $('.globalNavWrapper > li').removeClass('open');
                    });
                        if (slideOut.is(":hidden")) {
                            slideOut.clearQueue().slideDown("slow",function(){
                                self.addClass('open');
                            });
                        } else {
                              slideOut.clearQueue().slideUp("slow",function(){
                                self.removeClass('open');
                            });
                        }

                        return false;
                })
            }
        },
        checkOrientations:function(){
            hds.buildShowNav.closeDropDown();
        },
        bindEvents: function() {
            $(document).on('click', '#hdsMobileNaV', function(event) {
                if(!$(this).hasClass('navOpen')){
                hds.buildShowNav.openDropDown();
                }else{
                $('#closeHDSMenu').trigger('click');
                    $(this).removeClass('navOpen')
                }
                event.preventDefault();
            });
            $(document).on('click', '#closeHDSMenu', function(event) {
                hds.buildShowNav.closeDropDown();
                event.preventDefault();
            });
            window.addEventListener("resize", function() {
                 hds.buildShowNav.checkOrientations();
            }, false);

        }
    }
}(window, document, jQuery, hds));

$(function() {
    if($('.globalNavWrapper li:has(div.hds-megaMenuWrapper)')){
        hds.buildShowNav.init();    

    }
})
