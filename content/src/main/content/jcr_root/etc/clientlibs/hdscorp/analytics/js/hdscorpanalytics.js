var digitalData = digitalData || {};
var data=getCurrentBreadcrumb();

data = data.replace(/[`‐~!@#$®™%^*()_|+"\-=?;–'“”’,.<>\{\}\[\]\\\/]/gi, ' ');
data = data.replace(/\s{2,}/g,' ');
data = data.toLowerCase();
items = data.split(":");
count = items.length;
if(pageTitle!="Home")
{
    data=data.substring(data.indexOf(":")+1);
}
console.log("data--"+data);

var activeLinkText="top";
var isTabClicked=false;
var desktopType="desktop";
var orientation="landscape";
var screenSize;
var delay=4000;
pageTitle=pageTitle.toLowerCase();
$(document).ready(function() {
if (/Mobi/.test(navigator.userAgent)) {
    desktopType="mobile";

    if (Math.abs(window.orientation) === 90) {
        orientation="landscape";
    }
    else{
        orientation="portrait";
    }
}
else{
if (screen.height < screen.width) {
        orientation="landscape";
    }
    else{
        orientation="portrait";
    }
}

var screenSize = screen.width+"x" +screen.height;

console.log("count"+count);
for(index=0;index<count;index++)
{
 if(index>0 && index<(count-1) )
  {
    console.log("index"+index);
  	switch(index)
  	{
  		case 1:
  		  primaryCategory=items[index];
  		  break;
  		  case 2:
  		  subSection=items[index];
  		  break;
		}
  }

}
if(primaryCategory=="")
	primaryCategory=pageTitle;

if(subSection=="" && items.length>=3)
	subSection=pageTitle;

if(isProductCategory())
{
	setVirtualCategoryEvent();

    var cLeftNav = $('ul[id=asideLinks]');
	cLeftNav.each(function() {

	 	var links = $(this).find("a");
	 	links.each(function() {

            $(this).click(function(){
                setTimeout(function() {
                setVirtualCategoryEvent();
    			 }, 1000);
             });
        });
	});
}

digitalData.page={
	pageInfo:{
	pageName: pageTitle,
	pageType: primaryCategory,
	hier1:data,
    },
	category:{
	primaryCategory: primaryCategory,
	}
	}
digitalData.site={
        siteInfo:{
        language:"en",
        server:"hds",
        country:"us"
        },
        dimensions:{
        deviceType:desktopType,
        screensize:screenSize,
        Orientation:orientation
        }
	}
	digitalData.user={
        userInfo:{
            authStatus:"guest"
        }
    }

if(isErrorPage())
{
    digitalData["page"]["pageInfo"]["pageLoadEvent"]="404 error";
    digitalData["page"]["pageInfo"]["errorMessage"]="page not found";

}
   if(isProductDetail())
    {
        digitalData["page"]["category"]["productName"]=pageTitle;
        digitalData["page"]["category"]["productInfo"]="product";
    }

if(subSection!="" && subSection.length>0)
    {
        digitalData["page"]["category"]["subSection"]=subSection;
        
    }

console.log("digitalData-------"+JSON.stringify(digitalData));


//Header Links Custom Tracking
	$(".globalNavWrapper").each(function() {
     var listitem = $(this).find("a");
      if( listitem.length>0)
	 {
		 listitem.each(function() {
			 var linktext = $(this).text();
             if(linktext=="" || linktext.length==0)
             {
                linktext= $(this).children().attr("title");
             }
              if(linktext=="" || linktext.length==0)
             {
                linktext= $(this).children().text();
             }
                 linktext = $.trim(linktext);
            $(this).click(function(){
				var megamenuHeader=$(this).closest(".hds-megaMenu");
                var category="";
                console.log(megamenuHeader);
                if(megamenuHeader && megamenuHeader!='undefined' && megamenuHeader!='null')
        			category = megamenuHeader.find('h2').find('a').text();
                var triggerName="us>mm>"+linktext.toLowerCase();
                if(category!="" && category.length>0)
					triggerName="us>mm>"+category.toLowerCase()+">"+linktext.toLowerCase();
                globalMenuClick("linkclick",triggerName,pageTitle,"link","mega menu"); 

            });
		});                 
     }
    });	
$(".hds-quick-navigation").each(function() {
     var listitem = $(this).find("a");
     if( listitem.length>0)
	 {
		 listitem.each(function() {
		 var linktext = jQuery(this).text();
          linktext = $.trim(linktext);
            $(this).click(function(){globalMenuClick("linkclick","us>tm>"+linktext.toLowerCase(),pageTitle,"link","top menu"); });
		});                 
     }
    });	
$(".hds-main-navigation h5").each(function() {
     var listitem = $(this).find("a");
     if( listitem.length>0)
	 {
		 listitem.each(function() {
		 linktext= $(this).children().text();
		 linktext=linktext.replace(/\t/g, '');
         linktext=linktext.replace(/\n/g, '');
         linktext = $.trim(linktext);

			$(this).click(function(){globalMenuClick("linkclick","us>tm>"+linktext.toLowerCase(),pageTitle,"link","top menu"); });
		});                 
     }
    });	
	//Footer links tracking
	jQuery("div.footer").each(function() {
		var links = jQuery(this).find("a");
	   links.each(function() {
		 var linktext = jQuery(this).text();
           if(linktext=="" || linktext.length==0)
		 {
		 	linktext= jQuery(this).children().attr("title");
		 }
		 $(this).click(function(){globalMenuClick("linkclick","us>ft>"+linktext.toLowerCase(),pageTitle,"link","footer"); });
	  })

	});	

//Tabs Custom Tracking
	$(".stickNav-container").each(function() {
	 	var links = $(this).find("a")
       links.each(function() {
		 	$(this).click(function(){
                isTabClicked=true;
                var tabTitle = "tab-"+$(this).text().toLowerCase().replace(/\s/g,"-")+" button";
                tabClick(primaryCategory,tabTitle,pageTitle,"Tabclick"); 
            });
	  	});

	});
    $(window).on('scroll', function(){
        var tabs = $(".stickNav-container");
		var activeLink = tabs.find("a.active");
        if(activeLink.text()!="" && activeLinkText!=activeLink.text())
        {
             activeLinkText=activeLink.text();
            setTimeout(function() {
                if(!isTabClicked)
                {
                    if(activeLinkText==activeLink.text())
                    {
                        console.log("Tracking tabs");
    					var tabTitle = "tab-"+activeLink.text().toLowerCase().replace(/\s/g,"-")+" scroll";
    					console.log("tabTitle=="+tabTitle);
                        tabClick(primaryCategory,tabTitle,pageTitle,"Tabscroll");
                    }
                    isTabClicked=false;
                }
               
			}, delay);

        }

       });

//products search events start here
$(document).on('keypress', '#searchFilter', function(event) {
    if(event.which == 13) {
    setTimeout(function() {
	var searchTerm=$('#searchFilter').val();
	var result=$('#actualCount').text();
         if(result==0)
             result="zero";
     searchClick(searchTerm, "search box",result,getProductsSearchFilters(),'products & solutions','specificSearchClick');
         }, 1500); 
    }            
    });

    $(document).on('click', '.prodnsolproductlisting .glyphicon-search', function(event) {
    	         event.preventDefault();
	               setTimeout(function() {
					var searchTerm=$('#searchFilter').val();
                    var result=$('#actualCount').text();
                         if(result==0)
                             result="zero";
                     searchClick(searchTerm, "search box",result,getProductsSearchFilters(),'products & solutions','specificSearchClick');
                         }, 1500);           

            });
	$('.product-listing input.filters').each(function() {
		 $(this).click(function(){
			 setTimeout(function() {
			   var text = $(this).parent().find("span").text();
       			var result=$('#actualCount').text();
         		if(result==0)
           		  result="zero";
                searchClick($('#searchFilter').val(), "sub-category filter",result,getProductsSearchFilters(),'products & solutions','specificSearchClick');
			 }, 1500); 
         });

		});	
    $('ul[id=asideLinks-product]').each(function() {
	 	var links = $(this).find("a");
	 	links.each(function() {
            $(this).click(function(){
                var text = $(this).text();
                setTimeout(function() {
                var result=$('#actualCount').text();
                 if(result==0)
                     result="zero";
                	searchClick($('#searchFilter').val(), "category filter",result,getProductsSearchFilters(),'products & solutions','specificSearchClick');
    			 }, 1500);
             });
        });
	});	

   $('.result-product ul.sortAlpha').each(function() {
		var links = $(this).find("a");
	 	links.each(function() {

        $(this).click(function(){
             var text = $(this).text();

            setTimeout(function() {
            	var result=$('#actualCount').text();
         		if(result==0)
            	 result="zero";
        		 searchClick($('#searchFilter').val(), "a-z filter",result,getProductsSearchFilters(),'products & solutions','specificSearchClick');
			 }, 1500); 
        });
        //}
	  	});
		});	


});	

//Press Releases, Awards and News Search events start here

var searchType="press release";
var searchTrackEvent="specificSearchClick";
if(isNewsPage())
{
	searchType="news";
	searchTrackEvent="specificSearchClick";

}
else if(isAwardsPage())
{
	searchType="awards";
	searchTrackEvent="specificSearchClick";
}
$(document).on('keypress', '#fulltext', function(event) {
    if(event.which == 13) {
    	var interval = setInterval(function() {
        	if($('.pr-archives-list-items').size()>0){
        	var searchTerm=$('#fulltext').val();
            var result=$('.pr:visible').size();
            if(result==0)
                result="zero";
         	searchClick(searchTerm, "search box",result,getPnaFilters(),searchType,searchTrackEvent);
         	clearInterval(interval);
        	 }
        }, 1500); 
    }
    });
var searchIcon=$(".glyphicon.glyphicon-search");
    $(document).on('click', '.glyphicon.glyphicon-search', function(event) {
    	var interval = setInterval(function() {
        	if($('.pr-archives-list-items').size()>0){
            var searchTerm=$('#fulltext').val();
            var result=$('.pr:visible').size();
            if(result==0)
                result="zero";
           searchClick(searchTerm, "search box",result,getPnaFilters(),searchType,searchTrackEvent);
           clearInterval(interval);
        }
        }, 1500);           

    });

 	$('.pr-list-archives ul[id=asideLinks]').each(function() {
	 	var links = $(this).find("a");
	 	links.each(function() {
            $(this).click(function(event){
            	var interval = setInterval(function() {
                	if($('.pr-archives-list-items').size()>0)
                	{
                		var result=$('.pr:visible').size();
                		if(result==0)
	                     result="zero";
	                	searchClick($('#fulltext').val(), "year filter",result,getPnaFilters(),searchType,searchTrackEvent);
	                	clearInterval(interval);
	               }
                 }, 1500);
            	
             });
        });
	});	


//Events Search events start here
$(document).on('click', '#updateResults', function(event) {
    setTimeout(function() {
        var searchTerm="";
        var result=$('#newsEventCatagory').find('div.newsWrapper-listing:visible').size();
         if(result==0)
             result="zero";
        	searchClick("", "search button",result,eventsFilters(),'event','specificSearchClick');
      }, 1000); 
    });

$('#filterRegion').on('change', function(event) {
    setTimeout(function() {
            var searchTerm=$(".filter-option").text();
            var result=$('#newsEventCatagory').find('div.newsWrapper-listing:visible').size();
            if(result==0)
            	result="zero";
     		searchClick("", "Region filter",result,eventsFilters(),'event','specificSearchClick');
         }, 1000); 
    });

$('.newsEvents-category-list .news-listing').each(function() {
	 	var links = $(this).find("a");
	 	links.each(function() {
            $(this).click(function(){
                var eventType = $(this).text();
                 eventType=eventType.replace(/\t/g, '');
         		eventType=eventType.replace(/\t/g, '');
				eventType=$.trim(eventType);
                setTimeout(function() {
                var result=$('#newsEventCatagory').find('div.newsWrapper-listing:visible').size();
                 if(result==0)
                     result="zero";
                	searchClick("", "Event Filter",result,eventsFilters(),"event","specificSearchClick");
    			 }, 1500);
             });
        });
	});	

//globalMenuClick(eventname,triggername,page)
function globalMenuClick(eventName,triggerName,page,triggerType,Position){

    digitalData.eventData= {
    eventName:eventName,
    eventAction:triggerName,
    eventPage:page,
    eventType:triggerType,
    eventPostion:Position
    } 
   // alert("link clicked----"+JSON.stringify(digitalData.eventData));
    _satellite.track('globalMenuClick');
}
	function tabClick(primaryCategory,tabName,pageName,eventName)
	{
        digitalData.event=[];
        digitalData.event.push({
			category:{
			primaryCategory:primaryCategory
			},
			eventInfo:{ 
				eventName:eventName
			},
			tabInfo:{
                tabName: tabName,
                pageName: pageName
                }
			})
        console.log("tab tracking--"+JSON.stringify(digitalData.event));
	_satellite.track('Tab Click');
	}

function searchClick(searchTerm, searchAction,result,searchFilters,searchType,tracktEvent){
    	digitalData.eventData= {
           // searchTerm:searchTerm,
            searchAction:searchAction,
            searchResult:result,
            searchType:searchType,
            searchPage:pageTitle
        } 
        if(searchTerm!="")
			digitalData["eventData"]["searchTerm"]=searchTerm;
        else
			digitalData["eventData"]["searchTerm"]="no term searched";
		if(searchFilters!="")
			digitalData["eventData"]["searchFilters"]=searchFilters;
    console.log("search tracking--"+JSON.stringify(digitalData.eventData));
        _satellite.track(tracktEvent);

}
function getCurrentBreadcrumb() {
	var hierarchy="";
	$( "a.breadcrumblink").each(function( index ) {
        console.log(hierarchy+"........."+hierarchy.length);
		  if(hierarchy.length>0)
			hierarchy=hierarchy+":";
		  hierarchy=hierarchy+$.trim($(this).text());
	});
    if(isProductDetail())
	{
        var vcategory=$.cookie("vcategory");
        if(vcategory && vcategory!='undefined' && vcategory!='null')
        {
    		hierarchy=hierarchy+":"+vcategory;
        }
		$.cookie("vcategory",null,{ path: '/' });
    }
    if(pageTitle!="Home")
    {
        if(hierarchy.length>0)
                hierarchy=hierarchy+":";
        hierarchy=hierarchy+pageTitle;
    }
	console.log( "hierarchy---->>"+hierarchy );
    return hierarchy;
}
function clicktocall(){
    digitalData.eventData= {
    	eventName:'click to call'
    }
    _satellite.track('clicktocall');
}
function isProductDetail()
{
    if($("body.productdetail").size()>0)
        return true;
    else
        return false;
}
function isProductCategory()
{
    if($("body.productcategory").size()>0)
        return true;
    else
        return false;
}
function isNewsPage()
{
    if($(".isnewspage").size()>0)
        return true;
    else
        return false;
}
function isAwardsPage()
{
    if($(".isawardspage").size()>0)
        return true;
    else
        return false;
}
function setVirtualCategoryEvent()
{
    var cListing = $('.category-products-listing');
	cListing.each(function() {
     var listitem = $(this).find("a");
     if( listitem.length>0)
	 {
		 listitem.each(function() {
             var linktext = jQuery(this).text();
             $(this).click(function(){
                   var activeCategory=$('li[class="linkLeft active"').find("a");
                  $.cookie("vcategory",$.trim(activeCategory.text()),{ path: '/' });
             });
		 });                 
      }
    });
}
function isErrorPage()
{
	var url=$(location).attr('href');
	if(url.indexOf("/en-us/errors")>-1)
		return true;
	else
		false;
}
function getProductsSearchFilters()
{
	var filters="";
	$('ul[id=asideLinks-product] li.active').each(function() {
		   if(filters.length>0)
		 			filters=filters+",";
		 		filters = filters+ $.trim($(this).find('a').text());
	       
		});	
	$('.product-listing input.filters').each(function() {
		 	if ($(this).is(':checked')) {
		 		if(filters.length>0)
		 			filters=filters+",";
		 		filters = filters+$.trim($(this).parent().find("span").text());
		      	
		 	}
		 });
	$('.result-product ul.sortAlpha a.current').each(function() {
			if(filters.length>0)
	 			filters=filters+",";
	 		filters = filters+ $.trim($(this).text());
	  	
		});	
	return filters.toLowerCase();
}
//press release , news and awards filters
function getPnaFilters()
{
	var filters="";
	$('.pr-list-archives ul[id=asideLinks] a.active').each(function() {
			if(filters.length>0)
	 			filters=filters+",";
			var year=$(this).text().replace(/\t/g, '');
     		year=year.replace(/\n/g, '');
			year=$.trim(year);
	 		filters = filters+ year;
	  	
		});	
	return filters.toLowerCase();
}
function eventsFilters()
{
	var filters="";
	 var dropDown=$(".filter-option").text();
	 var fromDate =$('#date-range200').val();
	 var toDate =$('#date-range201').val();
	 if($.trim(fromDate).length>0)
		 filters = filters+fromDate;
	 if($.trim(toDate).length>0){
		 if(filters.length>0)
	 			filters=filters+",";
		 filters = filters+toDate; 
	 }
		 
	 if(dropDown!="" && dropDown!="Filter By Region"){
		 if(filters.length>0)
	 			filters=filters+",";
		 filters = filters+dropDown;
	 }
	$('.newsEvents-category-list .news-listing li.active').each(function() {
		if(filters.length>0)
 			filters=filters+",";
          var eventType = $(this).find('a').text();
         eventType=eventType.replace(/\t/g, '');
 		 eventType=eventType.replace(/\t/g, '');
		 filters = filters+ $.trim(eventType);
	});	
	return filters.toLowerCase();
}