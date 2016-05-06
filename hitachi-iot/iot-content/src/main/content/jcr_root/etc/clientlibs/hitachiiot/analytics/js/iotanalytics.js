var digitalData = digitalData || {};
var data=getCurrentBreadcrumb();
var url=$(location).attr('href');
data = data.replace(/[`-~!@#$®™%^*()_|+"\-=?;–'“”’,.<>\{\}\[\]\\\/]/gi, ' ');
data = data.replace(/\s{2,}/g,' ');
data = data.toLowerCase();
items = data.split(":");
count = items.length;
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
	
	
	var url=document.title; //$(location).attr('href');
	if(!(url.indexOf("404")>-1 || url.indexOf("error")>-1))
	{	
		primaryCategory = $.trim(primaryCategory.toLowerCase());
		if(primaryCategory != "smart cities" && primaryCategory != "smart industry" && primaryCategory != "home" && primaryCategory != "about us" && primaryCategory != "lumada by hitachi" && primaryCategory != "smart energy"){primaryCategory="";}
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
	// Tab Scrolls	
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
	
	
	//Video and link buttons (Red) on middle banners on different pages
	
	$(".accordion-section-hero, .common-hero-banner, .market-leader-container").each(function() {
     
		 var listitem = $(this).find("a");
		 var url=$(location).attr('href');
		 var linktext = "";
		 var linkposition="";
		 var eType="link";
		 var eClass="";
		 var linkType="iot>panel-";
		 var linkpanel = "";
		 if( listitem.length>0)
		 {
			listitem.each(function() {
				$(this).click(function(){
					linkpanel = $(this).parents('.accordion-level').attr('id');
					if($(this).parents('.accordion-level').find('h1').text()!="")
						{linktext = "iot>panel-" + $(this).parents('.accordion-level').find('h1').text();
						linkposition="iot>panel-" + linkpanel + "-" + getPageNameFromURL();}
					else if($(this).parents('.market-leader-container').attr('class').indexOf('market-leader-container')>-1)
						{linktext = "iot>panel-" + $('.market-leader-container').find('h2').text();
						linkposition="iot>panel-" + $('.market-leader-container').find('h2').text()+ "-" + getPageNameFromURL();}
					else 
						{linktext = "iot>hero-" + $(this).parents('.common-hero-banner').find('h1').text();
						linkposition="iot>hero-" + getPageNameFromURL();}
					
					if($(this).parent().parent().attr("class")=="page-not-found")
					{var eClass=$(this).parent().parent().attr("class");linktext=$.trim($(this).text());linkposition="iot>panel-main-" + getPageNameFromURL();}
					else {var eClass=$(this).attr("class");}
					if ( eClass.indexOf("btn-play-video")!= -1){eType = "play icon";if(!(linktext.indexOf("-play icon")>-1)){linktext=linktext + "-play icon";}} 
					else if ( eClass.indexOf("btn-square-red")!= -1)
					{
						eType = "button";if(!($(this).text()>-1)){linktext=linktext + "-" + $.trim($(this).text());linkposition="iot>panel-" + $('.market-leader-content').find('h2').text() + "-" + getPageNameFromURL();}
					} 
					if(linktext == "" || !linktext){linktext="iot>panel-" + $.trim($(this).text());}
					linktext = $.trim(linktext);	
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,eType,linkposition); });
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
		 var linktext = $(this).attr("alt");
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


	//Tabs Custom Tracking tabbing-container :smart city page
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
		
		if(pageTitle!="Home")
		{
			if(hierarchy.length>0)
					hierarchy=hierarchy+":";
			hierarchy=hierarchy+pageTitle;
		}
		return hierarchy;
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