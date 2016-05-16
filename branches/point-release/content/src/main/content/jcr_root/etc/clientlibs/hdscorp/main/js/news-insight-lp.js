$(function() {
    /* Equal Columns Height */
    function equalColumns(htmlElements){
        $(htmlElements).removeAttr('style');
        var heights = $(htmlElements).map(function() {
            return $(this).height();
        }).get(),
        maxHeight = Math.max.apply(null, heights);
        $(htmlElements).height(maxHeight);
    }

    window.addEventListener("resize", function() {
        // Get screen size (inner/outerWidth, inner/outerHeight)
        setTimeout(function(){
            //equalColumns('.news-insight-resources .news-resources-col');
        }, 500);
    }, false);


    setTimeout(function(){
        //equalColumns('.news-insight-resources .news-resources-col');
    }, 500);
})
