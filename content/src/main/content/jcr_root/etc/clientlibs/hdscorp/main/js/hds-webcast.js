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
            hds.webcastEvents.processUrlHash();

        },
        processUrlHash:function(){
            var qURL = window.location.href;
            var indexOfQueryStart = qURL.indexOf("?") ;
            if(indexOfQueryStart > 0){
                qURL = qURL.substring(0,indexOfQueryStart); 
            }
            var parms = hds.resourceLib._getParmsFromURLHash(qURL);
            var tabID = parms["tab"];
            var comid = parms["comid"];
            var event_id = parms["event-id"];
            if(typeof tabID!== "undefined" && tabID==2 ){
                $('a[href^="#webcasts-demand"]').click();
                if(typeof comid!== "undefined"){
                    var webCast = $('a.'+comid) ;
                    if($(webCast).length > 0){
                        $(webCast).click();
                        $('body').scrollTo('.scrollto'+comid,{duration:'slow', offsetTop : '0'});
                    }
                }
            }else if (typeof event_id!== "undefined" && event_id.length > 0) {
                var targetEvent = $("#newsEventCatagory").find("[data-event-id='" + event_id + "']");
                if(targetEvent.length > 0){
                    var targetEventDetailAnchor = $(targetEvent).find("a.expandMe");
                    $(targetEventDetailAnchor).click(); 
                    $('body').scrollTo(targetEvent,{duration:'slow', offsetTop : '50'});
                }
            }
        },
        truncateText:function(){
            var defaultTextValue=this.options.countParagraph;
            var ellipsestext =this.options.ellipsestext;
            var parentDiv= this.options.element;
            $(parentDiv).each(function() {
            var selfHtml=$(this).find('p').html();
                if(selfHtml.length > defaultTextValue);
                var c = selfHtml.substr(0, defaultTextValue);
                var h = selfHtml.substr(defaultTextValue-0, selfHtml.length - defaultTextValue); 
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
                var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
                var modal = $('#modal').modal();
                var commId= $(this).attr('comid');
                if(iOS){
                    modal.find('.modal-body').html('<div class="ios-alert">This feature is not supported on iOS.</div>');
                }else{
                    modal.find('.modal-body').html('<script type="text/javascript" src="https://www.brighttalk.com/clients/js/embed/embed.js"></script><object class="BrightTALKEmbed" width="'+$(".modal-body").width()+'" height="627"><param name="player" value="webcast_player"/>   <param name="domain" value="https://www.brighttalk.com"/>   <param name="channelid" value="12821"/>   <param name="communicationid" value="'+commId+'"/>    <param name="autoStart" value="false"/>    <param name="theme" value="core.3.1.0/generic.swf"/></object>');
                    modal.show();
                }
                /* WA Video Tracking Code */
                var pPageName = window.location.href;
                var vidId = 'Webcast Id: ' + commId;
                videoTracking(vidId, pPageName);
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
            $(document).on('click', listAnchor, function(event){
                var offsetFirst=$($(listAnchor+':eq(0)')).offset().top;
                var clickedIndexHeight= $(this).outerHeight();
                var clickedIndex= $(this).parent().index();
                var finalIndex=offsetFirst+(clickedIndexHeight*clickedIndex);                

                if ($(window).width() < 991) {
                    $(listAnchor).parent().find('#webcasts-demand .MobileHolderWrapper').html('');                      
                    $(listAnchor).each(function() {
                        if ($(this).hasClass('active')) {
                            $('#contentWebCast').append($(this).find('.MobileHolderWrapper').html());
                            $('#webcasts-demand .MobileHolderWrapper').empty();
                        }
                    })
                    $("body, html").animate({ 
                        scrollTop: finalIndex                             
                    }, 600);
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
                }else{
                    $('#webcasts-demand .newsEvents').show();
                }                
                hds.webcastEvents.bindWebCatsLoad();
                var totalRes = $('#webcasts-demand').find('.newsWrapper').find('.newsEvents:visible').length;
                if(totalRes == 0){
                    $('.noWebcastFilter').show();
                }else{
                    $('.noWebcastFilter').hide();
                }
                $('.newsEvents:visible').last().css({"border-bottom":"none"});
                $(".newsEvents:visible").eq(0).css({"padding-top":"0px"});
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