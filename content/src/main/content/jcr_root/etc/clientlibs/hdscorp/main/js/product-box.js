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
 }(window, document, jQuery, hds));


$(function() {
    hds.equalColoumns.init();
})
