<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@ taglib prefix="wcmmode" uri="http://www.adobe.com/consulting/acs-aem-commons/wcmmode" %>
<%@ taglib prefix="wcm" uri="http://www.adobe.com/consulting/acs-aem-commons/wcm" %>
<%@page import="com.hdscorp.cms.util.PageUtils"%>

<c:set var="locations" value="<%=PageUtils.convertMultiWidgetToList(properties,"locationtitle-locationaddress-phone")%>" />
<c:set var="title" value="<%=properties.get("title")%>" />
<c:choose>
<c:when test="${not empty locations}">
	<h2>${title}</h2>	
	<c:forEach var="location" items="${locations}">
		<ul>
			<li>${location.locationtitle}</li>
			<li>${location.locationaddress}</li>
			<li>${location.phone}</li>
		</ul>
	</c:forEach>
</c:when>
<c:otherwise>
	<wcmmode:edit>
		<p>
			<span class="cq-text-placeholder-ipe">Configure Locations Information Component</span>
		</p>
	</wcmmode:edit>
</c:otherwise>
</c:choose>