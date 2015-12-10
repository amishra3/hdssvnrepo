<%@page session="false" contentType="text/html; charset=utf-8"%>
<%@taglib prefix="cq" uri="http://www.day.com/taglibs/cq/1.0" %>

<%@include file="/apps/foundation/global.jsp"%>

<c:set var="pageTemplate" value="<%=currentPage.getProperties().get("cq:template")%>" />
<c:set var="pagePath" value="<%=currentPage.getProperties().get("cq:template")%>" />

<%
	String viewtype = "";
	String[] selectorArray = slingRequest.getRequestPathInfo().getSelectors();
	if (selectorArray != null && selectorArray.length > 0) {
		viewtype = selectorArray[0];
	}
	
%>

	<c:set var="view" value="<%=viewtype%>"/>
	
	<c:if test ="${view ne 'overlay'}">
	
		<cq:include script="headlibs.jsp"/>
		
		<cq:include script="/libs/wcm/core/components/init/init.jsp"/>		
	
		<cq:includeClientLib js="hdscorp.main" />	
	</c:if>
	
	<cq:include path="par" resourceType="foundation/components/parsys" />
		
	




