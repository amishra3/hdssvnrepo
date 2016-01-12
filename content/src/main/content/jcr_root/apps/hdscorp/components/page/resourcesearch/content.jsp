<%@page import="com.day.cq.dam.api.Asset"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="org.apache.sling.api.resource.ValueMap"%>
<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.search.SearchServiceHelper"%>
<%@page import="com.day.cq.wcm.api.Page"%>
<%@page import="com.day.cq.search.result.SearchResult"%>
<%@page import="com.day.cq.search.result.Hit"%>
<%@page
	import="java.util.List,com.day.cq.search.facets.Facet,com.day.cq.search.facets.Bucket,java.util.Map,com.day.cq.tagging.TagManager,com.day.cq.tagging.Tag"%>
<%
	try {
		SearchServiceHelper searchServiceHelper = sling
				.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
        String paths[] = {"/content/dam/public/testpdf"};
        String tags[] = {"common:country/us","common:region/global"};
        String template= "/apps/geometrixx-outdoors/templates/page_product";
        template=null;
        String type[] = {"dam:Asset"};
        //tags=null;
        boolean doPagination = false;
        String returnOffset="0";
        String returnLimit="10";
           SearchResult result = searchServiceHelper.getFullTextBasedResuts(paths, tags, null, type,"Hitachi", doPagination, returnOffset,returnLimit, resourceResolver,null,null);
           TagManager tm = resourceResolver.adaptTo(TagManager.class);
		List<Hit> hits = result.getHits();
		pageContext.setAttribute("hits", hits);
		 pageContext.setAttribute("result", result);
		out.println("<BR><BR><BR><BR>");

		%>
		<div style="margin-left: 6%;">
			<h2 style="font-size: 1.5em;">Execution Time &nbsp;&nbsp;&nbsp;      <%=result.getExecutionTime() %>   </h2>
			<h2 style="font-size: 1.5em;">Total Matches  &nbsp;&nbsp;&nbsp;&nbsp;    <%=result.getTotalMatches() %>   </h2>
			<h3 style="font-size: 1em;">Query Statement  &nbsp;&nbsp;&nbsp;   <%=result.getQueryStatement() %>   </h3>
		</div>
		<br>
		<div>
		<span style="float:right;width: 69%; background-color: white;">
		<%
		
		for (Hit hit : hits) {
			
			String hitType = hit.getResource().getResourceType();
			if(hitType.equals("dam:Asset")){
				Asset asset = hit.getResource().adaptTo(Asset.class);
				
				String resourcePath = asset.getPath();
				if(resourcePath!=null && resourcePath.startsWith("/content")){
					resourcePath=PathResolver.getShortURLPath(resourcePath);
				}

				String resourceDescription = asset.getMetadataValue("dc:description");			
				String resourceTitle = asset.getMetadataValue("dc:title");
				out.println("<a href=" + resourcePath
					+ " style='padding-left:10px;margin-bottom:5em;'>"
					+ resourceTitle + "</a>" + "<BR>");

				if (resourceDescription != null) {
					out.println("<span  style='padding-left:10px;margin-bottom:5em;'>"+resourceDescription + "</span><BR><BR>");
				}
				
			}else{
	 			Page reourcePage = hit.getResource().adaptTo(Page.class);
	 			String pageTitle = reourcePage.getTitle();
	 			String pagePath = reourcePage.getPath();
	 			String pageDescription = reourcePage.getDescription();

	 			if (pageTitle != null) {
	 				pageTitle = pagePath.substring(
	 						pagePath.lastIndexOf('/') + 1,
	 						pagePath.length());
	 			}

	 			out.println("<a href=" + pagePath
	 					+ " style='padding-left:10px;margin-bottom:5em;'>"
	 					+ pageTitle + "</a>" + "<BR>");
	 			if (pageDescription != null) {
	 				out.println(pageDescription + "<BR>");
	 			}
				
			}

		}
		
		%>
		</span>
		<span style="float:left;width: 30%; background-color: white;">
				<table width="29%" border="1" style="margin-left: 200px;">
		<tr><td><h3>Tag</h3></td><td><h3>#Results</h3>
		<% Map<String, Facet> facets = result.getFacets();


		for (String key : facets.keySet()) {

			Facet facet = facets.get(key);
			if (facet.getContainsHit()) {


				for (Bucket bucket : facet.getBuckets()) {
					
					Tag tag = tm.resolve((String) bucket.getValue());
			 		if(tag!= null){ %> 
						<tr>
						<td><p><%= tag.getTitle()%></p></td><td><p><%=bucket.getCount() %></p></td></tr><%
						//out.println("<h4>"+tag.getTitle()+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+count+ "</h4><BR>");
					}
									/*
					 * Map<String, String> params = bucket.getPredicate()
					 * .getParameters(); for (String k : params.keySet()) {
					 * System.out.println("predicate params.." + k); }
					 */
				}
			}
		}
		%>
		</table>
		</span>
		</div>
<%		

	} catch (Exception ex) {
		System.out.println("+++++++++++++++IN ERROR BLOCK"+ ex.getMessage());
	}
%> 