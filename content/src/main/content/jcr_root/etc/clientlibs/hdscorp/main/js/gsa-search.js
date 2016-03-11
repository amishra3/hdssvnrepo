/*Global Namespace*/
var hds = window.hds || {};

(function(window, document, $, hds) {
    hds.gsasearch = {
        init: function() {
            hds.gsasearch.setGlobalSearch();

        },
        setGlobalSearch: function() {
		var searchUrl=$('#gsaSearchBox').attr('data-href');

             $(document).on('keypress', '#gsaSearchBox', function(event) {
            	var keycode = (event.keyCode ? event.keyCode : event.which);
            	if(keycode == 13) {
	            	event.preventDefault(); 
                    if(!hds.gsasearch.validateSearchBox())
                        return false;
	                var q = $(this).val();
					window.location=searchUrl+"?q="+q;
            	}
            });
            $(document).on('click', '.nav-search', function(event) {
                //alert("..");
            	event.preventDefault();
                 if(!hds.gsasearch.validateSearchBox())
                        return false;
	                var q = $('#gsaSearchBox').val();
	               	window.location=searchUrl+"?q="+q;
            });

        },
        getQueryParameter: function(param) {
            var results = new RegExp('[\?&]' + param + '=([^&#]*)').exec(window.location.href);
            if(results!==null)
				return results[1] || 0;
            else
                return "";
        },
        setSearchIframe: function() {
			var iframe = $('#searchFrame');
            var iframeUrl="http://wwwstage-revamp.hds.com/search?access=p&output=xml_no_dtd&client=hdsrevamp&proxystylesheet=hdsrevamp&sort=date:D:L:d1&oe=UTF-8&ie=UTF-8&ud=1&exclude_apps=1&site=hdsrevamp&q="+hds.gsasearch.getQueryParameter('q');
			 iframe.attr('src', iframeUrl);
        }
        ,
        validateSearchBox: function() {
            var q = $('#gsaSearchBox').val();
            if(!q || q=="")
                return false;
            else
                return true;


        }
    }
}(window, document, jQuery, hds));
$(function() {
    hds.gsasearch.init();
    if ($('#searchFrame').length > 0){
        hds.gsasearch.setSearchIframe();
	}
});