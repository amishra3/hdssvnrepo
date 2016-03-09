var digitalData = digitalData || {};
var data=getCurrentBreadcrumb();

data = data.replace(/[`‐~!@#$®™%^*()_|+"\-=?;–'“”’,.<>\{\}\[\]\\\/]/gi, ' ');
data = data.replace(/\s{2,}/g,' ');
items = data.split(":");
count = items.length;
var activeLinkText="top";
var desktopType="Desktop";
var orientation;
var screenSize;
var delay=4000;
$(document).ready(function() {
if (/Mobi/.test(navigator.userAgent)) {
    desktopType="Mobile";
}
if (Math.abs(window.orientation) === 90) {
	orientation="Landscape";
}
else{
    orientation="Portrait";
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
  		  case 3:
            console.log("item 3---"+items[index])
  		  	subSubSection=items[index];
  		  break;
  	}
  }

}
if(primaryCategory=="")
	primaryCategory=pageTitle;
if(subSection=="")
	subSection=pageTitle;
if(subSubSection=="")
	subSubSection=pageTitle;

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
	hier1:items,
	},
	category:{
	primaryCategory: primaryCategory,
	subSection: subSection
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
    
}

}
console.log("digitalData-------"+JSON.stringify(digitalData));


//Mega Menu Links Custom Tracking
	var megaMenuItems = $(".hds-main-navigation");
	megaMenuItems.each(function() {
     var listitem = $(this).find("a");
     if( listitem.length>0)
	 {
		 listitem.each(function() {
		 var linktext = jQuery(this).text();
         if(linktext=="" || linktext.length==0)
		 {
		 	linktext= $(this).children().attr("title");
		 }
          if(linktext=="" || linktext.length==0)
		 {
		 	linktext= $(this).children().text();
		 }
			$(this).click(function(){globalMenuClick("linkclick","US>MM>"+linktext,pageTitle,"link","mega menu"); });
		});                 
     }
    });	

	//Footer links tracking
	var footerItems = jQuery("div.footer");
	footerItems.each(function() {
	var links = jQuery(this).find("a");
	   links.each(function() {
		 var linktext = jQuery(this).text();
           if(linktext=="" || linktext.length==0)
		 {
		 	linktext= jQuery(this).children().attr("title");
		 }
		 $(this).click(function(){globalMenuClick("linkclick","US>FT>"+linktext,pageTitle,"link","footer"); });
	  })

	});	
	//Tabs Custom Tracking
	var tabs = $(".stickNav-container");
	tabs.each(function() {
	 	var links = $(this).find("a")
       links.each(function() {
		 	$(this).click(function(){tabClick(primaryCategory,$(this),pageTitle,"Tabclick"); });
	  	});

	});
    $(window).on('scroll', function(){
        var tabs = $(".stickNav-container");
		var activeLink = tabs.find("a.active");
       // console.log("activeLink=="+activeLink.text());
 		//console.log("activeLinkText=="+activeLinkText);
        if(activeLink.text()!="" && activeLinkText!=activeLink.text())
        {
             activeLinkText=activeLink.text();
            setTimeout(function() {
                if(activeLinkText==activeLink.text())
                {
                    console.log("Tracking tabs");
                    
                    tabClick(primaryCategory,activeLink,pageTitle,"Tabscroll");
                }

			}, delay);

        }

       });

//products search
$(document).on('keypress', '#searchFilter', function(event) {
    if(event.which == 13) {
     setTimeout(function() {
	var searchTerm=$('#searchFilter').val();
	var result=$('#actualCount').text();
         if(result==0)
             result="zero";
     searchClick(searchTerm, "search box",result,'product','productSearchClick');
         }, 1500); 
    }            
    });

	var checkboxes = $('.product-listing input.filters');
	checkboxes.each(function() {
		 $(this).click(function(){
			if ($(this).is(':checked')) {
                var text = $(this).find("span").text();
       			var result=$('#actualCount').text();
         		if(result==0)
           		  result="zero";
                searchClick(text, "sub-category filter",result,'product','productSearchClick');
            }
         });

		});	
    var pLeftNav = $('ul[id=asideLinks-product]');
	pLeftNav.each(function() {
	 	var links = $(this).find("a");
	 	links.each(function() {
            $(this).click(function(){
                var text = $(this).text();
                setTimeout(function() {
                var result=$('#actualCount').text();
                 if(result==0)
                     result="zero";
                	searchClick(text, "category filter",result,'product','productSearchClick');
    			 }, 1500);
             });
        });
	});	

    var pAlphaList = $('.result-product ul.sortAlpha');
	pAlphaList.each(function() {
		var links = $(this).find("a");
	 	links.each(function() {

        $(this).click(function(){
             var text = $(this).text();

            setTimeout(function() {
            	var result=$('#actualCount').text();
         		if(result==0)
            	 result="zero";
        		productSearchClick(text, "a-z filter",result,'product');
			 }, 1500); 
        });
        //}
	  	});
		});	


});	

//Events Search
$(document).on('click', '#updateResults', function(event) {
    setTimeout(function() {
	var searchTerm="";
	var result=$('#newsEventCatagory').find('div.newsWrapper-listing:visible').size();
         if(result==0)
             result="zero";
    searchClick(searchTerm, "search box",result,'product','productSearchClick');
         }, 1000); 
    });

$('#filterRegion').on('change', function(event) {
    setTimeout(function() {
	var searchTerm=$("#filterRegion").val();
	var result=$('#newsEventCatagory').find('div.newsWrapper-listing:visible').size();
         if(result==0)
             result="zero";
     searchClick(searchTerm, "search box",result,'product','productSearchClick');
         }, 1000); 
    });
//globalMenuClick(eventname,triggername,page)
function globalMenuClick(eventname,triggerName,page,triggertype,Position){
    digitalData.eventData= {
    eventName:eventname,
    eventAction:triggername,
    eventPage:page,
    eventType:triggertype,
    eventPostion:Position
    } 
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
			tabName: link.text(),
			pageName: pagename
			}
			})
	_satellite.track('Tab Click');
	}

function searchClick(searchTerm, searchAction,result,searchType,tracktEvent){
    	console.log("searchTerm----------"+searchTerm);
    	console.log("result---------"+result);
		digitalData.eventData= {
            searchTerm:searchTerm,
            searchAction:searchAction,
            searchResult:result,
            searchType:searchType,
            searchPage:pageTitle
        } 
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
    if(hierarchy.length>0)
			hierarchy=hierarchy+":";
    hierarchy=hierarchy+pageTitle;
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
