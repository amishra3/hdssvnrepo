var hds = window.hds || {};

(function(window, document, $, hds) {
    hds.loadDataFiltersLegal = {
        init: function() {
            hds.loadDataFiltersLegal.loadCatagoryContentLegal();
            hds.loadDataFiltersLegal.checkForNestedUl();
            hds.loadDataFiltersLegal.subListTabLegal();
            hds.loadDataFiltersLegal.bindEventsOnResizeLegal();
        },
        checkForNestedUl: function() {

            var allPanels = $('.leftsidelisting li').has('ul');
            if (!allPanels) {
                $(this).find('span').remove();
            }
        },
        loadCatagoryContentLegal: function(url) {
            var getURL = "";
            if (typeof url === 'undefined') {
                var firstLegal = $('.leftsidelisting > ul > li').eq(0);
                var firstLegalHas = $('.leftsidelisting > ul > li').eq(0).has('ul');
                if (firstLegal) {
                    if (firstLegalHas) {
                        $('.leftsidelisting > ul > li > ul > li').eq('0').addClass('active');
                        getURL = $('.leftsidelisting > ul > li > ul > li').eq('0').find('a').attr("data-href");
                    }
                }

                $('.leftsidelisting > ul > li').eq(0).addClass('active');
            } else {
                getURL = url;
                $("#loadCatagoryContent").removeAttr('data-content');
            }

            $("#loadCatagoryContent").html(" ").load(getURL + " .leagaltext", function() {
                hds.loadDataFiltersLegal.bindHTMLLoad();
            });
        },
        bindHTMLLoad: function() {
            if ($(window).width() < 991) {
                $('.leftsidelisting li').each(function() {
                    if ($(this).hasClass('active')) {
                        $(this).find('.MobileHolderWrapper').append($('#legalContentCatagory').html());
                        $('#legalContentCatagory').empty();
                    }
                });
            } else {
                $('.leftsidelisting li').each(function() {
                    if ($(this).hasClass('active')) {
                        $('#legalContentCatagory').append($(this).find('.MobileHolderWrapper').html());
                        $('.MobileHolderWrapper').empty();
                    }
                })
            }
        },

        subListTabLegal: function() {
            $(document).on('click', '.leftsidelisting li a', function() {
                var allPanels = $(this).parents('li').has('ul');
                var allPanels2 = $('.leftsidelisting li ul');
                hds.loadDataFiltersLegal.setHTMLContainerLegal();
                if (!$(this).parents('li').hasClass('active') && allPanels) {

                    if ($(this).parent('li').index() === 0) {
                        $('.leftsidelisting li').removeClass('active');
                        var content = $(this).find('ul li').eq(0).find('a').attr('data-href');
                        hds.loadDataFiltersLegal.loadCatagoryContentLegal(content);
                        $(this).parents('li').find('ul li').eq(0).addClass('active')
                        $(this).parent().addClass('active');
                        allPanels2.removeAttr('style');
                    } else {
                        $('.leftsidelisting li').removeClass('active');
                        var content = $(this).attr('data-href');
                        hds.loadDataFiltersLegal.loadCatagoryContentLegal(content);
                        $(this).parent().addClass('active');
                        allPanels2.removeAttr('style');
                    }
                } else if (!$(this).parents('li').hasClass('active') && !allPanels) {
                    allPanels2.slideUp();
                    var content = $(this).attr('data-href');
                    hds.loadDataFiltersLegal.loadCatagoryContentLegal(content);
                    $(this).addClass('active');
                } else if ($(this).parents('li').hasClass('active') && allPanels.length > 0) {
                    allPanels2.removeAttr('style');
                    if (!$(this).parent('li').hasClass('active')) {
                        $('.leftsidelisting li ul li').removeClass('active');
                        var content = $(this).attr('data-href');
                        hds.loadDataFiltersLegal.loadCatagoryContentLegal(content);
                        $(this).parent('li').addClass('active');
                    } else {
                        return false;
                    }

                } else {
                    return false;
                }
            });
        },
        bindEventsOnResizeLegal: function() {
            $(window).resize(function() {
                hds.loadDataFiltersLegal.bindHTMLLoad();
            });
        },
        setHTMLContainerLegal: function() {
            if ($(window).width() < 991) {
                $('.leftsidelisting li').each(function() {
                    if ($.trim($(this).find('.MobileHolderWrapper').html())) {
                        $('#legalContentCatagory').append($(this).find('.MobileHolderWrapper').html());
                        $(this).find('.MobileHolderWrapper').empty();
                    }
                });
            }
        }
    }

}(window, document, jQuery, hds));

$(function() {
    if ($('#legal').length > 0) {
        hds.loadDataFiltersLegal.init();
    }
})