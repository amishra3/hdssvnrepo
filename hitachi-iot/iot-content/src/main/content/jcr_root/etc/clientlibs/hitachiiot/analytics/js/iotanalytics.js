var digitalData = digitalData || {};
var data=getCurrentBreadcrumb();
var url=$(location).attr('href');
data = data.replace(/[`-~!@#$®™%^*()_|+"\-=?;–'“”’,.<>\{\}\[\]\\\/]/gi, ' ');
data = data.replace(/\s{2,}/g,' ');
data = data.toLowerCase();
items = data.split(":");
count = items.length;
if(pageTitle!="Home")
	{
		data=data.substring(data.indexOf(":")+1);
	}
var activeLinkText="top";
var isTabClicked=false;
var desktopType="";
var orientation="landscape";
var screenSize;
var delay=4000;
var gInternalSearchFilter="";
var leadFormName="";
pageTitle=pageTitle.toLowerCase();
pageTitle=$.trim(pageTitle);
// URL shorten for UCP and Press Release 
pageTitle = pageTitle.replace(/[`-~!@#$®™%^*()_|+"\-=?;–'“”’,.<>\{\}\[\]\\\/]/gi, ' ');

	if (window.outerWidth < 768 && /Mobi/.test(navigator.userAgent)) 
		{
			desktopType="mobile";
		}
	else if(window.outerWidth < 992 && /Mobi/.test(navigator.userAgent))
		{
			desktopType="tablet";
		}
	else if(/Mobi/.test(navigator.userAgent))
		{
			desktopType="tablet";
		}
	else
		{
			desktopType="desktop";
		}

	if (screen.height < screen.width) {
			orientation="landscape";
		}
	else{
			orientation="portrait";
		}

var screenSize = screen.width+"x" +screen.height;

	for(index=0;index<count;index++)
		{
		 if(index>0 && index<(count-1) )
		  {
			switch(index)
			{
				case 1:
					primaryCategory=$.trim(items[index]);
					break;
				  case 2:
					subSection=$.trim(items[index]);
					break;
				  case 3:
					subSubSection=$.trim(items[index]);
					break;
				}
		  }
		}
		
	if(primaryCategory == "")
		primaryCategory=pageTitle;

	if(subSection == "" && items.length>=3)
		subSection=$.trim(pageTitle);

	//  error page tracking out of ready due to page load event challenges in DTM
function isErrorPage()
	{
		var url=document.title;
		if(url.indexOf("404")>-1 || url.indexOf("error")>-1)
			return true;
		else
			false;
	}

if(isErrorPage())
	{
		digitalData.page={
				pageInfo:{
				pageName: $.trim(getPageNameFromURL()),
				pageType: "errorPage",
				pageLoadEvent: "404 error",
				errorMessage: "page not found",
				hier1: "404 error page"
				},
				category:{
				primaryCategory: "404 error page",
				}
			}

		digitalData.site={
			siteInfo:{
			language:"en",
			server:"iot",
			country:"US:404error"
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
	}
	
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
	
	var url=document.title; //$(location).attr('href');
	if(!(url.indexOf("404")>-1 || url.indexOf("error")>-1))
	{	
		primaryCategory = $.trim(primaryCategory.toLowerCase());
		if(primaryCategory != "Smart Cities" && primaryCategory != "Smart Industry" && primaryCategory != "home" && primaryCategory != "About Us" && primaryCategory != "Lumada by Hitachi" && primaryCategory != "Smart Energy"){primaryCategory="";}
		digitalData.page=
			{
				pageInfo:{
				pageName: $.trim(pageTitle),
				pageType: $.trim(primaryCategory),
				hier1: $.trim(data),
				},
				category:{
				primaryCategory: $.trim(primaryCategory),
				}
			}
		digitalData.site={
			siteInfo:{
			language:"en",
			server:"iot",
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
	}

	if(subSection!="" && subSection.length>0)
		{
			digitalData["page"]["category"]["subSection"]=subSection;
			
		}
	if(subSubSection!="" && subSubSection.length>0)
		{
			digitalData["page"]["category"]["subSubSection"]=subSubSection;
			
		}

//Header Main Menu Links Custom Tracking
	$(".globalNavWrapper").each(function() {
     var listitem = $(this).find("a");
      if( listitem.length>0)
	 {
		 listitem.each(function() {
			 var linktext = $(this).text();
			 linktext=$.trim(linktext);
             if(linktext=="" || linktext.length==0)
             {
                linktext= $(this).children().attr("title");
             }
              if(linktext=="" || linktext.length==0)
             {
                linktext= $(this).children().text();
             }
                 //linktext = $.trim(linktext);
            $(this).click(function(){
				var megamenuHeader=$(this).closest(".hds-megaMenu");
                var category="";
                if(megamenuHeader && megamenuHeader!='undefined' && megamenuHeader!='null')
        			category = megamenuHeader.find('h2').find('a').text();
					category = $.trim(category);
                var triggerName="iot>mm>"+linktext.toLowerCase();
                if(category!="" && category.length>0)
					triggerName="iot>mm>"+category.toLowerCase()+">"+linktext.toLowerCase();
                globalMenuClick("linkclick",triggerName,pageTitle,"link","iot>main menu"); 

            });
			//Added on 20160218
			$(this).mousedown(function(e){
				if(e.which == 3){
					var megamenuHeader=$(this).closest(".hds-megaMenu");
					var category="";
					if(megamenuHeader && megamenuHeader!='undefined' && megamenuHeader!='null')
						category = megamenuHeader.find('h2').find('a').text();
						category = $.trim(category);
					var triggerName="iot>mm>"+linktext.toLowerCase();
					if(category!="" && category.length>0)
						triggerName="iot>mm>"+category.toLowerCase()+">"+linktext.toLowerCase();
					globalMenuClick("linkclick",triggerName,pageTitle,"link","iot>main menu"); 
				} 			
			});
		});                 
     }
    });	
	
	//header HDS logos
	
	$(".hitachi-logo").on("click", function() {
		globalMenuClick("linkclick","hitachi logo",pageTitle,"link","iot>main menu");
	});		
	$(".hitachi-sublogo").on("click", function() {
		globalMenuClick("linkclick","hds logo",pageTitle,"link","iot>main menu");
	});			
	
	// Return to top link
	$(".cta-scroll-top").on("click", function() {
		globalMenuClick("linkclick","return to top",pageTitle,"button","iot>return to top");
	});		
	

	//hero banners for all pages  .btn-square-white
	$(".common-hero-banner").each(function() {
     
		 var listitem = $(this).find("a");
		 var url=$(location).attr('href');
		 //var linktext = $(this).find('h1').text();
		 var linkposition="";
		 var eType="link";
		 var eClass="";
		 if( listitem.length>0)
		 {
			listitem.each(function() {
				var linktext = "iot>hero-" + $(this).parents().find('h1').text();// extracting offer title
				linkposition="iot>hero-" + getPageNameFromURL();
				$(this).click(function(){
					if(linktext=="iot>hero-" && !($(this).parent().parent().find("h2").text()=="")){linktext="iot>hero-" + $(this).parent().parent().find("h2").text() + "-" + $.trim($(this).text());}
					if(linktext=="iot>hero-" && !($(this).parent().parent().find("h3").text()=="")){linktext="iot>hero-" + $(this).parent().parent().find("h3").text() + "-" + $.trim($(this).text());}
					if(url.indexOf("/contact.html")>-1){linktext="iot>hero-" + $(this).parent().parent().find("h2").text() + "-" + $.trim($(this).text());}
					if($(this).parent().parent().attr("class")=="page-not-found")
					{var eClass=$(this).parent().parent().attr("class");linktext=$.trim($(this).text());linkposition="iot>panel-main-" + getPageNameFromURL();}
					else {var eClass=$(this).parent().attr("class");}
					if(eClass.indexOf("buy-through")!=-1){eType = "link";if(!(linktext.indexOf($.trim($(this).text()))>-1)){linktext=linktext + "-" + $.trim($(this).text());}}
					else if ( eClass.indexOf("btn-square-white")!= -1){eType = "button"; if(!(linktext.indexOf($.trim($(this).text()))>-1)){linktext=linktext + "-" + $.trim($(this).text());}}// linktext = $(this).parents().find('h1').text();}
					else if ( eClass.indexOf("second-link")!= -1){eType = "link"; if(!(linktext.indexOf($.trim($(this).text()))>-1)){linktext=linktext + "-" + $.trim($(this).text());}}// linktext = $(this).parents().find('h1').text();}
					else if ( eClass.indexOf("playVideoBox")!= -1){eType = "play icon"; if(!(linktext.indexOf("-play icon")>-1)){linktext=linktext + "-play icon";}}//linktext = $(this).parents().find('h1').text();}
					else if ( eClass.indexOf("video-play-desktop")!= -1){eType = "play icon";if(!(linktext.indexOf("-play icon")>-1)){linktext=linktext + "-play icon";}}// linktext = $(this).parents().find('h1').text();}
					if(linktext == "" || !linktext){linktext="iot>hero-" + $.trim($(this).text());}
					linktext = $.trim(linktext);	
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,eType,linkposition); });
				$(this).mousedown(function(e){
					if(e.which == 3){
						if(linktext=="iot>hero-" && !($(this).parent().parent().find("h2").text()=="")){linktext="iot>hero-" + $(this).parent().parent().find("h2").text() + "-" + $.trim($(this).text());}
						if(linktext=="iot>hero-" && !($(this).parent().parent().find("h3").text()=="")){linktext="iot>hero-" + $(this).parent().parent().find("h3").text() + "-" + $.trim($(this).text());}
						if(url.indexOf("/contact.html")>-1){linktext="iot>hero-" + $(this).parent().parent().find("h2").text() + "-" + $.trim($(this).text());}
						if($(this).parent().parent().attr("class")=="page-not-found")
						{var eClass=$(this).parent().parent().attr("class");linktext=$.trim($(this).text());linkposition="iot>panel-main-" + getPageNameFromURL();}
						else {var eClass=$(this).parent().attr("class");}
						if(eClass.indexOf("buy-through")!=-1){eType = "link";if(!(linktext.indexOf($.trim($(this).text()))>-1)){linktext=linktext + "-" + $.trim($(this).text());}}
						else if ( eClass.indexOf("btn-square-white")!= -1){eType = "button"; if(!(linktext.indexOf($.trim($(this).text()))>-1)){linktext=linktext + "-" + $.trim($(this).text());}}// linktext = $(this).parents().find('h1').text();}
						else if ( eClass.indexOf("second-link")!= -1){eType = "link"; if(!(linktext.indexOf($.trim($(this).text()))>-1)){linktext=linktext + "-" + $.trim($(this).text());}}// linktext = $(this).parents().find('h1').text();}
						else if ( eClass.indexOf("playVideoBox")!= -1){eType = "play icon"; if(!(linktext.indexOf("-play icon")>-1)){linktext=linktext + "-play icon";}}//linktext = $(this).parents().find('h1').text();}
						else if ( eClass.indexOf("video-play-desktop")!= -1){eType = "play icon";if(!(linktext.indexOf("-play icon")>-1)){linktext=linktext + "-play icon";}}// linktext = $(this).parents().find('h1').text();}
						if(linktext == "" || !linktext){linktext="iot>hero-" + $.trim($(this).text());}
						linktext = $.trim(linktext);		
						globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,eType,linkposition);
					} 			
				});
			});                 
		 }
	//}
    });
	
	//Banner section image in middle of pages
	
	$(".accordion-section-hero").each(function() {
     
	 var url=document.title;
	//if(url.indexOf("404")<0)
	//{
		 var listitem = $(this).find("a");
		 var url=$(location).attr('href');
		 var linktext = $(this).find('h1').text();
		 var linkposition="";
		 var eType="link";
		 var eClass="";
		 var linkType="iot>panel-";
		 var linkpanel = $(this).parents('.accordion-level').attr('id');
		 if($(this).parents(".bannerCarsoul").attr("id") == "partnerCarsoul"){ linkType="iot>hero-";}
		 if(linktext==""){linktext=$(this).find('h2').text();}
		 if( listitem.length>0)
		 {
			//console.log("list Items:" + listitem.length);
			listitem.each(function() {
				var linktext = linkType + $(this).parent().parent().parent().find('h2').text();// extracting offer title
				linkposition=linkType + linkpanel + "-" + getPageNameFromURL();
				$(this).click(function(){
					if(linktext==""){linktext=linkType + $(this).parent().parent().find("h2").text() + "-" + $.trim($(this).text());}
					if(linktext==""){linktext=linkType + $(this).parent().parent().find("h3").text() + "-" + $.trim($(this).text());}
					if(url.indexOf("/contact.html")>-1){linktext=linkType + $(this).parent().parent().find("h2").text() + "-" + $.trim($(this).text());}
					if($(this).parent().parent().attr("class")=="page-not-found")
					{var eClass=$(this).parent().parent().attr("class");linktext=$.trim($(this).text());linkposition="iot>panel-main-" + getPageNameFromURL();}
					else {var eClass=$(this).parent().attr("class");}
					if(eClass.indexOf("buy-through")!=-1){eType = "link";if(!(linktext.indexOf($.trim($(this).text()))>-1)){linktext=linktext + "-" + $.trim($(this).text());}}
					else if ( eClass.indexOf("btn-square-white")!= -1){eType = "button"; if(!(linktext.indexOf($.trim($(this).text()))>-1)){linktext=linktext + "-" + $.trim($(this).text());}}// linktext = $(this).parents().find('h1').text();}
					else if ( eClass.indexOf("playVideoBox")!= -1){eType = "play icon"; if(!(linktext.indexOf("-play icon")>-1)){linktext=linktext + "-play icon";}}//linktext = $(this).parents().find('h1').text();}
					else if ( eClass.indexOf("video-play-desktop")!= -1){eType = "play icon";if(!(linktext.indexOf("-play icon")>-1)){linktext=linktext + "-play icon";}}// linktext = $(this).parents().find('h1').text();}
					if(linktext == "" || !linktext){linktext=linkType + $.trim($(this).text());}
					linktext = $.trim(linktext);	
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,eType,linkposition); });
				$(this).mousedown(function(e){
					if(e.which == 3){
						if(linktext==""){linktext=linkType + $(this).parent().parent().find("h2").text() + "-" + $.trim($(this).text());}
						if(linktext==""){linktext=linkType + $(this).parent().parent().find("h3").text() + "-" + $.trim($(this).text());}
						if(url.indexOf("/contact.html")>-1){linktext=linkType + $(this).parent().parent().find("h2").text() + "-" + $.trim($(this).text());}
						if($(this).parent().parent().attr("class")=="page-not-found")
						{var eClass=$(this).parent().parent().attr("class");linktext=$.trim($(this).text());linkposition="iot>panel-main-" + getPageNameFromURL();}
						else {var eClass=$(this).parent().attr("class");}
						if(eClass.indexOf("buy-through")!=-1){eType = "link";if(!(linktext.indexOf($.trim($(this).text()))>-1)){linktext=linktext + "-" + $.trim($(this).text());}}
						else if ( eClass.indexOf("btn-square-white")!= -1){eType = "button"; if(!(linktext.indexOf($.trim($(this).text()))>-1)){linktext=linktext + "-" + $.trim($(this).text());}}// linktext = $(this).parents().find('h1').text();}
						else if ( eClass.indexOf("playVideoBox")!= -1){eType = "play icon"; if(!(linktext.indexOf("-play icon")>-1)){linktext=linktext + "-play icon";}}//linktext = $(this).parents().find('h1').text();}
						else if ( eClass.indexOf("video-play-desktop")!= -1){eType = "play icon";if(!(linktext.indexOf("-play icon")>-1)){linktext=linktext + "-play icon";}}// linktext = $(this).parents().find('h1').text();}
						if(linktext == "" || !linktext){linktext=linkType + $.trim($(this).text());}
						linktext = $.trim(linktext);		
						globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,eType,linkposition);
					} 			
				});
			});                 
		 }
	//}
    });
	
	// About us page partners logo
	$("div.partner-list").each(function() 
	{
		var links = $(this).find("img");
		var headingtext=$('.partner-program .heading').find("h2").text();
	   links.each(function() {
		 var linktext = $(this).attr("title");
		 linktext=$.trim(linktext);
         if(linktext!="" || linktext.length > 0)
		 {
			$(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","iot>panel-" + headingtext); });
			$(this).mousedown(function(e){
			if(e.which == 3){
				globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","iot>panel-" + headingtext);
				} 			
			});
		 }
	  })

	});	
	
	// Top menu  tracking i.e. community link
	$(".hds-quick-navigation").each(function() 
	{
		 var listitem = $(this).find("a");
		 if( listitem.length>0)
		 {
			 listitem.each(function() {
			 var linktext = $(this).text();
			  linktext = $.trim(linktext);
				$(this).click(function(){globalMenuClick("linkclick","iot>tm>"+linktext.toLowerCase(),pageTitle,"link","iot>top menu"); });
				//Added on 20160218
				$(this).mousedown(function(e){
					if(e.which == 3){
						globalMenuClick("linkclick","iot>tm>"+linktext.toLowerCase(),pageTitle,"link","iot>top menu");
					} 			
				});
			});                 
		 }
    });	
	
	//Footer links tracking
	$("div.footer-white").each(function() {
		var links = $(this).find("a");
	   links.each(function() {
		 var linktext = $(this).text();
		 linktext=$.trim(linktext);
           if(linktext!="" || linktext.length > 0)
		 {
		$(this).click(function(){globalMenuClick("linkclick","iot>ft>"+linktext.toLowerCase(),pageTitle,"link","iot>footer"); });
		//Added on 20160218
		$(this).mousedown(function(e){
			if(e.which == 3){
				globalMenuClick("linkclick","iot>ft>"+linktext.toLowerCase(),pageTitle,"link","iot>footer");
			} 			
			});
		 }
	  })

	});	

	//footer social media links
	
 	$("social-links").each(function() {
		var links = $(this).find("img");
	   links.each(function() {
		 var linktext = $(this).attr("title");
		 linktext=$.trim(linktext);
         if(linktext!="" || linktext.length > 0)
		 {
			$(this).click(function(){globalMenuClick("linkclick","iot>ft>"+linktext.toLowerCase(),pageTitle,"link","iot>footer"); });
			$(this).mousedown(function(e){
			if(e.which == 3){
				globalMenuClick("linkclick","iot>ft>"+linktext.toLowerCase(),pageTitle,"link","iot>footer");
				} 			
			});
		 }
	  })

	}); 

	//footer contact us button
	
	$("div.buttons").each(function() {
		var links = $(this).find("a");
		var linktype="";
	   links.each(function() {
		 
		$(this).click(function(){
			var linkhref = $(this).attr('href');
           if(linkhref.indexOf("/partnerlocator/en_us/partnerlocator.html") > -1)
		 {
		 	linkhref= "find an hds partner";
			linktype="link";
		 }
		 else
		 {
			linkhref= "contact sales"; 
			linktype="button";
		 }
			globalMenuClick("linkclick","iot>ft>"+linkhref.toLowerCase(),pageTitle,linktype,"iot>footer"); 
			});
		$(this).mousedown(function(e){
			if(e.which == 3){
				globalMenuClick("linkclick","iot>ft>"+linkhref.toLowerCase(),pageTitle,linktype,"iot>footer");
			} 			
		});
	  })

	});		


	//Tabs Custom Tracking tabbing-container :event (web cast on demand), storage, legal  page tabs
	//$(".stickNav-container, .custom-nav-tabs .nav-tabs, .webcast-listing").each(function() {
	// Detail page tabs (overview, resources, specifications etc) and event page on demand and events tabs
	$(".stickNav-container").each(function() {
	 	var links = $(this).find("a");
	  links.each(function() {
		 	$(this).click(function(){
                isTabClicked=true;
				
                var tabTitle = "iot>tab-"+$.trim($(this).text()).toLowerCase().replace(/\s/g," ")+"-button";
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
        		 
                    if(activeLinkText==activeLink.text())
                    {
                    	if(!isTabClicked)
                        {
    					var tabTitle = "iot>tab-"+activeLink.text().toLowerCase().replace(/\s/g,"-")+"-scroll";
                        tabClick(primaryCategory,tabTitle,pageTitle,"Tabscroll");
                        }
                        	else
                                isTabClicked=false;
                    }
 
            	 }, delay);           
        }

       });
	   
//globalMenuClick(eventname,triggername,page)
	function globalMenuClick(eventName,triggerName,page,triggerType,Position)
	{
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
		_satellite.track('Tab Click');
	}

	function getCurrentBreadcrumb() 
	{
		var hierarchy="";
		$( "a.breadcrumblink").each(function( index ) {
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
		return hierarchy;
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
	
	// Get page name from URL for primary part
	function getPageNameFromURL()
	{
		var fileName = window.location.pathname;
		var n=fileName.lastIndexOf("/");
		fileName=fileName.substring(n+1, fileName.length);
		n=fileName.lastIndexOf(".");
		if(n>0){fileName=fileName.substring(0, n);}
		return fileName;
	}
	
	function setVirtualCategoryEvent()
	{
		var cListing = $('.category-products-listing');
		cListing.each(function() {
		 var listitem = $(this).find("a");
		 if( listitem.length>0)
		 {
			 listitem.each(function() {
				 var linktext = $(this).text();
				 $(this).click(function(){
					   var activeCategory=$('li[class="linkLeft active"').find("a");
					  $.cookie("vcategory",$.trim(activeCategory.text()),{ path: '/' });
				 });
			 });                 
		  }
		});
	}
		
	function videoTracking(vId, pPageName)
	{
		digitalData.eventData= {
			videoId:vId,
			parentPage:pPageName
		} 
		_satellite.track('videotracking');

	}
	
	// email links clicks---------mailto should not be implemented on the site------so disabled this tracking
	$('a[href^="mailto:"]').click(function() {
			var linktxt=$(this).text();
			if(linktxt.indexOf('@')>0){globalMenuClick("linkclick","iot>em-"+linktxt.toLowerCase(),pageTitle,"email","iot>panel-main"); }
	});

	// email links clicks
	$('a[rel="emailHome"]').click(function() {
			var linktxt=$(this).text();
			if(linktxt.indexOf('@')>0){globalMenuClick("linkclick","iot>em-"+linktxt.toLowerCase(),pageTitle,"email","iot>panel-main"); }
	});