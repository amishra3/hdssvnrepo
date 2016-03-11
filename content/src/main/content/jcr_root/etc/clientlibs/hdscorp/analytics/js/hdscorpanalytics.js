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
if(errorPage!='undefined' && errorPage!=null && errorPage)
{

}
else
{
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
        server:"HDS",
        country:"US"
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

    if(isProductDetail())
    {
        digitalData["page"]["category"]["productName"]=pageTitle;
        digitalData["page"]["category"]["productInfo"]="product";
    }
    if(subSection!="" && subSection.length>0)
    {
        digitalData["page"]["category"]["subSection"]=subSection;
        
    }

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
                tabClick(primaryCategory,$(this),pageTitle,"Tabclick"); 
            });
	  	});

	});
    $(window).on('scroll', function(){
        var tabs = $(".stickNav-container");
		var activeLink = tabs.find("a.active");
        //console.log("activeLink=="+activeLink.text());
 		//console.log("activeLinkText=="+activeLinkText);
        if(activeLink.text()!="" && activeLinkText!=activeLink.text())
        {
             activeLinkText=activeLink.text();
            setTimeout(function() {
                if(!isTabClicked)
                {
                    if(activeLinkText==activeLink.text())
                    {
                        console.log("Tracking tabs");
    
                        tabClick(primaryCategory,activeLink,pageTitle,"Tabscroll");
                    }
                }
                else
                    isTabClicked=false;

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
     searchClick(searchTerm, "search box",result,'product','specificSearchClick');
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
                     searchClick(searchTerm, "search box",result,'products & solutions','specificSearchClick');
                         }, 1500);           

            });
	$('.product-listing input.filters').each(function() {
		 $(this).click(function(){
			if ($(this).is(':checked')) {
                var text = $(this).parent().find("span").text();
       			var result=$('#actualCount').text();
         		if(result==0)
           		  result="zero";
                searchClick($.trim(text), "sub-category filter",result,'products & solutions','specificSearchClick');
            }
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
                	searchClick($.trim(text), "category filter",result,'products & solutions','specificSearchClick');
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
        		 searchClick($.trim(text), "a-z filter",result,'products & solutions','specificSearchClick');
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
     setTimeout(function() {
			var searchTerm=$('#fulltext').val();
            var result=$('.pr:visible').size();
            if(result==0)
                result="zero";
         	searchClick(searchTerm, "search box",result,searchType,searchTrackEvent);
     }, 1500);  
    }
    });

    $(document).on('click', '.pr-list-container .glyphicon-search', function(event) {
        event.preventDefault();
        setTimeout(function() {
            var searchTerm=$('#fulltext').val();
            var result=$('.pr:visible').size();
            if(result==0)
                result="zero";
           searchClick(searchTerm, "search box",result,searchType,searchTrackEvent);
        }, 1500);           

    });

 	$('.pr-list-archives ul[id=asideLinks]').each(function() {
	 	var links = $(this).find("a");
	 	links.each(function() {
            $(this).click(function(){
                var text = $(this).text();
                setTimeout(function() {
                var result=$('.pr:visible').size();
                 if(result==0)
                     result="zero";
                	searchClick(searchTerm, "year filter",result,searchType,searchTrackEvent);
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
        	searchClick(searchTerm, "search button",result,'event','specificSearchClick');
      }, 1000); 
    });

$('#filterRegion').on('change', function(event) {
    setTimeout(function() {
            var searchTerm=$(".filter-option").text();
            var result=$('#newsEventCatagory').find('div.newsWrapper-listing:visible').size();
            if(result==0)
            	result="zero";
     		searchClick($.trim(searchTerm), "Region filter",result,'event','specificSearchClick');
         }, 1000); 
    });

$('.newsEvents-category-list .news-listing').each(function() {
	 	var links = $(this).find("a");
	 	links.each(function() {
            $(this).click(function(){
                console.log("left na clicked........");
                var text = $(this).text();
                setTimeout(function() {
                var result=$('.pr:visible').size();
                 if(result==0)
                     result="zero";
                	searchClick($.trim(text), "Event Filter",result,"event","specificSearchClick");
    			 }, 1500);
             });
        });
	});	

//globalMenuClick(eventname,triggername,page)
function globalMenuClick(eventname,triggername,page,triggertype,Position){

    digitalData.eventData= {
    eventName:eventname,
    eventAction:triggername,
    eventPage:page,
    eventType:triggertype,
    eventPostion:Position
    } 
   // alert("link clicked----"+JSON.stringify(digitalData.eventData));
    _satellite.track('globalMenuClick');
}
	function tabClick(primarycategory,link,pagename,eventName)
	{
        digitalData.event=[];
		digitalData.event.push({
			category:{
			primaryCategory:primarycategory
			},
			eventInfo:{ 
				eventName:eventName
			},
			tabInfo:{
			tabName: "tab-"+(link.text()).toLowerCase(),
			pageName: pagename
			}
			})
        console.log("tab tracking--"+JSON.stringify(digitalData.event));
	_satellite.track('Tab Click');
	}

function searchClick(searchTerm, searchAction,result,searchType,tracktEvent){
    	//console.log("searchTerm----------"+searchTerm);
    	//console.log("result---------"+result);
		digitalData.eventData= {
           // searchTerm:searchTerm,
            searchAction:searchAction,
            searchResult:result,
            searchType:searchType,
            searchPage:pageTitle
        } 
        if(searchTerm!="")
			digitalData["eventData"]["searchTerm"]=searchTerm;
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
