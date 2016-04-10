var digitalData = digitalData || {};
var data=getCurrentBreadcrumb();
var url=$(location).attr('href');
if(url.indexOf("/unified-compute-platform-director.html") < 0 && url.indexOf("/microsoft-hyper-v.html") < 0)
{
	data = data.replace(/[`‐~!@#$®™%^*()_|+"\-=?;–'“”’,.<>\{\}\[\]\\\/]/gi, ' ');
	data = data.replace(/\s{2,}/g,' ');
}
data = data.toLowerCase();
items = data.split(":");
count = items.length;
if(pageTitle!="Home")
	{
		data=data.substring(data.indexOf(":")+1);
	}
if(pageTitle == 'Search')
	{
		pageTitle="internal search page";
	}

var activeLinkText="top";
var isTabClicked=false;
var desktopType="";
var orientation="landscape";
var screenSize;
var delay=4000;
var gInternalSearchFilter="";
var leadFormName="";var digitalData = digitalData || {};
var data=getCurrentBreadcrumb();
var url=$(location).attr('href');
if(url.indexOf("/unified-compute-platform-director.html") < 0 && url.indexOf("/microsoft-hyper-v.html") < 0)
{
	data = data.replace(/[`‐~!@#$®™%^*()_|+"\-=?;–'“”’,.<>\{\}\[\]\\\/]/gi, ' ');
	data = data.replace(/\s{2,}/g,' ');
}
data = data.toLowerCase();
items = data.split(":");
count = items.length;
if(pageTitle!="Home")
	{
		data=data.substring(data.indexOf(":")+1);
	}
if(pageTitle == 'Search')
	{
		pageTitle="internal search page";
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
if(url.indexOf("/unified-compute-platform-director.html") < 0 && url.indexOf("/microsoft-hyper-v.html") < 0)
{
	pageTitle = pageTitle.replace(/[`‐~!@#$®™%^*()_|+"\-=?;–'“”’,.<>\{\}\[\]\\\/]/gi, ' ');
}
if(url.indexOf("/press-releases/")>-1 || url.indexOf("/industry-solutions/")>-1)
	{
		var strngTitle = url;
		var n=strngTitle.lastIndexOf("/");
		strngTitle=strngTitle.substring(n+1, 1000);
		n=strngTitle.lastIndexOf(".");
		if(n>0){strngTitle=strngTitle.substring(0, n);}
		pageTitle=strngTitle;
	}
else if (pageTitle.indexOf("unified compute platform")>-1)
	{
		pageTitle=pageTitle.replace("unified compute platform", "ucp");
	}

//  error page tracking out of ready due to page load event challenges in DTM
function isErrorPage()
	{
		var url=document.title; //$(location).attr('href');
		if(url.indexOf("404")>-1 || url.indexOf("error")>-1)
			return true;
		else
			false;
	}

if(isErrorPage())
	{
		var fileName = window.location.pathname;
		var n=fileName.lastIndexOf("/");
		fileName=fileName.substring(n+1, 1000);
		n=fileName.lastIndexOf(".");
		if(n>0){fileName=fileName.substring(0, n);}
		
		digitalData.page={
				pageInfo:{
				pageName: $.trim(fileName),
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
			server:"hds",
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

$(document).ready(function() {
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
	}
// *****  --START-- the below section would perform the resource search tracking if the search page is hit *******  //
	if(isResourceSearchPage())
	{  
			var searchTerm = $('#resSearch').val();
			var result = $('.category-resources-listing').find('.resource.visible').size();
			var searchAction = "";
			var searchFilters = "all";
			if(searchTerm == "")
			{
				searchTerm='no term searched';
			}
		$('#resSearch').on('keypress',function(e)
			{
				searchTerm = $('#resSearch').val();
				if(e.which == 13)
					{
						setTimeout(function(){
						result = $('.category-resources-listing').find('.resource.visible').size();
						searchAction = "search box";
						result=result.toString();
						searchFilters =  getIndustryFilters() + "," + getContentFilters();// + "," + getCategoryFilters();
						specificSearchClick(searchTerm, searchAction, result)
						},8000);
					}
				
			});

		$('.searchResource').click(function()
			{
				searchTerm = $('#resSearch').val();
				setTimeout(function(){
				result = $('.category-resources-listing').find('.resource.visible').size();
				searchAction = "search box";
				result=result.toString();
				searchFilters =  getIndustryFilters() + "," + getContentFilters();// + "," + getCategoryFilters();
				specificSearchClick(searchTerm, searchAction, result)
				},5000);
			});

		$('#showIndustry').click(function()
			{
				searchTerm = $('#resSearch').val();
				setTimeout(function()
					{
						result = $('.category-resources-listing').find('.resource.visible').size();
						result=result.toString();
						searchAction = "Industry filter";
						searchFilters =  getIndustryFilters() + "," + getContentFilters() + "," + getCategoryFilters();
						if(getIndustryFilters()!="RL Search:Industry-all")specificSearchClick(searchTerm, searchAction, result);
					},3000);
			});
	
		$('#showContentType').click(function()
			{
				searchTerm = $('#resSearch').val();
				setTimeout(function()
					{
						result = $('.category-resources-listing').find('.resource.visible').size();
						result=result.toString();		
						searchAction = "Content filter";
						searchFilters =  getIndustryFilters() + "," + getContentFilters() + "," + getCategoryFilters();
						if(getContentFilters()!="RL Search:Content-all")specificSearchClick(searchTerm, searchAction, result);
					},3000);
			});
	
	//$('div.resources-listing ul[id=asideLinks-product]').each(function() {
	$('div.resources-listing ul[id=asideLinks-product]').click(function()
		{
			searchTerm = $('#resSearch').val();
			result =$('#actualCount').text();
			setTimeout(function()
			{
				result=result.toString();		
				searchAction = "category filter";
				searchFilters =  getIndustryFilters() + "," + getContentFilters() + "," + getCategoryFilters();
				if(searchFilters.indexOf("Category-Featured")>-1){result=$('.resourceLibraryfeatered').find('.resources-spotlight').size();}
				specificSearchClick(searchTerm, searchAction, result);	
			},7000);
		});	
	
	$('.checkbox .filters').click(function()
		{
			var pClass="";
			pClass=$(this).parent().parent().parent().parent().parent().parent().attr('class');
			if (pClass.indexOf("resources-listing")>-1)
			{
				searchTerm = $('#resSearch').val();
				result =$('#actualCount').text();
				setTimeout(function()
				{
					result=result.toString();		
					searchAction = "category filter";
					searchFilters =  getIndustryFilters() + "," + getContentFilters() + "," + getCategoryFilters();
					specificSearchClick(searchTerm, searchAction, result);	
				},5000);
			}
		});
	
		var currentpagenumber = $('span.current').html();
	$(document).on('click', '.page-link', function()
		{
			searchTerm = $('#resSearch').val();
			result = $('.category-resources-listing').find('.resource.visible').size();
			currentpagenumber = $('span.current').html();
			var pagination = currentpagenumber;
			resourcePagination(searchTerm,pagination, 'resource')
		});
	$(document).on('click', '.page-link.next', function()
		{
			searchTerm = $('#resSearch').val();
			result = $('.category-resources-listing').find('.resource.visible').size();
			currentpagenumber = $('span.current').html();
			var pagination = parseInt(currentpagenumber) + 1;
			//alert(pagination);
			resourcePagination(searchTerm, pagination, 'resource')
		});
	$(document).on('click', '.page-link.prev', function() 
		{
			searchTerm = $('#resSearch').val();
			result = $('.category-resources-listing').find('.resource.visible').size();
			currentpagenumber = $('span.current').html();
			var pagination = parseInt(currentpagenumber) - 1;
			resourcePagination(searchTerm, pagination, 'resource')
		});

	$('.clear-results a').click(function()
		{
			searchTerm = $('#resSearch').val();
			searchAction = "Clear all filters"
			result = $('.resourceLibraryfeatered').find('.resources-spotlight').size();
			if(searchTerm == ""){searchTerm = "Clear All Filters";}
			specificSearchClick(searchTerm, searchAction, result)
		});
		
	function specificSearchClick(searchTerm, searchAction, result)
		{ 
			if(searchTerm == "" || !searchTerm){
				searchTerm = 'no term searched'
			}
			if(result == 0){
				result = 'zero'
			}
			digitalData.eventData= 
			{ 
				searchTerm:searchTerm,
				searchAction:searchAction,
				searchResult:result,
				searchType:'resource',
				searchPage:digitalData.page.pageInfo.pageName,
				searchFilters:searchFilters
			}    
			_satellite.track('specificSearchClick');
			return;
		}

	function resourcePagination(searchTerm,pagination, searchResultType)
		{ 
			if(searchTerm == "" || !searchTerm){
					searchTerm = 'no term searched'
				}
			pagination=pagination.toString();
			digitalData.eventData=
			{ 
				pagination:pagination, // pagination no."3",
				searchTerm:searchTerm,
				searchResultType:searchResultType
			}    
			_satellite.track('pagination');
		}
	
	function getIndustryFilters()
		{
			var indfilters="";
			var selection = [];
			
			$.each($("input[name='ctyFunction']:checked"), function(){ 
				if($(this).attr('value').indexOf('industry')>-1){selection.push($(this).attr('id'));}
			});
			if(selection.length>0)
			{
				for(var i=0;i<selection.length;i++)
				{
					if(i<(selection.length-1)){indfilters = indfilters + "RL Search:Industry-" + selection[i] + ",";}
					else {indfilters = indfilters + "RL Search:Industry-" + selection[i];}
				}
			}
			else{indfilters = "RL Search:Industry-all";}	
			return indfilters;
		}
		
	function getContentFilters()
		{
			var confilters="";
			var selection = [];
			$.each($("input[name='ctyFunction']:checked"), function(){ 
				if($(this).attr('value').indexOf('content-type')>-1){selection.push($(this).attr('id'));}
			});
			if(selection.length>0)
			{
				for(var i=0;i<selection.length;i++)
				{
					if(i<(selection.length-1)){confilters = confilters + "RL Search:Content-" + selection[i]+ ",";}
					else {confilters = confilters + "RL Search:Content-" + selection[i];}
				}
			}
			else{confilters = "RL Search:Content-all";}
			return confilters;
		}
	
	function getCategoryFilters()
		{
			var catfilters="";
			var selection = [];
			
			$('div.resources-listing ul[id=asideLinks-product] li.active').each(function() {
					catfilters = "RL Search:Category-" + $.trim($(this).find('a').text());	   
			});	
			$('.resources-listing input.filters').each(function() {
					if ($(this).is(':checked')) {
					if($(this).attr('value').indexOf('product-and-solutions')>-1){selection.push($.trim($(this).parent().find("span").text()));}}
			});
					if(selection.length>0)
					{
						for(var i=0;i<selection.length;i++)
						{
							catfilters = catfilters + ",RL Search:Category-" + selection[i];
						}
					}
					else if(catfilters==""){catfilters = "RL Search:Category-Featured";}
				return catfilters;	
		}
	
	function getResourcesSearchFilters()
		{
			var filters="";
			$('div.resources-listing ul[id=asideLinks-product] li.active').each(function() {
				   if(filters.length>0)
							filters=filters+",";
					else
							filters="RL Search:";
					filters = filters+ $.trim($(this).find('a').text());
				   
			});	
			$('.resources-listing input.filters').each(function() {
					if ($(this).is(':checked')) {
						if(filters.length>0)
							filters=filters+",";
						filters = filters+$.trim($(this).parent().find("span").text());
						
					}
			});
			
			return filters.toLowerCase();
		}
}

// ****************************************************************************************************************//
// *****  --END-- the above section would perform the resource search tracking if the search page is hit *******  //
   
   if(isProductDetail())
		{
			digitalData["page"]["category"]["productName"]=pageTitle;
			digitalData["page"]["category"]["productInfo"]="product";
		}

	if(subSection!="" && subSection.length>0)
		{
			digitalData["page"]["category"]["subSection"]=subSection;
			
		}

//Header Links Custom Tracking
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
                var triggerName="us>mm>"+linktext.toLowerCase();
                if(category!="" && category.length>0)
					triggerName="us>mm>"+category.toLowerCase()+">"+linktext.toLowerCase();
                globalMenuClick("linkclick",triggerName,pageTitle,"link","mega menu"); 

            });
			//Added on 20160218
			$(this).mousedown(function(e){
				if(e.which == 3){
					var megamenuHeader=$(this).closest(".hds-megaMenu");
					var category="";
					if(megamenuHeader && megamenuHeader!='undefined' && megamenuHeader!='null')
						category = megamenuHeader.find('h2').find('a').text();
						category = $.trim(category);
					var triggerName="us>mm>"+linktext.toLowerCase();
					if(category!="" && category.length>0)
						triggerName="us>mm>"+category.toLowerCase()+">"+linktext.toLowerCase();
					globalMenuClick("linkclick",triggerName,pageTitle,"link","mega menu"); 
				} 			
			});
		});                 
     }
    });	
	//hero banner for home page only	
	$(".hero-homepage").each(function() 
	{
		 var listitem = $(this).find("a");
		// var linktext = $(this).find('h1').text();
		 var linkposition="";
		 var eType="link";
		 if( listitem.length>0)
		 {
			 listitem.each(function() {
				var linktext = $.trim(jQuery(this).text());			
				linkposition="home-hero-banner";
				$(this).click(function(){
					if ($(this).parent().attr("class") != "view-all")
					{eType = "button";}
					globalMenuClick("linkclick","hero-chevron",pageTitle,eType,linkposition); });
				$(this).mousedown(function(e){
					if ($(this).parent().attr("class") != "view-all")
					{eType = "button";}
					if(e.which == 3){globalMenuClick("linkclick","hero-chevron" + linktext.toLowerCase(),pageTitle,eType,linkposition);
					} 			
				});
			});                 
		 }
    });	
	//hero banners for all pages  .btn-square-white
	$(".common-hero-short-banner, .partnerHeroBanner, .common-hero-banner, .hero-product-solutions, .bannerSectionImage").each(function() {
     var listitem = $(this).find("a");
	 var url=$(location).attr('href');
	 var linktext = $(this).find('h1').text();
	 var linkposition="";
	 var eType="link";
	 var eClass="";
     if( listitem.length>0)
	 {
		 listitem.each(function() {
		 //var linktext = jQuery(this).text();
/* 		 if(linktext==""){linktext=$(this).parent().parent().find("h2").text();}
		 if(linktext==""){linktext=$(this).parent().parent().find("h3").text();}
		 linktext = $.trim(linktext);
 */		  var url=$(location).attr('href');
			if(url.indexOf("us/home")>-1)
				linkposition="home-hero-banner";
			else 
				linkposition="PS-Hero";
            $(this).click(function(){
				if(linktext==""){linktext=$(this).parent().parent().find("h2").text();}
				if(linktext==""){linktext=$(this).parent().parent().find("h3").text();}
				if(url.indexOf("/contact.html")>-1){linktext=$(this).parent().parent().find("h2").text();}
				linktext = $.trim(linktext);

				var eClass=$(this).parent().attr("class");
				if(eClass.indexOf("buy-through")!=-1)
					{
						linktext = "FIND AN HDS PARTNER";
						eType = "link";
					}
					else if ( eClass.indexOf("btn-square-white")!= -1)
				{eType = "button";}
				globalMenuClick("linkclick","hero-" + linktext.toLowerCase(),pageTitle,eType,linkposition); });
			$(this).mousedown(function(e){
				if(e.which == 3){
					var eClass=$(this).parent().attr("class");
					if(eClass.indexOf("buy-through")!=-1)
					{
						linktext = "FIND AN HDS PARTNER";
						eType = "link";
					}
					else if ( eClass.indexOf("btn-square-white")!= -1)
				{eType = "button";}
					globalMenuClick("linkclick","hero-" + linktext.toLowerCase(),pageTitle,eType,linkposition);
				} 			
			});
		});                 
     }
    });
	
	//Hexagons CTAs div.hexContain, 
	$("li.hexagon-transformative").each(function() {
     var listitem = $(this).find("a");
	 var linktext = $(this).find('h4').text();
     if( listitem.length>0)
	 {
		 //listitem.each(function() {
		 //var linktext = jQuery(this).text();
          linktext = "hex-" + $.trim(linktext);
            $(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","hexagon"); });
			$(this).mousedown(function(e){
				if(e.which == 3){
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","hexagon");
				} 			
			});
		//});                 
     }
    });
	
//Hexagons home page page CTAs .calculating-list 
	$(".calculating-list .hexagon270").each(function() {
     var listitem = $(this).find("a");
	 var linktext = $(this).find('h4').text();
     if( listitem.length>0)
	 {
		 listitem.each(function() {
		 //var linktext = jQuery(this).text();
          linktext = "hex-" + $.trim(linktext);
            $(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","hexagon"); });
			$(this).mousedown(function(e){
				if(e.which == 3){
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","hexagon");
				} 			
			});
		});                 
     }
    });	
	
	//Hexagons Home page popup CTAs
	$("ul.healthcare-list, li.hexagon-connect").each(function() {
     var listitem = $(this).find("a");
	 var linktext = $(this).find('h4').text();
     if( listitem.length>0)
	 {
		 listitem.each(function() {
		 //var linktext = jQuery(this).text();
          linktext = "hex-" + $.trim(linktext);
            $(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","hexagon"); });
			$(this).mousedown(function(e){
				if(e.which == 3){
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","hexagon");
				} 			
			});
		});                 
     }
    });
	
	//Hexagons about us page CTAs
	$(".hexagon320").each(function() {
     var listitem = $(this).find("a");
	 var linktext = $(this).find('h4').text();
     if( listitem.length>0)
	 {
		 listitem.each(function() {
		 //var linktext = jQuery(this).text();
          linktext = "hex-" + $.trim(linktext);
            $(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","hexagon"); });
			$(this).mousedown(function(e){
				if(e.which == 3){
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","hexagon");
				} 			
			});
		});                 
     }
    });

	
	$(".tbd-dl, .cs-all").each(function(){
		var panel="";
		var listitem = $(this).find("a");
		if(listitem.length>0){
			listitem.each(function(){
				var linktext = jQuery(this).text();
				linktext=linktext.toLowerCase();
				linktext = $.trim(linktext);
				if(linktext.indexOf("studies")>-1){panel="Case Study";}
				else if(linktext.indexOf("specifications")>-1){panel="Specifications-Panel";}
				$(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"button",panel); });
				$(this).mousedown(function(e){
				if(e.which == 3){
					$(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"button",panel); });
					} 			
				});
			});                 
		}
    });

	// Alliance partners logo
	jQuery("div.partner-list").each(function() 
	{
		var links = jQuery(this).find("img");
		var headingtext=$('.partner-program .heading').find("h2").text();
	   links.each(function() {
		 var linktext = jQuery(this).attr("title");
		 linktext=$.trim(linktext);
         if(linktext!="" || linktext.length > 0)
		 {
			$(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link",headingtext); });
			$(this).mousedown(function(e){
			if(e.which == 3){
				globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link",headingtext);
				} 			
			});
		 }
	  })

	});	
	
// Top menu drop down tracking
	$(".states-names").each(function() 
	{
		 var listitem = $(this).find("a");
		 if( listitem.length>0)
		 {
			 listitem.each(function() {
			 var linktext = jQuery(this).text();
			 var linktext1=jQuery(this).parent().parent().parent().parent().find("h2").text();
			  linktext = $.trim(linktext);
				$(this).click(function(){globalMenuClick("linkclick","us>tm>"+linktext1+ ":" + linktext.toLowerCase(),pageTitle,"link","top menu"); });
				//Added on 20160218
				$(this).mousedown(function(e){
					if(e.which == 3){
						globalMenuClick("linkclick","us>tm>"+linktext.toLowerCase(),pageTitle,"link","top menu");
					} 			
				});
			});                 
		 }
    });	
	

	$(".hds-quick-navigation").each(function() 
	{
		 var listitem = $(this).find("a");
		 if( listitem.length>0)
		 {
			 listitem.each(function() {
			 var linktext = jQuery(this).text();
			  linktext = $.trim(linktext);
				$(this).click(function(){globalMenuClick("linkclick","us>tm>"+linktext.toLowerCase(),pageTitle,"link","top menu"); });
				//Added on 20160218
				$(this).mousedown(function(e){
					if(e.which == 3){
						globalMenuClick("linkclick","us>tm>"+linktext.toLowerCase(),pageTitle,"link","top menu");
					} 			
				});
			});                 
		 }
    });	
	
	$(".hds-main-navigation h5").each(function()
	{
		 var listitem = $(this).find("a");
		 if( listitem.length>0)
		 {
			 listitem.each(function() {
			 linktext= $(this).children().text();
			 linktext=linktext.replace(/\t/g, '');
			 linktext=linktext.replace(/\n/g, '');
			 linktext = $.trim(linktext);

				$(this).click(function(){globalMenuClick("linkclick","us>tm>"+linktext.toLowerCase(),pageTitle,"link","top menu"); });
				//Added on 20160218
				$(this).mousedown(function(e){
					if(e.which == 3){
						globalMenuClick("linkclick","us>tm>"+linktext.toLowerCase(),pageTitle,"link","top menu");
					} 
				});
			});                 
		 }
    });	

	//Footer links tracking
	jQuery("div.footer-gray,div.footer-white").each(function() {
		var links = jQuery(this).find("a");
	   links.each(function() {
		 var linktext = jQuery(this).text();
		 linktext=$.trim(linktext);
           if(linktext!="" || linktext.length > 0)
		 {
		$(this).click(function(){globalMenuClick("linkclick","us>ft>"+linktext.toLowerCase(),pageTitle,"link","footer"); });
		//Added on 20160218
		$(this).mousedown(function(e){
			if(e.which == 3){
				globalMenuClick("linkclick","us>ft>"+linktext.toLowerCase(),pageTitle,"link","footer");
			} 			
			});
		 }
	  })

	});	

	//footer social media links
	
	jQuery("div.social").each(function() {
		var links = jQuery(this).find("img");
	   links.each(function() {
		 var linktext = jQuery(this).attr("title");
		 linktext=$.trim(linktext);
         if(linktext!="" || linktext.length > 0)
		 {
			$(this).click(function(){globalMenuClick("linkclick","us>ft>"+linktext.toLowerCase(),pageTitle,"link","footer"); });
			$(this).mousedown(function(e){
			if(e.which == 3){
				globalMenuClick("linkclick","us>ft>"+linktext.toLowerCase(),pageTitle,"link","footer");
				} 			
			});
		 }
	  })

	});
	
	//footer HDS logo
	
	jQuery(".iparys_inherited .footer-logo").each(function() {
		var linktext = $('.footer-logo').text();
		 if ($.trim(linktext)==0) {linktext="hds logo";}
		$(this).click(function(){globalMenuClick("linkclick","us>ft>"+linktext.toLowerCase(),pageTitle,"link","footer"); });
	
		$(this).mousedown(function(e){
			if(e.which == 3){
				globalMenuClick("linkclick","us>ft>"+linktext.toLowerCase(),pageTitle,"link","footer");
			} 			
			});
	});	
	//footer CTAs
	
	jQuery("div.buttons").each(function() {
		var links = jQuery(this).find("a");
		var linktype="";
	   links.each(function() {
		 var linkhref = jQuery(this).attr('href');
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
		$(this).click(function(){globalMenuClick("linkclick","us>ft>"+linkhref.toLowerCase(),pageTitle,linktype,"footer"); });
		$(this).mousedown(function(e){
			if(e.which == 3){
				globalMenuClick("linkclick","us>ft>"+linkhref.toLowerCase(),pageTitle,linktype,"footer");
			} 			
		});
	  })

	});		
	
//read customer stories links	

	$("div.cs-section, .animateLink").each(function() {
     var listitem = $(this).find("a");
     if( listitem.length>0)
	 {
		 listitem.each(function() {
			 var linktext = $(this).text();
			 linktext=$.trim(linktext.toLowerCase());
			 if(linktext.indexOf("read the case study")>-1 || linktext.indexOf("watch the video")>-1){linktext = $(".cs-highlight-box-logo").find("img").attr("alt");}
			 linktext = "case-study-panel-link-" + $.trim(linktext);
            $(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","Case-Study-Panel"); });
			$(this).mousedown(function(e){
				if(e.which == 3){
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","Case-Study-Panel");
				} 			
			});
		});                 
     }
    });	
	
//Featured P&S tracking 

	$(".acs-commons-resp-colctrl-row .acs-commons-resp-colctrl-col .product-box .product-link").each(function() {
     var listitem = $(this).find("a");
	 var linktext = $(this).parent().find('.product-copy-main').text();
	 var linktext1=$('.mes-container').find('h3').text();
          linktext = linktext1 + "-" + $.trim(linktext);
            $(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link",linktext1); });
			$(this).mousedown(function(e){
				if(e.which == 3){
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link",linktext1 );
				} 			
			});
    });
	
	// tabs on careers page
	$(".PagerBar").each(function() {
	 	var links = $(this).find("a")
       links.each(function() {
		 	$(this).click(function(){
                isTabClicked=true;
                var tabTitle = "tab-"+$.trim($(this).text()).toLowerCase().replace(/\s/g,"-")+" button";
                tabClick(primaryCategory,tabTitle,pageTitle,"Tabclick"); 
            });
	  	});

	});
	
	//Tabs Custom Tracking tabbing-container :event, category-listing: storage  page tabs
	$(".stickNav-container, .custom-nav-tabs .nav-tabs, .category-listing, .webcast-listing").each(function() {
	 	var links = $(this).find("a");
	  links.each(function() {
		 	$(this).click(function(){
                isTabClicked=true;
				
                var tabTitle = "tab-"+$.trim($(this).text()).toLowerCase().replace(/\s/g,"-")+" button";
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
    					var tabTitle = "tab-"+activeLink.text().toLowerCase().replace(/\s/g,"-")+" scroll";
                        tabClick(primaryCategory,tabTitle,pageTitle,"Tabscroll");
                        }
                        	else
                                isTabClicked=false;
                    }
 
            	 }, delay);           
        }

       });
	   
	   
	// tabs on location page
	$("#allCountries").on("change", function()
		{
			var links = $(this).val();
			if (!links.indexOf("Select Country")>-1){
                var tabTitle = "tab-region-" + $("#allRegion option:selected").text() + "-country-" + links;
                tabClick(primaryCategory,tabTitle,pageTitle,"Tabclick"); }
        });

	$("#allLocations").on("change", function() 
		{
			var links = $(this).val();
			if (!links.indexOf("Select Location")>-1){
                var tabTitle = "tab-region-" + $("#allRegion option:selected").text() + "-country-" + $("#allCountries option:selected").text() + "-location-" + links;
                tabClick(primaryCategory,tabTitle,pageTitle,"Tabclick"); }
            });
		
	//Click to call tracking
	$('.talk .call').click(function(){
		if(window.outerWidth < 992){
			var pNumber="ph no - " + $('.call').text();
			clicktocall(pNumber,pageTitle);
		}
	})
	
	function clicktocall(pNumber,pageTitle){
    digitalData.eventData= {
    	eventName:'click to call',
		eventAction:pNumber,
		eventPage:pageTitle
    }
    _satellite.track('clicktocall');
	}

	//products search events start here
	$(document).on('keypress', '#searchFilter', function(event) 
	{
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
	$('.product-search-area .product-listing input.filters').each(function() {
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
		
    $('div.product-listing ul[id=asideLinks-product]').each(function() {
		var sType="";
		var dly="1500";
	 	var links = $(this).find("a");
	 	links.each(function() {
            $(this).click(function(){
                var text = $(this).text();
				var url=$(location).attr('href');
				if(url.indexOf("/resources.html")>-1){sType='resources';dly="7000"}else{sType='products & solutions';}
                setTimeout(function() {
                var result=$('#actualCount').text();
                 if(result==0)
                     result="zero";
                	searchClick($('#searchFilter').val(), "category filter",result,getProductsSearchFilters(),sType,'specificSearchClick');
    			 }, dly);
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
	var sFilters="";
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

	$(window).load(function(event)
		{
			var currentLocation = $(location).attr('href');
			if(currentLocation.indexOf('search.html') > -1){
				$("#searchFrame").contents().find("[tokenid=searchresultitem]").size();
				var result =$(".searchresultitem").size();
			}	
		});

$(document).on('keypress', '#fulltext', function(event) 
	{
		if(event.which == 13) {
			var interval = setInterval(function() {
				if($('.pr-archives-list-items').size()>0){
				var searchTerm=$('#fulltext').val();
				var result=$('.pr:visible').size();
					result=result.toString();
				if(result==0)
					result="zero";
					
					if(searchType=="press release"){sFilters="PR Search:" + getPnaFilters();}
					else if(searchType=="news"){sFilters="News Search:" + getPnaFilters();}
					else if(searchType=="awards"){sFilters="Awards Search:" + getPnaFilters();}
				
				searchClick(searchTerm, "search box",result,sFilters,searchType,searchTrackEvent);
				clearInterval(interval);
				 }
			}, 1500); 
		}
    });
	var searchIcon=$(".glyphicon.glyphicon-search");
    $(document).on('click', '.pr-list .pr-list-container .pr-search span.glyphicon.glyphicon-search', function(event)
	{
			var interval = setInterval(function() {
        	if($('.pr-archives-list-items').size()>0){
            var searchTerm=$('#fulltext').val();
            var result=$('.pr:visible').size();
            result=result.toString();
            if(result==0)
                result="zero";

				if(searchType=="press release"){sFilters="PR Search:" + getPnaFilters();}
				else if(searchType=="news"){sFilters="News Search:" + getPnaFilters();}
				else if(searchType=="awards"){sFilters="Awards Search:" + getPnaFilters();}
			
           searchClick(searchTerm, "search box",result,sFilters,searchType,searchTrackEvent);
           clearInterval(interval);
        }
        }, 1500);
    });

 	$('.pr-list-archives ul[id=archivesLinks]').each(function()
	{
	 	var links = $(this).find("a");
	 	links.each(function() {
            $(this).click(function(event){
            	var interval = setInterval(function() {
                	if($('.pr-archives-list-items').size()>0)
                	{
                		var result=$('.pr:visible').size();
                        result=result.toString();
                		if(result==0)
	                     result="zero";
						
						if(searchType=="press release"){sFilters="PR Search:" + getPnaFilters();}
						else if(searchType=="news"){sFilters="News Search:" + getPnaFilters();}
						else if(searchType=="awards"){sFilters="Awards Search:" + getPnaFilters();}
						
						searchClick($('#fulltext').val(), "year filter",result,sFilters,searchType,searchTrackEvent);
	                	clearInterval(interval);
	               }
                 }, 1500);
            	
             });
        });
	});	

//Events Search events start here
	$(document).on('click', '#updateResults', function(event) 
	{
		setTimeout(function() {
			var searchTerm="";
			var result=$('#newsEventCatagory').find('div.newsWrapper-listing:visible').size();
			result=result.toString();
			 if(result==0)
				 result="zero";
				searchClick("", "search button",result,eventsFilters(),'event','specificSearchClick');
		}, 1000); 
    });

	$('#filterRegion').on('change', function(event)
	{
		setTimeout(function() {
				var searchTerm=$(".filter-option").text();
				var result=$('#newsEventCatagory').find('div.newsWrapper-listing:visible').size();
				result=result.toString();
				if(result==0)
					result="zero";
				searchClick("", "Region filter",result,eventsFilters(),'event','specificSearchClick');
			 }, 1000); 
    });

	$('.newsEvents-category-list .news-listing').each(function() 
	{
	 	var links = $(this).find("a");
	 	links.each(function() {
            $(this).click(function(){
                var eventType = $(this).text();
                 eventType=eventType.replace(/\t/g, '');
         		eventType=eventType.replace(/\t/g, '');
				eventType=$.trim(eventType);
                setTimeout(function() {
                var result=$('#newsEventCatagory').find('div.newsWrapper-listing:visible').size();
                result=result.toString();
                 if(result==0)
                     result="zero";
                	searchClick("", "Event Filter",result,eventsFilters(),"event","specificSearchClick");
    			 }, 1500);
             });
        });
	});	

// training and certification page
	$(window).on("load", function() 
	{
		var url=$(location).attr('href');
		if(url.indexOf("/training-details")>-1){
			var interval = setInterval(function() 
			{
				var searchTerm=$(".daterangepicker_input .search").val();
				var result=$('#contentCatagory').find('.result-product .tab-content .category-products-listing .result-section').size();
				result=result.toString();
				if(result==0)
				result="zero";
				searchClick(searchTerm, "search button",result,trainingFilters(),'training&certification','specificSearchClick');
				clearInterval(interval);
			}, 1500); 
		}
	});


//ends
// Training detail page search

	$(document).on('click', '.srching .search-course-btn', function(event) 
	{
		setTimeout(function() 
		{
			var searchTerm=$(".daterangepicker_input .search").val();
			var result=$('#contentCatagory').find('.result-product .tab-content .category-products-listing .result-section').size();
			result=result.toString();
			 if(result==0)
				 result="zero";
				searchClick(searchTerm, "search button",result,trainingFilters(),'training','specificSearchClick');
		  }, 1000); 
    });

	$('#trainingDetail .Container-Results .product-listing li.active input.filters').on('click', function(event)
	{
		setTimeout(function()
		{
            var searchTerm=$(".daterangepicker_input .search").val();
			var text=$(this).text();
            var result=$('#contentCatagory').find('.result-product .tab-content .category-products-listing .result-section').size();
        	result=result.toString();
            if(result==0)
            	result="zero";
     		searchClick(searchTerm, "location filter",result,trainingFilters(),'training','specificSearchClick');
         }, 1000); 
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

	function searchClick(searchTerm, searchAction,result,searchFilters,searchType,trackEvent)
	{
			if(searchTerm == '' || searchTerm == undefined || !searchTerm){
				searchTerm = "no term searched"
			}
			if(searchType=="resources"){result=$('.resource').length;}
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
			_satellite.track(trackEvent);

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

	function isResourceSearchPage()
	{
		var url=$(location).attr('href');
		if(url.indexOf("/en-us/news-insights/resources.html")>-1)
			return true;
		else
			false;
	}
	function isLeadFormPage()
	{
		if($(".mktoForm, .mktoContent").size()>0)
			return true;
		else
			return false;
	}

	function getProductsSearchFilters()
	{
		var filters="";
		$('ul[id=asideLinks-product] li.active').each(function() {
			   if(filters.length>0)
						filters=filters+",";
				else
						filters="P&S Search:";
				filters = filters+ $.trim($(this).find('a').text());   
		});	
		$('.product-listing input.filters').each(function() {
				if ($(this).is(':checked')) {
					if(filters.length>0)
						filters=filters+",P&S Search:";
					filters = filters+$.trim($(this).parent().find("span").text());
				}
			 });
		$('.result-product ul.sortAlpha a.current').each(function() {
				if(filters.length>0)
					filters=filters+",P&S Search:Product Name-";
				filters = filters+ $.trim($(this).text());
			});	
		return filters.toLowerCase();
	}


//press release , news and awards filters
	function getPnaFilters()
	{
		var filters="";
		$('.pr-list-archives ul[id=archivesLinks] a.active').each(function() 
		{
				if(filters.length>0)
					filters=filters+",";
				var year=$(this).text().replace(/\t/g, '');
				year=year.replace(/\n/g, '');
				year=$.trim(year);
				filters = filters+ year;
			
		});	
		return  filters.toLowerCase();
	}
	function eventsFilters()
	{
		var filters="";
		 var dropDown=$(".filter-option").text();
		 var fromDate =$('#date-range200').val();
		 var toDate =$('#date-range201').val();
		 if($.trim(fromDate).length>0)
			 filters = filters + "event search:from date-" + fromDate;
		 if($.trim(toDate).length>0)
		 {
			 if(filters.length>0)
					filters=filters+",";
			 filters = filters + "event search:to date-" + toDate; 
		 }
			 
		 if(dropDown!="" && dropDown!="Filter By Region")
		 {
			 if(filters.length>0)
					filters=filters+",";
			 filters = filters + "event search:region-" + dropDown;
		 }
		$('.newsEvents-category-list .news-listing li.active').each(function() {
			if(filters.length>0)
				filters=filters+",";
			  var eventType = $(this).find('a').text();
			 eventType=eventType.replace(/\t/g, '');
			 eventType=eventType.replace(/\t/g, '');
			 filters = filters+ "event search:" + $.trim(eventType);
		});	
		return filters.toLowerCase();
	}

	function trainingFilters()
	{
		var selection = [];
		var trafilters="";
		 //var dropDown=$(".filter-option").text();
		 var fromDate =$('#date-range200').val();
		 var toDate =$('#date-range201').val();
		 if($.trim(fromDate).length>0)
			 trafilters = trafilters + "training search:from date-" + fromDate;
		 if($.trim(toDate).length>0){
			 if(trafilters.length>0)
					trafilters=trafilters+",";
			 trafilters = trafilters + "training search:to date-" + toDate; 
		 }
			 
		$('#trainingDetail .Container-Results .product-listing li.active input.filters').each(function() 
		{
			if ($(this).is(':checked')) 
				{selection.push($.trim($(this).parent().find("span").text()));}
		});	
		if(selection.length>0)
			{
				for(var i=0;i<selection.length;i++)
				{
					trafilters = trafilters + ",Training Search:Location-" + selection[i];
				}
			}
		else if(trafilters==""){trafilters = "Training Search:Location-all";}
		
		return trafilters.toLowerCase();
	}

	function videoTracking(vId, pPageName)
	{
		digitalData.eventData= {
			videoId:vId,
			parentPage:pPageName
		} 
		_satellite.track('videotracking');

	}

pageTitle=pageTitle.toLowerCase();
pageTitle=$.trim(pageTitle);
// URL shorten for UCP and Press Release 
if(url.indexOf("/unified-compute-platform-director.html") < 0 && url.indexOf("/microsoft-hyper-v.html") < 0)
{
	pageTitle = pageTitle.replace(/[`‐~!@#$®™%^*()_|+"\-=?;–'“”’,.<>\{\}\[\]\\\/]/gi, ' ');
}
if(url.indexOf("/press-releases/")>-1 || url.indexOf("/industry-solutions/")>-1)
	{
		var strngTitle = url;
		var n=strngTitle.lastIndexOf("/");
		strngTitle=strngTitle.substring(n+1, 1000);
		n=strngTitle.lastIndexOf(".");
		if(n>0){strngTitle=strngTitle.substring(0, n);}
		pageTitle=strngTitle;
	}
else if (pageTitle.indexOf("unified compute platform")>-1)
	{
		pageTitle=pageTitle.replace("unified compute platform", "ucp");
	}

//  error page tracking out of ready due to page load event challenges in DTM
function isErrorPage()
	{
		var url=document.title; //$(location).attr('href');
		if(url.indexOf("404")>-1 || url.indexOf("error")>-1)
			return true;
		else
			false;
	}

if(isErrorPage())
	{
		var fileName = window.location.pathname;
		var n=fileName.lastIndexOf("/");
		fileName=fileName.substring(n+1, 1000);
		n=fileName.lastIndexOf(".");
		if(n>0){fileName=fileName.substring(0, n);}
		
		digitalData.page={
				pageInfo:{
				pageName: $.trim(fileName),
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
			server:"hds",
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

$(document).ready(function() {
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
	}
// *****  --START-- the below section would perform the resource search tracking if the search page is hit *******  //
	if(isResourceSearchPage())
	{  
			var searchTerm = $('#resSearch').val();
			var result = $('.category-resources-listing').find('.resource.visible').size();
			var searchAction = "";
			var searchFilters = "all";
			if(searchTerm == "")
			{
				searchTerm='no term searched';
			}
		$('#resSearch').on('keypress',function(e)
			{
				searchTerm = $('#resSearch').val();
				if(e.which == 13)
					{
						setTimeout(function(){
						result = $('.category-resources-listing').find('.resource.visible').size();
						searchAction = "search box";
						result=result.toString();
						searchFilters =  getIndustryFilters() + "," + getContentFilters();// + "," + getCategoryFilters();
						specificSearchClick(searchTerm, searchAction, result)
						},8000);
					}
				
			});

		$('.searchResource').click(function()
			{
				searchTerm = $('#resSearch').val();
				setTimeout(function(){
				result = $('.category-resources-listing').find('.resource.visible').size();
				searchAction = "search box";
				result=result.toString();
				searchFilters =  getIndustryFilters() + "," + getContentFilters();// + "," + getCategoryFilters();
				specificSearchClick(searchTerm, searchAction, result)
				},5000);
			});

		$('#showIndustry').click(function()
			{
				searchTerm = $('#resSearch').val();
				setTimeout(function()
					{
						result = $('.category-resources-listing').find('.resource.visible').size();
						result=result.toString();
						searchAction = "Industry filter";
						searchFilters =  getIndustryFilters() + "," + getContentFilters() + "," + getCategoryFilters();
						if(getIndustryFilters()!="RL Search:Industry-all")specificSearchClick(searchTerm, searchAction, result);
					},3000);
			});
	
		$('#showContentType').click(function()
			{
				searchTerm = $('#resSearch').val();
				setTimeout(function()
					{
						result = $('.category-resources-listing').find('.resource.visible').size();
						result=result.toString();		
						searchAction = "Content filter";
						searchFilters =  getIndustryFilters() + "," + getContentFilters() + "," + getCategoryFilters();
						if(getContentFilters()!="RL Search:Content-all")specificSearchClick(searchTerm, searchAction, result);
					},3000);
			});
	
	//$('div.resources-listing ul[id=asideLinks-product]').each(function() {
	$('div.resources-listing ul[id=asideLinks-product]').click(function()
		{
			searchTerm = $('#resSearch').val();
			result =$('#actualCount').text();
			setTimeout(function()
			{
				result=result.toString();		
				searchAction = "category filter";
				searchFilters =  getIndustryFilters() + "," + getContentFilters() + "," + getCategoryFilters();
				if(searchFilters.indexOf("Category-Featured")>-1){result=$('.resourceLibraryfeatered').find('.resources-spotlight').size();}
				specificSearchClick(searchTerm, searchAction, result);	
			},7000);
		});	
	
	$('.checkbox .filters').click(function()
		{
			var pClass="";
			pClass=$(this).parent().parent().parent().parent().parent().parent().attr('class');
			if (pClass.indexOf("resources-listing")>-1)
			{
				searchTerm = $('#resSearch').val();
				result =$('#actualCount').text();
				setTimeout(function()
				{
					result=result.toString();		
					searchAction = "category filter";
					searchFilters =  getIndustryFilters() + "," + getContentFilters() + "," + getCategoryFilters();
					specificSearchClick(searchTerm, searchAction, result);	
				},5000);
			}
		});
	
		var currentpagenumber = $('span.current').html();
	$(document).on('click', '.page-link', function()
		{
			searchTerm = $('#resSearch').val();
			result = $('.category-resources-listing').find('.resource.visible').size();
			currentpagenumber = $('span.current').html();
			var pagination = currentpagenumber;
			resourcePagination(searchTerm,pagination, 'resource')
		});
	$(document).on('click', '.page-link.next', function()
		{
			searchTerm = $('#resSearch').val();
			result = $('.category-resources-listing').find('.resource.visible').size();
			currentpagenumber = $('span.current').html();
			var pagination = parseInt(currentpagenumber) + 1;
			//alert(pagination);
			resourcePagination(searchTerm, pagination, 'resource')
		});
	$(document).on('click', '.page-link.prev', function() 
		{
			searchTerm = $('#resSearch').val();
			result = $('.category-resources-listing').find('.resource.visible').size();
			currentpagenumber = $('span.current').html();
			var pagination = parseInt(currentpagenumber) - 1;
			resourcePagination(searchTerm, pagination, 'resource')
		});

	$('.clear-results a').click(function()
		{
			searchTerm = $('#resSearch').val();
			searchAction = "Clear all filters"
			result = $('.resourceLibraryfeatered').find('.resources-spotlight').size();
			if(searchTerm == ""){searchTerm = "Clear All Filters";}
			specificSearchClick(searchTerm, searchAction, result)
		});
		
	function specificSearchClick(searchTerm, searchAction, result)
		{ 
			if(searchTerm == "" || !searchTerm){
				searchTerm = 'no term searched'
			}
			if(result == 0){
				result = 'zero'
			}
			digitalData.eventData= 
			{ 
				searchTerm:searchTerm,
				searchAction:searchAction,
				searchResult:result,
				searchType:'resource',
				searchPage:digitalData.page.pageInfo.pageName,
				searchFilters:searchFilters
			}    
			_satellite.track('specificSearchClick');
			return;
		}

	function resourcePagination(searchTerm,pagination, searchResultType)
		{ 
			if(searchTerm == "" || !searchTerm){
					searchTerm = 'no term searched'
				}
			pagination=pagination.toString();
			digitalData.eventData=
			{ 
				pagination:pagination, // pagination no."3",
				searchTerm:searchTerm,
				searchResultType:searchResultType
			}    
			_satellite.track('pagination');
		}
	
	function getIndustryFilters()
		{
			var indfilters="";
			var selection = [];
			
			$.each($("input[name='ctyFunction']:checked"), function(){ 
				if($(this).attr('value').indexOf('industry')>-1){selection.push($(this).attr('id'));}
			});
			if(selection.length>0)
			{
				for(var i=0;i<selection.length;i++)
				{
					if(i<(selection.length-1)){indfilters = indfilters + "RL Search:Industry-" + selection[i] + ",";}
					else {indfilters = indfilters + "RL Search:Industry-" + selection[i];}
				}
			}
			else{indfilters = "RL Search:Industry-all";}	
			return indfilters;
		}
		
	function getContentFilters()
		{
			var confilters="";
			var selection = [];
			$.each($("input[name='ctyFunction']:checked"), function(){ 
				if($(this).attr('value').indexOf('content-type')>-1){selection.push($(this).attr('id'));}
			});
			if(selection.length>0)
			{
				for(var i=0;i<selection.length;i++)
				{
					if(i<(selection.length-1)){confilters = confilters + "RL Search:Content-" + selection[i]+ ",";}
					else {confilters = confilters + "RL Search:Content-" + selection[i];}
				}
			}
			else{confilters = "RL Search:Content-all";}
			return confilters;
		}
	
	function getCategoryFilters()
		{
			var catfilters="";
			var selection = [];
			
			$('div.resources-listing ul[id=asideLinks-product] li.active').each(function() {
					catfilters = "RL Search:Category-" + $.trim($(this).find('a').text());	   
			});	
			$('.resources-listing input.filters').each(function() {
					if ($(this).is(':checked')) {
					if($(this).attr('value').indexOf('product-and-solutions')>-1){selection.push($.trim($(this).parent().find("span").text()));}}
			});
					if(selection.length>0)
					{
						for(var i=0;i<selection.length;i++)
						{
							catfilters = catfilters + ",RL Search:Category-" + selection[i];
						}
					}
					else if(catfilters==""){catfilters = "RL Search:Category-Featured";}
				return catfilters;	
		}
	
	function getResourcesSearchFilters()
		{
			var filters="";
			$('div.resources-listing ul[id=asideLinks-product] li.active').each(function() {
				   if(filters.length>0)
							filters=filters+",";
					else
							filters="RL Search:";
					filters = filters+ $.trim($(this).find('a').text());
				   
			});	
			$('.resources-listing input.filters').each(function() {
					if ($(this).is(':checked')) {
						if(filters.length>0)
							filters=filters+",";
						filters = filters+$.trim($(this).parent().find("span").text());
						
					}
			});
			
			return filters.toLowerCase();
		}
}

// ****************************************************************************************************************//
// *****  --END-- the above section would perform the resource search tracking if the search page is hit *******  //
   
   if(isProductDetail())
		{
			digitalData["page"]["category"]["productName"]=pageTitle;
			digitalData["page"]["category"]["productInfo"]="product";
		}

	if(subSection!="" && subSection.length>0)
		{
			digitalData["page"]["category"]["subSection"]=subSection;
			
		}

//Header Links Custom Tracking
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
                var triggerName="us>mm>"+linktext.toLowerCase();
                if(category!="" && category.length>0)
					triggerName="us>mm>"+category.toLowerCase()+">"+linktext.toLowerCase();
                globalMenuClick("linkclick",triggerName,pageTitle,"link","mega menu"); 

            });
			//Added on 20160218
			$(this).mousedown(function(e){
				if(e.which == 3){
					var megamenuHeader=$(this).closest(".hds-megaMenu");
					var category="";
					if(megamenuHeader && megamenuHeader!='undefined' && megamenuHeader!='null')
						category = megamenuHeader.find('h2').find('a').text();
						category = $.trim(category);
					var triggerName="us>mm>"+linktext.toLowerCase();
					if(category!="" && category.length>0)
						triggerName="us>mm>"+category.toLowerCase()+">"+linktext.toLowerCase();
					globalMenuClick("linkclick",triggerName,pageTitle,"link","mega menu"); 
				} 			
			});
		});                 
     }
    });	
	//hero banner for home page only	
	$(".hero-homepage").each(function() 
	{
		 var listitem = $(this).find("a");
		// var linktext = $(this).find('h1').text();
		 var linkposition="";
		 var eType="link";
		 if( listitem.length>0)
		 {
			 listitem.each(function() {
				var linktext = $.trim(jQuery(this).text());			
				linkposition="home-hero-banner";
				$(this).click(function(){
					if ($(this).parent().attr("class") != "view-all")
					{eType = "button";}
					globalMenuClick("linkclick","hero-chevron",pageTitle,eType,linkposition); });
				$(this).mousedown(function(e){
					if ($(this).parent().attr("class") != "view-all")
					{eType = "button";}
					if(e.which == 3){globalMenuClick("linkclick","hero-chevron" + linktext.toLowerCase(),pageTitle,eType,linkposition);
					} 			
				});
			});                 
		 }
    });	
	//hero banners for all pages  .btn-square-white
	$(".common-hero-short-banner, .partnerHeroBanner, .common-hero-banner, .hero-product-solutions, .bannerSectionImage").each(function() {
     var listitem = $(this).find("a");
	 var linktext = $(this).find('h1').text();
	 var linkposition="";
	 var eType="link";
	 var eClass="";
     if( listitem.length>0)
	 {
		 listitem.each(function() {
		 //var linktext = jQuery(this).text();
		 if(linktext==""){linktext=$(this).parent().parent().find("h2").text();}
		 if(linktext==""){linktext=$(this).parent().parent().find("h3").text();}
		 linktext = $.trim(linktext);
		  var url=$(location).attr('href');
			if(url.indexOf("us/home")>-1)
				linkposition="home-hero-banner";
			else 
				linkposition="PS-Hero";
            $(this).click(function(){
				var eClass=$(this).parent().attr("class");
				if(eClass.indexOf("buy-through")!=-1)
					{
						linktext = "FIND AN HDS PARTNER";
						eType = "link";
					}
					else if ( eClass.indexOf("btn-square-white")!= -1)
				{eType = "button";}
				globalMenuClick("linkclick","hero-" + linktext.toLowerCase(),pageTitle,eType,linkposition); });
			$(this).mousedown(function(e){
				if(e.which == 3){
					var eClass=$(this).parent().attr("class");
					if(eClass.indexOf("buy-through")!=-1)
					{
						linktext = "FIND AN HDS PARTNER";
						eType = "link";
					}
					else if ( eClass.indexOf("btn-square-white")!= -1)
				{eType = "button";}
					globalMenuClick("linkclick","hero-" + linktext.toLowerCase(),pageTitle,eType,linkposition);
				} 			
			});
		});                 
     }
    });
	
	//Hexagons CTAs div.hexContain, 
	$("li.hexagon-transformative").each(function() {
     var listitem = $(this).find("a");
	 var linktext = $(this).find('h4').text();
     if( listitem.length>0)
	 {
		 //listitem.each(function() {
		 //var linktext = jQuery(this).text();
          linktext = "hex-" + $.trim(linktext);
            $(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","hexagon"); });
			$(this).mousedown(function(e){
				if(e.which == 3){
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","hexagon");
				} 			
			});
		//});                 
     }
    });
	
//Hexagons home page page CTAs .calculating-list 
	$(".hexagon270").each(function() {
     var listitem = $(this).find("a");
	 var linktext = $(this).find('h4').text();
     if( listitem.length>0)
	 {
		 //listitem.each(function() {
		 //var linktext = jQuery(this).text();
          linktext = "hex-" + $.trim(linktext);
            $(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","hexagon"); });
			$(this).mousedown(function(e){
				if(e.which == 3){
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","hexagon");
				} 			
			});
		//});                 
     }
    });	
	
	//Hexagons Home page popup CTAs
	$("ul.healthcare-list, li.hexagon-connect").each(function() {
     var listitem = $(this).find("a");
	 var linktext = $(this).find('h4').text();
     if( listitem.length>0)
	 {
		 listitem.each(function() {
		 //var linktext = jQuery(this).text();
          linktext = "hex-" + $.trim(linktext);
            $(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","hexagon"); });
			$(this).mousedown(function(e){
				if(e.which == 3){
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","hexagon");
				} 			
			});
		});                 
     }
    });
	
	//Hexagons about us page CTAs
	$("div.hexagon320, .hexagon-content").each(function() {
     var listitem = $(this).find("a");
	 var linktext = $(this).find('h4').text();
     if( listitem.length>0)
	 {
		 listitem.each(function() {
		 //var linktext = jQuery(this).text();
          linktext = "hex-" + $.trim(linktext);
            $(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","hexagon"); });
			$(this).mousedown(function(e){
				if(e.which == 3){
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","hexagon");
				} 			
			});
		});                 
     }
    });

	
	$(".tbd-dl, .cs-all").each(function(){
		var panel="";
		var listitem = $(this).find("a");
		if(listitem.length>0){
			listitem.each(function(){
				var linktext = jQuery(this).text();
				linktext=linktext.toLowerCase();
				linktext = $.trim(linktext);
				if(linktext.indexOf("studies")>-1){panel="Case Study";}
				else if(linktext.indexOf("specifications")>-1){panel="Specifications-Panel";}
				$(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"button",panel); });
				$(this).mousedown(function(e){
				if(e.which == 3){
					$(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"button",panel); });
					} 			
				});
			});                 
		}
    });

	// Alliance partners logo
	jQuery("div.partner-list").each(function() 
	{
		var links = jQuery(this).find("img");
		var headingtext=$('.partner-program .heading').find("h2").text();
	   links.each(function() {
		 var linktext = jQuery(this).attr("title");
		 linktext=$.trim(linktext);
         if(linktext!="" || linktext.length > 0)
		 {
			$(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link",headingtext); });
			$(this).mousedown(function(e){
			if(e.which == 3){
				globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link",headingtext);
				} 			
			});
		 }
	  })

	});	
	
// Top menu drop down tracking
	$(".states-names").each(function() 
	{
		 var listitem = $(this).find("a");
		 if( listitem.length>0)
		 {
			 listitem.each(function() {
			 var linktext = jQuery(this).text();
			 var linktext1=jQuery(this).parent().parent().parent().parent().find("h2").text();
			  linktext = $.trim(linktext);
				$(this).click(function(){globalMenuClick("linkclick","us>tm>"+linktext1+ ":" + linktext.toLowerCase(),pageTitle,"link","top menu"); });
				//Added on 20160218
				$(this).mousedown(function(e){
					if(e.which == 3){
						globalMenuClick("linkclick","us>tm>"+linktext.toLowerCase(),pageTitle,"link","top menu");
					} 			
				});
			});                 
		 }
    });	
	

	$(".hds-quick-navigation").each(function() 
	{
		 var listitem = $(this).find("a");
		 if( listitem.length>0)
		 {
			 listitem.each(function() {
			 var linktext = jQuery(this).text();
			  linktext = $.trim(linktext);
				$(this).click(function(){globalMenuClick("linkclick","us>tm>"+linktext.toLowerCase(),pageTitle,"link","top menu"); });
				//Added on 20160218
				$(this).mousedown(function(e){
					if(e.which == 3){
						globalMenuClick("linkclick","us>tm>"+linktext.toLowerCase(),pageTitle,"link","top menu");
					} 			
				});
			});                 
		 }
    });	
	
	$(".hds-main-navigation h5").each(function()
	{
		 var listitem = $(this).find("a");
		 if( listitem.length>0)
		 {
			 listitem.each(function() {
			 linktext= $(this).children().text();
			 linktext=linktext.replace(/\t/g, '');
			 linktext=linktext.replace(/\n/g, '');
			 linktext = $.trim(linktext);

				$(this).click(function(){globalMenuClick("linkclick","us>tm>"+linktext.toLowerCase(),pageTitle,"link","top menu"); });
				//Added on 20160218
				$(this).mousedown(function(e){
					if(e.which == 3){
						globalMenuClick("linkclick","us>tm>"+linktext.toLowerCase(),pageTitle,"link","top menu");
					} 
				});
			});                 
		 }
    });	

	//Footer links tracking
	jQuery("div.footer-gray,div.footer-white").each(function() {
		var links = jQuery(this).find("a");
	   links.each(function() {
		 var linktext = jQuery(this).text();
		 linktext=$.trim(linktext);
           if(linktext!="" || linktext.length > 0)
		 {
		$(this).click(function(){globalMenuClick("linkclick","us>ft>"+linktext.toLowerCase(),pageTitle,"link","footer"); });
		//Added on 20160218
		$(this).mousedown(function(e){
			if(e.which == 3){
				globalMenuClick("linkclick","us>ft>"+linktext.toLowerCase(),pageTitle,"link","footer");
			} 			
			});
		 }
	  })

	});	

	//footer social media links
	
	jQuery("div.social").each(function() {
		var links = jQuery(this).find("img");
	   links.each(function() {
		 var linktext = jQuery(this).attr("title");
		 linktext=$.trim(linktext);
         if(linktext!="" || linktext.length > 0)
		 {
			$(this).click(function(){globalMenuClick("linkclick","us>ft>"+linktext.toLowerCase(),pageTitle,"link","footer"); });
			$(this).mousedown(function(e){
			if(e.which == 3){
				globalMenuClick("linkclick","us>ft>"+linktext.toLowerCase(),pageTitle,"link","footer");
				} 			
			});
		 }
	  })

	});
	
	//footer HDS logo
	
	jQuery(".iparys_inherited .footer-logo").each(function() {
		var linktext = $('.footer-logo').text();
		 if ($.trim(linktext)==0) {linktext="hds logo";}
		$(this).click(function(){globalMenuClick("linkclick","us>ft>"+linktext.toLowerCase(),pageTitle,"link","footer"); });
	
		$(this).mousedown(function(e){
			if(e.which == 3){
				globalMenuClick("linkclick","us>ft>"+linktext.toLowerCase(),pageTitle,"link","footer");
			} 			
			});
	});	
	//footer CTAs
	
	jQuery("div.buttons").each(function() {
		var links = jQuery(this).find("a");
		var linktype="";
	   links.each(function() {
		 var linkhref = jQuery(this).attr('href');
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
		$(this).click(function(){globalMenuClick("linkclick","us>ft>"+linkhref.toLowerCase(),pageTitle,linktype,"footer"); });
		$(this).mousedown(function(e){
			if(e.which == 3){
				globalMenuClick("linkclick","us>ft>"+linkhref.toLowerCase(),pageTitle,linktype,"footer");
			} 			
		});
	  })

	});		
	
//read customer stories links	

	$("div.cs-section, .animateLink").each(function() {
     var listitem = $(this).find("a");
     if( listitem.length>0)
	 {
		 listitem.each(function() {
			 var linktext = $(this).text();
			 linktext=linktext.toLowerCase();
			 if(linktext.indexOf("read the case study")>-1){linktext = $(".cs-highlight-box-logo").find("img").attr("alt");}
			 linktext = "case-study-panel-link-" + $.trim(linktext);
            $(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","Case-Study-Panel"); });
			$(this).mousedown(function(e){
				if(e.which == 3){
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","Case-Study-Panel");
				} 			
			});
		});                 
     }
    });	
	
//Featured P&S tracking 

	$(".acs-commons-resp-colctrl-row .acs-commons-resp-colctrl-col .product-box .product-link").each(function() {
     var listitem = $(this).find("a");
	 var linktext = $(this).parent().find('.product-copy-main').text();
	 var linktext1=$('.mes-container').find('h3').text();
          linktext = linktext1 + "-" + $.trim(linktext);
            $(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link",linktext1); });
			$(this).mousedown(function(e){
				if(e.which == 3){
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link",linktext1 );
				} 			
			});
    });
	
	// tabs on careers page
	$(".PagerBar").each(function() {
	 	var links = $(this).find("a")
       links.each(function() {
		 	$(this).click(function(){
                isTabClicked=true;
                var tabTitle = "tab-"+$.trim($(this).text()).toLowerCase().replace(/\s/g,"-")+" button";
                tabClick(primaryCategory,tabTitle,pageTitle,"Tabclick"); 
            });
	  	});

	});
	
	//Tabs Custom Tracking tabbing-container :event, category-listing: storage  page tabs
	$(".stickNav-container, .custom-nav-tabs .nav-tabs, .category-listing, .webcast-listing").each(function() {
	 	var links = $(this).find("a");
	  links.each(function() {
		 	$(this).click(function(){
                isTabClicked=true;
				
                var tabTitle = "tab-"+$.trim($(this).text()).toLowerCase().replace(/\s/g,"-")+" button";
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
    					var tabTitle = "tab-"+activeLink.text().toLowerCase().replace(/\s/g,"-")+" scroll";
                        tabClick(primaryCategory,tabTitle,pageTitle,"Tabscroll");
                        }
                        	else
                                isTabClicked=false;
                    }
 
            	 }, delay);           
        }

       });
	   
	   
	// tabs on location page
	$("#allCountries").on("change", function()
		{
			var links = $(this).val();
			if (!links.indexOf("Select Country")>-1){
                var tabTitle = "tab-region-" + $("#allRegion option:selected").text() + "-country-" + links;
                tabClick(primaryCategory,tabTitle,pageTitle,"Tabclick"); }
        });

	$("#allLocations").on("change", function() 
		{
			var links = $(this).val();
			if (!links.indexOf("Select Location")>-1){
                var tabTitle = "tab-region-" + $("#allRegion option:selected").text() + "-country-" + $("#allCountries option:selected").text() + "-location-" + links;
                tabClick(primaryCategory,tabTitle,pageTitle,"Tabclick"); }
            });
		
	//Click to call tracking
	$('.talk .call').click(function(){
		if(window.outerWidth < 992){
			var pNumber="ph no - " + $('.call').text();
			clicktocall(pNumber,pageTitle);
		}
	})
	
	function clicktocall(pNumber,pageTitle){
    digitalData.eventData= {
    	eventName:'click to call',
		eventAction:pNumber,
		eventPage:pageTitle
    }
    _satellite.track('clicktocall');
	}

	//products search events start here
	$(document).on('keypress', '#searchFilter', function(event) 
	{
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
	$('.product-search-area .product-listing input.filters').each(function() {
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
		
    $('div.product-listing ul[id=asideLinks-product]').each(function() {
		var sType="";
		var dly="1500";
	 	var links = $(this).find("a");
	 	links.each(function() {
            $(this).click(function(){
                var text = $(this).text();
				var url=$(location).attr('href');
				if(url.indexOf("/resources.html")>-1){sType='resources';dly="7000"}else{sType='products & solutions';}
                setTimeout(function() {
                var result=$('#actualCount').text();
                 if(result==0)
                     result="zero";
                	searchClick($('#searchFilter').val(), "category filter",result,getProductsSearchFilters(),sType,'specificSearchClick');
    			 }, dly);
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
	var sFilters="";
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

	$(window).load(function(event)
		{
			var currentLocation = $(location).attr('href');
			if(currentLocation.indexOf('search.html') > -1){
				$("#searchFrame").contents().find("[tokenid=searchresultitem]").size();
				var result =$(".searchresultitem").size();
			}	
		});

$(document).on('keypress', '#fulltext', function(event) 
	{
		if(event.which == 13) {
			var interval = setInterval(function() {
				if($('.pr-archives-list-items').size()>0){
				var searchTerm=$('#fulltext').val();
				var result=$('.pr:visible').size();
					result=result.toString();
				if(result==0)
					result="zero";
					
					if(searchType=="press release"){sFilters="PR Search:" + getPnaFilters();}
					else if(searchType=="news"){sFilters="News Search:" + getPnaFilters();}
					else if(searchType=="awards"){sFilters="Awards Search:" + getPnaFilters();}
				
				searchClick(searchTerm, "search box",result,sFilters,searchType,searchTrackEvent);
				clearInterval(interval);
				 }
			}, 1500); 
		}
    });
	var searchIcon=$(".glyphicon.glyphicon-search");
    $(document).on('click', '.pr-list .pr-list-container .pr-search span.glyphicon.glyphicon-search', function(event)
	{
			var interval = setInterval(function() {
        	if($('.pr-archives-list-items').size()>0){
            var searchTerm=$('#fulltext').val();
            var result=$('.pr:visible').size();
            result=result.toString();
            if(result==0)
                result="zero";

				if(searchType=="press release"){sFilters="PR Search:" + getPnaFilters();}
				else if(searchType=="news"){sFilters="News Search:" + getPnaFilters();}
				else if(searchType=="awards"){sFilters="Awards Search:" + getPnaFilters();}
			
           searchClick(searchTerm, "search box",result,sFilters,searchType,searchTrackEvent);
           clearInterval(interval);
        }
        }, 1500);
    });

 	$('.pr-list-archives ul[id=archivesLinks]').each(function()
	{
	 	var links = $(this).find("a");
	 	links.each(function() {
            $(this).click(function(event){
            	var interval = setInterval(function() {
                	if($('.pr-archives-list-items').size()>0)
                	{
                		var result=$('.pr:visible').size();
                        result=result.toString();
                		if(result==0)
	                     result="zero";
						
						if(searchType=="press release"){sFilters="PR Search:" + getPnaFilters();}
						else if(searchType=="news"){sFilters="News Search:" + getPnaFilters();}
						else if(searchType=="awards"){sFilters="Awards Search:" + getPnaFilters();}
						
						searchClick($('#fulltext').val(), "year filter",result,sFilters,searchType,searchTrackEvent);
	                	clearInterval(interval);
	               }
                 }, 1500);
            	
             });
        });
	});	

//Events Search events start here
	$(document).on('click', '#updateResults', function(event) 
	{
		setTimeout(function() {
			var searchTerm="";
			var result=$('#newsEventCatagory').find('div.newsWrapper-listing:visible').size();
			result=result.toString();
			 if(result==0)
				 result="zero";
				searchClick("", "search button",result,eventsFilters(),'event','specificSearchClick');
		}, 1000); 
    });

	$('#filterRegion').on('change', function(event)
	{
		setTimeout(function() {
				var searchTerm=$(".filter-option").text();
				var result=$('#newsEventCatagory').find('div.newsWrapper-listing:visible').size();
				result=result.toString();
				if(result==0)
					result="zero";
				searchClick("", "Region filter",result,eventsFilters(),'event','specificSearchClick');
			 }, 1000); 
    });

	$('.newsEvents-category-list .news-listing').each(function() 
	{
	 	var links = $(this).find("a");
	 	links.each(function() {
            $(this).click(function(){
                var eventType = $(this).text();
                 eventType=eventType.replace(/\t/g, '');
         		eventType=eventType.replace(/\t/g, '');
				eventType=$.trim(eventType);
                setTimeout(function() {
                var result=$('#newsEventCatagory').find('div.newsWrapper-listing:visible').size();
                result=result.toString();
                 if(result==0)
                     result="zero";
                	searchClick("", "Event Filter",result,eventsFilters(),"event","specificSearchClick");
    			 }, 1500);
             });
        });
	});	

// training and certification page
	$(window).on("load", function() 
	{
		var url=$(location).attr('href');
		if(url.indexOf("/training-details")>-1){
			var interval = setInterval(function() 
			{
				var searchTerm=$(".daterangepicker_input .search").val();
				var result=$('#contentCatagory').find('.result-product .tab-content .category-products-listing .result-section').size();
				result=result.toString();
				if(result==0)
				result="zero";
				searchClick(searchTerm, "search button",result,trainingFilters(),'training&certification','specificSearchClick');
				clearInterval(interval);
			}, 1500); 
		}
	});


//ends
// Training detail page search

	$(document).on('click', '.srching .search-course-btn', function(event) 
	{
		setTimeout(function() 
		{
			var searchTerm=$(".daterangepicker_input .search").val();
			var result=$('#contentCatagory').find('.result-product .tab-content .category-products-listing .result-section').size();
			result=result.toString();
			 if(result==0)
				 result="zero";
				searchClick(searchTerm, "search button",result,trainingFilters(),'training','specificSearchClick');
		  }, 1000); 
    });

	$('#trainingDetail .Container-Results .product-listing li.active input.filters').on('click', function(event)
	{
		setTimeout(function()
		{
            var searchTerm=$(".daterangepicker_input .search").val();
			var text=$(this).text();
            var result=$('#contentCatagory').find('.result-product .tab-content .category-products-listing .result-section').size();
        	result=result.toString();
            if(result==0)
            	result="zero";
     		searchClick(searchTerm, "location filter",result,trainingFilters(),'training','specificSearchClick');
         }, 1000); 
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

	function searchClick(searchTerm, searchAction,result,searchFilters,searchType,trackEvent)
	{
			if(searchTerm == '' || searchTerm == undefined || !searchTerm){
				searchTerm = "no term searched"
			}
			if(searchType=="resources"){result=$('.resource').length;}
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
			_satellite.track(trackEvent);

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

	function isResourceSearchPage()
	{
		var url=$(location).attr('href');
		if(url.indexOf("/en-us/news-insights/resources.html")>-1)
			return true;
		else
			false;
	}
	function isLeadFormPage()
	{
		if($(".mktoForm, .mktoContent").size()>0)
			return true;
		else
			return false;
	}

	function getProductsSearchFilters()
	{
		var filters="";
		$('ul[id=asideLinks-product] li.active').each(function() {
			   if(filters.length>0)
						filters=filters+",";
				else
						filters="P&S Search:";
				filters = filters+ $.trim($(this).find('a').text());   
		});	
		$('.product-listing input.filters').each(function() {
				if ($(this).is(':checked')) {
					if(filters.length>0)
						filters=filters+",P&S Search:";
					filters = filters+$.trim($(this).parent().find("span").text());
				}
			 });
		$('.result-product ul.sortAlpha a.current').each(function() {
				if(filters.length>0)
					filters=filters+",P&S Search:Product Name-";
				filters = filters+ $.trim($(this).text());
			});	
		return filters.toLowerCase();
	}


//press release , news and awards filters
	function getPnaFilters()
	{
		var filters="";
		$('.pr-list-archives ul[id=archivesLinks] a.active').each(function() 
		{
				if(filters.length>0)
					filters=filters+",";
				var year=$(this).text().replace(/\t/g, '');
				year=year.replace(/\n/g, '');
				year=$.trim(year);
				filters = filters+ year;
			
		});	
		return  filters.toLowerCase();
	}
	function eventsFilters()
	{
		var filters="";
		 var dropDown=$(".filter-option").text();
		 var fromDate =$('#date-range200').val();
		 var toDate =$('#date-range201').val();
		 if($.trim(fromDate).length>0)
			 filters = filters + "event search:from date-" + fromDate;
		 if($.trim(toDate).length>0)
		 {
			 if(filters.length>0)
					filters=filters+",";
			 filters = filters + "event search:to date-" + toDate; 
		 }
			 
		 if(dropDown!="" && dropDown!="Filter By Region")
		 {
			 if(filters.length>0)
					filters=filters+",";
			 filters = filters + "event search:region-" + dropDown;
		 }
		$('.newsEvents-category-list .news-listing li.active').each(function() {
			if(filters.length>0)
				filters=filters+",";
			  var eventType = $(this).find('a').text();
			 eventType=eventType.replace(/\t/g, '');
			 eventType=eventType.replace(/\t/g, '');
			 filters = filters+ "event search:" + $.trim(eventType);
		});	
		return filters.toLowerCase();
	}

	function trainingFilters()
	{
		var selection = [];
		var trafilters="";
		 //var dropDown=$(".filter-option").text();
		 var fromDate =$('#date-range200').val();
		 var toDate =$('#date-range201').val();
		 if($.trim(fromDate).length>0)
			 trafilters = trafilters + "training search:from date-" + fromDate;
		 if($.trim(toDate).length>0){
			 if(trafilters.length>0)
					trafilters=trafilters+",";
			 trafilters = trafilters + "training search:to date-" + toDate; 
		 }
			 
		$('#trainingDetail .Container-Results .product-listing li.active input.filters').each(function() 
		{
			if ($(this).is(':checked')) 
				{selection.push($.trim($(this).parent().find("span").text()));}
		});	
		if(selection.length>0)
			{
				for(var i=0;i<selection.length;i++)
				{
					trafilters = trafilters + ",Training Search:Location-" + selection[i];
				}
			}
		else if(trafilters==""){trafilters = "Training Search:Location-all";}
		
		return trafilters.toLowerCase();
	}

	function videoTracking(vId, pPageName)
	{
		digitalData.eventData= {
			videoId:vId,
			parentPage:pPageName
		} 
		_satellite.track('videotracking');

	}
