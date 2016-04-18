<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@ taglib prefix="wcmmode" uri="http://www.adobe.com/consulting/acs-aem-commons/wcmmode" %>
<%@ taglib prefix="wcm" uri="http://www.adobe.com/consulting/acs-aem-commons/wcm" %>

<c:set var="domain" value="" />
<c:set var="port" value="<%= request.getServerPort() %>" />
<c:if test="${empty port || port == 80}">
	<c:set var="domain" value="<%= pageProperties.getInherited("domain", "") %>" />
</c:if>
<c:set var="title" value="<%=properties.get("title")%>" />

<c:choose>
<c:when test="${not empty title}">
	<img src="${properties.iconurl}" />
	<h2>
		${title}
	</h2>
	<p>${properties.description}</p>
	<c:set var="linkUrl" value="${properties.readmorelink}" />
	<c:choose>
		<c:when test="${fn:startsWith(linkUrl,'/content/')}">
			<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>"/>
		</c:when>
		<c:otherwise>
			<c:set var="linkUrl" value="${linkUrl}"/>
		</c:otherwise>
	</c:choose>
	
	<c:if test="${not empty properties.readmorelabel}">
		<a href="${fn:contains(linkUrl, 'http')?'':domain}${linkUrl}" target="${properties.readmorelinktargettype?'_blank':'_self'}" title="${properties.readmorelabel}">${properties.readmorelabel}</a>
	</c:if>	
</c:when>
<c:otherwise>
	<wcmmode:edit>
		<p>
			<span class="cq-text-placeholder-ipe">Configure Title Description Component</span>
		</p>
	</wcmmode:edit>
</c:otherwise>
</c:choose>