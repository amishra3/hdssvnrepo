var player, modVP, modExp, currentVideo,brightcove;

function onTemplateLoad(experienceID) {
    player = brightcove.getExperience(experienceID);
    captionsModule = player.getModule(brightcove.api.modules.APIModules.CAPTIONS);
    captionsModule.addEventListener(brightcove.api.events.CaptionsEvent.DFXP_LOAD_SUCCESS, onDFXPLoadSuccess);
    captionsModule.addEventListener(brightcove.api.events.CaptionsEvent.DFXP_LOAD_ERROR, onDFXPLoadError);
    captionsModule.setLanguage(gObj[experienceID].language);
    captionsModule.loadDFXP(gObj[experienceID].href, gObj[experienceID].id);
    modVP = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
    modExp.addEventListener(brightcove.api.events.ExperienceEvent.TEMPLATE_READY, onTemplateReady);
}

function onTemplateReady(event) {
    modVP.addEventListener(brightcove.api.events.MediaEvent.BEGIN, onMediaEventFired);
    modExp = player.getModule(brightcove.api.modules.APIModules.EXPERIENCE);
    
    modVP.addEventListener(brightcove.api.events.MediaEvent.PLAY, onPlay);
    modVP.addEventListener(brightcove.api.events.MediaEvent.STOP, onStop);
    modVP.addEventListener(brightcove.api.events.MediaEvent.PROGRESS, onProgress);
}

function onMediaEventFired(evt) {
    onVideoPlayBeginCallBack(modVP.getCurrentVideo(onVideoPlayBeginCallBack));
}

function onPlay(evt){
	mediaLength=evt.duration;  //Required video duration
	mediaOffset=Math.floor(evt.position); //Required video position
	mediaID=(evt.media.id).toString();  //Required video id
	mediaFriendly=evt.media.displayName; //Required video title
	mediaName=mediaID+":"+mediaFriendly; //Required Format video name
	//mediaRefID=evt.media.referenceId;  //Optional reference id
	//mediaPlayerType=player.type; //Optional player type
	//mediaTagsArray=evt.media.tags; //Optional tags
	//or (i=0;i<mediaTagsArray.length;i++) {mediaTagsArray2[i]=mediaTagsArray[i]['name'];}
	/* Check for start of video */
		if (mediaOffset==0){
			/* These data points are optional. If using SC14, change context data variables to hard coded variable names and change trackVars above. */
			//s.contextData['bc_tags']=mediaTagsArray2.toString(); //Optional returns list of tags for current video.  Flash only.
			//s.contextData['bc_refid']=mediaRefID; //Optional returns reference id
			//s.contextData['bc_player']=mediaPlayerName; //Optional player name is currently hard coded.  Will be dynamic in later releases.
			//s.contextData['bc_playertype']=mediaPlayerType; //Optional returns flash or html
			s.Media.open(mediaName,mediaLength,mediaPlayerName);
			s.Media.play(mediaName,mediaOffset);}
		else{
			s.Media.play(mediaName,mediaOffset);
		}
}

function onStop(evt){
	mediaOffset=Math.floor(evt.position);
	if (mediaOffset==mediaLength) {
		s.Media.stop(mediaName,mediaOffset);
		s.Media.close(mediaName);}else{
		s.Media.stop(mediaName,mediaOffset);
	}
}

function onProgress(evt){
	s.Media.monitor = function (s,media) {
		if (media.event == "MILESTONE") {
		/* Use to set additional data points during milestone calls */
		//s.Media.track(media.name); Uncomment if setting extra milestone data.
		}
	}
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

        bcUrl = protocol+'//sadmin.brightcove.com/js/BrightcoveExperiences.js';
       // bcApi = protocol+'//sadmin.brightcove.com/js/APIModules_all.js';
            
        /*if (!window.brightcove) {
            $('#loading').hide();
            $.getScript(bcUrl, function(data, textStatus, jqxhr) {
                console.log('Brightcove loaded');
            });
        }*/

        /*$.getScript(bcApi, function(data, textStatus, jqxhr) {

            if (protocol == 'https') {
                var bcParam = document.createElement('param');
                bcParam.name = 'secureConnections';
                bcParam.value = 'true';
                $('.BrightcoveExperience').append(bcParam);
            }
            if (window.brightcove) {
                window.setTimeout(function() {
                    window.brightcove.createExperiences();
                }, 301);
            } else {
                console.log('Brightcove not loaded');
            }
        });*/
    }, 251);
}
var gblPlayingVideo;
$(document).on('click', 'a.l-overlay', function(e) {
    e.preventDefault();
    $('#loading').hide();
    videobox = new HDS.Lightbox();
    var $this = $(this);
    var videoID = $this.attr("data-target-content");
    videoID = videoID.replace("rl","");
    //hds.resourceLib._openvideooverlayById(videoID);
    var $PreObject = $this.find('.overlay-content');
    var object = $PreObject.find('object').parent().addClass('video-div');
    gblPlayingVideo = object.html();
    object.html('');    
    videobox.setContent('')
    vidObjMkup = '<object id="myExperience'+videoID+'" class="BrightcoveExperience">  <param name="bgcolor" value="#FFFFFF" />  <param name="width" value="920" />  <param name="height" value="517" />  <param name="playerID" value="'+videoID+'" /><param name="playerKey" value="AQ~~,AAADnJnNnnk~,ltuihYvDjRKL7D7fwmzXgyXNR-vMq9ot" />  <param name="isVid" value="true" />  <param name="isUI" value="true" />  <param name="dynamicStreaming" value="true" />    <param name="@videoPlayer" value="'+videoID+'" />  <param name="secureConnections" value="true" /><param name="secureHTMLConnections" value="true" /><param name="includeAPI" value="true" /><param name="templateLoadHandler" value="myTemplateLoaded" /></object>';

    videobox.setContent(vidObjMkup);    
    videobox.show();
    initiateVideo();
     brightcove.createExperiences();

    /* WA Video Tracking Code */
    var pPageName = window.location.href;
	var vidId = 'Video Id: ' + videoID;
	videoTracking(vidId, pPageName);
});

$(document).on('click', '.close-overlay', function(event) {

    $('.video-div').html(gblPlayingVideo);
    $('.video-div').removeClass("video-div");
    $('.innerContent').html('');
    gblPlayingVideo = null;
	
});

$(document).keyup(function(e) { //play videos properly when closed by esc key
    var overlay = $('.hds-overlay');
    if (e.keyCode == 27 && typeof searchPlayingVideo  !== "undefined") {
        $('.video-div').html(searchPlayingVideo);
        $('.video-div').removeClass('video-div');
        $('.innerContent').html('');
        gblPlayingVideo = null;
    }
});