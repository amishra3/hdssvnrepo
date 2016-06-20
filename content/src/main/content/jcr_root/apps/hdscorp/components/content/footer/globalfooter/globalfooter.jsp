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
<c:set var="footerNavLinks" value="<%=PageUtils.convertMultiWidgetToList(properties,"linkName-linkUrl-thirdparty")%>" />
<c:set var="domain" value="" />
<c:set var="port" value="<%= request.getServerPort() %>" />
<c:if test="${empty port || port == 80}">
<c:set var="domain" value="<%= pageProperties.getInherited("domain", "") %>" />
</c:if>
<c:choose>
	<c:when test="${not empty footerCategory}">

		<li>
			${footerCategory}
		</li>
		<c:forEach var="navlinks" items="${footerNavLinks}">
			<c:set var="navUrl" value="${navlinks.linkUrl}" />
			<c:set var="singleQuote" value="'" />
			<c:choose>

				<c:when test="${fn:startsWith(navUrl,'/content')}">
					<c:set var="navUrl" value="${hdscorp:shortURL(navUrl)}" />
					<li><a	href="${fn:contains(navUrl, 'http')?'':domain}${navUrl}"
						title="${navlinks.linkName}">${navlinks.linkName}</a></li>
				</c:when>
				<c:otherwise>
					<li><a href="${fn:contains(navUrl, 'http')?'':domain}${navUrl}"  target="${navlinks.thirdparty==1?'_blank':'_self'}">${navlinks.linkName}${navlinks.thirdparty==1?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':''}</a>
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