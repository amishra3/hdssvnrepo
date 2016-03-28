var hds = window.hds || {};

(function(window, document, $, hds) {
    hds.loadDataFilters = {
        init: function() {
			hds.loadDataFilters.loadSubContent();
            //hds.loadDataFilters.loadCatagoryContent();
            hds.loadDataFilters.subListTab();
            hds.loadDataFilters.searchNavigator();
            hds.loadDataFilters.filterSearchResults();
            hds.loadDataFilters.bindEventsOnResize();
            hds.loadDataFilters.manageTopTabs();
            hds.loadDataFilters.manageAlphaSorting();
            hds.loadDataFilters.searchFilters();
            hds.loadDataFilters.updateTitleOnLoad();
        },
        
       updateTitleOnLoad: function(url) {
        	$('.category-heading > h3').html(" ").html($('.product-listing > ul > li.active').find('a').text());
        },

        loadCatagoryContent: function(url) {
            var getURL = "";
            if (typeof url === 'undefined') {
              // getURL = $('.product-listing > ul > li').eq(0).find("a").attr("data-href");
              // $('.product-listing > ul > li').eq(0).addClass('active');
               $("#loadCatagoryContent").attr('data-content', 'all');
            } else {
                getURL = url;
                $("#loadCatagoryContent").removeAttr('data-content');
            }
            $("#loadCatagoryContent").html(" ").load(getURL + " .prodnsolcategorycontent ", function() {                
                hds.loadDataFilters.loadSubContent();
                hds.loadDataFilters.bindHTMLLoad();
                $('.category-heading > h2').html(" ").html($('.product-listing > ul > li.active').find('a').text());
                $('#loadMoreBtn').show();
                hds.loadDataFilters.udatePageCount();
            });
        },

        bindHTMLLoad: function() {
            if ($(window).width() < 991) {
                $('.product-listing li').each(function() {
                    if ($(this).hasClass('active') && $(this).index() > 1) {
                        $(this).find('.MobileHolderWrapper').append($('#contentCatagory').html());
                        $('#contentCatagory').empty();
                    }
                });
            } else {
                $('.product-listing li').each(function() {
                    if ($(this).hasClass('active') && $(this).index() > 1) {
                        $('#contentCatagory').append($(this).find('.MobileHolderWrapper').html());
                        $('.MobileHolderWrapper').empty();
                    }
                })
            }
        },

        bindEventsOnResize: function() {
            $(window).resize(function() {
                hds.loadDataFilters.bindHTMLLoad();
            });
        },
        setHTMLContainer: function() {
            if ($(window).width() < 991) {
                $('.product-listing li').each(function() {
                    if ($.trim($(this).find('.MobileHolderWrapper').html())) {
                        $('#contentCatagory').append($(this).find('.MobileHolderWrapper').html());
                        $(this).find('.MobileHolderWrapper').empty();
                    }
                });
            }
        },
        subListTab: function() {
            var allPanels = $('.product-listing li ul').hide();
            $('.product-listing li a').on('click', function(event ) {
            	event.preventDefault();
                hds.loadDataFilters.setHTMLContainer();
                if (!$(this).parent().hasClass('active')) {
                    $('#searchFilter').val('');
                    $('.toggleLinks a,.headerSort li a').removeClass('current');
                    $('.toggleLinks a:eq(0),.headerSort li a:eq(0)').addClass('current');
                    $('.headerSort').hide();     
                    $('.product-listing li').removeClass('active');
                    $('.countProducts').show();
                    allPanels.slideUp();
                    var content = $(this).attr('data-href');
                    hds.loadDataFilters.loadCatagoryContent(content);
                    if ($(this).parent().index() == 0) {
                        $("#loadCatagoryContent").attr('data-content', 'all');
                    }
                    /*$(this).parent().find('.icon-accordion-opened').css('display', 'none');
                    $(this).parent().find('.icon-accordion-closed').css('display', 'inline-block');*/
                    $(this).parent().addClass('active');
                    $('.filters').removeAttr('checked', 'false');
                    if ($(this).parent().has('ul').length) {
                        $(this).parent().find('ul').slideDown();
                        /*$(this).parent().find('.icon-accordion-opened').css('display', 'inline-block');
                        $(this).parent().find('.icon-accordion-closed').css('display', 'none');*/
                    }
                } else {
                    return false;
                }

            });
        },

        loadSubContent: function() {
            sizeCatagoryList = $(".category-products-listing .product").size();
            x = 10;
            $('.product:lt(' + x + ')').show('medium');
             hds.loadDataFilters.bindHTMLLoad();
             hds.loadDataFilters.udatePageCount();
            $(document).delegate('#loadMoreBtn', 'click', function() {
                x = (x + 15 <= sizeCatagoryList) ? x + 15 : sizeCatagoryList;
                $('.product:lt(' + x + ')').show('medium');
                hds.loadDataFilters.udatePageCount();
                if (x == sizeCatagoryList) {
                    $('#loadMoreBtn').hide();
                }
            });
        },
        controlCount: function() {
            var sizeCatagoryList = $(".category-products-listing .product:visible").size();
            var x = 10;
            x = (x + 15 <= sizeCatagoryList) ? x + 15 : sizeCatagoryList;
            $('.category-products-listing .product:visible:lt(' + x + ')').show();
            hds.loadDataFilters.udatePageCount();
            if (x == sizeCatagoryList) {
                $('#loadMoreBtn').hide();
            }
        },
        udatePageCount: function() {
            var totalCount = $('div.product').size();
            var actualCount = $('div.product:visible').size();
            $("#TotalCount").html(' ').html(totalCount);
            $("#actualCount").html(' ').html(actualCount);
        },
        filterSearchResults: function() {
            $(document).on('change', '.product-listing input', function() {
                $('#searchFilter').val('');
                $('.toggleLinks a,.headerSort li a').removeClass('current');
                $('.toggleLinks a:eq(0),.headerSort li a:eq(0)').addClass('current');
                $('.headerSort').hide();
                $('.product').removeClass('alphasort');
                $('.countProducts').show();
                 hds.loadDataFilters.checkSearchEmpty();
                $('#loadMoreBtn').hide();
                $('.no-matched-result').hide();
                $('.result-product .navLinks').show();
                hds.loadDataFilters.udatePageCount();
                if ($(".product:visible").length === 0) {
                   // $('.result-product .navLinks,.headerSort').hide();
                    $('#loadCatagoryContent').find('.no-matched-result').remove();
                    $('#loadCatagoryContent').append('<div class="no-matched-result" style="padding: 50px 0; text-align: center;">No results found.</div>');
                }
            });
        },
        manageTopTabs: function() {
            $(document).on('click', '[data-tab]', function(e) {
                var tab_id = $(this).attr('data-tab');
                $('[data-tab]').removeClass('current');
                $(this).addClass('current');
                $("#" + tab_id).addClass('current');
                if ($(this).attr('data-tab') === "tab-1") {

                    $('.product').removeClass('alphasort');
                    $('.headerSort li a').removeClass('current');
                    $('.headerSort li a:eq(0)').addClass('current');
                    $('.headerSort').hide();
                    $('.countProducts').show();

                } else {
                    $('.countProducts').hide();
                    $('.product').addClass('alphasort');
                    $('.headerSort').show();
                    if ($('.product-listing input.filters').filter(':checked').length <= 0) {
                        $(".product").show('medium')
                    }
                    $('#loadMoreBtn').hide();
                }
                e.preventDefault();
            })
        },
        manageAlphaSorting: function() {
            $('.headerSort li a').click(function() {
                var ourClass = $(this).attr('data-cat');
                $('.headerSort li a').removeClass('current');
                $(this).addClass('current');
                hds.loadDataFilters.checkSearchEmpty();
                return false;
            });
        },
        searchFilters: function() {
            jQuery.expr[':'].Contains = function(a, i, m) {
                return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
            };

            $(document).on('keypress', '#searchFilter', function(event) {
            	var keycode = (event.keyCode ? event.keyCode : event.which);
            	if(keycode == 13) {
	            	event.preventDefault();
	                var getSearchFilter = $(this).val();
	                if (getSearchFilter.length > 0) {
	                    hds.loadDataFilters.checkSearchEmpty();
	                } else {
	                   hds.loadDataFilters.checkSearchEmpty();
	
	                }                
            	}
            });
            $(document).on('click', '.glyphicon-search', function(event) {
                //alert("..");
            	event.preventDefault();
	                var getSearchFilter = $('#searchFilter').val();
	                if (getSearchFilter.length > 0) {
	                    hds.loadDataFilters.checkSearchEmpty();
	                } else {
	                   hds.loadDataFilters.checkSearchEmpty();

	                }               

            });
        },
        checkSearchEmpty: function() {
            var alphaSelected = null,
                haveFilters = null,
                haveTextInInput=null;
            var $ourClass = $('.headerSort li a.current').attr('data-cat'),
                $allCheckedFilters = $('.product-listing input.filters').filter(':checked'),
                $searchBox = $('#searchFilter').val();

            if ($ourClass === 'all') {
                alphaSelected = null;
            } 
             if ($ourClass !== 'all') {
                alphaSelected = $ourClass;
            } 
             if ($allCheckedFilters.length > 0) {
                var checkedVals = $.map($allCheckedFilters, function(el) {
                    return el.value
                });
                haveFilters = checkedVals;
            } 
             if ($allCheckedFilters.length < 0) {
                haveFilters = null;
            } 
             if ($.trim($searchBox).length > 0) {
                haveTextInInput = 'inputsearc';
            } 
             if ($.trim($searchBox).length < 0) {
                haveTextInInput = null;
            }
             $('.product').find('li').addClass("filterText");
            hds.loadDataFilters.updateSearchFilters(alphaSelected, haveFilters, haveTextInInput);
            setTimeout(function() {
                hds.loadDataFilters.controlCount();
                 if ($(".product:visible").length === 0) {
                $('#loadCatagoryContent').find('.no-matched-result').remove();
                $('#loadCatagoryContent').append('<div class="no-matched-result" style="padding: 50px 0; text-align: center;">No results found.</div>');
            }

            }, 1000);
        },

        searchNavigator:function(){
            $(document).on('click', '.btn-square-white.request', function(){
                $("html, body").animate({
                    scrollTop: $(".product-search-area").offset().top
                }, "slow");
            })
        },
        updateSearchFilters: function(parm1, parm2, param3) {
            var filters = {
                alpha: parm1,
                category: parm2,
                textFilter: param3
            };
            $('#loadCatagoryContent').find('.no-matched-result').remove();
            $('.product').hide().filter(function() {
                var self = $(this),
                    result = true; // not guilty until proven guilty

                Object.keys(filters).forEach(function(filter) {
                    var or_cond=false;
                    if ($.isArray(filters[filter])) {
                        var cats = self.data('category').split(',');
                        var checkMatches = $.grep(filters[filter], function(val, index) {
							console.log((val+"-----"+cats));
                            return or_cond = or_cond || $.inArray(val, cats) !== -1;
                          //return $.inArray(val, cats) !== -1;
                        });
                        result = (result && or_cond ) || checkMatches.length === filters[filter].length;
                        return
                    } else {
                        if (filters[filter]) {
                            if ((filters[filter] != 'inputsearc')) {

                                result = result && filters[filter] === self.data(filter);
                            } else {
                                jQuery.expr[':'].Contains = function(a, i, m) {
                                    return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
                                };
                                var getSearchFilter = $('#searchFilter').val();
                                self.show();
								$('#loadMoreBtn').hide();
                                self.find(".filterText").parent().show();
                                var excludeList= self.find(".filterText:not(:Contains('" + getSearchFilter + "'))");
                                 if(excludeList.length>0)
                               		self.find("a.filterText").parent().slideUp(function() { $(this).parent().slideUp();});
                                
                                 var includeList=self.find(".filterText:Contains('" + getSearchFilter + "')");
                                 if(includeList.length>0)
                                     self.find("a.filterText").parent().slideDown(function() { $(this).parent().slideDown();});

                            }
                        }
                    }
                });

                var totalFilterSelected = $('.product-listing input.filters').filter(':checked').length;
                //Multiple Description Logic START
                if(filters.category && totalFilterSelected < 2){
                	//Find the cat specific desc and show it + Hide the default description
                    self.children(".catdesc").each(function(i) {
                    	var parentdiv = $(this);
                    	var descTags = $(this).data('desctag');
                    	var descArray = descTags.split(',') ;
                    	
                    	$.each( descArray , function(index, value) {
                    		if($.inArray( value,filters.category) > -1 ){
                    			if(!parentdiv.siblings('.catdefaultdesc').hasClass( "hidden")){
                    				parentdiv.siblings('.catdefaultdesc').addClass( "hidden");	
                    			}
                    			parentdiv.siblings('.deafultdesc').addClass( "hidden");
                    			parentdiv.siblings('.catdesc').addClass( "hidden");
                    			parentdiv.removeClass( "hidden");
                    			return false;
                    		}
                    	});
                    });
                	
                }else{
                	if(self.children('.catdefaultdesc').length>0){
                		self.children('.catdesc').each(function(index){
                			 $(this).addClass( "hidden");	
                		});
                		
                		self.children('.catdefaultdesc').each(function(index){
                			$(this).removeClass( "hidden");
                		});
                			
            		}else{
                		self.children('.catdesc').each(function(index){
               			 $(this).addClass( "hidden");	
	               		});
	               		
	               		self.children('.deafultdesc').each(function(index){
	               			$(this).removeClass( "hidden");
	               		});
            		}
                }
                //Multiple Description Logic END

                return result;
            }).show('medium');
           // hds.loadDataFilters.udatePageCount();


        }
    }

}(window, document, jQuery, hds));

$(function() {
	if ( $('.productsolutionlanding').length > 0){
		hds.loadDataFilters.init();
	}    
})
