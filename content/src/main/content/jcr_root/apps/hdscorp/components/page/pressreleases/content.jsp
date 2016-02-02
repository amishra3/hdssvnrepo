<%@page import="com.day.cq.dam.api.Asset"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="org.apache.sling.api.resource.ValueMap"%>
<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.restservice.PressReleasesService"%>
<%@page import="com.day.cq.wcm.api.Page"%>
<%@page import="com.day.cq.search.result.SearchResult"%>
<%@page import="com.day.cq.search.result.Hit"%> 
<%@page
	import="java.util.List,com.day.cq.search.facets.Facet,com.day.cq.search.facets.Bucket,java.util.Map,com.day.cq.tagging.TagManager,com.day.cq.tagging.Tag"%>

Calling Press Release Migration service  

<%
try {
	PressReleasesService pressReleasesService = sling
			.getService(com.hdscorp.cms.restservice.PressReleasesService.class);
	pressReleasesService.getPressReleasesResponse("https://www.hds.com/corporate/rss-and-subscriptions/pr-all/", "pressRelease");
	pressReleasesService.getPressReleasesResponse("https://www.hds.com/corporate/rss-and-subscriptions/news/", "news");

} catch (Exception ex) {
	System.out.println("+++++++++++++++IN ERROR BLOCK"+ ex.getMessage());
}

%>