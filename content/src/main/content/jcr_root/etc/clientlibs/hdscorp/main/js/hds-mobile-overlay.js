
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
            var lightbox,
                videobox,
                images;

            var listLen = $('param[value=onTemplateReadyPlayList]').length,
                minHeight = 450;
            if (listLen) minHeight = 550;
            videobox = new HDS.Lightbox();
            videobox.setContent($('#' + $(this).data('target-content')).html());
            videobox.minHeight(minHeight); //Provide min height for window as video take some time to load
            $(document).on('click','.l-overlay' ,function(event) {
                event.preventDefault();
                videobox.show();
            });
        });
    }
};


$(function() {
    HDS.init();
})