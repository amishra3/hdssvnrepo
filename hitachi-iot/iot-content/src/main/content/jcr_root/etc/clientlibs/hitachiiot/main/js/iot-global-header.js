// Remove navwithouthero class from IoT main nav; this is being added by main.js in hdscorp code
//
$(document).ready(function () {
	$('.hds-main-navigation-container').removeClass('navwithouthero');
	
        var qURL = window.location.href;
        var indexOfQueryStart = qURL.indexOf("?") ;
        if(indexOfQueryStart > 0){
            qURL = qURL.substring(0,indexOfQueryStart); 
        }
        var parms = getParmsFromURLHash(qURL);
        var videoID = parms["vid"];
   
        openvideooverlayById(videoID);

});

function getParmsFromURLHash (url){
            var parms = {}, pieces, parts, i;
            var hash = url.lastIndexOf("html");
            if (hash !== -1) {
                url = url.slice(hash + 1);
            }
            var filters = url.indexOf("#");
            if (filters !== -1) {
                url = url.slice(filters + 1);
                pieces = url.split("#");
                for (i = 0; i < pieces.length; i++) {
                    parts = pieces[i].split("=");
                    if (parts.length < 2) {
                        parts.push("");
                    }
                    parms[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
                }
            }
            return parms;
        }