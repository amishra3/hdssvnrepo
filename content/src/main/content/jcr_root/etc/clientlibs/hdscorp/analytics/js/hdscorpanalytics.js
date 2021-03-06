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
		pageTitle="internal search";
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
		pageTitle=getPageNameFromURL();
		
	}
else if (pageTitle.indexOf("unified compute platform")>-1)
	{
		pageTitle=pageTitle.replace("unified compute platform", "ucp");
	}


//$(document).ready(function() {
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
		var url=document.title; //$(location).attr('href');
		if(url.indexOf("404")>-1 || url.indexOf("error")>-1)
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
		if(primaryCategory != "about hds" && primaryCategory != "contact us" && primaryCategory != "home" && primaryCategory != "news & insights" && primaryCategory != "partners" && primaryCategory != "products & solutions" && primaryCategory != "services" && primaryCategory != "404 error page" && primaryCategory != "internal search"){primaryCategory="";}
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
//$(document).ready(function() {	

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
						},4000);
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
				},4000);
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
	$('#asideLinks-product li a').click(function(){
	if($(this).hasClass("filters")==false){
		searchTerm = $('#resSearch').val();
		result =$('#actualCount').text();
		setTimeout(function()
		{
			result=result.toString();		
			searchAction = "category filter";
			searchFilters =  getIndustryFilters() + "," + getContentFilters() + "," + getCategoryFilters();
			if(searchFilters.indexOf("Category-Featured")>-1){result=$('.resourceLibraryfeatered').find('.resources-spotlight').size();}
			specificSearchClick(searchTerm, searchAction, result);	
		},5000);
	}
});	
	
