var hds = window.hds || {};

(function(window, document, $, hds) {
    hds.loadDataFilters = {
        init: function(options) {
             var defaults = {
                     countToShow: 10,                    
                 }
             this.options = $.extend(defaults, options);
            hds.loadDataFilters.loadSubContent();
            hds.loadDataFilters.bindEventsOnLoad();
            hds.loadDataFilters.subListTab();
            hds.loadDataFilters.searchNavigator();
            hds.loadDataFilters.filterSearchResults();
            hds.loadDataFilters.bindEventsOnResize();
            hds.loadDataFilters.manageTopTabs();
            hds.loadDataFilters.manageAlphaSorting();
            hds.loadDataFilters.searchFilters();
            hds.loadDataFilters.updateTitleOnLoad();
            hds.loadDataFilters.lastVisibleProductResult();
        },
        
       updateTitleOnLoad: function(url) {
            $('.category-heading > h3').html(" ").html($('.product-listing > ul > li.active').find('a').text());
        },

        loadCatagoryContent: function(url) {
            var getURL = "",
                defSize=hds.loadDataFilters.countToShow;
            if (typeof url === 'undefined') {
               $("#loadCatagoryContent").attr('data-content', 'all');
            } else {
                getURL = url;
                $("#loadCatagoryContent").removeAttr('data-content');
            }           
             $('.toggleLinks').show();
            $("#loadCatagoryContent").html(" ").load(getURL + " .prodnsolcategorycontent ", function(responseText, textStatus) { 
                $('.category-heading > h2').html(" ").html($('.product-listing > ul > li.active').find('a').text());
                if (textStatus === 'success' || textStatus === 'notmodified') {
                    var sizeCatagoryList = $(".category-products-listing .product").size();
                    $("#loadCatagoryContent").find('.product').addClass('visible pAlphaSort');
                    hds.loadDataFilters.bindHTMLLoad();               
                    hds.loadDataFilters.loadSubContent();
                    hds.loadDataFilters.udatePageCount();
                    hds.loadDataFilters.lastVisibleProductResult();
                    if (sizeCatagoryList<=defSize) {
                        $('#loadMoreBtn').hide();
                    }
                    $("html, body").animate({scrollTop: $(".product-search-area").offset().top}, "slow");
                }   
            });
        },

        bindHTMLLoad: function() {
            if ($(window).width() < 991) {
                $('.product-listing li').each(function() {
                    if ($(this).hasClass('active') && $(this).index() > 0) {
                        $(this).find('.MobileHolderWrapper').append($('#contentCatagory').html());
                        $('#contentCatagory').empty();
                    }
                });
            } else {
                $('.product-listing li').each(function() {
                    if ($(this).hasClass('active') && $(this).index() > 0) {
                        $('#contentCatagory').append($(this).find('.MobileHolderWrapper').html());
                        $('.MobileHolderWrapper').empty();
                    }
                })
            }
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
                if (!$(this).parent().hasClass('active')) {
                    hds.loadDataFilters.setHTMLContainer();
                    $('#searchFilter').val('');
                    $('.clearProSearch').hide();
                    $('.toggleLinks a,.headerSort li a').removeClass('current');
                    $('.toggleLinks a:eq(0),.headerSort li a:eq(0)').addClass('current');
                    $('.headerSort').hide();     
                    $('.product-listing li').removeClass('active');
                    //$('.countProducts').show();
                    allPanels.slideUp();
                    var content = $(this).attr('data-href');
                    var offsetFirst=$($('.product-listing li:eq(0)')).offset().top;
                    var clickedIndexHeight= $(this).outerHeight();
                    var clickedIndex= $(this).parent().index();
                    var finalIndex=offsetFirst+(clickedIndexHeight*clickedIndex);
                    if($(window).width() < 991){                        
                     $("body, html").animate({ 
                            scrollTop: finalIndex                             
                        }, 600);
                   }
                    hds.loadDataFilters.loadCatagoryContent(content);
                    if ($(this).parent().index() == 0) {
                        $("#loadCatagoryContent").attr('data-content', 'all');
                    }
                    $(this).parent().addClass('active');
                    $('.filters').removeAttr('checked', 'false');
                    if ($(this).parent().has('ul').length) {
                        $(this).parent().find('ul').slideDown();
                    }                    
                } else {
                    return false;
                }
            });
        },
        lastVisibleProductResult:function(){
             $('.category-products-listing .product.visible').removeClass('border-last-product');
             $('.product.visible').each(function(){
              $('.product.visible:visible:last').addClass('border-last-product');
             })            
        },
        loadSubContent: function() {
            var sizeCatagoryList = $(".category-products-listing .product.visible").size(),
            x = this.options.countToShow;
            $('.product.visible').hide();
            $('.product.visible:lt(' + x + ')').show();          
                if (sizeCatagoryList <= x  ) {
                    $('#loadMoreBtn').hide();
                }else{
                     $('#loadMoreBtn').show();
                }
                hds.loadDataFilters.udatePageCount();  
        },
        loadSubContentProcess: function() {
            var sortClass;
            if($('.product.visible').hasClass('pFilterText')){
                sortClass = ".product.pFilterText";
            }else{
                sortClass = ".product.visible";
            }
            var sizeCatagoryList = $(".category-products-listing " + sortClass).size(),            
            x = $(".category-products-listing " +sortClass+":visible").size();
             hds.loadDataFilters.bindHTMLLoad();           
                x = (x + 10 <= sizeCatagoryList) ? x + 10 : sizeCatagoryList;
                $(sortClass+':lt(' + x + ')').show('medium');
                hds.loadDataFilters.udatePageCount();
                hds.loadDataFilters.lastVisibleProductResult();
                if (x == sizeCatagoryList) {
                    $('#loadMoreBtn').hide();
                }           
        },
        controlCount: function() {
            var sizeCatagoryList = $(".category-products-listing .product:visible").size();            
            hds.loadDataFilters.udatePageCount();            
        },
        udatePageCount: function() {
            var totalCount = 0;
            var actualCount = 0;
            $('div.product.visible').each(function(){
                if(!$(this).hasClass('hidden')){
                    totalCount = totalCount + 1;
                }    
            });
            if(totalCount <= 10){
                $('.countProducts').hide();
            }else{
                $('.countProducts').show();
            }
            var actualCount = $('div.product.visible:visible').size();             
            $("#TotalCount").html(' ').html(totalCount);
            $("#actualCount").html(' ').html(actualCount);
            hds.loadDataFilters.lastVisibleProductResult();
        },
        filterSearchResults: function() {
            $(document).on('change', '.product-listing input', function() {
                $('#searchFilter').val('');
                $('.clearProSearch').hide();
                $('.toggleLinks a,.headerSort li a').removeClass('current');
                $('.toggleLinks a:eq(0),.headerSort li a:eq(0)').addClass('current');
                $('.headerSort').hide();
                $('.product').removeClass('alphasort');
                $('.countProducts').show();

                $('.product').removeClass('hidden');
                 hds.loadDataFilters.checkSearchEmpty();
                $('#loadMoreBtn').hide();
                $('.no-matched-result').hide();
                $('.result-product .navLinks').show();
                hds.loadDataFilters.udatePageCount();
                $(".product.visible").addClass('pAlphaSort');
                if ($(".product:visible").length === 0) {
                    $('.toggleLinks').hide();
                    $('#loadCatagoryContent').find('.no-matched-result').remove();
                    $('#loadCatagoryContent').append('<div class="no-matched-result" style="padding: 50px 0; text-align: center;"><strong>No Products/Solutions Found</strong><br>Please change your search criteria and try again.</div>');
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
                    if($('#searchFilter').val() == ''){
                        $('.product').removeClass('hidden');
                        hds.loadDataFilters.loadSubContent();
                    }else{
                        $('.glyphicon-search').trigger('click');
                    }
                    $('.headerSort li a').removeClass('current');
                    $('.headerSort li a:eq(0)').addClass('current');
                    $('.headerSort').hide();
                    $('.countProducts').show();                    
                } else {
                    $('.countProducts').hide();
                    $('.product').addClass('alphasort');
                    $('.headerSort').show();
                    if ($('.product-listing input.filters').filter(':checked').length <= 0) {
                        $(".product").show()
                    }
                    $('#loadMoreBtn').hide();
                    hds.loadDataFilters.udatePageCount();
                }

                /* Check length of total visible product on tab switch */
                if($("div.product.visible").length == $(".product.hidden").length) {
                   $('#loadCatagoryContent').find('.no-matched-result').remove();
                   $('#loadCatagoryContent').append('<div class="no-matched-result" style="padding: 50px 0; text-align: center;"><strong>No Products/Solutions Found</strong><br>Please change your search criteria and try again.</div>');
                }else{
                   $('#loadCatagoryContent').find('.no-matched-result').remove();
                }
                e.preventDefault();
            })
        },
        manageAlphaSorting: function() {
             $(document).on('click', '.headerSort li a', function(e) {           
                var matchCount = 0;
                var getSearchFilter = $('#searchFilter').val();
                var ourClass = $(this).attr('data-cat');
                $('.headerSort li a').removeClass('current');
                $(this).addClass('current');
                
                $('.pAlphaSort').each(function(){                    
                    var thisAlpha = $(this).data('alpha');
                    if(thisAlpha == ourClass){
                        if(getSearchFilter.length > 0){
                            var selector = ':contains(' + getSearchFilter + ')';
                            if($(this).find('.filterText').is(selector)){
                                matchCount = matchCount + 1;
                                $(this).removeClass('hidden');
                            }else{
                                $(this).addClass('hidden');
                            }
                        }else{
                            if($(this).hasClass('visible')){
                                matchCount = matchCount + 1;
                                $(this).removeClass('hidden');
                            }
                        }
                    }else{                        
                        $(this).addClass('hidden');
                    }
                })

                if(ourClass == 'all'){ 
                    if(getSearchFilter.length <= 0){                   
                        $('.product.visible').removeClass('hidden');
                        $('#loadCatagoryContent').find('.no-matched-result').remove();
                    }else{
                        $('#loadCatagoryContent').find('.no-matched-result').remove();
                        $('.pAlphaSort').each(function(){
                            var selector = ':contains(' + getSearchFilter + ')';
                            if($(this).find('.filterText').is(selector)){
                                $(this).removeClass('hidden');
                            }else{
                                $(this).addClass('hidden');
                            }
                        })                      
                    }
                }else{
                    if(matchCount <= 0){
                        $('#loadCatagoryContent').find('.no-matched-result').remove();
                        $('#loadCatagoryContent').append('<div class="no-matched-result" style="padding: 50px 0; text-align: center;"><strong>No Products/Solutions Found</strong><br> Please change your search criteria and try again.</div>');
                    }else{
                        $('#loadCatagoryContent').find('.no-matched-result').remove();
                    }
                }
                return false;
            });
        },
        searchFilters: function() {
            jQuery.expr[':'].Contains = function(a, i, m) {
                return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
            };            
        },
        checkSearchEmpty: function() {
            var haveFilters = null;
            var $allCheckedFilters = $('.product-listing input.filters').filter(':checked');

            if ($allCheckedFilters.length > 0) {
                var checkedVals = $.map($allCheckedFilters, function(el) {
                    return el.value
                });
                haveFilters = checkedVals;
            } else{
                haveFilters = null;
            }            

            hds.loadDataFilters.updateSearchFilters(haveFilters);
            $('.toggleLinks').show();  
            setTimeout(function() {
                hds.loadDataFilters.controlCount();
                if ($(".product.visible:visible").length === 0) {
                $('.toggleLinks').hide();
                $('#loadCatagoryContent').find('.no-matched-result').remove();
                $('#loadCatagoryContent').append('<div class="no-matched-result" style="padding: 50px 0; text-align: center;"><strong>No Products/Solutions Found</strong><br> Please change your search criteria and try again.</div>');
            }
            }, 1000)
        },

        searchNavigator:function(){
            $(document).on('click', '.btn-square-white.request', function(){
                $("html, body").animate({
                    scrollTop: $(".product-search-area").offset().top
                }, "slow");
            })
        },
        updateSearchFilters: function(parm1) {
            var filters = {
                category: parm1
            };
            $('#loadCatagoryContent').find('.no-matched-result').remove();
            $('.product').removeAttr('style').removeClass('visible').filter(function() {
                var self = $(this),
                    result = true;

                Object.keys(filters).forEach(function(filter) {
                    var or_cond=false;
                    if ($.isArray(filters.category)) {
                        var cats = self.data('category').split(',');
                        var checkMatches = $.grep(filters.category, function(val, index) {                            
                            return or_cond = or_cond || $.inArray(val, cats) !== -1;
                        });
                        result = (result && or_cond ) || checkMatches.length === filters.category.length;     
                        return                   
                    }                                        
                });

                var totalFilterSelected = $('.product-listing input.filters').filter(':checked').length;
                //Multiple Description Logic START
                if(filters.category && totalFilterSelected < 2){
                    //Find the cat specific desc and show it + Hide the default description
                    self.children(".catdesc").each(function(i) {
                        var parentdiv = $(this);
                        var descTags = $(this).data('desctag');
                        var descArray = descTags.split(',');                        
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
                return result;
            }).addClass('visible');
            setTimeout(function() { 
                hds.loadDataFilters.lastVisibleProductResult();
                var sizeCatagoryList = $(".category-products-listing .product.visible:visible").size();
                if (sizeCatagoryList<=10) {
                   $('#loadMoreBtn').hide();
                }else{
                    hds.loadDataFilters.bindHTMLLoad();               
                    hds.loadDataFilters.loadSubContent();
                    hds.loadDataFilters.udatePageCount();
                }
            }, 500);
        },
        bindEventsOnResize: function() {
            $(window).resize(function() {
                hds.loadDataFilters.bindHTMLLoad();
            });           
        },
        bindEventsOnLoad: function() {
            /* Add visible class to all product by default on load */
            $("#loadCatagoryContent").find('.product').addClass('visible pAlphaSort');
            hds.loadDataFilters.loadSubContent();

            /* Load more products */
            $(document).on('click','#loadMoreBtn', function() {                
                hds.loadDataFilters.loadSubContentProcess();                
            });

            /* Product Search Input Field Events Code */
            $(document).on('keypress', '#searchFilter', function(event) {
                var keycode = (event.keyCode ? event.keyCode : event.which);
                var getSearchFilter = $(this).val();
                if(keycode == 13) {
                    event.preventDefault();                 
                    if (getSearchFilter.length > 0) {
                        $('.glyphicon-search').trigger('click');
                    } else {                     
                        return false;
                    }                
                }                               
            });
            
            $(document).on('keydown', '#searchFilter', function(event) {
                var key = event.keyCode || event.charCode;
                var getSearchFilter = $.trim($(this).val());
                if( key == 8 || key == 46 ){                    
                     if (getSearchFilter.length === 0) {
                         hds.loadDataFilters.checkSearchEmpty();                         
                     }
                }
            })

            $(document).on('keyup', '#searchFilter', function(event) {
                var value = $.trim($(this).val());
                if (value.length > 0) {
                    $('.clearProSearch').show();
                } else {
                    $('.clearProSearch').hide();
                    $('#loadCatagoryContent').find('.no-matched-result').remove();
                    $('.product.visible').removeClass('hidden pFilterText');
                    $('.product').removeAttr('style').removeClass('alphasort');
                    $('.toggleLinks a,.headerSort li a').removeClass('current');
                    $('.toggleLinks a:eq(0),.headerSort li a:eq(0)').addClass('current');
                    $('.headerSort').hide();
                    $('.countProducts').show();
                    hds.loadDataFilters.loadSubContent();
                }
                event.preventDefault();
            });
            
            $(document).on('click', '.glyphicon-search', function(event) { 
                var matchCount = 0;
                $('.toggleLinks a,.headerSort li a').removeClass('current');
                $('.toggleLinks a:eq(0),.headerSort li a:eq(0)').addClass('current');
                $('.headerSort').hide();
                $('.product').removeAttr('style').removeClass('alphasort pFilterText');
                $('.countProducts').show();
                $('#loadMoreBtn').hide();
                $('.result-product .navLinks').show();
                var getSearchFilter = $('#searchFilter').val();
                if(getSearchFilter.length > 0){
                    $('#loadCatagoryContent').find('.dataKeyword').remove();
                    $('#loadCatagoryContent').append('<div class="dataKeyword" style="display:none;"></div>');
                    var selector = ':contains(' + getSearchFilter + ')';
                    $('.product.visible').each(function(i){                        
                        $('.dataKeyword').html($(this).data('keywords'));
                       if($(this).find('.filterText').is(selector)){
                            matchCount = matchCount + 1;
                            $(this).removeAttr('style').removeClass('hidden').addClass('pFilterText');
                        }else{
                            if($('#loadCatagoryContent').find('.dataKeyword').is(selector)){
                                matchCount = matchCount + 1;
                                $(this).removeAttr('style').removeClass('hidden').addClass('pFilterText');
                            }else{
                                $(this).addClass('hidden');
                            }
                        }    

                    })                                        
                    if(matchCount <= 0){
                        $('#loadCatagoryContent').find('.no-matched-result').remove();
                        $('#loadCatagoryContent').append('<div class="no-matched-result" style="padding: 50px 0; text-align: center;"><strong>No Products/Solutions Found</strong><br> Please change your search criteria and try again.</div>');
                        hds.loadDataFilters.udatePageCount();
                    }else{
                        $('#loadCatagoryContent').find('.no-matched-result').remove();
                        var sizeCatagoryList = $(".product.pFilterText:visible").size(),
                        x = 10;
                        $('.product.pFilterText').hide();
                        $('.product.pFilterText:lt(' + x + ')').show();          
                        if (sizeCatagoryList <= x  ) {
                            $('#loadMoreBtn').hide();
                        }else{
                             $('#loadMoreBtn').show();
                        }
                        hds.loadDataFilters.udatePageCount();                       
                    }
                }
                event.preventDefault();
            });            

            /* Clear Search Products Code */
            $(document).on('click', '.clearProSearch', function(event) {
                $('#searchFilter').val('');
                if($('#searchFilter').val() == ""){
                    $('#loadCatagoryContent').find('.no-matched-result').remove();
                    $('.product.visible').removeClass('hidden pFilterText');
                    $('.product').removeAttr('style').removeClass('alphasort');
                    $('.toggleLinks a,.headerSort li a').removeClass('current');
                    $('.toggleLinks a:eq(0),.headerSort li a:eq(0)').addClass('current');
                    $('.headerSort').hide();
                    $('.countProducts').show();
                    hds.loadDataFilters.loadSubContent();
                }
                $(this).hide();                
                event.preventDefault();
            });

            $.expr[":"].contains = $.expr.createPseudo(function (arg) {
                return function (elem) {
                    return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
                };
            });
        }
    }

}(window, document, jQuery, hds));

$(function() {
    if ( $('.productsolutionlanding').length > 0){
        hds.loadDataFilters.init();
    }    
})