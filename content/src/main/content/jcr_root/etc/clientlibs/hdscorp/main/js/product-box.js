var hds = window.hds || {};

(function(window, document, $, hds) {
    hds.equalColoumns = {
        init: function() {
            var heights = $(".panel-box").map(function() {
                    return $(this).height();
                }).get(),
                maxHeight = Math.max.apply(null, heights);
            $(".panel-box").height(maxHeight);
        }
    }
    hds.manageTabs = {
        init: function() {
            hds.manageTabs.manageTopTabs();
            hds.manageTabs.manageAlphaSorting();
        },
        manageTopTabs: function() {
            $('[data-tab]').on('click', function(e) {
                var tab_id = $(this).attr('data-tab');
                $('[data-tab]').removeClass('current');
                $('.tab-content').removeClass('current');
                $(this).addClass('current');
                $("#" + tab_id).addClass('current');
                e.preventDefault()
            })
        },
        manageAlphaSorting: function() {
            $('.headerSort li a').click(function() {
                var ourClass = $(this).attr('data-cat');
                $('.headerSort li a').removeClass('current');
                $(this).addClass('current');
                if (ourClass == 'all') {
                    $('.listContentsorted').children('li').show();
                } else {
                    $('.listContentsorted').children('li:not(.' + ourClass + ')').hide();
                    $('.listContentsorted').children('li.' + ourClass).show();
                }
                return false;
            });
        }
    }

}(window, document, jQuery, hds));


$(function() {
    hds.equalColoumns.init();
    hds.manageTabs.init();
})
