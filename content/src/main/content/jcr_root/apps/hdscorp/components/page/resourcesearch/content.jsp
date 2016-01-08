<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.search.SearchServiceHelper"%>
<%@page import="com.day.cq.wcm.api.Page"%>
<%@page import="com.day.cq.search.result.SearchResult"%>
<%@page import="com.day.cq.search.result.Hit"%>
<%@page
	import="java.util.List,com.day.cq.search.facets.Facet,com.day.cq.search.facets.Bucket,java.util.Map"%>
<%
	try {
		SearchServiceHelper searchServiceHelper = sling
				.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
        String paths[] = {"/content/dam/public/testpdf/batch1"};
        String tags[] = {"common:country/us","common:region/global"};
        String template= "/apps/geometrixx-outdoors/templates/page_product";
        template=null;
        String type[] = {"dam:Asset"};
    //tags=null;
        boolean doPagination = false;
        String returnOffset="0";
        String returnLimit="10";
           SearchResult result = searchServiceHelper.getFullTextBasedResuts(paths, tags, null, type,"Hitachi", doPagination, returnOffset,returnLimit, resourceResolver,null,null);

		List<Hit> hits = result.getHits();
		pageContext.setAttribute("hits", hits);
		out.println("<BR><BR><BR><BR>");
		out.println("Execution Time *******"
				+ result.getExecutionTime() + "<BR>");
		out.println("Hits per page"+result.getHitsPerPage());
		out.println("nextpage "+result.getHits().size());
		
		out.println("Total Matches *******" + result.getTotalMatches()
				+ "<BR>");
		out.println("Query Statement *******"
				+ result.getQueryStatement() + "<BR>");
		out.println("Size*******"
				+ result.getHits().size()+ "<BR>");
		out.println("Filtering Predicates *******"
				+ result.getFilteringPredicates() + "<BR>");
		out.println("<BR><BR><BR><BR>");
		Map<String, Facet> facets = result.getFacets();
		for (String key : facets.keySet()) {
			System.out.println("facet key**********" + key);
			Facet facet = facets.get(key);
			if (facet.getContainsHit()) {

				out.println("buckets size***"
						+ facet.getBuckets().size());
				for (Bucket bucket : facet.getBuckets()) {
					long count = bucket.getCount();
					out.println("count ***********" + count);

					out.println("bucket value**" + bucket.getValue());

					/*
					 * Map<String, String> params = bucket.getPredicate()
					 * .getParameters(); for (String k : params.keySet()) {
					 * System.out.println("predicate params.." + k); }
					 */
				}
			}
		}
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
		System.out.println("+++++++++++++++IN ERROR BLOCK"
				+ ex.getMessage());
	}
%>