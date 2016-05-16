var $marketLeader = $('.market-leader-container');
if ($marketLeader.length) {
	$marketLeader.find('.close-hero').click(function() {
		$marketLeader.find('.market-leader-image, .market-leader-content').show();
		$marketLeader.find('.video').hide();
	});

	
}


function openvideooverlayById(videoID) {
    var videoID = videoID;
    var pPageName = window.location.href;
    var videoGUID = "video"+videoID;
    var gblPlayingVideo;
    if($.trim(videoID).length > 0){
        //var vidObjMkup = $(".bcobjmarkup").html();
       // vidObjMkup = vidObjMkup.replace(/#videoTitleId/g,videoID).replace("#videoGuid",videoGUID);
    	var secureBCParams = "" ;
    	if (window.location.protocol === 'https:') {
    		secureBCParams = '<param name="secureConnections" value="true" /><param name="secureHTMLConnections" value="true" />';
    	}
        vidObjMkup = '<object id="myExperience'+videoID+'" class="BrightcoveExperience"><param name="linkBaseURL" value="'+pageUrl+'#vid='+videoID+'"/><param name="bgcolor" value="#FFFFFF" />  <param name="width" value="920" />  <param name="height" value="517" />  <param name="playerID" value="'+videoID+'" /><param name="playerKey" value="AQ~~,AAADnJnNnnk~,ltuihYvDjRIOlM3eAv1n6tj_paXrEum1" />  <param name="isVid" value="true" />  <param name="isUI" value="true" />  <param name="dynamicStreaming" value="true" />    <param name="@videoPlayer" value="'+videoID+'" />  <param name="secureConnections" value="true" /><param name="secureHTMLConnections" value="true" /><param name="includeAPI" value="true" /><param name="templateLoadHandler" value="myTemplateLoaded" />'+secureBCParams+'</object>';
        videobox = new HDS.Lightbox();
        gblPlayingVideo = undefined ; 
        videobox.setContent('');
        videobox.setContent(vidObjMkup);
        videobox.show();
        initiateVideo();
        brightcove.createExperiences();
		/* WA Video Tracking Code */
		
        var vidId = 'iot>Video Id: ' + videoID;
        videoTracking(vidId, pPageName);

    }
}