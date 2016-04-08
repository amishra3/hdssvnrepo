var hds = window.hds || {};

(function(window, document, $, hds) {
    hds.buildShowNav = {
        init: function(options) {
            var defaults = {
                is_touch_device: function(){return !!('ontouchstart' in window);},
            }
            this.options = $.extend(defaults, options);
            hds.buildShowNav.checkLocale();
            hds.buildShowNav.linksExchange();
            hds.buildShowNav.buildMobileNav();
            hds.buildShowNav.desktopMobileFunction();            
            hds.buildShowNav.bindEvents();
            hds.buildShowNav.mobileMenu();            
        },
        checkLocale:function(){        	
        	var pageUrl = window.location.href;
        	var locale = hds.buildShowNav.matchLocale(pageUrl);
        },
        matchLocale : function(pageUrl){
        	if(pageUrl){
        		if(/(en_us|en-us)/.test(pageUrl)){        			
        			$('a#showGeo').find('span.labelText').after('U.S.A.');
        		}
        	}        	
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
            $('a#showGeo').parent('li').removeClass('open');
            $('a#showGeo').removeClass("active");
            $('.hds_globalNav_geo').hide();            
        },
        buildMobileNav: function() {
            $('.hds-mobile-navigation').html(" ");
            var geoWebOverLay= $('.hds_globalNav_geo').clone();
            $('.globalNavWrapper').clone().appendTo('.hds-mobile-navigation');            
            var cloneTopnav = $('.hds-quick-navigation ul').find('li').clone().appendTo('.hds-mobile-navigation > ul.removePosRelative');
            $('.hds-MobileMenu ul.removePosRelative').removeClass('hidden-xs hidden-sm');
            $('.hds-MobileMenu ul.removePosRelative').find('li').removeClass('active');
            $('.hds-mobile-navigation ul > li').find('a#showGeo').parent('li').append(geoWebOverLay);
            $('.hds-MobileMenu ul.removePosRelative').find('li.search').remove();
        },
        desktopMobileFunction: function() {
            $('.globalNavWrapper > li').hover(function() {
                $('.globalNavWrapper li').removeClass('open');                
                $('.hds-megaMenuWrapper', this).stop(true, true).delay(200).slideDown(100);
                var megaMenuWrapper = $(this).find( ".hds-megaMenuWrapper");
                var bgImgUrl = $(megaMenuWrapper).attr('data-bg-url'); 
                $(megaMenuWrapper).css("background-image", "url("+bgImgUrl+")");
                $(this).addClass('open');
            }, function() {
                $(this).removeClass('open');
                $('.hds-megaMenuWrapper', this).stop(true, true).slideUp(200);
            });
        },
        geoSelectorShow:function(arg){        	
                var that=arg;
        		var slideOut =  $(that).parents('.header-container, .hds-mobile-navigation').find('.hds_globalNav_geo');
        		if (slideOut.is(":hidden")) {
        			slideOut.clearQueue().slideDown(300,function(){
        			 $('a#showGeo').addClass("active");
        			 $('a#showGeo').parent('li').addClass('open');
                     });
        		 }    
        	
        },
        closeGeoSelector:function(arg){
        	var that=arg;
        		 var slideOut =  $(that).parents('.header-container, .hds-mobile-navigation').find('.hds_globalNav_geo');
        		 if (slideOut.is(":visible")) {
        			 slideOut.clearQueue().slideUp(200,function(){
        				 $('a#showGeo').parent('li').removeClass('open');
        				 $('a#showGeo').removeClass("active");
                     });
        		 }        	
        },
        linksExchange:function(){
        	$('.hds-main-navigation > ul > li> a').each(function(){
        		var href=$(this).attr('href');
				$(this).attr('class', 'hds-default-nav-anchor');
        		var dataHref= $(this).attr('data-href',href);
        		$(this).parent('li').find('.megamenu-heading').find('h2 > a').attr('href',href);
        		  if ($(window).width() <= 768) {        		
        		$(this).attr('href','javascript:void(0);');        		
        		  }else{
        			  var getPageUrl= $(this).data('href');
        			  $(this).attr('href',getPageUrl);
        		  }
        	});
        },
        mobileMenu:function(){           
            if ($(window).width() <= 768) {
            	$(document).on("click",'.hds-MobileMenu .globalNavWrapper > li', function() {
                    var self=$(this);
                    var offsetFirst=$($('.hds-MobileMenu .globalNavWrapper > li:eq(0)')).offset().top;
                    var clickedIndexHeight= $(this).outerHeight();
                    var clickedIndex= $(this).index();
                    var finalIndex=offsetFirst+(clickedIndexHeight*clickedIndex);
                    
                    var slideOut =  $(this).find('.hds-megaMenuWrapper,.hds_globalNav_geo'),
                        tease = function () { 
                            slideOut.slideDown(300);
                            slideOut.delay(5000).slideUp(500);
                        };
                    $('.hds-megaMenuWrapper, .hds_globalNav_geo').clearQueue().slideUp("slow",function(){
                        $('.globalNavWrapper > li').removeClass('open');
                    });
                        if (slideOut.is(":hidden")) {
                            slideOut.clearQueue().slideDown("slow",function(){
                                self.addClass('open');
                            });
                        } else {
                              slideOut.clearQueue().slideUp("slow",function(){
                                self.removeClass('open');                                                	
                                  	 $("body, html").animate({ 
                                           scrollTop: finalIndex                             
                                       }, 600);
                                  
                            });
                        }
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
            });
            $(document).on('click', '#closeHDSMenu', function(event) {
				$('#hdsMobileNaV').removeClass('navOpen');
                hds.buildShowNav.closeDropDown();
                event.preventDefault();
            });
            window.addEventListener("orientationchange", function() {            	 
                hds.buildShowNav.checkOrientations(); 
            }, false);
            
            $(document).on('click','.geo_close_btn', function() {
        		hds.buildShowNav.closeGeoSelector($(this));
        	});			
			
			$(document).on('click','a#showGeo', function() { 
				if ($(window).width() > 768) {
				hds.buildShowNav.geoSelectorShow($(this));
				}
			});
			
			$(document).on('click','.hds-megaMenu a[rel=iframemodal]',function(){
                hds.buildShowNav.closeDropDown();
            })
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

            $('.globalNavWrapper li.hds-default-nav > a.hds-default-nav-anchor').on('click', function(e) {
				//$(this).on('click', function(e) {
					if(!$(this).hasClass("oneclick")){
						$(this).addClass('oneclick');
						e.preventDefault();
					}else{
						return true
					}
					
					/*var item = $(this);
					if (item[0] != curItem[0]) {
						
						//if (item[0] != curItem[0] && $(this).hasClass("hds-default-nav-anchor")) {
						e.preventDefault();
						curItem = item;
					}*/
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
    }
    hds.buildShowNav.checkOrientations();
   // $('.globalNavWrapper li.hds-default-nav:has(div.hds-megaMenuWrapper)').doubleTapToGo();
    $('.globalNavWrapper li.hds-default-nav').doubleTapToGo();
})
