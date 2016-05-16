
<%@include file="/apps/foundation/global.jsp"%>

    	
<script type="text/javascript">

var imgTargetClass = "";
var imglazyLoadCompletionClass = "";
var windowSize = "";
var imageAttrName = "";

function responsiveImg(){
    //Your JQuery goodness here
    imgTargetClass = "rsImg";
    imglazyLoadCompletionClass = "lazyLoadComplete";
    windowSize = $(window).width();

    imageAttrName = "data-image-desktop" ;
    if (windowSize <= 500) {
    	imageAttrName = "data-image-mobile" ;
    }

    $(window).on('load', function() {
    	checkWidth();
    	$('body').removeClass('rsvis');
    });
}

function checkWidth() {
	var imgName = "";
    var lazyLoadImages = false ;
    lazyLoadImages = true ;
    
    if(!lazyLoadImages){
		$('.'+imgTargetClass).each(function (index, value){
			imgName = $(this).attr(imageAttrName);
			$(this).css("background-image", "url('"+imgName+"')");
			$(this).addClass(imglazyLoadCompletionClass);
			$(this).removeClass(imgTargetClass);
		});
		return false;
    }else{
		$('.'+imgTargetClass).each(function (index, value){
			$(this).on('inview', function(event, isInView) {
				if (isInView && $(this).hasClass(imgTargetClass)) {
					imgName = $(this).attr(imageAttrName);
					$(this).css("background-image", "url('"+imgName+"')");
					$(this).addClass(imglazyLoadCompletionClass);
					$(this).removeClass(imgTargetClass);
				}
			});
		});
		return false;
    }
}

function whenJQueryIsLoaded() {
    if (window.$ && $.event.special){
        responsiveImg();
    } else {
        setTimeout(whenJQueryIsLoaded, 25);
    }
}

whenJQueryIsLoaded();

</script>
