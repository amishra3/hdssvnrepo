var hds = window.hds || {};

(function(window, document, $, hds) {

    hds.webcastEvents = {
        init: function(options) {
            var defaults = {
                element: '#webcasts-demand .newsEvents',
                elementListAnchor: '.webcast-listing li a',
                detailsBtn: '#webcasts-demand .expandMe',
                countParagraph: 270,
                ellipsestext :'...',
                moreText: "more",
                lessText: "less",

            }
            this.options = $.extend(defaults, options);
            hds.webcastEvents.truncateText();
            hds.webcastEvents.showFilteredContent();
            hds.webcastEvents.showDetails();

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
                if ($this.hasClass('less')) {
                    $this.removeClass('less');                    
                } else {
                    $this.addClass('less');                    
                    setTimeout( function() { $this.parents('.newsEvents').find('h3').focus() }, 500 );
                       }
                $this.find('.glyphicon').toggleClass('glyphicon-minus-sign');
                $this.parents('.newsEvents').find('.WebcastDetails').toggle().focus();
                $this.parents('.newsEvents').find('p span.moreellipses').toggle();
                $this.parents('.newsEvents').find('p span.morecontent span').toggle();
                return false;
            })
        },
        bindWebCatsLoad: function() {
            if ($(window).width() < 991) {
                $('.webcast-listing li').each(function() {
                    if ($(this).hasClass('active')) {
                        $(this).find('.MobileHolderWrapper').append($('#contentWebCast').html());
                        $('#contentWebCast').empty();
                    }
                });
            } else {
                $('.webcast-listing li').each(function() {
                    if ($(this).hasClass('active')) {
                        $('#contentWebCast').append($(this).find('.MobileHolderWrapper').html());
                        $('.MobileHolderWrapper').empty();
                    }
                })
            }
        },
        showFilteredContent: function() {
            var listAnchor=this.options.elementListAnchor;
            var targetList = this.options.element;
            $(listAnchor).on('click', function(event) {
                if ($(window).width() < 991) {  
                 $(listAnchor).each(function() {
                    if ($(this).hasClass('active')) {
                        $('#contentWebCast').append($(this).find('.MobileHolderWrapper').html());
                        $('.MobileHolderWrapper').empty();
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

                } else {
                    $('#webcasts-demand .newsEvents').show();
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

