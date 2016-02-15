/*Global Namespace*/
var hds = window.hds || {};
(function(window, document, $, hds) {
    hds.pressrelease = {
        init: function() {
            //hds.pressrelease.loadCatagoryHTML();
            hds.pressrelease.bindHTMLLoad();
            hds.pressrelease.bindEventsOnResize();
            hds.pressrelease.bindClick();
        },
        loadCatagoryHTML: function() {        	
            hds.pressrelease.processHTML($('.linkLeft a').eq(0).attr('data-loadhtml'), 0);
            //$('.linkLeft a').eq(0).addClass('active');
            //$('.linkLeft a').eq(0).parent().addClass('active');
        },
        processHTML: function(url, index) {
            $("#contentCatagory").html(" ").load(url + " .pr-archives-list", function() {
                hds.pressrelease.bindHTMLLoad();
            });
        },
        bindHTMLLoad: function() {
            if ($(window).width() < 991) {
                $('.linkLeft a').each(function() {
                    if ($(this).hasClass('active')) {
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
                hds.pressrelease.bindHTMLLoad();
            });
        },
        bindClick: function() {
        	var searchTermPreValue="";
            $('.linkLeft a').on('click', function(event) {
                event.preventDefault();
                $('#fulltext').val('');
                var self = $(this);
                
                    if (!$(this).hasClass('active')) {
                        $('.linkLeft a').removeClass('active');
                        $('.linkLeft a').parent().removeClass('active');
                        var loadUrl = $(this).attr('data-loadhtml'),
                            loadIndec = $(this).parent().index();
                        $(this).addClass('active');
                        $(this).parent().addClass('active');

                        $('.linkLeft').find('.icon-accordion-closed').removeAttr('style').css('display', 'inline-block');
                        $('.linkLeft').find('.icon-accordion-opened').removeAttr('style').css('display', 'none');

                        $('.linkLeft a').parent().find('.MobileHolderWrapper').html(" ").removeAttr("style");
                        hds.pressrelease.processHTML(loadUrl, loadIndec);
                    } else if ($(this).hasClass('active') && $(window).width() < 991) {
                        $(this).removeClass('active');
                        $(this).parent().removeClass('active');
                        $(this).parent('li').find('.icon-accordion-closed').css('display', 'inline-block');
                        $(this).parent('li').find('.icon-accordion-opened').css('display', 'none');
                        $('.MobileHolderWrapper').css({
                            height: '0px',
                            overflow: 'hidden'
                        })
                    }   
            });

            $('.pr-search .glyphicon-search').on('click', function(event) {
            	var searchTerm = $.trim($('#fulltext').val());
            	if(searchTerm!=searchTermPreValue){
                	var activeFilterURL = $('#asideLinks li.active a').attr('data-loadhtml');
                	var loadIndec = $('#asideLinks li.active a').parent().index();
                	var fulltextSearchURL = activeFilterURL+"?fulltext="+searchTerm ;
                	hds.pressrelease.processHTML(fulltextSearchURL, loadIndec);            		
            	}
            	searchTermPreValue = searchTerm;
            });
            
            
            $('#fulltext').on("change keyup", function(){
            	$('.pr-search .glyphicon-search').click();//Trigger search button click event
            })
        }
        
    }
}(window, document, jQuery, hds));

$(function() {
	if ( $('.pr-list-container').length > 0){
		hds.pressrelease.init();
	}
})