$('input[name="cbxFunction"]').click(function(){
	var pClass="";
	pClass=$(this).parents('.resources-listing').attr('class');
	//pClass=$(this).parent().parent().parent().parent().parent().parent().attr('class');
	if (pClass.indexOf("resources-listing")>-1)
	{
		searchTerm = $('#resSearch').val();
		//result =$('#actualCount').text();
		result =$('.resource.visible').length;
		setTimeout(function()
		{
			result=result.toString();		
			searchAction = "sub-category filter";
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
			/* searchTerm = $('#resSearch').val();
			searchAction = "Clear all filters";
			searchTerm = "Clear All Filters";
			result = $('.resourceLibraryfeatered').find('.resources-spotlight').size();
			//if(searchTerm == ""){searchTerm = "Clear All Filters";}
			specificSearchClick(searchTerm, searchAction, result) */
			globalMenuClick("linkclick","Clear All Filters",pageTitle,"button","resource");
		});
		
	$('.sort-by-list').click(function()
		{
			setTimeout(function()
					{
					globalMenuClick("linkclick","sort by:" + $('.sort-by-list').find('.selected').text(),pageTitle,"link","resource");
			},2000);
		});

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
	}

	function specificSearchClick(searchTerm, searchAction, result)
	{ 
		var stype="";
		if(searchTerm == "" || !searchTerm){
			searchTerm = 'no term searched'
		}
		if(result == 0){
			result = 'zero'
		}
		if(searchAction == "Cloud Partner filter"){stype="cloud partner";}
		else{stype="resource";}
		digitalData.eventData= 
		{ 
			searchTerm:searchTerm,
			searchAction:searchAction,
			searchResult:result,
			searchType:stype,
			searchPage:digitalData.page.pageInfo.pageName,
			searchFilters:searchFilters
		}    
		_satellite.track('specificSearchClick');
		return;
	}
	
	// Cloud partners search 
	$('.partner-filters-search #showIndustry').click(function()
		{
			setTimeout(function()
				{
					searchAction = "Cloud Partner filter";
					searchFilters =  getPartnerIndFilters();
					result = $('#partner-list .partner:visible').length;
					result=result.toString();
					specificSearchClick("", searchAction, result);
				},1000);
		});

function getPartnerIndFilters()
		{
			var indfilters="";
			var selection = [];
			
			$.each($("input[name='cbxFunction']:checked"), function(){ 
				if($(this).attr('value').indexOf('partners')>-1){selection.push($(this).attr('id'));}
			});
			if(selection.length>0)
			{
				for(var i=0;i<selection.length;i++)
				{
					if(i<(selection.length-1)){indfilters = indfilters + "CP Search:Service-" + selection[i] + ",";}
					else {indfilters = indfilters + "CP Search:Service-" + selection[i];}
				}
			}
			else{indfilters = "CP Search:Service-all";}	
			return indfilters;
		}
//************************************************************************	

// ****************************************************************************************************************//
// *****  --END-- the above section would perform the resource search tracking if the search page is hit *******  //
   
   if(isProductDetail())
		{
			digitalData["page"]["category"]["productName"]=pageTitle;
			digitalData["page"]["category"]["productInfo"]="product";
		}
	if(isServiceDetail())
		{
			digitalData["page"]["category"]["productName"]=pageTitle;
			digitalData["page"]["category"]["productInfo"]="product";
		}
	if(subSection!="" && subSection.length>0)
		{
			digitalData["page"]["category"]["subSection"]=subSection;
			
		}
	if(subSubSection!="" && subSubSection.length>0)
		{
			digitalData["page"]["category"]["subSubSection"]=subSubSection;
			
		}

//Header Links Custom Tracking Mega Menu
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
	
	//header HDS logos
	
	$(".hitachi-logo").on("click", function() {
		globalMenuClick("linkclick","hitachi logo",pageTitle,"link","mega menu");
	});		
	$(".hitachi-sublogo").on("click", function() {
		globalMenuClick("linkclick","hds logo",pageTitle,"link","mega menu");
	});			
	
	// Return to top link
	$(".cta-scroll-top").on("click", function() {
		globalMenuClick("linkclick","return to top",pageTitle,"button","return to top");
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
				var linktext = $.trim($(this).text());			
				linkposition="hero-" + getPageNameFromURL();
				if(linktext==""){linktext="chevron";}
				$(this).click(function(){
					if ($(this).parent().attr("class") != "view-all")
					{eType = "button";}
					globalMenuClick("linkclick","hero-digital transformation-"+ linktext.toLowerCase(),pageTitle,eType,linkposition); });
				$(this).mousedown(function(e){
					if ($(this).parent().attr("class") != "view-all")
					{eType = "button";}
					if(e.which == 3){globalMenuClick("linkclick","hero-digital transformation-" + linktext.toLowerCase(),pageTitle,eType,linkposition);
					} 			
				});
			});                 
		 }
    });	
	
	//hero banners for all pages  .btn-square-white
	$(".common-hero-short-banner, .partnerHeroBanner, .common-hero-banner, .hero-product-solutions").each(function() {
     
	 var url=document.title;
	//if(url.indexOf("404")<0)
	//{
		 var listitem = $(this).find("a");
		 var url=$(location).attr('href');
		 //var linktext = $(this).find('h1').text();
		 var linkposition="";
		 var eType="link";
		 var eClass="";
		 if( listitem.length>0)
		 {
			//console.log("list Items:" + listitem.length);
			listitem.each(function() {
				var linktext = "hero-" + $(this).parents().find('h1').text();// extracting offer title
				linkposition="hero-" + getPageNameFromURL();
				$(this).click(function(){
					if(linktext=="hero-" && !($(this).parent().parent().find("h2").text()=="")){linktext="hero-" + $(this).parent().parent().find("h2").text() + "-" + $.trim($(this).text());}
					if(linktext=="hero-" && !($(this).parent().parent().find("h3").text()=="")){linktext="hero-" + $(this).parent().parent().find("h3").text() + "-" + $.trim($(this).text());}
					if(url.indexOf("/contact.html")>-1){linktext="hero-" + $(this).parent().parent().find("h2").text() + "-" + $.trim($(this).text());}
					if($(this).parent().parent().attr("class")=="page-not-found")
					{var eClass=$(this).parent().parent().attr("class");linktext=$.trim($(this).text());linkposition="panel-main-" + getPageNameFromURL();}
					else {var eClass=$(this).parent().attr("class");}
					if(eClass.indexOf("buy-through")!=-1){eType = "link";if(!(linktext.indexOf($.trim($(this).text()))>-1)){linktext=linktext + "-" + $.trim($(this).text());}}
					else if ( eClass.indexOf("btn-square-white")!= -1){eType = "button"; if(!(linktext.indexOf($.trim($(this).text()))>-1)){linktext=linktext + "-" + $.trim($(this).text());}}// linktext = $(this).parents().find('h1').text();}
					else if ( eClass.indexOf("second-link")!= -1){eType = "link"; if(!(linktext.indexOf($.trim($(this).text()))>-1)){linktext=linktext + "-" + $.trim($(this).text());}}// linktext = $(this).parents().find('h1').text();}
					else if ( eClass.indexOf("playVideoBox")!= -1){eType = "play icon"; if(!(linktext.indexOf("-play icon")>-1)){linktext=linktext + "-play icon";}}//linktext = $(this).parents().find('h1').text();}
					else if ( eClass.indexOf("video-play-desktop")!= -1){eType = "play icon";if(!(linktext.indexOf("-play icon")>-1)){linktext=linktext + "-play icon";}}// linktext = $(this).parents().find('h1').text();}
					if(linktext == "" || !linktext){linktext="hero-" + $.trim($(this).text());}
					linktext = $.trim(linktext);	
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,eType,linkposition); });
				$(this).mousedown(function(e){
					if(e.which == 3){
						if(linktext==""){linktext="hero-" + $(this).parent().parent().find("h2").text() + "-" + $.trim($(this).text());}
						if(linktext==""){linktext="hero-" + $(this).parent().parent().find("h3").text() + "-" + $.trim($(this).text());}
						if(url.indexOf("/contact.html")>-1){linktext="hero-" + $(this).parent().parent().find("h2").text() + "-" + $.trim($(this).text());}
						if($(this).parent().parent().attr("class")=="page-not-found")
						{var eClass=$(this).parent().parent().attr("class");linktext=$.trim($(this).text());}
						else {var eClass=$(this).parent().attr("class");}
						if(eClass.indexOf("buy-through")!=-1){eType = "link";if(!(linktext.indexOf($.trim($(this).text()))>-1)){linktext=linktext + "-" + $.trim($(this).text());}}
						else if ( eClass.indexOf("btn-square-white")!= -1){eType = "button"; if(!(linktext.indexOf($.trim($(this).text()))>-1)){linktext=linktext + "-" + $.trim($(this).text());}}// linktext = $(this).parents().find('h1').text();}
						else if ( eClass.indexOf("playVideoBox")!= -1){eType = "play icon"; if(!(linktext.indexOf("-play icon")>-1)){linktext=linktext + "-play icon";}}//linktext = $(this).parents().find('h1').text();}
						else if ( eClass.indexOf("video-play-desktop")!= -1){eType = "play icon";if(!(linktext.indexOf("-play icon")>-1)){linktext=linktext + "-play icon";}}// linktext = $(this).parents().find('h1').text();}
						if(linktext == "" || !linktext){linktext="hero-" + $.trim($(this).text());}
						linktext = $.trim(linktext);		
						globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,eType,linkposition);
					} 			
				});
			});                 
		 }
	//}
    });
	
	//Banner section image in middle of pages
	
	$(".bannerSectionImage, .about-hds-csr-eco").each(function() {
     
	 var url=document.title;
	//if(url.indexOf("404")<0)
	//{
		 var listitem = $(this).find("a");
		 var url=$(location).attr('href');
		 var linktext = $(this).find('h1').text();
		 var linkposition="";
		 var eType="link";
		 var eClass="";
		 var linkType="panel-";
		 if($(this).parents(".bannerCarsoul").attr("id") == "partnerCarsoul"){ linkType="hero-";}
		 if(linktext==""){linktext=$(this).find('h2').text();}
		 if( listitem.length>0)
		 {
			//console.log("list Items:" + listitem.length);
			listitem.each(function() {
				var linktext = linkType + $(this).parent().parent().parent().find('h2').text();// extracting offer title
				linkposition=linkType + getPageNameFromURL();
				$(this).click(function(){
					if(linktext==""){linktext=linkType + $(this).parent().parent().find("h2").text() + "-" + $.trim($(this).text());}
					if(linktext==""){linktext=linkType + $(this).parent().parent().find("h3").text() + "-" + $.trim($(this).text());}
					if(url.indexOf("/contact.html")>-1){linktext=linkType + $(this).parent().parent().find("h2").text() + "-" + $.trim($(this).text());}
					if($(this).parent().parent().attr("class")=="page-not-found")
					{var eClass=$(this).parent().parent().attr("class");linktext=$.trim($(this).text());linkposition="panel-main-" + getPageNameFromURL();}
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
						{var eClass=$(this).parent().parent().attr("class");linktext=$.trim($(this).text());linkposition="panel-main-" + getPageNameFromURL();}
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
	
	//Hexagons CTAs div.hexContain, -- product details pages
	$("li.hexagon-transformative").each(function() {
     var listitem = $(this).find("a");
	 var linktext = $(this).find('h4').text();
	 var hexpanel = $(this).parents('.accordion-level').attr('id');
	 var pName=getPageNameFromURL();
	 if(!hexpanel){hexpanel="panel";}
     if( listitem.length>0)
	 {
		linktext = "hex-" + $.trim(linktext) + "-" + $.trim($(this).find("a").text());
		
            $(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","hex-" + hexpanel + "-" + pName); });
 /* 			$(this).mousedown(function(e){
				if(e.which == 3){
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","hexagon");
				} 			
			});  */        
     }
    });
	
//Hexagons home page page CTAs -- updated for link text on 27/04
	$(".calculating-list .hexagon270").each(function() {
     var listitem = $(this).find("a");
	 var linktext = $(this).find('h4').text();
	 var hexpanel = "panel";
     if( listitem.length>0)
	 {
		 listitem.each(function() {
          linktext = "hex-" + $.trim(linktext) + "-" + $.trim($(this).text());
            $(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","hex-" + hexpanel + "-home"); });
		});                 
     }
    });	
	
	//3 Hexagons about us, new-insights, social innovation and partners home pages CTAs -- updated for link text on 27/04
	$(".hexagon320").each(function() {
     var listitem = $(this).find("a");
	 var pName=getPageNameFromURL();
	 var hexpanel = "panel";
     if( listitem.length>0)
	 {
		 listitem.each(function() {
 				$(this).click(function(){
					var linktext = "hex-" + $.trim($(this).parent().parent().find('h4').text())+ "-" + $.trim($(this).text());
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","hex-" + hexpanel + "-" + pName); });
		});                 
     }
    });

	 
	//case study link buttons
	$(".tbd-dl, .cs-all").each(function(){
		var panel="";
		var listitem = $(this).find("a");
		if(listitem.length>0){
			listitem.each(function(){
				var linktext = $(this).text();
				linktext=linktext.toLowerCase();
				linktext = $.trim(linktext);
				if(linktext.indexOf("studies")>-1){panel="panel-case study";}
				else if(linktext.indexOf("specifications")>-1){panel="panel-specifications";}
				$(this).click(function(){globalMenuClick("linkclick","panel-case study-" + linktext.toLowerCase(),pageTitle,"button",panel); });
				$(this).mousedown(function(e){
				if(e.which == 3){
					$(this).click(function(){globalMenuClick("linkclick","panel-case study-" + linktext.toLowerCase(),pageTitle,"button",panel); });
					} 			
				});
			});                 
		}
    });
	
	//read customer stories case study links	
	$("div.cs-section, .animateLink").each(function() {
     var listitem = $(this).find("a");
	 var mtext= $(this).text();
	 var linkposition="button";
	 mtext = mtext.toLowerCase();
	 if(mtext != "view more case studies" && mtext != "read more case studies"){
     if( listitem.length>0)
	 {
		 listitem.each(function() {
			 var linktext = $(this).text();
			 linktext=$.trim(linktext.toLowerCase());
			 if(linktext.indexOf("read the case study")>-1 || linktext.indexOf("watch the video")>-1){linktext = $(".cs-highlight-box-logo").find("img").attr("alt"); linkposition="link";}
			 linktext = "panel-case study-" + $.trim(linktext);
            $(this).click(function(){
				globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,linkposition,"panel-case study"); });
			$(this).mousedown(function(e){
				if(e.which == 3){
					var mtext= $(this).text();mtext = mtext.toLowerCase();
					if(mtext != "view more case studies" && mtext != "read more case studies"){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,linkposition,"panel-case study");}
				} 			
			});
		});                 
     }
	 }
    });	
	

	// Alliance partners logo
	$("div.partner-list").each(function() 
	{
		var links = $(this).find("img");
		var headingtext=$('.partner-program .heading').find("h2").text();
	   links.each(function() {
		 var linktext = $(this).attr("title");
		 linktext=$.trim(linktext);
         if(linktext!="" || linktext.length > 0)
		 {
			$(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","panel-" + headingtext); });
			$(this).mousedown(function(e){
			if(e.which == 3){
				globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link","panel-" + headingtext);
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
			 var linktext = $(this).text();
			 var linktext1=$(this).parent().parent().parent().parent().find("h2").text();
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
			 var linktext = $(this).text();
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
	$("div.footer-gray,div.footer-white").each(function() {
		var links = $(this).find("a");
	   links.each(function() {
		 var linktext = $(this).text();
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
	
	$("div.social").each(function() {
		var links = $(this).find("img");
	   links.each(function() {
		 var linktext = $(this).attr("title");
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
	
	$(".footer-logo").each(function() {
		var linktext = $(this).text();
		 if ($.trim(linktext)==0) {linktext="hds logo";}
		$(this).click(function(){globalMenuClick("linkclick","us>ft>"+linktext.toLowerCase(),pageTitle,"link","footer"); });
		$(this).mousedown(function(e){
			if(e.which == 3){
				globalMenuClick("linkclick","us>ft>"+linktext.toLowerCase(),pageTitle,"link","footer");
			} 			
			});
	});	
	

	//footer CTAs
	
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
			globalMenuClick("linkclick","us>ft>"+linkhref.toLowerCase(),pageTitle,linktype,"footer"); 
			});
		$(this).mousedown(function(e){
			if(e.which == 3){
				globalMenuClick("linkclick","us>ft>"+linkhref.toLowerCase(),pageTitle,linktype,"footer");
			} 			
		});
	  })

	});		

	//footer local phone numbers CTAs
	
	$(".view-phone .reseller").on("click", function() {
		var links = $(this).find("a");
		var linktype="link";	  
		var linkhref= $(this).text(); 
		linkhref = linkhref.replace(/[`‐~!@#$®™%^*()_|+"\-=?;–'“”’,.<>\{\}\[\]\\\/]/gi, '');
		linkhref = $.trim(linkhref);
		globalMenuClick("linkclick","us>ft>"+linkhref.toLowerCase(),pageTitle,linktype,"footer");
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
                var tabTitle = "tab-"+$.trim($(this).text()).toLowerCase().replace(/\s/g," ")+"-button";
                tabClick(primaryCategory,tabTitle,pageTitle,"Tabclick"); 
            });
	  	});

	});
	
	//Tabs Custom Tracking tabbing-container :event (web cast on demand), storage, legal  page tabs
	//$(".stickNav-container, .custom-nav-tabs .nav-tabs, .webcast-listing").each(function() {
	// Detail page tabs (overview, resources, specifications etc) and event page on demand and events tabs
	$(".stickNav-container, .custom-nav-tabs .nav-tabs").each(function() {
	 	var links = $(this).find("a");
	  links.each(function() {
		 	$(this).click(function(){
                isTabClicked=true;
				
                var tabTitle = "tab-"+$.trim($(this).text()).toLowerCase().replace(/\s/g," ")+"-button";
                tabClick(primaryCategory,tabTitle,pageTitle,"Tabclick"); 
            });
	  	});
	});

	//Tabs Custom Tracking for inner tabs on event page webcast tab
	$(".webcast-listing").each(function() {
	 	var links = $(this).find("a");
	  links.each(function() {
		 	$(this).click(function(){
                isTabClicked=true;
				var tabTitle = "left tab-webcast-"+$.trim($(this).text()).toLowerCase().replace(/\s/g," ");
                tabClick(primaryCategory,tabTitle,pageTitle,"Left-Tabclick"); 
            });
	  	});
	});
	
	//Tabs Custom Tracking on all sub section pages like cloud, servers, big data analytics, storage, legal etc
	$(".category-listing, .leftsidelisting").each(function() {
	 	var links = $(this).find("a");
	  links.each(function() {
		 	$(this).click(function(){
                isTabClicked=true;
				var tabTitle = "left tab-"+$.trim($(this).text()).toLowerCase().replace(/\s/g," ");
                tabClick(primaryCategory,tabTitle,pageTitle,"Left-Tabclick"); 
            });
	  	});
	});
	
	//Tabs custom tracking for legal page radio buttons--
	$('.leftsidelisting .filters').click(function()
	{
		var pClass="";
		var linktext=$(this).next().find("span").text();
		pClass=$(this).parents('.leftsidelisting').attr('class');
		if (pClass.indexOf("leftsidelisting")>-1)
		{
			//var pTitle=$(this).parent().parent().parent().parent().find("a").text();
			var pTitle=$(this).parents('#asideLinks-product').find('li.active >a').text();
			var tabTitle = "left tab-"+ $.trim(pTitle).toLowerCase() +"-"+$.trim(linktext).toLowerCase().replace(/\s/g," ");
			if(pTitle!=""){tabClick(primaryCategory,tabTitle,pageTitle,"Left-Tabclick");}
		}
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
    					var tabTitle = "tab-"+activeLink.text().toLowerCase().replace(/\s/g,"-")+"-scroll";
                        tabClick(primaryCategory,tabTitle,pageTitle,"Tabscroll");
                        }
                        	else
                                isTabClicked=false;
                    }
 
            	 }, delay);           
        }

       });
	   
	   
	// Region, country and location selections on location page

	$("#allLocations, #allRegion, #allCountries").on("change", function() 
		{
			var links = $(this).val();
			var selectId= $(this).attr("id");
			var searchTerm="no term searched";
			var searchType="worldwide location search";
			var searchAction="";
			var sFilters="";
			if(selectId == "allRegion")
			{
				if (!links.indexOf("Select Region")>-1){searchAction="region filter";sFilters=$("#allRegion option:selected").text();}
				
			}else if(selectId == "allCountries")
			{
				if (!links.indexOf("Select Country")>-1){searchAction="country filter";sFilters=$("#allRegion option:selected").text() + "," + $("#allCountries option:selected").text();}
			}else if(selectId == "allLocations")
			{
				if (!links.indexOf("Select Location")>-1){searchAction="country filter";sFilters=$("#allRegion option:selected").text() + "," + $("#allCountries option:selected").text() + "," + $("#allLocations option:selected").text();}
			}
			//var tabTitle = "tab-region-" + $("#allRegion option:selected").text() + "-country-" + $("#allCountries option:selected").text() + "-location-" + links;
			setTimeout(function() {
			var result =$(".side-block").size();
			if (result==0 || searchAction=="region filter") result="zero";
			searchClick(searchTerm,searchAction,result,sFilters,searchType,"specificSearchClick");
			 }, 2000); 
		});
	

	//Click to call tracking
	$('.talk .call').click(function(){
		//if(window.outerWidth < 992){
			var pNumber="ph no - " + $('.call').text();
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
                setTimeout(function() {
				if(url.indexOf("/training.html")>-1){sType='training';var result=$('#contentCatagory').find('.result-product .tab-content .category-products-listing .result-section').size();}
				else{sType='products & solutions';var result=$('#actualCount').text();}
                 if(result==0)
                     result="zero";
                	if(url.indexOf("/training.html")>-1){searchClick($('#searchFilter').val(), "category filter",result,getTrainingSearchFilters(),sType,'specificSearchClick');}
					else{searchClick($('#searchFilter').val(), "category filter",result,getProductsSearchFilters(),sType,'specificSearchClick');}
					
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

//});	// docoment.ready close

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
	function isServiceDetail()
	{
		
		if($("body.servicedetail").size()>0)
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
	
	function isResourceSearchPage()
	{
		if($(".resourcelibrary").size()>0)
			return true;
		else
			false;
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
					if(trafilters!=""){trafilters = trafilters + ",training search:location-" + selection[i];}
					else{trafilters = trafilters + "training search:location-" + selection[i];}
				}
			}
		else if(trafilters==""){trafilters = "training search:location-all";}
		
		return trafilters.toLowerCase();
	}

	function getTrainingSearchFilters()
	{
		var filters="";
		$('ul[id=asideLinks-product] li.active').each(function() {
			   if(filters.length>0)
						filters=filters+",";
				else
						filters="training search:";
				filters = filters+ $.trim($(this).find('a').text());   
		});	
		return filters.toLowerCase();
	}
	//cookie session storage variable created on click on gated assets
	/* $(".isGatedLock").on("click", function(){
			//$.cookie("gatedPP",$.trim(window.location.href),{ path: '/' });
			sessionStorage.parentReffererURL = $.trim(window.location.href);
	});  */
		
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
			if(linktxt.indexOf('@')>0){globalMenuClick("linkclick","em-"+linktxt.toLowerCase(),pageTitle,"email","panel-main"); }
	});

	// email links clicks
	$('a[rel="emailHome"]').click(function() {
			var linktxt=$(this).text();
			if(linktxt.indexOf('@')>0){globalMenuClick("linkclick","em-"+linktxt.toLowerCase(),pageTitle,"email","panel-main"); }
	});