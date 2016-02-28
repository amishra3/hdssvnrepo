var digitalData = digitalData || {};
digitalData.page = {
	pageInfo : {
		pageName : $('meta[name=pageName]').attr("content"),
		pageType : $('meta[name=pageType]').attr("content"),
		pageLoadEvent : $('meta[name=pageLoadEvent]').attr("content"),
		hierarchy : getCurrentBreadcrumb()
	},
	category : {
		primaryCategory : $('meta[name=pageType]').attr("content"),
		subSection : "storage-system",
		subSubSection : "Hitachi virtual platform"
	}
}
digitalData.user = {
	userInfo : {
		authStatus : "guest"
	}
}
digitalData.site = {
	siteInfo : {
		language : $('meta[name=language]').attr("content"),
		server : "HD-10001",
		country : $('meta[name=country]').attr("content")
	}
}


function getCurrentBreadcrumb() {
	var hierarchy = "home:";
	$( "a.breadcrumblink" ).each(function( index ) {
		  //console.log( index + ": " + $( this ).text() );
		  hierarchy=hierarchy+":"+$( this ).text();
	});
    return hierarchy;
}