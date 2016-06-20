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
	
	<c:if test ="${view ne 'modal'}">
	
		<cq:include script="headlibs.jsp"/>
		
	  <!-- Load sidekick only when viewing page on its own -->
	  <% if(currentPage.getPath().equals(resourcePage.getPath())) {  %>
			<cq:include script="/libs/wcm/core/components/init/init.jsp"/>
			<cq:includeClientLib js="hdscorp.main" />
	  <%}%>
		
	
			
		
		<wcmmode:edit>
			<cq:includeClientLib categories ="cq.widgets"/>
			<cq:includeClientLib categories ="hdscorp.widgets"/>
		</wcmmode:edit>
		
	</c:if>
	
	<c:if test="${view eq 'modal'}">
		<div class="hiddencontent">
	</c:if>
	
		<cq:include path="par" resourceType="foundation/components/parsys" />
		
	<c:if test="${view eq 'modal'}">
		</div>
	</c:if>
	




