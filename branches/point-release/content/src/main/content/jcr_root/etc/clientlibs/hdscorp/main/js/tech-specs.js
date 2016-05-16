$(document).ready(function() {	
	var nrm = $( "div.comment_more p" ).length;
	if(nrm > 1){
		$("div.comment_more p:first-child").append(' <a href="#" onclick="ss_show_siblings();">Read More</a>');
	}
});


function ss_show_siblings(){
	  $('div.comment_more p').show();
	  $("div.comment_more p:last-child").removeChild(' <a href="#" onclick="ss_hide_siblings();">Read Less</a>');
	}
	function ss_hide_siblings(){
	  $('div.comment_more p').hide();
	  $('div.comment_more p:first-child').show().append(' <a href="#" onclick="ss_show_siblings();">Read More</a>');
	}
