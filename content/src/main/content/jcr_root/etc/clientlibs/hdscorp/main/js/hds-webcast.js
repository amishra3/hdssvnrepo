var hds = window.hds || {};

(function(window, document, $, hds) {

    hds.webcastEvents = {
        init: function(options) {
            var defaults = {
                element: '#webcasts-demand .newsEvents',
                elementListAnchor: '.webcast-listing li a',
                detailsBtn: '#webcasts-demand .newsWrapper .expandMe',
                countParagraph: 270,
                ellipsestext :'...',
                moreText: "more",
                lessText: "less",
                playBtn: '.playvideo'

            }
            this.options = $.extend(defaults, options);
            hds.webcastEvents.truncateText();
			hds.webcastEvents.bindWebcastsOnResize();
            hds.webcastEvents.showFilteredContent();
            hds.webcastEvents.showDetails();
            hds.webcastEvents.showModal();
			hds.webcastEvents.bindWebCatsLoad();

        },
        truncateText:function(){
            var defaultTextValue=this.options.countParagraph;
            var ellipsestext =this.options.ellipsestext;
            var parentDiv= this.options.element;
            $(parentDiv).each(function() {
            var selfHtml=$(this).find('p').html();
            if(selfHtml.length > defaultTextValue);
            var c = selfHtml.substr(0, defaultTextValue);
            var h = selfHtml.substr(defaultTextValue-1, selfHtml.length - defaultTextValue); 
            var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span></span>'; 
            $(this).find('p').html(html);    
        });            
        },
        showDetails:function(){
            var showDetails=this.options.detailsBtn;
            $(document).on('click', showDetails, function() {
                var $this = $(this);
                /*if ($this.hasClass('less')) {
                    $this.removeClass('less');
					$this.find('.glyphicon').removeClass('glyphicon-plus-sign').addClass('glyphicon-minus-sign');
					//$this.parents('.newsEvents').find('.WebcastDetails').toggle().focus();
					$(this).prev().css( "display", "block" );
					
                } else {
                    $this.addClass('less');
					$(this).prev().css( "display", "none" );
					$this.find('.glyphicon').removeClass('glyphicon-minus-sign').addClass('glyphicon-plus-sign');
                    setTimeout( function() { $this.parents('.newsEvents').find('h3').focus() }, 500 );
					//$this.parents('.newsEvents').find('.WebcastDetails').hide();
                }
                $this.find('.glyphicon').toggleClass('glyphicon-minus-sign');
                $this.parents('.newsEvents').find('.WebcastDetails').toggle().focus();*/
                $this.parents('.newsEvents').find('p span.moreellipses').toggle();
                $this.parents('.newsEvents').find('p span.morecontent span').toggle();
                return false;
            })
        },
        showModal:function(){
            var playBtn=this.options.playBtn;
            $(document).on('click', playBtn, function(evt) {

                evt.preventDefault();
                var modal = $('#modal').modal();
                var commId= $(this).attr('comid');
                modal.find('.modal-body').html('<script type="text/javascript" src="https://www.brighttalk.com/clients/js/embed/embed.js"></script><object class="BrightTALKEmbed" width="100%" height="627"><param name="player" value="webcast_player"/>   <param name="domain" value="https://www.brighttalk.com"/>   <param name="channelid" value="12821"/>   <param name="communicationid" value="'+commId+'"/>    <param name="autoStart" value="false"/>    <param name="theme" value=""/></object>');
                    modal.show();
                return false;
            })
        },
        bindWebCatsLoad: function() {
            if ($(window).width() < 991) {
                $('.webcast-listing li').each(function() {
                    if ($(this).hasClass('active')) {
                        if($(this).find('.MobileHolderWrapper').empty()){
							$(this).find('.MobileHolderWrapper').append($('#contentWebCast').html());
						}
						$('#contentWebCast').hide();
						$(this).find('.MobileHolderWrapper').show();
                    }
                });
            } else {
                $('.webcast-listing li').each(function() {
                    if ($(this).hasClass('active')) {
						$('#contentWebCast').append($(this).find('.MobileHolderWrapper').html());
                        $('.MobileHolderWrapper').hide();
						$('#contentWebCast').show();
                    }
                })
            }
        },

        bindWebcastsOnResize: function() {
            $(window).resize(function() {
                hds.webcastEvents.bindWebCatsLoad();
            });
        },
		
        showFilteredContent: function() {
            var listAnchor=this.options.elementListAnchor;
            var targetList = this.options.element;
            $(listAnchor).on('click', function(event) {				
                if ($(window).width() < 991) {  
                 $(listAnchor).each(function() {
                    if ($(this).hasClass('active')) {
                        $('#contentWebCast').append($(this).find('.MobileHolderWrapper').html());
                        $('.MobileHolderWrapper').hide();
                    }
                    })
                }
                $(listAnchor).parent('li').removeClass('active');
                    var searchFilter=$(this).attr('data-catagory');
                    $(this).parents('li').addClass('active');
                if (searchFilter !== "All Webcast") {
                    $('#webcasts-demand .newsEvents').hide().filter(function(index) {
                        var self = $(this);
                        var endFilter = self.attr('data-webcast').split(',');
						return endFilter.indexOf(searchFilter)!==-1
                    }).show();

                    /* hide months if no event */
                    $('.newsWrapper').each(function(index, el) {
                            if ($(this).find('.newsEvents:visible').length <= 0) {
                                $('.noWebcastFilter').show();
                            }else{
                                $('.noWebcastFilter').hide();
                            }
                    });
                    /* //hide months if no event */
                    

                } else {
                    $('#webcasts-demand .newsEvents').show();
                    if ($('.newsWrapper .newsEvents:visible').length <= 0) {
                        $('.noWebcastFilter').show();
                    }else{
                        $('.noWebcastFilter').hide();
                    }
                }
                hds.webcastEvents.bindWebCatsLoad();
                event.preventDefault();
            });

        }
    }
}(window, document, jQuery, hds));


$(function() {
    if($('#webcasts-demand').length>0){
    hds.webcastEvents.init();
    }
})