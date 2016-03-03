var hds = window.hds || {};

(function(window, document, $, hds) {

    hds.resourceLib = {
        init: function(options) {
            var defaults = {
                filterleftSide: '.newsEvents', 
                paginationWrapper: '#loadResourceContent',
                myPageName : "#page-",
                itemsPerPage: 10,
                filterTopLeft:'.filters-section',
                filterTarget:'.resource'           
            }
            this.options = $.extend(defaults, options);
            hds.resourceLib._bindEventsSelectors();
            hds.resourceLib._loadDataOnsearch();




        },
        _showFilterDropDown:function(arg){
            var optionSelected = this.options.filterTopLeft; 
                $(optionSelected).hide()  
                

            $(optionSelected).each(function(index, el) {
                if ($(this).attr('id') === arg ) { 
                    $(this).slideDown('slow');                   
                }else{
                    $(this).slideUp(2000);                     
                }
                return
            });

        },
        _processClickAside:function(url){             
            $("#prodnsolcategorycontent").html(" ").load(url+ " .resourceLibraryContent", function (responseText, textStatus){   
                 if ( textStatus === 'success' || textStatus === 'notmodified'){
                $('.resource-heading > h2').html(" ").html($('#asideLinks-product > li.active').find('a').text()); 
                $('.resource').addClass('visible'); 
                setTimeout(function(){hds.resourceLib._setPagination();}, 500); 
                }
            });  
        },
        _processCatagoryCards:function(url){             
            $("#featuredCards").html(" ").load(url+ " .resourceLibraryfeatered", function (responseText, textStatus){   
                 if ( textStatus === 'success' || textStatus === 'notmodified'){
                    console.log("Cards Loaded");
                }
            });  
        },
        _loadDataOnsearch:function(){
            var keyword=$.trim($("#resSearch").val());         

           
        },
        _processIndustryFilter:function(arg1, arg2){

            if(arg2==null){
                arg2=subfilter;
            }
            var paginations=this.options.paginationWrapper;
           $('.resource').removeAttr('style').removeClass('visible').filter(function() {
            var self = $(this);
            var result = true;
            var or_cond=false;
            var indCat = self.data('indstry').split(',');


            var checkMatches = $.grep(arg1, function(val) {                
                return or_cond = or_cond || $.inArray(val, indCat) !== -1;

             });
              
            result = (result && or_cond ) || checkMatches.length === arg1.length;
                   
            return result;

           }).addClass('visible');
            $(paginations).pagination('destroy');
           
                if($('.prodnsolcategorycontent .visible').length>10){
                $(paginations).pagination('redraw'); 
                }
           
        },
        _setPagination:function(){
            var paginations=this.options.paginationWrapper;
            var myPageName = this.options.myPageName;
            var items = $('.prodnsolcategorycontent .visible');
            var numItems = items.length;
            var perPage = this.options.itemsPerPage;
            if(numItems>perPage){
                 items.slice(perPage).hide();
                 
                 $(paginations).pagination({
                    items: numItems,
                    itemsOnPage: perPage,
                    cssStyle: "light-theme",
                    onPageClick: function(pageNumber) { 
                        var showFrom = perPage * (pageNumber - 1);
                            var showTo = showFrom + perPage;
                            items.hide().slice(showFrom, showTo).show();
                    }                  
                 });            
             }
            hds.resourceLib._hashPageNum();  
               
        },
        _displayHidendropMenu:function(){

        },
        _hashPageNum: function(){
          var myPageName = this.options.myPageName;
          var paginations=this.options.paginationWrapper;
          var hashPageNum = window.location.hash || (myPageName+"1");
          var re = new RegExp("^"+myPageName+"(\\d+)$");
              hashPageNum = hashPageNum.match(re); 
           if(hashPageNum){
             $(paginations).pagination("selectPage", parseInt(hashPageNum[1]));
           }          
        },
        _bindEventsSelectors:function(){
            $(document).on('click', '#asideLinks-product li > a', function(event) {
                    var self=$(this);
                    if(!self.parent('li').hasClass('active')){
                        $('#asideLinks-product li').removeClass('active')
                        var $url = $(this).attr('data-href');
                        self.parent('li').addClass('active');
                        self.addClass('active');
                        if ($(this).parent().has('ul').length) {
                        $(this).parent().find('ul').slideDown();
                        $(this).parent().find('.icon-accordion-opened').css('display', 'inline-block');
                        $(this).parent().find('.icon-accordion-closed').css('display', 'none');
                    }
                        hds.resourceLib._processClickAside($url); 
                        hds.resourceLib._processCatagoryCards($url);      
                    }
                event.preventDefault();                
            });
       
      // $(window).bind("popstate", hds.resourceLib._hashPageNum()); 


       $(document).on('click', '.resource-filters > a', function() { 
        var filterId=$(this).data('refilter');
        hds.resourceLib._showFilterDropDown(filterId);           
       });

           $(document).on('click', '#showIndustry', function(event) {
            var $allCheckedFilters =$('.FilterByIndustryList input.filters').filter(':checked');

            if ($allCheckedFilters.length > 0) {
                var checkedVals = $.map($allCheckedFilters, function(el) {
                    return el.value
                });

            }
            console.log(checkedVals)
            hds.resourceLib._processIndustryFilter(checkedVals);
            event.preventDefault();          
           });
        }
    }
}(window, document, jQuery, hds));


$(function() {
    if($('#sectionResourceLib').length>0){
    hds.resourceLib.init();
    }
})