<%--
  globalfooter component.
--%>

<%@page session="false"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@include file="/apps/foundation/global.jsp"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="wcmmode" uri="http://www.adobe.com/consulting/acs-aem-commons/wcmmode" %>
<%@ taglib prefix="wcm" uri="http://www.adobe.com/consulting/acs-aem-commons/wcm" %>

<c:set var="footerCategory" value="<%=properties.get("footerCategory")%>" />
<c:set var="footerNavLinks" value="<%=PageUtils.convertMultiWidgetToList(properties,"linkName-linkUrl")%>" />

<c:choose>
	<c:when test="${not empty footerCategory}">

		<li>
			<a href="#">${footerCategory}</a>
		</li>
		<c:forEach var="navlinks" items="${footerNavLinks}">
			<c:set var="navUrl" value="${navlinks.linkUrl}" />
			<c:set var="singleQuote" value="'" />
			<c:choose>

				<c:when test="${fn:startsWith(navUrl,'/content')}">

					<li><a	href="<%=PathResolver.getShortURLPath(pageContext.getAttribute("navUrl").toString())%>"
						title="${navlinks.linkName}">${navlinks.linkName}</a></li>

				</c:when>
				<c:otherwise>
					<li><a href="${navUrl}" title="${navlinks.linkName}">${navlinks.linkName}</a>
					</li>
				</c:otherwise>

			</c:choose>
		</c:forEach>

	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure Footer
					Navigation</span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>