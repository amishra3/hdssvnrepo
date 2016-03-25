var hds = window.hds || {};

(function(window, document, $, hds) {

    hds.trainingDetail = {
        init: function(options) {
            var defaults = {
                element: '#upcoming-events .newsEventsn',
                elementListAnchor: '.webcast-listing li a',
                detailsBtn: '.expandMe'
            }
            this.options = $.extend(defaults, options);
            hds.trainingDetail.loadCalender();
            hds.trainingDetail.loadMoreMonths();
            hds.trainingDetail.bindFilters();
            //hds.trainingDetail.sortFilter();
            hds.trainingDetail.bindHTMLLoad();
            hds.trainingDetail.bindEventsOnResize();
            hds.trainingDetail.displayBlockContent(); 
            hds.trainingDetail.bindEventsSelectors();           
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
            $(document).on('click', '.newsEvents .expandMe', function() {
                var self = $(this);
                var $parentTag = self.parents('.newsEvents').find('.eventDetails');
                if (self.hasClass('less')) {
                    self.removeClass('less');
                    $(this).prev().css( "display", "block" );
                    self.find('.glyphicon').removeClass('glyphicon-plus-sign').addClass('glyphicon-minus-sign');
                } else {
                   self.addClass('less');
                    $(this).prev().css( "display", "none" );
                    self.find('.glyphicon').removeClass('glyphicon-minus-sign').addClass('glyphicon-plus-sign');
                   setTimeout( function() { self.parents('.newsEvents').find('h3').focus() }, 500 );
                 }
               //self.find('.glyphicon').toggleClass('glyphicon-minus-sign');
               //self.parents('.newsEvents').find('.eventDetails').toggle().focus();

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
                        $(this).find('.MobileHolderWrapper').show();
                        $('#newsEventCatagory').empty();
                    }
                });
            } else {
                $('.news-listing li').each(function() {
                    if ($(this).hasClass('active')) {
                        $('#newsEventCatagory').append($(this).find('.MobileHolderWrapper').html());
                        $('#newsEventCatagory').show();
                        $('.MobileHolderWrapper').empty();
                    }
                })
            }
        },
        bindEventsOnResize: function() {
            $(window).resize(function() {
                hds.trainingDetail.bindHTMLLoad();
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
            
            /* hide months if no event */
                    $('.newsWrapper-listing').each(function(index, el) {
                            if ($(this).find('.newsEvents:visible').length <= 0) {
                                $(this).hide();
                            }
                    });
                    if ($('.newsEvents:visible').length <= 0) {
                        $('.noEventFilter').show();
                    }
                    /* //hide months if no event */
      
            //hds.newsEvents.CheckLoadMoreMonths();
        },
        bindFilters: function() {
            $(document).on('click', '#updateResults', function() {
                hds.trainingDetail.searchFilterRange($('#date-range200').val(), $('#date-range201').val());

            })
        },
        bindEventsSelectors: function() {
            $(document).on('click', '.search-course-btn', function(event) {
                var self = $(this),
                    checkInputIfEmpty = $.trim($('#trainingSearch').val());
            })

            $('input[name="cbxFunction"]').each(function(){
                $(this).click(function(){
                    var data_location = $(this).attr("data-location")
                    $('.result-section').hide();
                    $('.result-section[data-country='+data_location+']').fadeIn(300)
                    $('.result-product.training-result').each(function(){
                        if($(this).find('.result-section:visible').size() == 0){
                            $(this).children('.category-heading').hide();
                        }else{
							$(this).children('.category-heading').show();
						}
                    });
                });
            });

			$(document).on('click','.search-course-btn a', function(e){
				e.preventDefault();
                var searchKey = $('.daterangepicker .search').val();
                var dateFrom = $('.from_date').val();
                var dateTo = $('.to_date').val();
	           var url ='';
                if(searchKey!='' && dateFrom!='' && dateTo!=''){
				url = "/content/hdscorp/en_us/lookup/search-training-detail.html?searchKey="+searchKey+"&lowerBound="+dateFrom+"&upperBound="+dateTo;
                }else{
				 url = "/content/hdscorp/en_us/lookup/search-training-detail.html?lowerBound="+dateFrom+"&upperBound="+dateTo;
                }
				alert(url);
                $.ajax({
					method: "GET",
					url: url
				  }).done(function(response) {
					//console.log(response);
					var html = $(response).find("#contentCatagory").html();
					console.log(html)
				     $('#contentCatagory').html(html)
			   });

                
            })


        }
    }
}(window, document, jQuery, hds));

$(function() {
    if($('#trainingDetail').length>0){
    hds.trainingDetail.init();
}
})