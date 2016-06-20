var hds = window.hds || {};

(function(window, document, $, hds) {
    hds.partnerHomeBanner = {
        init: function(options) {
            var defaults = {
                element: '#partnerHeroBanner',
                elementThumbs: '#partnerpageBar'
            }
            this.options = $.extend(defaults, options);
            hds.partnerHomeBanner._initCarsoul();
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
                height: 470,
                align: false,
                items: {
                    visible: 1,
                    width: 'variable',
                    height: 'variable'
                },
                scroll: {
                    fx: 'crossfade',
                    duration: 400,
                    onBefore: function() {
                        var pos = $(this).triggerHandler('currentPosition');
                        $(thumbs).find('a').removeClass('active');
                        $(thumbs).find('a.itm' + pos).addClass('active');
                        var page = Math.floor(pos / 3);
                        $(thumbs).find('a').trigger('slideToPage', page);
                    }
                }

            })
        }
    }
}(window, document, jQuery, hds));

$(function() {
    if ($("#partnerCarsoul").length > 0) {
        hds.partnerHomeBanner.init();
    }
})
