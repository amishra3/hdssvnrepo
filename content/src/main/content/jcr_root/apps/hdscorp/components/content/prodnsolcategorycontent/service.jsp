<%@page session="false"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.day.cq.wcm.api.Page"%>
<%@page import="com.hdscorp.cms.dao.ProductNode"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.day.cq.search.result.Hit"%>
<%@page import="java.util.List"%>
<%@page import="com.day.cq.search.result.SearchResult"%>
<%@page import="com.hdscorp.cms.search.SearchServiceHelper"%>
<%@page import="java.util.Arrays"%>



<%
try{
	String viewtype = "";
	//String tags[] =  {"common:product-and-solutions/storage/all-flash-storage"};
	String tags[] =  {""};

	String[] selectorArray = slingRequest.getRequestPathInfo().getSelectors();
	if (selectorArray != null && selectorArray.length > 0) {
		viewtype = selectorArray[0];
		viewtype = viewtype.replaceAll("\\|", "/").replaceAll("[\\[\\](){}]","");
		tags = viewtype.split(",");
	}else{
		tags = null;
	}

	SearchServiceHelper searchServiceHelper =  sling.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
	
	String paths[] = {"/content/hdscorp/en_us/productsandsolutions"};
	String template= "/apps/hdscorp/templates/productdetail";
	boolean doPagination = false;
	String type[] = {"cq:Page"};
	
	
	SearchResult result = searchServiceHelper.getFullTextBasedResuts(paths,tags,template,type,null,doPagination,null,null,resourceResolver,null,null);
	List<Hit> hits = result.getHits();
	
	ArrayList<ProductNode> products = new ArrayList<ProductNode>();
	
	for (Hit hit : hits) {
		ProductNode productNode = new ProductNode();
		Page reourcePage = hit.getResource().adaptTo(Page.class);
	    String pageTitle = reourcePage.getTitle();
	    String pagePath = reourcePage.getPath();
	    String pageProductDescription = (String)reourcePage.getProperties().get("subtext");
	    if(pagePath.startsWith("/content")){
	    	pagePath=PathResolver.getShortURLPath(pagePath);
	    }
	    productNode.setProductTitle(pageTitle);
	    productNode.setProductDescription(pageProductDescription);
	    productNode.setProductPath(pagePath);
	    products.add(productNode);
	}
	
	pageContext.setAttribute("productsList", products);
	
}catch(Exception ex){
	//System.out.println(ex.getMessage());
}
%>