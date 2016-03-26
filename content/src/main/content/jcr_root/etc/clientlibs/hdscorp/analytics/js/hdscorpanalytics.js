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
    digitalData["page"]["pageInfo"]["pageName"]="404 error page";
	digitalData["page"]["pageInfo"]["pageLoadEvent"]="404 error";
    digitalData["page"]["pageInfo"]["errorMessage"]="page not found";
	digitalData["page"]["pageInfo"]["pageType"]="errorPage";
	digitalData["page"]["pageInfo"]["hier1"]="404 error page";
	digitalData["page"]["category"]["primaryCategory"] = "404 error page";

}
// *****this section would perform the internal search tracking if the search page is hit *******  //
// ***********************************************************************************************//

if(isInternalSearchPage()){    
		var result = $('.searchresultitem').size();
		var searchTerm = $('#SearchTextBox').val();
		var pageName = digitalData.page.pageInfo.pageName;
		result=result.toString();
		if(result == 0){
			result='zero';
			internalSearch(pageName, "internalSearch", "unsuccessful search", searchTerm, result)
		}else{
			internalSearch(pageName, "internalSearch", "success search", searchTerm, result)
		}

		function internalSearch(pageName, pageType,pageLoadEvent, searchTerm, result){
			digitalData["page"]["pageInfo"]["pageName"] = pageName;
			digitalData["page"]["pageInfo"]["pageType"] = pageType;
			digitalData["page"]["pageInfo"]["pageLoadEvent"] = pageLoadEvent;
			digitalData["page"]["pageInfo"]["searchResult"] = result;
			digitalData["page"]["category"]["primaryCategory"] = "search";
			digitalData["page"]["category"]["subSection"] = "search";
			digitalData["page"]["category"]["subSubSection"] = "search";
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
			digitalData["eventData"]["searchFilters"]=searchFilters;
			_satellite.track('internalfilter');
		}
}
// ****************************************************************************************************************//
// *****  --END-- the above section would perform the internal search tracking if the search page is hit *******  //




