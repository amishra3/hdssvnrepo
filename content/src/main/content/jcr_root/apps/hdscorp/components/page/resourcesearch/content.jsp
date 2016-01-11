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
		<h2>Execution Time &nbsp;&nbsp;&nbsp;      <%=result.getExecutionTime() %>   </h2>
		<h2>Total Matches  &nbsp;&nbsp;&nbsp;&nbsp;    <%=result.getTotalMatches() %>   </h2>
		<h3>Query Statement  &nbsp;&nbsp;&nbsp;   <%=result.getQueryStatement() %>   </h3>

		<br>
		<table width="59%" border="1">
		<tr><td><h3>Tag</h3></td><td><h3>#Results</h3>
		<% Map<String, Facet> facets = result.getFacets();


		for (String key : facets.keySet()) {

			Facet facet = facets.get(key);
			if (facet.getContainsHit()) {


				for (Bucket bucket : facet.getBuckets()) {
					
					Tag tag = tm.resolve((String) bucket.getValue());
					if(tag!= null){ %> 
						<tr>
						<td><h4><%= tag.getTitle()%></h4></td><td><h4><%=bucket.getCount() %></h4></td></tr><%
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
		<%
		
		for (Hit hit : hits) {

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
					+ " style='padding-left:5em;margin-bottom:5em;'>"
					+ pageTitle + "</a>" + "<BR>");
			if (pageDescription != null) {
				out.println(pageDescription + "<BR>");
			}

		}

	} catch (Exception ex) {
		System.out.println("+++++++++++++++IN ERROR BLOCK"+ ex.getMessage());
	}
%> 