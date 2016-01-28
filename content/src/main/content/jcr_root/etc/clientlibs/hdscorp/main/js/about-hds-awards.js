/*Global Namespace*/
var hds = window.hds || {};

(function(window, document, $, hds) {
    hds.abouthdsAwards = {
        init: function() {
            hds.abouthdsAwards.loadCatagoryHTML();
            hds.abouthdsAwards.bindEventsOnResize();
            hds.abouthdsAwards.bindClick(); 
            hds.abouthdsAwards.searchAwards();           
        },
        
        loadCatagoryHTML: function() {
            hds.abouthdsAwards.processHTML($('.linkLeft a').eq(0).attr('data-loadhtml'), 0);
            $('.linkLeft a').eq(0).addClass('active');
            $('.linkLeft a').eq(0).parent().addClass('active');
            
        },
        processHTML: function(url, index) {
            $("#awardsContent").html(" ").load(url, function() {
                hds.abouthdsAwards.bindHTMLLoad();
                hds.abouthdsAwards.loadMoreAwards();
            });
        },
        bindHTMLLoad: function() {
            if ($(window).width() < 991) {
                $('.linkLeft a').each(function() {
                    if ($(this).hasClass('active')) {
                        $(this).parent('li').find('.MobileHolderWrapper').append($('#awardsContent').html());
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
        loadMoreAwards:function () {
         var sizeAwardsList = $(".pr").hide().size(),
            x = 4;
            $('#loadMoreAwardsBtn').removeAttr('style');
            $('.pr:lt(' + x + ')').show();
            if(sizeAwardsList <= 4){
                $('#loadMoreAwardsBtn').hide();
            }
            $(document).on('click','#loadMoreAwardsBtn', function() {
                x = (x + 5 <= sizeAwardsList) ? x + 5 : sizeAwardsList;
                $('.pr:lt(' + x + ')').show();                
                if (x == sizeAwardsList) {
                    $('#loadMoreAwardsBtn').hide();
                }
            });
        },
        searchAwards:function(){
              jQuery.expr[':'].Contains = function(a, i, m) {
                return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
            };

            $(document).on('keyup change', '#awardsSearch', function(event) {
                var getSearchFilter = $(this).val();
                $('#awardsContent').find('.no-matched-result').remove();
                if (getSearchFilter.length > 0) {  
                console.log($(this).val());
                 $('#loadMoreAwardsBtn').hide();
                 $(".pr").show();
                 $(".pr").find("h3.filterText:not(:Contains(" + getSearchFilter + "))").parents('div.pr').hide();
                 $(".pr").find("h3.filterText:Contains(" + getSearchFilter + ")").parents('div.pr').show();
           
            
                }else{
                    $(".pr").show();
                } 
                if($(".pr:visible").length === 0){
                
                $('#awardsContent').append('<div class="no-matched-result" style="padding: 50px 0; text-align: center;">No results found.</div>');
                }
                event.preventDefault();
            });
        },
        bindEventsOnResize: function() {
            $(window).resize(function() {
                hds.abouthdsAwards.bindHTMLLoad();
            });
        },
        bindClick: function() {
            $('.linkLeft a').on('click', function(event) {
                event.preventDefault();
                var self = $(this);
                $('#awardsSearch').val(' ');
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
                        hds.abouthdsAwards.processHTML(loadUrl, loadIndec);
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

        }
    }
}(window, document, jQuery, hds));
$(function() {
	if ( $('.about-hds-awards').length > 0){
		hds.abouthdsAwards.init();
	}
})