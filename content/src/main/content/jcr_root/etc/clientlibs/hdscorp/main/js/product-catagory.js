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
        	$('.MobileHolderWrapper').removeAttr('style');
	            $("#contentCatagoryHTML").html(" ").load(url + " .subcategorycontent", function(responseText, textStatus) {
	            	if (textStatus === 'success' || textStatus === 'notmodified') {
	                hds.productCatagory.bindHTMLLoad();
	                if($(window).width()<991){                        	
                     	 $("body, html").animate({ 
                              scrollTop: $($('.linkLeft.active')).offset().top                                
                          }, 600);
                     }
                        if($('.subcategorycontent').length > 0){
                            $('a.isGatedLock').each(function(index, el) {
                                $(this).prepend("<span class='glyphicon glyphicon-lock' aria-hidden='true'></span>");
                            });
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
                        $('#contentCatagory').append($(this).find('.MobileHolderWrapper').html());
                        $(this).find('.MobileHolderWrapper').hide().empty();
                    }
                });
            }
        },
        bindClick: function() {
            $(document).on('click','#asideLinks li.linkLeft > a', function(event) {
                var self = $(this);
                    if (!$(this).hasClass('active')) {
                    	hds.productCatagory.setHTMLContainer();
                        $('.linkLeft a').removeClass('active');
                        $('.linkLeft a').parent().removeClass('active');
                        var loadUrl = $(this).attr('data-loadhtml'),
                            loadIndec = $(this).parent().index();
                        $(this).addClass('active');
                        $(this).parent().addClass('active');
                        var offsetFirst=$($('#asideLinks li.linkLeft:eq(0)')).offset().top;
                        var clickedIndexHeight= $(this).outerHeight();                       
                        var clickedIndex= $(this).parent().index();                     
                        var finalIndex=offsetFirst+(clickedIndexHeight*clickedIndex);
                        hds.productCatagory.processHTML(loadUrl, loadIndec);
                        $('.linkLeft').find('.icon-accordion-closed').removeAttr('style').css('display', 'inline-block');
                        $('.linkLeft').find('.icon-accordion-opened').removeAttr('style').css('display', 'none');
                        if($(window).width() < 991){                    	
	                       	 $("body, html").animate({ 
	                                scrollTop: finalIndex                             
	                            }, 600);
                      }                  
                    } else {
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


