/*Global Namespace*/
var hds = window.hds || {};
var parenRef="";
(function(window, document, $, hds) {
    hds.assetGating = {
        init: function() {
			$('title').text('HDS: ' + $('h4').text());
			parenRef=document.referrer;
         },
         downloadPdf:function(){
        	 window.open(window.location.href+"?q=1");
         }
    }
}(window, document, jQuery, hds));
$(function() {
	if ( $('.gated_asset').length > 0){
		hds.assetGating.init();
	}
})