/*Global Namespace*/
var hds = window.hds || {};
(function(window, document, $, hds) {
    hds.pressrelease = {
        init: function(options) {
        	var defaults = {
                    countRelease: 10,                    
                }
       	 	this.options = $.extend(defaults, options);
            hds.pressrelease.bindHTMLLoad();
            hds.pressrelease.bindEventsOnResize();
            hds.pressrelease.bindClick();
            hds.pressrelease.loadSubContent();
            hds.pressrelease.search();
        },
        loadCatagoryHTML: function() {        	
            hds.pressrelease.processHTML($('.archiveslinkLeft a').eq(0).attr('data-loadhtml'), 0);
            $('.archiveslinkLeft a').eq(0).addClass('active');
            $('.archiveslinkLeft a').eq(0).parent().addClass('active');
        },
        processHTML: function(url, index) {
            $("#loadPressAwrads").html(" ").load(url + " .load-pr-archives-list", function(responseText, textStatus) {
            	if (textStatus === 'success' || textStatus === 'notmodified') {
                hds.pressrelease.loadSubContent();
            	hds.pressrelease.bindHTMLLoad();
            	
            	}
            });
        },
        bindHTMLLoad: function() {
            if ($(window).width() < 991) {
                $('.archiveslinkLeft a').each(function() {
                    if ($(this).hasClass('active')) {
                        $(this).parent('li').find('.MobileHolderWrapper').append($('#contentCatagory').html());
                        $('#contentCatagory').empty();
                        $(this).parent('li').find('.icon-accordion-closed').css('display', 'none');
                        $(this).parent('li').find('.icon-accordion-opened').css('display', 'inline-block');
                    }
                });
            } else {
            	
            }
        },
        loadSubContent: function() {
            var sizeCatagoryList = $(".pr-list-container .pr").size(),
            x = this.options.countRelease;
            console.log("<======>"+x)
            $('.pr:lt(' + x + ')').show();          
                if (sizeCatagoryList <= x  ) {
                    $('#loadMorePrBtn').hide();
                }else{
                	 $('#loadMorePrBtn').show();
                }
                
        },
        loadMorePressRelease: function() {
            sizePrList = $(".pr-list-container .pr").size();
            var x = $(".pr:visible").size();
                x = (x + 10 <= sizePrList) ? x + 10 : sizePrList;
                $('.pr:lt(' + x + ')').show('medium');
                if (x == sizePrList) {
                    $('#loadMorePrBtn').hide();
                }
            
        },
        bindEventsOnResize: function() {
            $(window).resize(function() {
                hds.pressrelease.bindHTMLLoad();
            });
        },
        search:function(){
        	var searchTermPreValue="";            
        	var searchTerm = $.trim($('#fulltext').val());
        	if(searchTerm!=searchTermPreValue){
            	var activeFilterURL = $('#archivesLinks li.active a').attr('data-loadhtml');
            	var loadIndec = $('#archivesLinks li.active a').parent().index();
            	var fulltextSearchURL = activeFilterURL+"?fulltext="+encodeURIComponent(searchTerm);
            	hds.pressrelease.processHTML(fulltextSearchURL, loadIndec);            		
        	}
        	searchTermPreValue = searchTerm;
        },
        setHTMLContainer: function() {
            if ($(window).width() < 991) {
                $('#archivesLinks li').each(function() {
                    if ($.trim($(this).find('.MobileHolderWrapper').html())) {
                    	$(this).find('.MobileHolderWrapper').slideUp(1000);
                        $('#contentCatagory').append($(this).find('.MobileHolderWrapper').html());
                        $(this).find('.MobileHolderWrapper').empty()
                    }
                });
            }
        },
        bindClick: function() {
        	$(document).on('click','.archiveslinkLeft > a', function(event) {                
                $('#fulltext').val('');
                var self = $(this);                
                    if (!$(this).hasClass('active')) {
                    	hds.pressrelease.setHTMLContainer();
                        $('.archiveslinkLeft a').removeClass('active');
                        $('.archiveslinkLeft a').parent().removeClass('active');
                        var loadUrl = $(this).attr('data-loadhtml'),
                            loadIndec = $(this).parent().index();
                        $(this).addClass('active');
                        $(this).parent().addClass('active');
                        var offsetFirst=$($('.archiveslinkLeft:eq(0)')).offset().top;
                        var clickedIndexHeight= $(this).outerHeight();
                        var clickedIndex= $(this).parent().index();
                        var finalIndex=offsetFirst+(clickedIndexHeight*clickedIndex);
                        console.log(finalIndex);
                        if($(window).width() < 991){                    	
                       	 $("body, html").animate({ 
                                scrollTop: finalIndex                             
                            }, 600);
                       }
                        hds.pressrelease.processHTML(loadUrl, loadIndec);
                        $('.archiveslinkLeft').find('.icon-accordion-closed').removeAttr('style').css('display', 'inline-block');
                        $('.archiveslinkLeft').find('.icon-accordion-opened').removeAttr('style').css('display', 'none');
                       
                    } else{
                    	return false;
                    }  
                    event.preventDefault();
            });

            $('.pr-search .glyphicon-search').on('click', function(event) {
            	hds.pressrelease.search();
            });
            
            $('#fulltext').keyup(function(e){
            	  if(e.keyCode == 13){
            		  hds.pressrelease.search();//Trigger search button click event
            	    }
            });
            $(document).on('click','#loadMorePrBtn', function() {
            	hds.pressrelease.loadMorePressRelease();
            })
        }
        
    }
}(window, document, jQuery, hds));

$(function() {
	if ( $('.pr-list-container').length > 0){
		hds.pressrelease.init();
	}
})