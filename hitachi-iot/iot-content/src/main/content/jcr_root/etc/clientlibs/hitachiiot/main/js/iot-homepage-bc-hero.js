var player;
var video, content, exp;

function onTemplateLoaded(pPlayer) {
	try {
		player = bcPlayer.getPlayer(pPlayer);
	
		video 	= player.getModule(APIModules.VIDEO_PLAYER);
		exp 	= player.getModule(APIModules.EXPERIENCE);
		video.setVolume(0);
		exp.addEventListener(BCExperienceEvent.CONTENT_LOAD, onContentLoad);
//		exp.addEventListener(BCExperienceEvent.TEMPLATE_READY, onTemplateReady);
		video.addEventListener(BCVideoEvent.VOLUME_CHANGE, onVolumeChange);
		video.addEventListener(BCVideoEvent.VIDEO_COMPLETE, onVideoComplete);
	}
	catch(err) {
	    console.log(err.message);
	}
	
}

function onContentLoad(e) { trace(e.type); }


function onTemplateReady(e) {
	// trace(e.type);
	// Changes volume upon player load, more specifically, templateReady
	video.setVolume(0);
}

// Changes volume based on external event
function changeVolume(n) {
	video.setVolume(n);
	video.setVolume(0);
}

function onVolumeChange(e) {
	video.seek(142);
}

function onVideoComplete(e) {
	video.play();
}


//$(window).on("scroll", function() {
//	if(video){
//	    $('#bgvid').each(function() {
//	        if (isScrolledIntoView(this)) {
//	        	video.play();
//	        } else {
//	        	video.pause();
//	        }
//	    });
//	}
//});
//
