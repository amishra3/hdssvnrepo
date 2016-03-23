
window.HDS = {
    init: function() {
        var self = this;
        if ($('.l-overlay').length) {
            self.initLightboxes();
        }
    },
    initLightboxes: function() {
        var self = this,
            $triggers = $('.l-overlay');
        $triggers.each(function(index) {
            var videobox;
               

            var listLen = $('param[value=onTemplateReadyPlayList]').length,
                minHeight = 450;
            if (listLen) minHeight = 550;
            videobox = new HDS.Lightbox();
            console.log($('#' + $(this).data('target-content')).html());
            videobox.setContent('')
                        videobox.setContent($('#' + $(this).data('target-content')).html());
                        videobox.setContent('')
            videobox.minHeight(minHeight); //Provide min height for window as video take some time to load
            $(document).on('click','.l-overlay' ,function(event) {
                event.preventDefault();
                videobox.show();
            });
        });
    }
};


$(function() {
    //HDS.init();
})