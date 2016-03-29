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
//console.log("data--"+data);

var activeLinkText="top";
var isTabClicked=false;
var desktopType="";
var orientation="landscape";
var screenSize;
var delay=4000;
var gInternalSearchFilter="";
pageTitle=pageTitle.toLowerCase();
pageTitle=$.trim(pageTitle);
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

//console.log("count"+count);
for(index=0;index<count;index++)
{
 if(index>0 && index<(count-1) )
  {
    //console.log("index"+index);
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
if(isLeadFormPage()){
digitalData.page={
	
	pageInfo:{
	pageName: $.trim(pageTitle),
	pageType: $.trim(primaryCategory),
    },
	category:{
	primaryCategory: $.trim(primaryCategory),
	}
	}
} else
{
	digitalData.page={
	
	pageInfo:{
	pageName: $.trim(pageTitle),
	pageType: $.trim(primaryCategory),
	hier1: $.trim(data),
    },
	category:{
	primaryCategory: $.trim(primaryCategory),
	}
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
	var fileName = window.location.pathname;
	var n=fileName.lastIndexOf("/");
    fileName=fileName.substring(n+1, 1000);
    n=fileName.lastIndexOf(".");
    if(n>0){fileName=fileName.substring(0, n);}
	
    digitalData["page"]["pageInfo"]["pageName"]= fileName;
	digitalData["page"]["pageInfo"]["pageLoadEvent"]="404 error";
    digitalData["page"]["pageInfo"]["errorMessage"]="page not found";
	digitalData["page"]["pageInfo"]["pageType"]="errorPage";
	digitalData["page"]["pageInfo"]["hier1"]="404 error page";
	digitalData["page"]["category"]["primaryCategory"] = "404 error page";
	//digitalData["site"]["siteInfo"]["country"]="US:404error";

}
// *****this section would perform the internal search tracking if the search page is hit *******  //
// ***********************************************************************************************//

if(isLeadFormPage())
{
		var url=$(location).attr('pathname');
		var pageName="";
		var pageType="";
		var pageLoadEvent="";
		var leadFormName="";
		var assetName="/assets/abcd.pdf";
		var leadFormParentPage="parent page URL";document.referrer;
		var leadFormParentPageCategory="parent page category";//document.referrer;
		if(url.indexOf("contact-sales-aem.html")>-1)
		{
			if(url.indexOf("ty-")>-1)
			{
				pageName="contact sales thank you";
				pageType="contactSalesForm";
				pageLoadEvent="lead form completed";
				leadFormName="contact sales";
				leadID=__aem_id;
				leadCountry=__aem_country;
				leadCompany=__aem_company_name;
			}else
			{
				pageName="contact sales form";
				pageType="contactSalesForm";
				pageLoadEvent="lead form initiated";
				leadFormName="contact sales";	
			}
		}
		else if (url.indexOf("request-info-aem.html")>-1)
		{
			
			if(url.indexOf("ty-")>-1)
			{
				pageName="request info thank you";
				pageType="leadForm";
				pageLoadEvent="lead form completed";
				leadFormName="request info";
				leadID=__aem_id;
				leadCountry=__aem_country;
				leadCompany=__aem_company_name;
			}else
			{
				pageName="request info form";
				pageType="leadForm";
				pageLoadEvent="lead form initiated";
				leadFormName="request info";
			}
		
		}
		else if (url.indexOf("ty-newsletter-subscription.html")>-1){NewsletterSub();}
		else if (url.indexOf("training-and-placement.html")>-1){}
		else if (url.indexOf("gated-form-progressive.html")>-1)
		{
			if(url.indexOf("ty-")>-1)
			{
				pageName="asset gating thank you";
				pageType="gatedForm";
				pageLoadEvent="lead form completed";
				leadFormName="asset gating form";
				leadID=__aem_id;
				leadCountry=__aem_country;
				leadCompany=__aem_company_name;
			}else
			{
				pageName="asset gating page";
				pageType="gatedForm";
				pageLoadEvent="lead form initiated";
				leadFormName="asset gating form";
			}
		digitalData["page"]["pageInfo"]["assetName"]=assetName;
		}
		if (!url.indexOf("newsletter-subscription.html")){
		digitalData["page"]["pageInfo"]["pageName"]=pageName;
		digitalData["page"]["pageInfo"]["pageType"]=pageType;
		digitalData["page"]["pageInfo"]["pageLoadEvent"]=pageLoadEvent;
		digitalData["page"]["pageInfo"]["leadFormName"]=leadFormName;
		digitalData["site"]["siteInfo"]["server"]="mkthds";
		digitalData["page"]["pageInfo"]["leadFormParentPage"]=leadFormParentPage;
		digitalData["page"]["category"]["primaryCategory"]=leadFormParentPageCategory;
		
		if(url.indexOf("ty-")>-1)
		{
			digitalData["page"]["pageInfo"]["leadID"]=leadID;
			digitalData["page"]["pageInfo"]["leadCountry"]=leadCountry;
			digitalData["page"]["pageInfo"]["leadCompany"]=leadCompany;
		}
	}	
}

if(isInternalSearchPage()){    
		setTimeout(function(){
		var parentPageURL=window.referrer;
		var result = $('#num_results').next('b').text();//$('.searchresultitem').size();
		var searchTerm = $('#SearchTextBox').val();
		var searchAction = "";
		var pageName = "internal search results page";//digitalData.page.pageInfo.pageName;
		result=result.toString();
		if($('#SearchTextBox').val() != ""){
		   searchAction = "search box"
		}
		if($('.dn-attr input:checkbox:checked').length > 0){
		   searchAction = "sub category filter"
		}

		if(result == 0){
			result='zero';
			internalSearch(pageName, "internalSearch", "unsuccessful search", searchTerm, result)
		}else{
			internalSearch(pageName, "internalSearch", "success search", searchTerm, result)
		}
	function internalSearch(pageName, pageType,pageLoadEvent, searchTerm, result){
			digitalData["page"]["pageInfo"]["searchAction"] = searchAction;
			digitalData["page"]["pageInfo"]["searchResult"] = result;
			digitalData["page"]["pageInfo"]["searchType"] = "internal search";
			digitalData["page"]["pageInfo"]["searchPage"] = "parent page url";
			digitalData["page"]["pageInfo"]["pageName"] = pageName;
			digitalData["page"]["pageInfo"]["pageType"] = pageType;
			digitalData["page"]["pageInfo"]["pageLoadEvent"] = pageLoadEvent;
			if(searchTerm!="")
				digitalData["page"]["pageInfo"]["searchTerm"]=searchTerm;
			else
				digitalData["page"]["pageInfo"]["searchTerm"]="no term searched";
		}

			$('.navpage').click(function(){
			 var pagination = currentpagenumber;
			 pagination(searchTerm,pagination, searchResultType)
			});
			$('.navnext, .navprev').click(function(){
			 var pagination = currentpagenumber+1;
			 pagination(searchTerm,pagination, searchResultType)
			});
			$('.navprev').click(function(){
			 var pagination = currentpagenumber-1;
			 pagination(searchTerm,pagination, searchResultType)
			})
		function pagination(searchTerm,pagination, searchResultType){ 
			digitalData.eventData={ 
				pagination: pagination, // pagination no."3",
				searchTerm:searchTerm,
				searchResultType:'internalSearch'

			}    
			_satellite.track('pagination');
		}

		$('.dn-attr-a').each(function(){
			$(this).click(function(){
				var searchfilter = $(this).attr('title');
				var text = $(this).parent().parent().find('span').attr('title');
				var isChecked=$(this).parent().find('a').size();
				searchfilter=text + ":" + searchfilter;
				if(isChecked == 1 ){
				if (gInternalSearchFilter!=""){gInternalSearchFilter = gInternalSearchFilter + "," + searchfilter;}
				else{gInternalSearchFilter = searchfilter;}}
				Internalfilter(searchTerm,searchfilter)
			});
		});
		function Internalfilter (searchTerm,searchfilter){ 
			
			    digitalData.eventData={ 
				//searchTerm:searchTerm,
				searchType:'internalSearch',
				//searchFilters:searchfilter

    } 
			if(searchTerm!="")
			digitalData["eventData"]["searchTerm"]=searchTerm;
        else
			digitalData["eventData"]["searchTerm"]="no term searched";
		if(searchFilters!="")
			digitalData["eventData"]["searchFilters"]=searchfilter;
			_satellite.track('internalfilter');
		}
		},2000);
}
// ****************************************************************************************************************//
// *****  --END-- the above section would perform the internal search tracking if the search page is hit *******  //

// *****  --START-- the below section would perform the resource search tracking if the search page is hit *******  //
if(isResourceSearchPage()){  

	var searchTerm = $('#resSearch').val();
	var result = $('.category-resources-listing').find('.resource.visible').size();
	var searchAction = "";
	var searchFilters = "all";
	if(searchTerm == ""){
		searchTerm='no term searched';
	}
	$('#resSearch').on('keypress',function(e){
		searchTerm = $('#resSearch').val();
		//console.log("**********"+searchTerm+"*********")
		if(e.which == 13){
			setTimeout(function(){
			result = $('.category-resources-listing').find('.resource.visible').size();
			searchAction = "search box";
			result=result.toString();
			if(searchFilters == ""){searchFilters="all";}
			specificSearchClick(searchTerm, searchAction, result)
			},5000);
		}
		
	});

	$('.searchResource').click(function(){
		searchTerm = $('#resSearch').val();
		result = $('.category-resources-listing').find('.resource.visible').size();
		//console.log("**********"+searchTerm+"*********")
		searchAction = "search box";
		result=result.toString();
		if(searchFilters == ""){searchFilters="all";}
		specificSearchClick(searchTerm, searchAction, result)
	});

	 $('#showIndustry').click(function(){
	//$(document).on('click','#showIndustry', function(e){
		searchTerm = $('#resSearch').val();
		result = $('.category-resources-listing').find('.resource.visible').size();
		console.log("**********"+searchTerm+"*********")
		var selection = [];
		var selectionCollection;
		var selectionParent = "";
		
		searchAction = "Industry filter"

		$.each($("input[name='cbxFunction']:checked"), function(){ 
			selection.push($(this).attr('id'));
			if(selection.length > 0){
				selectionParent = $(this).parent().parent().parent().prev('a').attr('name');
			}
		});
		$.each($("input[name='ctyFunction']:checked"), function(){            
			selection.push($(this).attr('id'));
		});
		if(selectionParent != ""){
			selection.unshift(selectionParent);
		}
		selectionCollection = selection.join();
		searchFilters = selectionCollection;
		specificSearchClick(searchTerm, searchAction, result)
		//return false;
	});
	
	$(document).on('click','#showContentType', function(e){
		searchTerm = $('#resSearch').val();
		result = $('.category-resources-listing').find('.resource.visible').size();
		console.log("**********"+searchTerm+"*********")
		var selection = [];
		var selectionCollection;
		var selectionParent = "";
		
		searchAction = "Content filter"

		$.each($("input[name='cbxFunction']:checked"), function(){ 
			selection.push($(this).attr('id'));
			if(selection.length > 0){
				selectionParent = $(this).parent().parent().parent().prev('a').attr('name');
			}
		});
		$.each($("input[name='ctyFunction']:checked"), function(){            
			selection.push($(this).attr('id'));
		});
		if(selectionParent != ""){
			selection.unshift(selectionParent);
		}
		selectionCollection = selection.join();
		searchFilters = selectionCollection;
		specificSearchClick(searchTerm, searchAction, result)
		//return false;
	});
	
	$('.checkbox .filters').click(function(){
		
		var pClass="";
		pClass=$(this).parent().parent().parent().parent().parent().parent().attr('class');
		if (pClass.indexOf("resources-listing")>-1){
		searchAction = "sub category filter";
		searchTerm = $('#resSearch').val();
		result = $('.category-resources-listing').find('.resource.visible').size();
		var selection = [];
		var selectionCollection;
		var selectionParent = "";
		result=result.toString();
		$.each($("input[name='cbxFunction']:checked"), function(){            
			selection.push($(this).attr('id'));
			if(selection.length > 0){
				selectionParent = $(this).parent().parent().parent().prev('a').attr('name');
			}
		});
		
		//**********************************from product search****************************************
		/*result = $('.category-resources-listing').find('.resource.visible').size()
		
		$('.resources-listing input.filters').each(function() {
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
		
    $('div.resources-listing ul[id=asideLinks-product]').each(function() {
	 	var links = $(this).find("a");
	 	links.each(function() {
            $(this).click(function(){
                var text = $(this).text();
                setTimeout(function() {
                var result=result = $('.resourceLibraryContent').find('.resource.visible').size();;
                 if(result==0)
                     result="zero";
                	searchClick($('#searchFilter').val(), "category filter",result,getProductsSearchFilters(),'products & solutions','specificSearchClick');
    			 }, 1500);
             });
        });
	});	*/
		//*******************************************************************************************
		$.each($("input[name='ctyFunction']:checked"), function(){            
			selection.push($(this).attr('id'));
		});
		if(selectionParent != ""){
			selection.unshift(selectionParent);
		}
		selectionCollection = selection.join();
		searchFilters = selectionCollection;
		if(searchTerm == "" || !searchTerm){searchTerm = 'no term searched';}
		specificSearchClick(searchTerm, searchAction, result)
		}
	});
	var currentpagenumber = $('span.current').html();
	$(document).on('click', '.page-link', function() {
		searchTerm = $('#resSearch').val();
		result = $('.category-resources-listing').find('.resource.visible').size();
		currentpagenumber = $('span.current').html();
		var pagination = currentpagenumber;
		resourcePagination(searchTerm,pagination, 'resource')
	});
	$(document).on('click', '.page-link.next', function() {
		searchTerm = $('#resSearch').val();
		result = $('.category-resources-listing').find('.resource.visible').size();
		currentpagenumber = $('span.current').html();
		var pagination = parseInt(currentpagenumber) + 1;
		//alert(pagination);
		resourcePagination(searchTerm, pagination, 'resource')
	});
	$(document).on('click', '.page-link.prev', function() {
		searchTerm = $('#resSearch').val();
		result = $('.category-resources-listing').find('.resource.visible').size();
		currentpagenumber = $('span.current').html();
		var pagination = parseInt(currentpagenumber) - 1;
		resourcePagination(searchTerm, pagination, 'resource')
	});
	
	$('.clear-results a').click(function(){
		searchTerm = $('#resSearch').val();
		searchAction = "Clear all filters"
		result = $('.resourceLibraryfeatered').find('.resources-spotlight').size();
		specificSearchClick(searchTerm, searchAction, result)
	})
	
	function specificSearchClick(searchTerm, searchAction, result){ 
		if(searchTerm == "" || !searchTerm){
			searchTerm = 'no term searched'
		}
		if(result == 0){
			result = 'zero'
		}
		if(searchFilters == ""){
			searchFilters = 'all'
		}
		digitalData.eventData=    { 
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

	function resourcePagination(searchTerm,pagination, searchResultType){ 
		if(searchTerm == "" || !searchTerm){
				searchTerm = 'no term searched'
			}
			pagination=pagination.toString();
		digitalData.eventData={ 
			pagination:pagination, // pagination no."3",
			searchTerm:searchTerm,
			searchResultType:searchResultType

		}    
		_satellite.track('pagination');
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

//console.log("digitalData-------"+JSON.stringify(digitalData));


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
                //console.log(megamenuHeader);
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
					//console.log(megamenuHeader);
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
$(".hero-homepage").each(function() {
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
				globalMenuClick("linkclick","hero-" + linktext.toLowerCase(),pageTitle,eType,linkposition); });
			$(this).mousedown(function(e){
				if ($(this).parent().attr("class") != "view-all")
				{eType = "button";}
				if(e.which == 3){globalMenuClick("linkclick","hero-" + linktext.toLowerCase(),pageTitle,eType,linkposition);
				} 			
			});
		});                 
     }
    });	
//hero banners for all pages  .btn-square-white
	$(".common-hero-short-banner, .partnerHeroBanner, .common-hero-banner, .hero-product-solutions").each(function() {
     var listitem = $(this).find("a");
	 var linktext = $(this).find('h1').text();
	 var linkposition="";
	 var eType="link";
	 var eClass="";
     if( listitem.length>0)
	 {
		 listitem.each(function() {
		 //var linktext = jQuery(this).text();
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
	
	//Hexagons CTAs
	$("div.hexContain, ul.calculating-list, li.hexagon-transformative").each(function() {
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
	
	$(".tbd-dl").each(function(){
		var listitem = $(this).find("a");
		if(listitem.length>0){
			listitem.each(function(){
				var linktext = jQuery(this).text();
				linktext = $.trim(linktext);
				$(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"button","Specifications-Panel"); });
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
			//Added on 20160218
			$(this).mousedown(function(e){
				if(e.which == 3){
					globalMenuClick("linkclick","us>tm>"+linktext.toLowerCase(),pageTitle,"link","top menu");
				} 			
			});
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
	$(".stickNav-container, .tabbing-container, .category-listing").each(function() {
	 	var links = $(this).find("a")
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
    					//console.log("tabTitle=="+tabTitle);
                        tabClick(primaryCategory,tabTitle,pageTitle,"Tabscroll");
                        }
                        	else
                                isTabClicked=false;
                    }
                
                    
            	 }, delay);
                        
        }

       });
	//Added on 20160218
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
		var sType="";
		var dly="1500";
	 	var links = $(this).find("a");
	 	links.each(function() {
            $(this).click(function(){
                var text = $(this).text();
				var url=$(location).attr('href');
				if(url.indexOf("/resources.html")>-1){sType='resources';dly="5000"}else{sType='products & solutions';}
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

$(window).load(function(event){
	var currentLocation = $(location).attr('href');
	if(currentLocation.indexOf('search.html') > -1){
		$("#searchFrame").contents().find("[tokenid=searchresultitem]").size();
        var result =$(".searchresultitem").size();
	}	
		//console.log(result)
});

$(document).on('keypress', '#fulltext', function(event) {
    if(event.which == 13) {
    	var interval = setInterval(function() {
        	if($('.pr-archives-list-items').size()>0){
        	var searchTerm=$('#fulltext').val();
            var result=$('.pr:visible').size();
                result=result.toString();
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
            result=result.toString();
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
                        result=result.toString();
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
        result=result.toString();
         if(result==0)
             result="zero";
        	searchClick("", "search button",result,eventsFilters(),'event','specificSearchClick');
      }, 1000); 
    });

$('#filterRegion').on('change', function(event) {
    setTimeout(function() {
            var searchTerm=$(".filter-option").text();
            var result=$('#newsEventCatagory').find('div.newsWrapper-listing:visible').size();
        	result=result.toString();
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
                result=result.toString();
                 if(result==0)
                     result="zero";
                	searchClick("", "Event Filter",result,eventsFilters(),"event","specificSearchClick");
    			 }, 1500);
             });
        });
	});	
/*
function formProgress(formName,fieldName){ 
    digitalData.eventData=    { 
        leadFromName:formName,
        fieldname:fieldName,
        
    }    _satellite.track('formProgress');
}*/

	//Added on 20160218 with dummy class for input field
	/*$('.mktoEmailField').blur(function(){
		console.log("*******************newsletter subscription lost focus fired*****************");
		NewsletterSub();
	});*/
$(document).ready(function () {
 setTimeout(function(){
  $('.mktoEmailField').blur(function(){
  console.log("*******************newsletter subscription lost focus fired*****************");
  NewsletterSub();
})},2000);
});

function NewsletterSub(){
		var url=$(location).attr('pathname');
		var pageName="";
		var pageType="";
		var pageLoadEvent="";
		var leadFormName="";
		var leadFormParentPage=document.referrer;
		var leadFormParentPageCategory=document.referrer;
			if(url.indexOf("ty-")>-1)
			{
				pageName="newsletter subscription thank you";
				pageType="leadForm";
				pageLoadEvent="lead form completed";
				leadFormName="email subscription form";
				leadID=__aem_id;
				leadCountry=__aem_country;
				//leadCompany=__aem_company_name;
				console.log("*******************newsletter subscription completed*****************"); 
				console.log("data--"+data);
			}else
			{
				pageName="newsletter subscription form";
				pageType="leadForm";
				pageLoadEvent="lead form initiated";
				leadFormName="email subscription form";
				console.log("*******************newsletter subscription initiated*****************"); 
				console.log("data--"+data);
			}
			
			digitalData["page"]["pageInfo"]["pageName"]=pageName;
			digitalData["page"]["pageInfo"]["pageType"]=pageType;
			digitalData["page"]["pageInfo"]["pageLoadEvent"]=pageLoadEvent;
			digitalData["page"]["pageInfo"]["leadFormName"]=leadFormName;
			digitalData["site"]["siteInfo"]["server"]="mkthds";
			digitalData["page"]["pageInfo"]["hier1"]="";
			digitalData["page"]["category"]["primaryCategory"]="";
			if(url.indexOf("ty-")>-1)
			{
				digitalData["page"]["pageInfo"]["leadID"]=leadID;
				digitalData["page"]["pageInfo"]["leadCountry"]=leadCountry;
				//digitalData["page"]["pageInfo"]["leadCompany"]=leadCompany;
			}
			_satellite.track('emailsignup');	
}
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
        //console.log("tab tracking--"+JSON.stringify(digitalData.event));
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
		//console.log(trackEvent+"********************")
		//console.log("search tracking--"+JSON.stringify(digitalData.eventData));
        _satellite.track(trackEvent);

}


function getCurrentBreadcrumb() {
	var hierarchy="";
	$( "a.breadcrumblink").each(function( index ) {
        //console.log(hierarchy+"........."+hierarchy.length);
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
	//console.log( "hierarchy---->>"+hierarchy );
    return hierarchy;
}
//Added on 20160218


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
	if(url.indexOf("us/errors")>-1)
		return true;
	else
		false;
}
function isInternalSearchPage(){
	var url=$(location).attr('href');
	if(url.indexOf("/search")>-1)
		return true;
	else
		false;
}
function isResourceSearchPage(){
	var url=$(location).attr('href');
	if(url.indexOf("/en-us/news-insights/resources.html")>-1)
		return true;
	else
		false;
}
function isLeadFormPage(){
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
		 		filters = filters+ $.trim($(this).find('a').text());
	       
		});	
	$('.resources-listing input.filters, .product-listing input.filters').each(function() {
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
