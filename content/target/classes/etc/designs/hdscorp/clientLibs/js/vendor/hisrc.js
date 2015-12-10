/*
 * Hisrc jQuery Plugin
 *
 * Copyright (c) 2011 "@1marc" Marc Grabanski
 * Licensed under the MIT license.
 * 
 */

(function($){
	$.hisrc = {
		els: $(),
		init: false
	}
	
	$.hisrc.defaults = {
		// change minimum width, if you wish
		minwidth: 1200
	}


	$.fn.hisrc = function(options) {
		var settings = $.extend({}, $.hisrc.defaults, options);

		// check bandwidth
		var connection = navigator.connection || { type: 0 }; // polyfill
		if (connection.type == 3 
			|| connection.type == 4 
			|| /^[23]g$/.test(connection.type) ) {
				connection = 1;
			}
			
		$.hisrc.els = $.hisrc.els.add(this);
		
		if (!$.hisrc.init) {
			$(window).on('resize.hisrc', function(){
				$.hisrc.els.trigger('swapres.hisrc');
			});
		}
		
		return this.each(function(){
			$(this).data('lowsrc', $(this).attr('src'));
			
			$(this)
				.on('swapres.hisrc', function(){
					if (connection == 1) {
						$(this).attr('src', $(this).attr('data-lowbandwidth'));
						$(this).load(function(){
							//console.log("image loaded");
							$(this).removeClass("lazy-load");
						}).error(function(){
							//console.log("error");
						});						
						if($(this).hasClass('banner')){
							$(this).attr('data-background', $(this).attr('data-lowbandwidth'));
						}
					} else if (window.devicePixelRatio > 1) {
						$(this).attr('src', $(this).attr('data-hisrc'));
						$(this).load(function(){
							//console.log("image loaded");
							$(this).removeClass("lazy-load");
						}).error(function(){
							//console.log("error");
						});
						if($(this).hasClass('banner')){
							$(this).attr('data-background', $(this).attr('data-hisrc'));
						}
					} else {
						$(this).attr('src', $(this).data('lowbandwidth'));
						$(this).load(function(){
							//console.log("image loaded");
							$(this).removeClass("lazy-load");
						}).error(function(){
							//console.log("error");
						});
						if($(this).hasClass('banner')){
							$(this).attr('data-background', $(this).attr('lowsrc'));
						}
					}
				})
				.trigger('swapres.hisrc');
		})
			
	}
})(jQuery);