// ****************************************************************************************************************//
// *****  --START-- the below section would perform the resource search tracking if the search page is hit *******  //
if(isResourceSearchPage()){  

	var searchTerm = $('#resSearch').val();
	var result = $('.category-resources-listing').find('.resource.visible').size();
	var searchAction = "";
	var searchFilters = "all";//removed 'all' and set 'featured' as default serach
	result=result.toString();
	searchTerm=searchTerm.toString();
	if(searchTerm == "" || searchTerm.length==0){
		searchTerm='no term searched';
	}
	$('#resSearch').on('keypress',function(e){
		searchTerm = $('#resSearch').val();
		searchTerm=searchTerm.toString();
		//console.log("**********"+searchTerm+"*********")
		if(e.which == 13){
			setTimeout(function(){
			result = $('.category-resources-listing').find('.resource.visible').size();
			result=result.toString();
			searchAction = "search box"
			specificSearchClick(searchTerm, searchAction, result)
			},10000);
		}
	});

	$('.searchResource').click(function(){
		searchTerm = $('#resSearch').val();
		searchTerm=searchTerm.toString();
		result = $('.category-resources-listing').find('.resource.visible').size();
		console.log("**********"+searchTerm+"*********")
		result=result.toString();
		searchAction = "search box"
		specificSearchClick(searchTerm, searchAction, result)
	});


	//$('#mobShowFilters').click(function(){
	$(document).on('click', '#showContentType', function(event) {
		searchTerm = $('#resSearch').val();
		result = $('.category-resources-listing').find('.resource.visible').size();
		console.log("**********"+searchTerm+"*********")
		var selection = [];
		var selectionCollection;
		var selectionParent = "";
		console.log($(this).parent().parent().prev().prev().attr('class'))
		if($(this).parent().parent().prev().prev().attr('class') == 'FilterByIndustryList'){
			searchAction = "Industry filter"
		}else{
			searchAction = "Content filter"
		}
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
	});
	
	//$('#mobShowFilters').click(function(){
	$(document).on('click', '#showIndustry', function(event) {
		searchTerm = $('#resSearch').val();
		result = $('.category-resources-listing').find('.resource.visible').size();
		console.log("**********"+searchTerm+"*********")
		var selection = [];
		var selectionCollection;
		var selectionParent = "";
		console.log($(this).parent().parent().prev().prev().attr('class'))
		if($(this).parent().parent().prev().prev().attr('class') == 'FilterByIndustryList'){
			searchAction = "Industry filter"
		}else{
			searchAction = "Content filter"
		}
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
	});
	
	$(document).on('click', '#asideLinks-product li > a, input[name="cbxFunction"]', function(event) {	
		searchAction = "category filter"
		searchTerm = $('#resSearch').val();
		searchTerm=searchTerm.toString();
		result = $('.category-resources-listing').find('.resource.visible').size();
		result=result.toString();
		var selection = [];
		var selectionCollection;
		var selectionParent = "";
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
	});

	$('.page-link').click(function(){
		searchTerm = $('#resSearch').val();
		searchTerm=searchTerm.toString();
		result = $('.category-resources-listing').find('.resource.visible').size();
		result=result.toString();
		var pagination = currentpagenumber;
		resourcePagination(searchTerm,pagination, 'resource')
	});
	$('.page-link.next').click(function(){
		searchTerm = $('#resSearch').val();
		searchTerm=searchTerm.toString();
		result = $('.category-resources-listing').find('.resource.visible').size();
		result=result.toString();
		var pagination = currentpagenumber+1;
		resourcePagination(searchTerm, pagination, 'resource')
	});
	$('.page-link.prev').click(function(){
		searchTerm = $('#resSearch').val();
		searchTerm=searchTerm.toString();
		result = $('.category-resources-listing').find('.resource.visible').size();
		result=result.toString();
		var pagination = currentpagenumber-1;
		resourcePagination(searchTerm, pagination, 'resource')
	});
	
	$('.clear-results a').click(function(){
		searchTerm = $('#resSearch').val();
		searchTerm=searchTerm.toString();
		searchAction = "Clear all filters"
		result = $('.category-resources-listing').find('.resource.visible').size();
		result=result.toString();
		specificSearchClick(searchTerm, searchAction, result)
	})
	
	function specificSearchClick(tsearchTerm, searchAction, result){ 

		if(tsearchTerm == "" || tsearchTerm.length==0){
			tsearchTerm = 'no term searched'
		}
		if(result == 0){
			result = 'zero'
		}
		digitalData.eventData=    { 
			searchAction:searchAction,
			searchResult:result,
			searchType:'resource',
			searchPage:digitalData.page.pageInfo.pageName,
			searchTerm:tsearchTerm,
			searchFilters:searchFilters
		}    
		_satellite.track('specificSearchClick');
	}

	function resourcePagination(searchTerm,pagination, searchResultType){ 
		digitalData.eventData={ 
			pagination: pagination, // pagination no."3",
			searchTerm:searchTerm,
			searchResultType:'internalSearch'

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
     if( listitem.length>0)
	 {
		 listitem.each(function() {
		 var linktext = "hero-" + $.trim(jQuery(this).text());
         // linktext = "hero-" + $.trim(linktext);
		  var url=$(location).attr('href');
			if(url.indexOf("us/home")>-1)
				linkposition="home-hero-banner";
			else 
				linkposition="PS-Hero";
		  
            $(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link",linkposition); });
			$(this).mousedown(function(e){
				if(e.which == 3){
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link",linkposition);
				} 			
			});
		});                 
     }
    });	
//hero banners for all pages
	$(".common-hero-short-banner, .partnerHeroBanner, .common-hero-banner, .hero-product-solutions").each(function() {
     var listitem = $(this).find("a");
	 var linktext = $(this).find('h1').text();
	 var linkposition="";
     if( listitem.length>0)
	 {
		 listitem.each(function() {
		 //var linktext = jQuery(this).text();
          linktext = "hero-" + $.trim(linktext);
		  var url=$(location).attr('href');
			if(url.indexOf("us/home")>-1)
				linkposition="home-hero-banner";
			else 
				linkposition="PS-Hero";
		  
            $(this).click(function(){globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link",linkposition); });
			$(this).mousedown(function(e){
				if(e.which == 3){
					globalMenuClick("linkclick",linktext.toLowerCase(),pageTitle,"link",linkposition);
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
	/*$('a').mousedown(function(e){
		if($(this).parents().attr('class') != 'hds-quick-navigation' || $(this).parents().attr('class') != 'hds-main-navigation' || $(this).parents().attr('class') != 'footer'){
			if(e.which == 3){
				console.log("global click")
				// var megamenuHeader=$(this).closest(".hds-megaMenu");
				// var category="";
				// console.log(megamenuHeader);
				// if(megamenuHeader && megamenuHeader!='undefined' && megamenuHeader!='null')
					// category = megamenuHeader.find('h2').find('a').text();
					// category = $.trim(category);
				var triggerName = $(this).text().toLowerCase();
				// if(category!="" && category.length>0)
					// triggerName="us>mm>"+category.toLowerCase()+">"+linktext.toLowerCase();
				if($(this).attr('href').indexOf(window.location.hostname) > -1){
					globalMenuClick("linkclick",triggerName,pageTitle,"link","link click"); 
				}else{
					globalMenuClick("linkclick",triggerName,pageTitle,"link","offsite link click");
				}
			}
		}		
	});*/
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
                var tabTitle = "tab-"+$(this).text().toLowerCase().replace(/\s/g,"-")+" button";
                tabClick(primaryCategory,tabTitle,pageTitle,"Tabclick"); 
            });
	  	});

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
//Added on 20160324 with dummy class for form
	$('.mktoForm').submit(function(){
		var emailEventType = "lead form completed";
		var pName="newsletter subscription thank you";
		emailsignup(emailEventType,pName)
	});
	//Added on 20160218 with dummy class for input field
	$('div.mktoFormRow, .mktoFieldWrap, .mktoEmailField').on('focus blur',function(){
		var emailEventType = "lead form initiated";
		var pName="newsletter subscription form";
		emailsignup(emailEventType,pName)	
	});
	/*$('#Country').on('focus blur',function(){
			localStorage.setItem('leadCountry',$(this).val())
		*/
	
	//Added on 20160218
function emailsignup(emailEventType,pName){ 
	console.log("leadcountry=" + localStorage.getItem('leadCountry'));
	if(emailEventType=="lead form completed" && localStorage.getItem('leadCountry')){digitalData["eventData"]["leadCountry"] = localStorage.getItem('leadCountry');}
    digitalData.eventData={ 
	  	pageName:pName,
		pageType:"leadForm",
        pageLoadEvent:emailEventType,
        leadFormName:"email subscription form",
		leadId:127667
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
