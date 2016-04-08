<%--
  Iot footer links component.
--%>
<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="wcmmode" uri="http://www.adobe.com/consulting/acs-aem-commons/wcmmode" %>
<%@ taglib prefix="wcm" uri="http://www.adobe.com/consulting/acs-aem-commons/wcm" %>

<c:set var="footerTitle" value="<%=properties.get("footerTitle")%>" />
<c:set var="domain" value="" />
<c:set var="port" value="<%= request.getServerPort() %>" />
<c:if test="${empty port || port == 80}">
<c:set var="domain" value="<%= pageProperties.getInherited("domain", "") %>" />
</c:if>
<c:choose>
	<c:when test="${not empty footerTitle}">
		<h2>${footerTitle}</h2>
		<c:set var="footerInternalLinks" value="<%=PageUtils.convertMultiWidgetToList(properties,"internalLinkTitle-internalLinkurl")%>" />
		<c:forEach var="internalLinks" items="${footerInternalLinks}">
			<ul class="footer-links">
				<c:set var="internalLinkUrl" value="${internalLinks.internalLinkurl}" />
				<c:set var="internalUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("internalLinkUrl").toString())%>" />
					<li><a href="${fn:contains(internalUrl, 'http')?'':domain}${internalUrl}"
						title="${internalLinks.internalLinkTitle}">${internalLinks.internalLinkTitle}</a></li>
			</ul>
		</c:forEach>
		<c:set var="footerExternalLinks" value="<%=PageUtils.convertMultiWidgetToList(properties,"externalLinkTitle-externalLinkurl-externallinktargettype")%>" />
		<c:forEach var="externalLinks" items="${footerExternalLinks}">
			<ul class="footer-links">
				<c:set var="externalUrl" value="${externalLinks.externalLinkurl}" />
				<li><a href="${fn:contains(externalUrl, 'http')?'':domain}${externalUrl}" target="${externalLinks.externallinktargettype==true?'_blank':'_self'}" title="${externalLinks.externalLinkTitle}">${externalLinks.externalLinkTitle}${externalLinks.externallinktargettype==true?'<span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':''}</a>
				</li>
			</ul>
		</c:forEach>		
	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure Footer Links Component</span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>