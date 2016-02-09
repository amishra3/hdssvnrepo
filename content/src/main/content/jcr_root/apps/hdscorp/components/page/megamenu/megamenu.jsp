<%@page session="false" contentType="text/html; charset=utf-8"%>
<%@taglib prefix="cq" uri="http://www.day.com/taglibs/cq/1.0" %>

<%@include file="/apps/foundation/global.jsp"%>

<% 
	String viewtype = "";
	String[] selectorArray = slingRequest.getRequestPathInfo().getSelectors();
	if (selectorArray != null && selectorArray.length > 0) {
		viewtype = selectorArray[0];
	}
	
	pageContext.setAttribute("selectorString", viewtype);	

%>

<c:if test="${fn:contains(pageContext.request.requestURI, '/lookup')}">

	<cq:include script="headlibs.jsp" />
</c:if>

<!-- Load sidekick only when viewing page on its own -->
<% if(currentPage.getPath().equals(resourcePage.getPath())) {  %>
	<cq:include script="/libs/wcm/core/components/init/init.jsp" />
<%}%>

<c:if test="${fn:contains(pageContext.request.requestURI, '/lookup')}">
	<cq:includeClientLib js="hdscorp.main" />
</c:if>
<wcmmode:edit>
	<cq:includeClientLib categories="cq.widgets" />
	<cq:includeClientLib categories="hdscorp.widgets" />
</wcmmode:edit>

<cq:include path="megamenupar" resourceType="hdscorp/components/page/megamenu/megamenucontainer" />






