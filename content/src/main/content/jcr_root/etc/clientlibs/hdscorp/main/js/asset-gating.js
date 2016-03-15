/*Global Namespace*/
var hds = window.hds || {};

(function(window, document, $, hds) {
    hds.assetGating = {
        init: function() {
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