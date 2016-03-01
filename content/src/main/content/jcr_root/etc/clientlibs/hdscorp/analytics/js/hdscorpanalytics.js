var digitalData = digitalData || {};
var data=getCurrentBreadcrumb();

data = data.replace(/[`‐~!@#$®™%^&*()_|+"\-=?;–'“”’,.<>\{\}\[\]\\\/]/gi, ' ');
data = data.replace(/\s{2,}/g,' ');
items = data.split(":");
count = items.length;
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
if(errorPage!='undefined' && errorPage!=null && errorPage)
{
 if(redirectUrl=="/pdf-removed.html")
 {
	 digitalData.page={
		pageInfo:{
			pageName: pageTitle,
			pageType: "document error",
			hierarchy:items,
			pageLoadEvent: "document error",
			errorMessage:"document not available" 
			},
			category:{
			primaryCategory: primaryCategory,
			subSection: subSection,
			subSubSection: subSubSection
			}
			}
			digitalData.site={
			siteInfo:{
			language:"en",
			server:"HDS",
			country:"US:doc-error"
			}
		}
 }
 else
 {
 	 digitalData.page={
		pageInfo:{
			pageName: pageTitle,
			pageType: "404 error",
			hierarchy:items,
			pageLoadEvent: "404 error",
			errorMessage:"Page Not Found" 
			},
			category:{
			primaryCategory: primaryCategory,
			subSection: subSection,
			subSubSection: subSubSection
			}
			}
			digitalData.site={
			siteInfo:{
			language:"en",
			server:"HDS",
			country:"US:404error"
			}
		}
 }
}
else
{
	digitalData.page={
	pageInfo:{
	pageName: pageTitle,
	pageType: primaryCategory,
	hierarchy:items,
	},
	category:{
	primaryCategory: primaryCategory,
	subSection: subSection,
	subSubSection: subSubSection
	}
	}
	digitalData.site={
	siteInfo:{
	language:"en",
	server:"HDS",
	country:"US"
	}
	}
	if(pageTitle=="home" || pageTitle=="Home")
	{
			digitalData["page"]["pageInfo"]["pageLoadEvent"]=primaryCategory+" view";
	}
	
}
console.log("digitalData-------"+JSON.stringify(digitalData));

$(document).ready(function() {
//Mega Menu Links Custom Tracking
	var megaMenuItems = $(".hds-megaMenuWrapper");
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
		$(this).click(function(){globalMenuClick("linkclick","US>MM>"+linktext,pageTitle); });
	  });
	 }


	});	
	
	//Footer links tracking
	/*var footerItems = jQuery("div[id=fatFooter],div[class=footleft]");
	footerItems.each(function() {
	var links = jQuery(this).find("a");
	   links.each(function() {
		 var linktext = jQuery(this).text();
		 $(this).click(function(){globalMenuClick("linkclick","US>FT>"+linktext,pageTitle); });
	  });
	 
	});	*/
	//Tabs Custom Tracking
	var tabs = $(".stickNav-container");
	tabs.each(function() {
	 	var links = jQuery(this).find("a")
       // console.log("***********"+links.text());
	 	links.each(function() {
		 	$(this).click(function(){tabClick(primaryCategory,$(this),pageTitle); });
	  	});
		});	
	});
function globalMenuClick(eventname,triggername,page)
	{
        console.log("megmenu clicked---"+triggername);
		digitalData.eventData={
		eventName: eventname,
		eventAction: triggername,
		eventPage: page
		}
		_satellite.track('globalMenuClick ');
	}
	function tabClick(primarycategory,link,pagename)
	{
        console.log("tab clicked----"+link.text());
	digitalData.event=[];
		digitalData.event.push({
			category:{
			primaryCategory:primarycategory
			},
			eventInfo:{
				eventName:"Tabclick"
			},
			tabInfo:{
			tabName: link.text(),
			pageName: pagename
			}
			})
	_satellite.track('Tab Click');
	}
function productSearchClick(searchTerm, searchAction,result){
        digitalData.eventData= {
            searchTerm:searchTerm,
            searchAction:searchAction,
            searchResult:result,
            searchResultType:'product'
        } 
        _satellite.track('productSearchClick');
    }

function getCurrentBreadcrumb() {
	var hierarchy = "home";
	$( "a.breadcrumblink" ).each(function( index ) {
		  
		  hierarchy=hierarchy+":"+$( this ).text();
	});
    hierarchy=hierarchy+":"+pageTitle;
	console.log( "hierarchy----"+hierarchy );
    return hierarchy;
}
