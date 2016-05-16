var hds = window.hds || {};

(function(window, document, $, hds) {
    hds.careerHomeBanner = {
        init: function(options) {
            var defaults = {
                element: '#careerHeroBanner',
                elementThumbs: '#pageBar',
                closeBtn: '.close-hero'
            }
            this.options = $.extend(defaults, options);

            hds.careerHomeBanner._initCarsoul();
            hds.careerHomeBanner._openVideoOverlay();
            hds.careerHomeBanner._closeVideoOverlay();

        },
        _initCarsoul: function() {
            var carousalContainer = this.options.element;
            var thumbs = this.options.elementThumbs;
            $(thumbs).find('a').each(function(i) {
                $(this).addClass('itm' + i);
                $(this).click(function() {
                    $(carousalContainer).trigger('slideTo', [i, 0, true]);
                    return false;
                });
            });
            $(thumbs).find('a.itm0').addClass('active');
            $(carousalContainer).carouFredSel({
            	circular    : false,
                infinite    : false,
                auto : false,
                width: $(window).width(),
                height: 705,
                align: false,
                items: {
                    visible: 1,
                    width: 'variable',
                    height: 'variable'
                },
                scroll: {
                    fx: 'crossfade',
                    duration: 1000,
                    onBefore: function() {
                        var pos = $(this).triggerHandler('currentPosition');
                        $(thumbs).find('a').removeClass('active');
                        $(thumbs).find('a.itm' + pos).addClass('active');
                        var page = Math.floor(pos / 3);
                        $(thumbs).find('a').trigger('slideToPage', page);
                    }
                }

            })
        },
        _openVideoOverlay: function() {
            var carousalContainer = this.options.element;
            $(carousalContainer).find('a.playVideo').on('click', function(event) {
                $(this).parents('div.hero-content-career').hide('fast', function() {
                    $(this).parents('div.bannerSectionImage').find('.video').css('display', 'block');
                    $(carousalContainer).trigger("pause");
                });

                event.preventDefault();
            });
        },
        _closeVideoOverlay: function() {
            var carousalContainer = this.options.element;
            var closeBtn = this.options.closeBtn;
            $(closeBtn).on('click', function(event) {
                $(this).parents("div.video").hide('fast', function() {
                    $(this).parents('div.bannerSectionImage').find('div.hero-content-career').show();
                    $(carousalContainer).trigger("play", [1000, true]);
                });
                event.preventDefault();
            });

        }
    }
}(window, document, jQuery, hds));

$(function() {
    if ($("#bannerCarsoul").length>0) {
        hds.careerHomeBanner.init();
    }
})
