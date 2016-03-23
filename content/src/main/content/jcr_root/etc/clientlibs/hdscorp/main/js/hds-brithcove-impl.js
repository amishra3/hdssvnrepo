var player, modVP, currentVideo;

function onTemplateLoad(experienceID) {

    player = brightcove.getExperience(experienceID);
    captionsModule = player.getModule(brightcove.api.modules.APIModules.CAPTIONS);
    captionsModule.addEventListener(brightcove.api.events.CaptionsEvent.DFXP_LOAD_SUCCESS, onDFXPLoadSuccess);
    captionsModule.addEventListener(brightcove.api.events.CaptionsEvent.DFXP_LOAD_ERROR, onDFXPLoadError);
    captionsModule.setLanguage(gObj[experienceID].language);
    captionsModule.loadDFXP(gObj[experienceID].href, gObj[experienceID].id);
    modVP = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
}

function onTemplateReady(event) {
    modVP.addEventListener(brightcove.api.events.MediaEvent.BEGIN, onMediaEventFired);
}

function onMediaEventFired(evt) {
    onVideoPlayBeginCallBack(modVP.getCurrentVideo(onVideoPlayBeginCallBack));
}

function onVideoPlayBeginCallBack(currentVideo) {
    var cid = 'myExperience' + currentVideo.id;
    captionsModule.loadDFXP(gObj[cid].href);
}

function initiateVideo() {
    window.setTimeout(function() {
        var protocol, bcApi;
        $('#loading').hide();
        try {
            var pUrl = jQuery.url();
            protocol = pUrl.attr('protocol');
        } catch (e) {
            protocol = window.location.protocol;
        }

        if (protocol == 'https') {
            bcUrl = 'https://sadmin.brightcove.com/js/BrightcoveExperiences.js';
            bcApi = 'https://sadmin.brightcove.com/js/APIModules_all.js';
        } else {
            bcUrl = 'https://sadmin.brightcove.com/js/BrightcoveExperiences.js';
            bcApi = 'https://sadmin.brightcove.com/js/APIModules_all.js';
        }
        if (!window.brightcove) {
            $('#loading').hide();
            $.getScript(bcUrl, function(data, textStatus, jqxhr) {
                console.log('Brightcove loaded');
            });
        }

        $.getScript(bcApi, function(data, textStatus, jqxhr) {

            if (protocol == 'https') {
                var bcParam = document.createElement('param');
                bcParam.name = 'secureConnections';
                bcParam.value = 'true';
                $('.BrightcoveExperience').append(bcParam);
            }
            if (window.brightcove) {
                window.setTimeout(function() {
                    window.brightcove.createExperiences()
                }, 301);
            } else {
                console.log('Brightcove not loaded');
            }
        });
    }, 251);
}
var gblPlayingVideo;
$(document).on('click', 'a.l-overlay', function(e) {
    $('#loading').hide();
    videobox = new HDS.Lightbox();
    var $this = $(this);
    var $PreObject = $this.find('.overlay-content');
    var object = $PreObject.find('object').parent().addClass('video-div');
    gblPlayingVideo = object.html();
    object.html('');    
    videobox.setContent('')
    videobox.setContent($('#' + $(this).data('target-content')).html());    
    videobox.show();
    initiateVideo();
    e.preventDefault();
});
$(document).on('click', '.close-overlay', function(event) {

    $('.video-div').html(gblPlayingVideo);
    $('.video-div').removeClass("video-div");
    $('.innerContent').html('');
    gblPlayingVideo = null;
});
$(document).keyup(function(e) { //play videos properly when closed by esc key
    var overlay = $('.hds-overlay');
    if (e.keyCode == 27) {
        $('.video-div').html(searchPlayingVideo);
        $('.video-div').removeClass('video-div');
        $('.innerContent').html('');
        gblPlayingVideo = null;
    }
});