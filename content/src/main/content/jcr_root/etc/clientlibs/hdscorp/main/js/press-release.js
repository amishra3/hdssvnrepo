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
                    }
                });
            } else {
            	 $('.archiveslinkLeft a').each(function() {
                     if ($(this).hasClass('active')) {
                         $('#contentCatagory').append($(this).parent('li').find('.MobileHolderWrapper').html());
                         $('.MobileHolderWrapper').empty();
                     }
                 })
            }
        },
        loadSubContent: function() {
            var sizeCatagoryList = $(".pr-list-container .pr").size(),
            x = this.options.countRelease;
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
                        $('#contentCatagory').append($(this).find('.MobileHolderWrapper').html());
                        $(this).find('.MobileHolderWrapper').slideUp('slow').empty();
                        $('.MobileHolderWrapper').removeAttr('style');
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
                        if($(window).width() < 991){                    	
                       	 $("body, html").animate({ 
                                scrollTop: finalIndex                             
                            }, 600);
                       }
                        hds.pressrelease.processHTML(loadUrl, loadIndec);                        
                    } else{
                    	return false;
                    }  
                    event.preventDefault();
            });
        	$(document).on('click','.pr-search .glyphicon-search', function(event) {             
            	hds.pressrelease.search();
            	setTimeout(function() {
            	if ($(".pr:visible").length === 0) {                	
                    $('#loadPressAwrads').find('.no-matched-result').remove();
                    $('#loadPressAwrads').append('<div class="no-matched-result" style="padding: 50px 0; text-align: center;">No results found.</div>');
                }
            	}, 1000);
            });
        	 $(document).on('keypress', '#fulltext', function(event) {        	
        		var keycode = (event.keyCode ? event.keyCode : event.which);
            	  if(keycode == 13){
            		  $('.pr-search .glyphicon-search').trigger('click'); 
            		  
            	    }
            });
        	  $(document).on('keydown', '#fulltext', function(event) {
              	var key = event.keyCode || event.charCode;
              	var getSearchFilter = $.trim($(this).val());
              	if( key == 8 || key == 46 ){
              		 if (getSearchFilter.length <= 1) {
              			var activeFilterURL = $('#archivesLinks li.active a').attr('data-loadhtml');
                    	var loadIndec = $('#archivesLinks li.active a').parent().index();
                    	var fulltextSearchURL = activeFilterURL;
                    	hds.pressrelease.processHTML(fulltextSearchURL, loadIndec); 
              		 }
              	}
              })
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