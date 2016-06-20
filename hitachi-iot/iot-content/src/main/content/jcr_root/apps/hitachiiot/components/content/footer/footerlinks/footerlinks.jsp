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

<c:choose>
	<c:when test="${not empty footerTitle}">
		<h3 class="footer-title col-sm-12 col-md-12">${footerTitle}</h3>
		<c:set var="footerInternalLinks" value="<%=PageUtils.convertMultiWidgetToList(properties,"internalLinkTitle-internalLinkurl")%>" />


<ul class="footer-links col-md-12">
<c:forEach var="internalLinks" items="${footerInternalLinks}">

<c:set var="internalLinkUrl" value="${internalLinks.internalLinkurl}" />
		<c:set var="internalUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("internalLinkUrl").toString())%>" />
         
         <li><a href="${internalUrl}"
						title="${internalLinks.internalLinkTitle}">${internalLinks.internalLinkTitle}</a>
         </li>
          
          </c:forEach>
        </ul>
        <c:set var="footerExternalLinks" value="<%=PageUtils.convertMultiWidgetToList(properties,"externalLinkTitle-externalLinkurl-externallinktargettype")%>" />
		<c:forEach var="externalLinks" items="${footerExternalLinks}">
			<ul class="footer-links col-md-12">
				<c:set var="externalUrl" value="${externalLinks.externalLinkurl}" />
				<li>
				<a href="${externalUrl}" class="innovation-link col-md-12" target="${externalLinks.externallinktargettype==true?'_blank':'_self'}">${externalLinks.externalLinkTitle} &nbsp;<span class="glyphicon glyphicon-new-window" aria-hidden="true"></span></a>
				
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


















