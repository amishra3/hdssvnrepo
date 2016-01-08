var hds = window.hds || {};

(function(window, document, $, hds) {

    hds.loadDataFilters = {
        init: function() {
            hds.loadDataFilters.loadCatagoryContent();
            hds.loadDataFilters.subListTab();
            hds.loadDataFilters.filterSearchResults();
            hds.loadDataFilters.bindEventsOnResize();
        },
        loadCatagoryContent: function(url) {
            var getURL = "";
            if (typeof url === 'undefined') {
                getURL = $('.product-listing > ul > li').eq(0).find("a").attr("data-href");
                $('.product-listing > ul > li').eq(0).addClass('active');
                $("#loadCatagoryContent").attr('data-content', 'all');
            } else {
                getURL = url;
                $("#loadCatagoryContent").removeAttr('data-content');
            }
            $("#loadCatagoryContent").html(" ").load(getURL, function() {
                hds.loadDataFilters.loadSubContent();
                hds.loadDataFilters.bindHTMLLoad();
                $('.category-heading > h2').html(" ").html($('.product-listing > ul > li.active').find('a').text());
                $('#loadMoreBtn').show();
            });

        },
        bindHTMLLoad: function() {
            if ($(window).width() < 991) {
                $('.product-listing li').each(function() {
                    if ($(this).hasClass('active') && $(this).index() > 1) {
                        $(this).find('.MobileHolderWrapper').append($('#contentCatagory').html());
                        $('#contentCatagory').empty();
                    }
                });
            } else {
                $('.product-listing li').each(function() {
                    if ($(this).hasClass('active') && $(this).index() > 1) {
                        $('#contentCatagory').append($(this).find('.MobileHolderWrapper').html());
                        $('.MobileHolderWrapper').empty();
                    }
                })
            }

        },
        bindEventsOnResize: function() {
            $(window).resize(function() {
                hds.loadDataFilters.bindHTMLLoad();
            });
        },
        setHTMLContainer: function() {
            if ($(window).width() < 991) {
                $('.product-listing li').each(function() {
                    if ($.trim($(this).find('.MobileHolderWrapper').html())) {
                        $('#contentCatagory').append($(this).find('.MobileHolderWrapper').html());
                        $(this).find('.MobileHolderWrapper').empty();
                    }
                });
            }
        },
        subListTab: function() {
            var allPanels = $('.product-listing li ul').hide();
            $('.product-listing li a').on('click', function() {
                hds.loadDataFilters.setHTMLContainer();
                if (!$(this).parent().hasClass('active')) {
                    $('.product-listing li').removeClass('active');
                    allPanels.slideUp();
                    var content = $(this).attr('data-href');
                    hds.loadDataFilters.loadCatagoryContent(content);
                    if ($(this).parent().index() == 0) {
                        $("#loadCatagoryContent").attr('data-content', 'all');
                    }
                    $('.icon-accordion-opened').css('display', 'none');
                    $('.icon-accordion-closed').css('display', 'inline-block');
                    $(this).parent().addClass('active');
                    $('.filters').removeAttr('checked', 'false');
                    if ($(this).parent().has('ul').length) {
                        $(this).parent().find('ul').slideDown();
                        $(this).parent().find('.icon-accordion-opened').css('display', 'inline-block');
                        $(this).parent().find('.icon-accordion-closed').css('display', 'none');
                    }
                } else {
                    return false;
                }
            });
        },
        loadSubContent: function() {
            sizeCatagoryList = $(".category-products-listing .product").size();
            x = 3;
            $('.category-products-listing .product:lt(' + x + ')').show();
            $(document).delegate('#loadMoreBtn', 'click', function() {
                x = (x + 5 <= sizeCatagoryList) ? x + 5 : sizeCatagoryList;
                $('.category-products-listing .product:lt(' + x + ')').show();
                if (x == sizeCatagoryList) {
                    $('#loadMoreBtn').hide();
                }
            });

        },
        filterSearchResults: function() {
            $(document).on('change', '.product-listing input', function() {
                var $allCheckedFilters = $('.product-listing input.filters:checked');
                var checkedValues = [];
                $allCheckedFilters.each(function(index, element) {
                    checkedValues.push($(this).val());
                });
                var classNameStr = checkedValues.join('.');
                $(".category-products-listing .product").hide();
                $('.category-products-listing').children('div.' + classNameStr).show();
                $('#loadMoreBtn').hide();
            });

        },
        bindClickEvents: function() {

        }
    }

}(window, document, jQuery, hds));
(function($) {    hds.loadDataFilters.init();})(jQuery);
