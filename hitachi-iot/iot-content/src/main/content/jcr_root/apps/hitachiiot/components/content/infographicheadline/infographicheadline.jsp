<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@ taglib prefix="wcmmode" uri="http://www.adobe.com/consulting/acs-aem-commons/wcmmode" %>
<%@ taglib prefix="wcm" uri="http://www.adobe.com/consulting/acs-aem-commons/wcm" %>



<c:choose>
<c:when test="${not empty properties.headlinecontent}">
<div> 
	<h2>${properties.headlinecontent}</h2>
	<p>${properties.descriptioncontent}</p>
	<img src="${backgroundstyle}" />
	<c:if test="${not empty properties.infographicimage}">
		<img src="${properties.infographicimage}" />
	</c:if>
	<c:set var="linkUrl" value="${properties.buttonurl}" />
	<c:choose>
		<c:when test="${fn:startsWith(linkUrl,'/content/')}">
			<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>"/>
		</c:when>
		<c:otherwise>
			<c:set var="linkUrl" value="${linkUrl}"/>
		</c:otherwise>
	</c:choose>
	
	<c:if test="${not empty properties.buttonlabel}">
		<a href="${fn:contains(linkUrl, 'http')?'':domain}${linkUrl}" target="${properties.buttontargettype?'_blank':'_self'}" title="${properties.buttonlabel}">${properties.buttonlabel}</a>
	</c:if>
		
</div>
</c:when>
<c:otherwise>
	<wcmmode:edit>
		<p>
			<span class="cq-text-placeholder-ipe">Configure Infographic Headline Component</span>
		</p>
	</wcmmode:edit>
</c:otherwise>
</c:choose>