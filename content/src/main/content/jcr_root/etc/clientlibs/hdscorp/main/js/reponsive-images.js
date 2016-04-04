$(function() {
    var imgTargetClass = "rsImg";
    var imglazyLoadCompletionClass = "lazyLoadComplete";
    var windowSize = $(window).width();

    var imageAttrName = "data-image-desktop" ;
    if (windowSize <= 500) {
    	imageAttrName = "data-image-mobile" ;
    }

    function checkWidth() {
    	var imgName = "";
        var lazyLoadImages = false ;
        lazyLoadImages = true ;
        
        if(!lazyLoadImages){
			$('.'+imgTargetClass).each(function (index, value){
				imgName = $(this).attr(imageAttrName);
				$(this).css("background-image", "url('"+imgName+"')");
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

    // Execute on load & scroll
    $(window).on('load scroll', function() {
    	checkWidth();
    });
    
//    $(window).bind('resize', function() {
//    	windowSize = $(window).width();
//    	imageAttrName = "data-image-desktop" ;
//        if (windowSize <= 500) {
//        	imageAttrName = "data-image-mobile" ;
//        }
//    	$('.'+imglazyLoadCompletionClass).each(function (index, value){
//    		$(this).addClass(imgTargetClass);
//			$(this).removeClass(imglazyLoadCompletionClass);
//			checkWidth();
//    	});
//    });

});	