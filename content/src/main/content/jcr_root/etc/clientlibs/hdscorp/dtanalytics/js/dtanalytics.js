var digitalData = digitalData || {};
pageTitle=pageTitle.toLowerCase();
pageTitle=$.trim(pageTitle);
var data=pageTitle;
var url=$(location).attr('href');
data = data.replace(/[`‐~!@#$®™%^*()_|+"\-=?;–'“”’,.<>\{\}\[\]\\\/]/gi, ' ');
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
var lID = "";
pageTitle = pageTitle.replace(/[`‐~!@#$®™%^*()_|+"\-=?;–'“”’,.<>\{\}\[\]\\\/]/gi, ' ');

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

	
	function isContactUsPage()
	{
		var url=document.title.toLowerCase();
		if(url.indexOf("contact us")>-1)
			return true;
		else
			false;
	}

if(isErrorPage())
	{
		digitalData.page={
				pageInfo:{
				pageName: $.trim(window.location.pathname),
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
			server:"dt",
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

	var url=document.title.toLowerCase(); //$(location).attr('href');
	if(!(url.indexOf("404")>-1 || url.indexOf("error")>-1 || url.indexOf("contact us")>-1))
	{	
		primaryCategory = $.trim(primaryCategory.toLowerCase());
		if(primaryCategory != "home" && primaryCategory != "data management" && primaryCategory != "data governance" && primaryCategory != "data mobility" && primaryCategory != "data analytics" && primaryCategory != "enterprise cloud" && primaryCategory != "agile i t environment"){primaryCategory="";}
		digitalData.page=
			{
				pageInfo:{
				pageName: $.trim(pageTitle),
				pageType: $.trim(primaryCategory),
				hier1: $.trim(data)
				},
				category:{
				primaryCategory: $.trim(primaryCategory)
				}
			}
		digitalData.site={
			siteInfo:{
			language:"en",
			server:"dt",
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
	// Top Menu - tracking start
	// HDS.com and share this page
	$(".hds-quick-navigation").each(function() 
	{
		 var listitem = $(this).find("a");
		 if( listitem.length>0)
		 {
			 listitem.each(function() {
			 var linktext = $(this).text();
			  linktext = $.trim(linktext);
				$(this).click(function()
				{
					if (linktext == ""){linktext=$(this).find("img").attr("alt");}
					globalMenuClick("linkclick","dt>tm>"+linktext.toLowerCase(),pageTitle,"link","dt>top menu"); });
				$(this).mousedown(function(e){
					if(e.which == 3){
						globalMenuClick("linkclick","dt>tm>"+linktext.toLowerCase(),pageTitle,"link","dt>top menu");
					} 			
				});
			});                 
		 }
    });	
	
	//header HDS hitachi logo
	$(".hitachi-logo").on("click", function() {
		globalMenuClick("linkclick","dt>tm>hitachi logo",pageTitle,"link","dt>top menu");
	});
	// Top Menu - tracking end
	
	// Main Menu - tracking start
	//Header Main Menu Links Custom Tracking
	$(".globalNavWrapper").each(function() {
     var listitem = $(this).find("a");
      if( listitem.length>0)
	 {
		 listitem.each(function() {
			 var linktext = $(this).text();
			 linktext=$.trim(linktext);
             if(linktext=="" || linktext.length==0)
             {linktext= $(this).children().text();}
            $(this).click(function(){
                var triggerName="dt>mm>"+linktext.toLowerCase();
                globalMenuClick("linkclick",triggerName,pageTitle,"link","dt>main menu"); 
            });
			$(this).mousedown(function(e){
				if(e.which == 3){
                var triggerName="dt>mm>"+linktext.toLowerCase();
                globalMenuClick("linkclick",triggerName,pageTitle,"link","dt>main menu"); 
				} 			
			});
		});                 
     }
    });	
	
	//header HDS logo
	$(".hds-main-navigation-container").each(function() {
		var listitem = $(this).find("a");
		listitem.each(function() {
			$(this).click(function(){
				globalMenuClick("linkclick","dt>mm>hds logo",pageTitle,"link","dt>main menu");
			});	
		});
	});		
	// Main Menu - tracking end
	
	//Hero Banner - all pages tracking start
	$(".bannerSectionImage").each(function() {
     
		 var listitem = $(this).find("a");
		 var url=$(location).attr('href');
		 var linktext = "";
		 var linkposition="";
		 var eType="link";
		 var eClass="";
		 var linkType="hero-";
		 var linkpanel = "";
		 if( listitem.length>0)
		 {
			listitem.each(function() {
				$(this).click(function(){
					//linkpanel = $.trim($(this).parents('.bannerSectionImage').find('h2').text());
					linktext = "dt>hero-" + $.trim($(this).parents('.bannerSectionImage').find('h2').text());
					linkposition="dt>hero-" + getPageNameFromURL();					
					var eClass=$(this).attr("class");
					if(eClass == undefined ||!eClass){eClass = $(this).parent().attr("class");}
					if (eClass.indexOf("playVideoBox")!= -1){eType = "play icon";if(!(linktext.indexOf("-play icon")>-1)){linktext=linktext + "-play icon";}} 
					else if ( eClass.indexOf("watchVideoBtn")!= -1)
					{eType = "button";if(!($(this).text()>-1)){linktext=linktext + "-" + $.trim($(this).text());linkposition="dt>hero-"  + getPageNameFromURL();}} 
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,eType,linkposition);
				});
			});                 
		 }
    });
	
	//Hero Banner - all pages tracking end
	//Hexagon banner  start
	//home page (3 hex)
	$(".hexagon320").each(function() {
     var listitem = $(this).find("a");
	 var pName=getPageNameFromURL();
	 var hexPanelName = $.trim($(this).parents(".business-transform-hexagon-list").prev().find('h2').text());
	 //var linktext = "hex-" + hexPanelName + "-" + $.trim($(this).text());
     if( listitem.length>0)
	 {
		 listitem.each(function() {
				$(this).click(function(){
					globalMenuClick("linkclick","dt>hex-" + hexPanelName + "-" + $.trim($(this).text()),pageTitle,"link","dt>hex-" + hexPanelName + "-" + pName); });
		});                 
     }
    });
	// home page
	//data governance, agile-it, data-analytics (1 on each page)
	$(".hexagon-transformative").each(function() {
     var listitem = $(this).find("a");
	 var pName=getPageNameFromURL();
	 var hexPanelName = $.trim($(this).parents(".business-specific-container").find('h2').text());
     if( listitem.length>0)
	 {
		 listitem.each(function() {
 				$(this).click(function(){
					//var linktext = "hex-" + hexPanelName + "-" + $.trim($(this).parents(".hexagon-transformative").find('h4').text()) + "-" + $.trim($(this).text());
					var linktext = "dt>hex-" + $.trim($(this).parents(".hexagon-transformative").find('h4').text()) + "-" + $.trim($(this).text());
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","dt>hex-" + hexPanelName + "-" + pName); });
		});                 
     }
    });
	// data governance, agile-it, data-analytics
	//Hexagon banner end
	
	// Box panel start
	//home, data governance, data mobility, data analytics, agile it
	$(".about-hds-articles").each(function() {
     var listitem = $(this).find("a");
	 var pName=getPageNameFromURL();
	 var boxPanelName = $.trim($(this).find("h2").text());
     if( listitem.length>0)
	 {
		 listitem.each(function() {
 				$(this).click(function(){
					//var linktext = "hex-" + boxPanelName + "-" + $.trim($(this).parents(".hexagon-transformative").find('h4').text()) + "-" + $.trim($(this).text());
					var linktext = "dt>box-" + $.trim($(this).parents(".spotlight-content").find(".spotlight-title").text()) + "-" + $.trim($(this).text());
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","dt>box-" + boxPanelName + "-" + pName); });
		});                 
     }
    });
	// home, data governance, data mobility, data analytics, agile it

	//data management
	$(".news-insight-resources").each(function() {
     var listitem = $(this).find("a.animateLink");
	 var pName=getPageNameFromURL();
	 var boxPanelName = $.trim($(this).find("h3").text());
     if( listitem.length>0)
	 {
		 listitem.each(function() {
 				$(this).click(function(){
					//var linktext = "hex-" + boxPanelName + "-" + $.trim($(this).parents(".hexagon-transformative").find('h4').text()) + "-" + $.trim($(this).text());
					var linktext = "dt>box-" + $.trim($(this).parents(".news-resources-col").find(".headline.hidden-xs").text()) + "-" + $.trim($(this).text());
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","dt>box-" + boxPanelName + "-" + pName); });
		});                 
     }
    });
	//data management	
	// Box panel end
	
	// New Panel on home page 'TRANSFORM YOUR DATA TO TRANSFORM YOUR BUSINESS' start
	$(".enterprise-cloud").each(function() {
     var listitem = $(this).find("a.animateLink");
	 var pName=getPageNameFromURL();
	 var nPanelName = $.trim($(this).find("h2").text());
	 
     if( listitem.length>0)
	 {
		 listitem.each(function() {
 				$(this).click(function(){
					var offertitle = $.trim($(this).parent().parent().find('h3').text());
					var linktext = "dt>panel-" + nPanelName + "-" + offertitle + "-" + $.trim($(this).text());
					//var linktext = "dt>panel-" + $.trim($(this).parents(".news-resources-col").find(".headline.hidden-xs").text()) + "-" + $.trim($(this).text());
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","dt>panel-" + nPanelName + "-" + pName); });
		});                 
     }
    });
	// New Panel on home page 'TRANSFORM YOUR DATA TO TRANSFORM YOUR BUSINESS' end	
	
	// Footer - Grey Strip tracking start
	//Footer links tracking
	$("div.footer-white").each(function() {
		var links = $(this).find("a");
	   links.each(function() {
		 var linktext = $(this).text();
		 linktext=$.trim(linktext);
           if(linktext!="" || linktext.length > 0)
		 {
		$(this).click(function(){globalMenuClick("linkclick","dt>ft>"+linktext.toLowerCase(),pageTitle,"link","dt>footer"); });
		$(this).mousedown(function(e){
			if(e.which == 3){
				globalMenuClick("linkclick","dt>ft>"+linktext.toLowerCase(),pageTitle,"link","dt>footer");
			} 			
			});
		 }
	  })

	});	
	// Footer - Grey Strip tracking end
	// Footer - Black Strip tracking start
	//text logo
	$(".footer-logo").on("click", function() {
		globalMenuClick("linkclick","dt>ft>hitachi logo",pageTitle,"link","dt>footer");
	});	
	
	//social media links
	$(".social-icons").each(function() {
		var links = $(this).find("img");
	   links.each(function() {
		 var linktext = $(this).attr("alt");
		 linktext=$.trim(linktext);
         if(linktext!="" || linktext.length > 0)
		 {
			$(this).click(function(){globalMenuClick("linkclick","dt>ft>"+linktext.toLowerCase(),pageTitle,"link","dt>footer"); });
			$(this).mousedown(function(e){
			if(e.which == 3){
				globalMenuClick("linkclick","dt>ft>"+linktext.toLowerCase(),pageTitle,"link","dt>footer");
				} 			
			});
		 }
	  })

	}); 
	// Footer - Black Strip tracking end
	// Footer - Blue Strip tracking start
	//Click to call tracking
	$('.talk .call').click(function(){
		//if(window.outerWidth < 992){
			var pNumber="dt>ph no - " + $(this).text();
			clicktocall(pNumber,pageTitle);
		//}
	})
	
	function clicktocall(pNumber,pageTitle){
    digitalData.eventData= {
    	eventName:'click to call',
		eventAction:pNumber,
		eventPage:pageTitle
    }
    _satellite.track('clicktocall');
	}
	
	//local phone numbers CTAs
	$(".view-phone .reseller").on("click", function() {
		var links = $(this).find("a");
		var linktype="link";	  
		var linkhref= $(this).text(); 
		linkhref = linkhref.replace(/[`‐~!@#$®™%^*()_|+"\-=?;–'“”’,.<>\{\}\[\]\\\/]/gi, '');
		linkhref = $.trim(linkhref);
		globalMenuClick("linkclick","dt>ft>"+linkhref.toLowerCase(),pageTitle,linktype,"dt>footer");
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
			globalMenuClick("linkclick","dt>ft>"+linkhref.toLowerCase(),pageTitle,linktype,"dt>footer"); 
			});
		$(this).mousedown(function(e){
			if(e.which == 3){
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
					globalMenuClick("linkclick","dt>ft>"+linkhref.toLowerCase(),pageTitle,linktype,"dt>footer"); 
			} 			
		});
	  })

	});		
	// Footer - Blue Strip tracking end

	// Return to top link
	$(".text-return").on("click", function() {
		globalMenuClick("linkclick","dt>return to top",pageTitle,"button","dt>return to top");
	});		
	
	//cookie session storage variable created on click on gated assets
	/* $(".isGatedLock").on("click", function(){
			document.cookie="dtGatedParentPageRef="+window.location.href+";path=/;domain=.hds.com";
			//$.cookie("dtGatedParentPageRef", window.location.href, { path: '/', domain='.hds.com' });
	}); */

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
			var linkhref=$(this).attr("href");
			if(linktxt.indexOf('@')>0 || linkhref.indexOf('@')>0){globalMenuClick("linkclick","dt>em-"+linktxt.toLowerCase(),pageTitle,"email","dt>panel-main"); }
	});

	// email links clicks
	$('a[rel="emailHome"]').click(function() {
			var linktxt=$(this).text();
			var linkhref=$(this).attr("href");
			if(linktxt.indexOf('@')>0 || linkhref.indexOf('@')>0){globalMenuClick("linkclick","dt>em-"+linktxt.toLowerCase(),pageTitle,"email","dt>panel-main"); }
	});