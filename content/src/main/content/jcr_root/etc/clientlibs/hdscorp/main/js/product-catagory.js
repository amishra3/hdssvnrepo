/*Global Namespace*/
var hds = window.hds || {};

(function(window, document, $, hds) {
    hds.productCatagory = {
        init: function() {
        	hds.productCatagory.bindHTMLLoad();
            hds.productCatagory.bindEventsOnResize();
            hds.productCatagory.bindClick();
        },
        loadCatagoryHTML: function() {
            hds.productCatagory.processHTML($('.linkLeft a').eq(0).attr('data-loadhtml'), 0);
            $('.linkLeft a').eq(0).addClass('active');
            $('.linkLeft a').eq(0).parent().addClass('active');
        },
        processHTML: function(url, index) {
	            $("#contentCatagoryHTML").html(" ").load(url + " .subcategorycontent", function(responseText, textStatus) {
	            	if (textStatus === 'success' || textStatus === 'notmodified') {
	                hds.productCatagory.bindHTMLLoad();
	                if($(window).width()<991){                        	
                     	 $("body, html").animate({ 
                              scrollTop: $($('.linkLeft.active')).offset().top                                
                          }, 600);
                     }
	            	}
	            });        	
        },
        bindHTMLLoad: function() {
            if ($(window).width() < 991) {
                $('.linkLeft a').each(function() {
                    if ($(this).hasClass('active')) {
                    	 //$(this).parent('li').find('.MobileHolderWrapper').slideDown(1000);
                        $(this).parent('li').find('.MobileHolderWrapper').append($('#contentCatagory').html());                       
                        $('#contentCatagory').empty();
                        $(this).parent('li').find('.icon-accordion-closed').css('display', 'none');
                        $(this).parent('li').find('.icon-accordion-opened').css('display', 'inline-block');
                    }
                });
            } else {            	
            	$('.linkLeft a').each(function() {                	
                    if ($(this).hasClass('active')) {
                        $('#contentCatagory').append($(this).parent('li').find('.MobileHolderWrapper').html());
                        $('.MobileHolderWrapper').empty();                        
                    } else if ($.trim($(this).parent('li').find('.MobileHolderWrapper').html())) { 
                    	$(this).parent('li').addClass("active");
                    	$(this).parent('li').children('a').addClass("active");                      
                        $('#contentCatagory').append($(this).parent('li').find('.MobileHolderWrapper').html());
                        $('.MobileHolderWrapper').empty().removeAttr('style');                        
                    }
                });
            }
        },
        bindEventsOnResize: function() {
            $(window).resize(function() {
                hds.productCatagory.bindHTMLLoad();
            });
        },
        setHTMLContainer: function() {
            if ($(window).width() < 991) {
                $('#asideLinks li').each(function() {
                    if ($.trim($(this).find('.MobileHolderWrapper').html())) {
                    	$(this).find('.MobileHolderWrapper').slideUp(1000);
                        $('#contentCatagory').append($(this).find('.MobileHolderWrapper').html());
                        $(this).find('.MobileHolderWrapper').empty()
                    }
                });
            }
        },
        bindClick: function() {
            $(document).on('click','.linkLeft > a', function(event) {
                var self = $(this);                
                    if (!$(this).hasClass('active')) {
                    	hds.productCatagory.setHTMLContainer();
                        $('.linkLeft a').removeClass('active');
                        $('.linkLeft a').parent().removeClass('active');
                        var loadUrl = $(this).attr('data-loadhtml'),
                            loadIndec = $(this).parent().index();
                        $(this).addClass('active');
                        $(this).parent().addClass('active');
                        var offsetFirst=$($('.linkLeft:eq(0)')).offset().top;
                        var clickedIndexHeight= $(this).outerHeight();
                        var clickedIndex= $(this).parent().index();
                        var finalIndex=offsetFirst+(clickedIndexHeight*clickedIndex);
                        if($(window).width() < 991){                    	
                       	 $("body, html").animate({ 
                                scrollTop: finalIndex                             
                            }, 600);
                       }
                        hds.productCatagory.processHTML(loadUrl, loadIndec);                        
                        $('.linkLeft').find('.icon-accordion-closed').removeAttr('style').css('display', 'inline-block');
                        $('.linkLeft').find('.icon-accordion-opened').removeAttr('style').css('display', 'none');
                                              
                    } else if ($(this).hasClass('active') && $(window).width() < 991) {
                    	return false;
                    	
                    }  

                event.preventDefault();
            });

        }
    }
}(window, document, jQuery, hds));

$(function() {
    if($('#productCatagoryList')){
		hds.productCatagory.init();
    }
    $(document).ajaxStart(function(e) {
		$("#loading").show();
	});
	$(document).ajaxStop(function(e) {
		$("#loading").hide();
	});
})


