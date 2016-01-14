var hds = window.hds || {};

(function(window, document, $, hds) {
    hds.loadDataFilters = {
        init: function() {
            hds.loadDataFilters.loadCatagoryContent();
            hds.loadDataFilters.subListTab();
            hds.loadDataFilters.filterSearchResults();
            hds.loadDataFilters.bindEventsOnResize();
            hds.loadDataFilters.manageTopTabs();
            hds.loadDataFilters.manageAlphaSorting();
            hds.loadDataFilters.searchFilters();
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
                hds.loadDataFilters.udatePageCount();
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
                    $('#searchFilter').val('');
                    $('.toggleLinks a').removeClass('current');
                    $('.toggleLinks a:eq(0)').addClass('current');
                    $('.headerSort').hide();
                     $('.headerSort li a').removeClass('current');
                     $('.headerSort li a:eq(0)').addClass('current');
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
                hds.loadDataFilters.udatePageCount();
                if (x == sizeCatagoryList) {
                    $('#loadMoreBtn').hide();
                }
            });



        },
        udatePageCount: function() {
            var totalCount = $('.current .product').length;
            var actualCount = $('.current .product:visible').length;
            $("#TotalCount").html(' ').html(totalCount);
            $("#actualCount").html(' ').html(actualCount);
        },
        filterSearchResults: function() {
            $(document).on('change', '.product-listing input', function() {




                $('#searchFilter').val('');
                $('.toggleLinks a').removeClass('current');
                $('.toggleLinks a:eq(0)').addClass('current');
                $('.headerSort li a').removeClass('current');
                $('.headerSort li a:eq(0)').addClass('current');
                $('.headerSort').hide();
                $('.product').removeClass('alphasort');
                $('.countProducts').show();
                var $allCheckedFilters = $('.product-listing input.filters').filter(':checked');
                var checkedVals = $.map($allCheckedFilters, function(el) {
                    return el.value
                });
                var $results = $(".category-products-listing").find('.product');
                /*$results.hide().filter(function() {
                    var cats = $(this).data('category').split(',');
                    var checkMatches = $.grep(checkedVals, function(val) {
                        return $.inArray(val, cats) > -1;
                    });
                    return checkMatches.length === checkedVals.length;
                }).show();*/
hds.loadDataFilters.updateSearchFilters(null, checkedVals.toString()); 

                $('#loadMoreBtn').hide();
                $('.no-matched-result').hide();
                $('.result-product .navLinks').show();
                hds.loadDataFilters.udatePageCount();
                if ($(".product:visible").length === 0) {
                    $('.result-product .navLinks,.headerSort').hide();
                    $('#loadCatagoryContent').find('.no-matched-result').remove();
                    $('#loadCatagoryContent').append('<div class="no-matched-result" style="padding: 50px 0; text-align: center;">No results found.</div>');
                }



            });



        },
        manageTopTabs: function() {
            $(document).on('click', '[data-tab]', function(e) {
                var tab_id = $(this).attr('data-tab');
                $('[data-tab]').removeClass('current');
                $(this).addClass('current');
                $("#" + tab_id).addClass('current');
                if ($(this).attr('data-tab') === "tab-1") {
                    $('.countProducts').show();
                    $('.product').removeClass('alphasort');
                    $('.headerSort').hide();
                } else {
                    $('.countProducts').hide();
                    $('.product').addClass('alphasort');
                    $('.headerSort').show();
                    if ($('.product-listing input.filters').filter(':checked').length <= 0) {
                        $(".product").show()
                    }
                }
                $('#loadMoreBtn').hide();
                e.preventDefault();
            })
        },
        manageAlphaSorting: function() {
            $('.headerSort li a').click(function() {
                var ourClass = $(this).attr('data-cat');
                $('.headerSort li a').removeClass('current');
                $(this).addClass('current');
                var $allCheckedFilters = $('.product-listing input.filters').filter(':checked');
                var checkedVals = $.map($allCheckedFilters, function(el) {
                    return el.value
                });
                if (ourClass == 'all') {
                    hds.loadDataFilters.updateSearchFilters(null, checkedVals.toString());                    
                    return false;
                } else {
                    hds.loadDataFilters.updateSearchFilters(ourClass, checkedVals.toString());
                }
                return false;
            });
        },
        searchFilters: function() {
            jQuery.expr[':'].Contains = function(a, i, m) {
                return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
            };
            $(document).on('keyup change', '#searchFilter', function(event) {



                var getSearchFilter = $(this).val();
                if (getSearchFilter) {
                    $('.product').show();
                    $('#loadMoreBtn').hide();
                    $('.product').find(".filterText:not(:Contains(" + getSearchFilter + "))").parent().parent().slideUp();
                    $('.product').find(".filterText:Contains(" + getSearchFilter + ")").parent().parent().slideDown();
                    setTimeout(function() {
                        hds.loadDataFilters.udatePageCount();
                    }, 500)
                } else {
                    $('.product').slideDown();
                }
                event.preventDefault();
            });
        },
        updateSearchFilters: function(parm1, parm2) {
            var filters = {
                alpha: parm1,
                category: parm2
            };
            $('.product').hide().filter(function() {
                var self = $(this),
                    result = true; // not guilty until proven guilty

                Object.keys(filters).forEach(function(filter) {
                    if (filters[filter] && (filters[filter] != 'all')) {
                        result = result && filters[filter] === self.data(filter);                      
                    }
                });
                return result;
            }).show();
        }
    }

}(window, document, jQuery, hds));

$(function() {
    hds.loadDataFilters.init();
})
