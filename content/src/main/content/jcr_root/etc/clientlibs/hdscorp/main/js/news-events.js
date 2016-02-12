var hds = window.hds || {};

(function(window, document, $, hds) {

    hds.newsEvents = {
        init: function(options) {
            var defaults = {
                element: '#upcoming-events .newsEvents',
                elementListAnchor: '.webcast-listing li a',
                detailsBtn: '.expandMe'
            }
            this.options = $.extend(defaults, options);
            hds.newsEvents.loadCalender();
            hds.newsEvents.loadMoreMonths();
            hds.newsEvents.bindFilters();
            hds.newsEvents.sortFilter();
            hds.newsEvents.bindHTMLLoad();
            hds.newsEvents.bindEventsOnResize();
            hds.newsEvents.displayBlockContent();            
        },
        loadCalender: function() {
            $("#two-inputs").dateRangePicker({
                autoClose: true,
                format: 'MM/DD/YYYY',
                showTopbar: false,
                stickyMonths: true,
                //startDate: '2013-01-10',
                //endDate: '2013-05-10'
                separator: ' to ',
                getValue: function() {
                    if ($('#date-range200').val() && $('#date-range201').val())
                        return $('#date-range200').val() + ' to ' + $('#date-range201').val();
                    else
                        return '';
                },
                setValue: function(s, s1, s2) {
                    $('#date-range200').val(s1);
                    $('#date-range201').val(s2);
                }
            });
        },
        displayBlockContent: function() {
            $(document).on('click', '.expandMe', function() {
                var self = $(this);
                var $parentTag = self.parents('.newsEvents').find('.eventDetails');
                $parentTag.toggle(function() {
                    if ($(this).css('display') === 'none') {
                        self.find('.glyphicon').removeClass('glyphicon-minus-sign').addClass('glyphicon-plus-sign');
                    } else {
                        self.find('.glyphicon').removeClass('glyphicon-plus-sign').addClass('glyphicon-minus-sign');
                    }
                })
            });
        },
        loadMoreMonths: function() {
            var x = 3;
            var countMonths = $('.newsWrapper-listing').size();
            $('.newsWrapper-listing:lt(' + x + ')').show();
            if (countMonths > 3) {
                $('#loadMoreMonth').show();
            } else {
                $('#loadMoreMonth').hide();
            }
            $(document).on('click','#loadMoreMonth',  function() {
                x = (x + 3 <= countMonths) ? x + 3 : countMonths;
                $('.newsWrapper-listing:lt(' + x + ')').show();
                if (x == countMonths) {
                    $('#loadMoreMonth').hide();
                }
            })
        },
        CheckLoadMoreMonths: function() {
            var x = 3;
            var countMonths = $('.newsWrapper-listing:visible').size();
            $('.newsWrapper-listing:visible:lt(' + x + ')').show();
            if (countMonths > 3) {
                $('#loadMoreMonth').show();
            } else {
                $('#loadMoreMonth').hide();
            }
        },
        bindHTMLLoad: function() {
            if ($(window).width() < 991) {
                $('.news-listing li').each(function() {
                    if ($(this).hasClass('active')) {
                        $(this).find('.MobileHolderWrapper').append($('#newsEventCatagory').html());
                        $('#newsEventCatagory').empty();
                    }
                });
            } else {
                $('.news-listing li').each(function() {
                    if ($(this).hasClass('active')) {
                        $('#newsEventCatagory').append($(this).find('.MobileHolderWrapper').html());
                        $('.MobileHolderWrapper').empty();
                    }
                })
            }
        },
        bindEventsOnResize: function() {
            $(window).resize(function() {
                hds.newsEvents.bindHTMLLoad();
                hds.newsEvents.displayBlockContent();
            });
        },
        searchFilterRange: function(startDate, endDate) {
            var startDate = startDate.split('/');
            var endDate = endDate.split('/');
            var target = this.options.element;
            startDate = new Date(startDate[2], startDate[0] - 1, startDate[1]);
            endDate = new Date(endDate[2], endDate[0] - 1, endDate[1]);

            $(target).hide().filter(function(index) {
                $('.news-listing li').removeClass('active');
                $('.news-listing li:eq(0)').addClass('active');
                $('.noEventFilter').hide();
                $('.newsWrapper-listing').show();
                
                var startFilter = $(this).attr('data-startdate').split('/');
                var endFilter = $(this).attr('data-enddate').split('/');
                startFilter = new Date(startFilter[2], startFilter[0] - 1, startFilter[1]);
                endFilter = new Date(endFilter[2], endFilter[0] - 1, endFilter[1]);
               console.log(startDate+'<=====>'+startFilter+'<=====>'+ endDate+'<=====>'+endFilter);
                return ((startFilter >= startDate) && (endFilter <= endDate)) || (startFilter <= endDate)
            }).show();
            
            $('.newsWrapper-listing').each(function(index, el) {
                if ($(this).find('.newsEvents:visible').length <= 0) {
                    $(this).hide();
                }
            });
            if ($('.newsEvents:visible').length <= 0) {
                $('.noEventFilter').show();
            }
            hds.newsEvents.CheckLoadMoreMonths();
        },
        sortFilter: function() {
             var target = this.options.element;
            $(document).on('click', '.news-listing  li  a', function(event) {
                 if ($(window).width() < 991) {  
                 $('.news-listing li').each(function() {
                    if ($(this).hasClass('active')) {
                        $('#newsEventCatagory').append($(this).find('.MobileHolderWrapper').html());
                        $('.MobileHolderWrapper').empty();
                    }
                    })
                }
                $('.news-listing li').removeClass('active');
                var searchFilter = $(this).attr('data-catagory');
                $(this).parents('li').addClass('active');
                if (searchFilter !== "All Events") {
                    $(target).hide().filter(function(index) {
                        var endFilter = $(this).attr('data-events');
                        return endFilter === searchFilter;
                    }).show();
                } else {
                    $(target).show();
                    $('.newsWrapper-listing').show();
                    $('.noEventFilter').hide();
                    $('#date-range200, #date-range201').val(" ");
                }
                hds.newsEvents.bindHTMLLoad();
                hds.newsEvents.displayBlockContent();

                event.preventDefault();
            });
        },
        bindFilters: function() {
            $(document).on('click', '#updateResults', function() {
                hds.newsEvents.searchFilterRange($('#date-range200').val(), $('#date-range201').val());

            })
        }

    }
}(window, document, jQuery, hds));


$(function() {
    if($('#upcoming-events').length>0){
    hds.newsEvents.init();
}
})
