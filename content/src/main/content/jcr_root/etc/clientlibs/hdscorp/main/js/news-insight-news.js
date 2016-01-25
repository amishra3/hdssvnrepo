var hds = window.hds || {};
(function(window, document, $, hds) {
    hds.loadMoreNews = {
        init: function() {
			hds.loadMoreNews.loadSubContent();
        },        
        loadSubContent: function() {
            var sizeCatagoryList = $(".hds-news-section .content-panel").size(),
            x = 3;
            $(".hds-news-section .content-panel").hide();            
            $('.hds-news-section .content-panel:lt(' + x + ')').show();
            $(document).on('click', '#loadMoreBtn', function() {
                x = (x + 2 <= sizeCatagoryList) ? x + 2 : sizeCatagoryList;
                $('.hds-news-section .content-panel:lt(' + x + ')').show();
                if (x == sizeCatagoryList) {
                    $('#loadMoreBtn').hide();
                }
            });
        },
    }
}(window, document, jQuery, hds));

$(function() {
    hds.loadMoreNews.init();
})
