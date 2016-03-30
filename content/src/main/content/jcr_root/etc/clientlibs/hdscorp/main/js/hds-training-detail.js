
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
			
			

				var regex = /[#&]([^=#]+)=([^&#]*)/g,
                    url = window.location.href,
                    params = {},
                    match;
                while(match = regex.exec(url)) {
                    params[match[1]] = match[2];
                }

			var searchKey = params.searchKey; 
			var dateFrom = params.lowerBound; 
			var dateTo = params.upperBound; 
			var locations = params.locations; 
            $(document).on('click', '.search-course-btn', function(event) {
                var self = $(this),
                    checkInputIfEmpty = $.trim($('#trainingSearch').val());
            })
			if(dateFrom && dateFrom != ""){
				$('.from_date').val(dateFrom)	
			}
			if(dateTo && dateTo != ""){
				$('.to_date').val(dateTo)
			}
			if(searchKey && searchKey != ""){
				$('.search').val(searchKey)
			}
			getResults(true)
			if(locations && locations != ""){
				console.log($('input[id='+locations.toUpperCase()+']'))
				setTimeout(function(){
					
					$('input[countryid='+locations+']').click()
					$('input[countryid='+locations+']').attr('checked','checked')
				},4000);
			}
			
			// filter the results based on the checkbox values selected // 
		   //	**********************START****************************//
			 $('input[name="cbxFunction"]').on('click', function () {

				var locations_list = [];
				$('input[name="cbxFunction"]:checked').each(function(){
				  var locations = $(this).attr("data-location");
				  locations_list.push(locations);//Push each check item's value into an array
				});
				console.log(locations_list);
				$('.result-section').each(function(index){
				  var item = $(this).attr('data-country');
                    if(jQuery.inArray(item,locations_list) > -1){//Check if data-tag's value exist in array
						$(this).show();
						$(this).parent().parent().parent().show();
						$(this).parent().parent().prev().show();
						$(this).attr('filter','show')
                        console.log(item);
                    }
                    else{
                        $(this).hide();
						$(this).attr('filter','hide')
                    }
				});
				if ($('input[name="cbxFunction"]:checkbox:checked').length > 0){
						console.log("filters selected")
					}else{
						console.log(" no filters selected")
						$('.result-section:lt('+max_items_page+')').show();
						$('.result-product').show();
						$('.result-product').each(function(){
							if($(this).find('.result-section:visible').length == 0){
								$(this).hide();
							}
							else{
								$(this).show()
							}
						});
						//$('.result-section').show();
						$('.result-section').attr('filter','show');
						//loadMoreResults();
				}
				$('.result-section[filter="show"]').hide();
				$('.result-section[filter="show"]:lt('+max_items_page+')').show();
				loadMoreResults();
			});
			// filter the results based on the checkbox values selected // 
		   //	**********************END****************************//

            
			$(document).on('change input paste focus','.from_date, .to_date, .search ', function(e){
				$('.errorSearchField').html("").hide(200);
			});
			
			var max_items_page = 10;
			var shown = null;
			var items = $(".result-section").length;
			$('.result-section:lt('+max_items_page+')').show();
			
			
			
			// load results 10 at a time // 
		   // ***********END***********//
			
			function loadMoreResults(){
				max_items_page = 10;
				shown = null;
				items = $(".result-section").length;

				//$('.result-section:lt('+max_items_page+')').show();
				$('#contentCatagory').css('visibility','visible');
				$('.result-product').each(function(){
						if($(this).find('.result-section:visible').length == 0){
							$(this).hide();
						}
						else{
							$(this).show()
						}
				});
				if($('.result-section[filter="show"]').size() < 10 && $('.result-section[filter="show"]').size() != 0 ){
					console.log("less results after filters")
					$('.result-btn a').hide();
					$('.noResults').remove();
				}else if($('.result-section[filter="show"]').size() == 0){
					console.log("no results after filters")
					$('.result-btn a').hide();
					$('.noResults').remove();
					$('.searchnotfound').append("<div class='noResults' style='background-color: transparent; padding: 8px 35px; color: rgb(0, 0, 0); text-align: center;'>No records found</div>");
				}else{
					$('.noResults').remove();
					$('.result-btn a').show();
				}
				
				$('.result-btn a').unbind('click').click(function(e){
					console.log("clicked")
					$('.result-product').show();
					shown = $('.result-section:visible').length+max_items_page;
					
					if(shown<items) {console.log(shown)
						$('.result-section[filter="show"]:lt('+shown+')').show();
					}else {console.log("else"+shown)
						$('.result-section[filter="show"]:lt('+items+')').show();
						$('.result-btn a').hide();
					}
					$('.result-product').each(function(){
						if($(this).find('.result-section:visible').length == 0){
							$(this).hide();
						}
						else{
							$(this).show()
						}
					});
					return;
				});
			}

			loadMoreResults();
			var searchKey = $('.daterangepicker .search').val();
			var dateFrom = $('.from_date').val();
			var dateTo = $('.to_date').val();
			var url ='';
			function getResults(skipFilter){
               	searchKey = $('.daterangepicker .search').val();
				dateFrom = $('.from_date').val();
				dateTo = $('.to_date').val();
				url ='';
					if(searchKey!='' && dateFrom!='' && dateTo!=''){
						url = "/content/hdscorp/en_us/lookup/search-training-detail.html?searchKey="+searchKey+"&lowerBound="+dateFrom+"&upperBound="+dateTo;

					}else if(searchKey=='' && dateFrom!='' && dateTo!=''){
						url = "/content/hdscorp/en_us/lookup/search-training-detail.html?lowerBound="+dateFrom+"&upperBound="+dateTo;
					}else if(searchKey=='' && dateFrom=='' && dateTo=='' ){
						url = "/content/hdscorp/en_us/lookup/search-training-detail.html"
					}else{
						url = "/content/hdscorp/en_us/lookup/search-training-detail.html?searchKey="+searchKey;
					}
					if(searchKey != '' || (dateFrom != '' && dateTo != '') || skipFilter == true){
						$.ajax({
							method: "GET",
							url: url
						  }).done(function(response) {
							//console.log(response);
							var html = $(response).find("#contentCatagory").html();
							console.log($(html).find(".result-product").length)
							$('#contentCatagory').html(html)
							if($(".result-product").length == 0){
								console.log('no results')
								$('.result-btn a').hide();
								$('.searchnotfound').append("<div style='background-color: transparent; padding: 8px 35px; color: rgb(0, 0, 0); text-align: center;'>No records found</div>");
								return false;
							}
							 $('#contentCatagory').html(html)
							 $('.result-section:lt('+max_items_page+')').show();
							 $('#asideLinks-product li').removeClass('active')
							 $('#asideLinks-product li:first-child').addClass('active')
							 $("#asideLinks-product li").children('ul').hide().find('input:checkbox').removeAttr('checked');
							 $("#asideLinks-product li").children('a').children('.icon-accordion-closed').show();
							 $("#asideLinks-product li").children('a').children('.icon-accordion-opened').hide();
							 loadMoreResults();
					   });
					}else{
						$('.errorSearchField').html("Please enter a search term or date").show();
					}
				}


			$(document).on('keypress','.search', function(e){
				//e.preventDefault();
				if(e.which == 13){
					getResults(false);
				}

			});

			$(document).on('click','.search-course-btn a', function(e){
				e.preventDefault();
				getResults(false);
            });

			$('#asideLinks-product li').each(function(index){
				var liIndex = index
					if(liIndex == 0){
						$('#asideLinks-product li').removeClass('active')
						$(this).addClass('active')
						$("#asideLinks-product li").children('a').children('.icon-accordion-opened').hide();
						$("#asideLinks-product li").children('a').children('.icon-accordion-closed').show();
						$("#asideLinks-product li").children('ul').hide().find('input:checkbox').removeAttr('checked');
					}
					$(this).click(function(){
						$('#asideLinks-product li').removeClass('active')
						$(this).addClass('active')
						$(this).children('ul').show();
						$("#asideLinks-product li").children('a').children('.icon-accordion-closed').show();
						$("#asideLinks-product li").children('a').children('.icon-accordion-opened').hide();
						$(this).children('a').children('.icon-accordion-opened').show();
						$(this).children('a').children('.icon-accordion-closed').hide();
						if(liIndex == 0){
							getResults(true);
							$('.result-section').show();
							$("#asideLinks-product li").children('ul').hide().find('input:checkbox').removeAttr('checked');
						}
					});
			});


        }
    }
}(window, document, jQuery, hds));

$(function() {
    if($('#trainingDetail').length>0){
    hds.trainingDetail.init();
}
})
