<%@page import="com.hdscorp.cms.constants.GlobalConstants"%>
<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.day.cq.wcm.api.Page"%>
<%@ page import="org.apache.sling.api.resource.ResourceResolver,
					com.day.cq.wcm.commons.WCMUtils,
					com.day.cq.wcm.api.components.Toolbar"%>


<c:if test="${empty pageProperties.hidebreadcrumb}">
	<%
		//Current Node should not be included in the breadcrumb
		int currentPageDepth = currentPage.getDepth()-1;

		StringBuffer breadcrumbContent = new StringBuffer("");
		String rootLabel = (String) properties.get("rootLabel",
				String.class);
		String rootTargetUrl = (String) properties.get("rootUrl",
				String.class);
		if (rootTargetUrl != null) {
			rootTargetUrl = PathResolver.getShortURLPath(rootTargetUrl);
		}
		breadcrumbContent.append("<li itemprop='itemListElement' itemscope itemtype='http://schema.org/ListItem'><a itemprop='item' class='breadcrumblink' href='" + rootTargetUrl + "'><span itemprop='name'>" + rootLabel + "</span></a><meta itemprop='position' content='1' /></li>");
	
		Page parentPageHandle = null;
		String parentTitle = "";
		String parentPath = "";
		int count = 2 ;
		for (int i = 3; i < currentPageDepth; i++) {
			parentPageHandle = currentPage.getAbsoluteParent(i);
			if (parentPageHandle != null) {
				breadcrumbContent.append(" > ");
				parentPath = PathResolver.getShortURLPath(parentPageHandle.getPath());
				breadcrumbContent.append("<li itemprop='itemListElement' itemscope itemtype='http://schema.org/ListItem'><a itemprop='item'class='breadcrumblink' href='" + parentPath + "'><span itemprop='name'>"+ parentPageHandle.getTitle() + "</span></a><meta itemprop='position' content="+count+" /</li>");
			}
             count =count+1; 
		}

		String[] selectorArray = slingRequest.getRequestPathInfo().getSelectors();
		String productBookMarkLink = "" ;
		if (selectorArray != null && selectorArray.length > 0 && selectorArray[0].equalsIgnoreCase(GlobalConstants.PRODUCT_TECH_SPEC_SELECTOR)) {
			productBookMarkLink = " > <a class='breadcrumblink' href='" + PathResolver.getShortURLPath(currentPage.getPath()) + "'><span itemprop='name'>"+ currentPage.getTitle() + "</span></a>" ;
		}

	%> 

	<div class="breadcrumb-container">
		<div class="breadcrumb" itemscope itemtype="http://schema.org/BreadcrumbList">
            <ul>
			<%=breadcrumbContent%><%=productBookMarkLink%>
            </ul>
		</div>
	</div>
</c:if>
