<%--
	This component displays the copyright and corporate links.
--%>

<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>

<c:set var="footerLinks" value="<%=properties.get("footer")%>" />
<c:set var="copyrighttext" value="<%=properties.get("copyrighttext")%>" />
<c:set var="domain" value="" />
<c:set var="port" value="<%= request.getServerPort() %>" />
<c:if test="${empty port || port == 80}">
<c:set var="domain" value="<%= pageProperties.getInherited("domain", "") %>" />
</c:if>
<c:choose>
	<c:when test="${not empty footerLinks}">
		<c:set var="corporateFooterLinks" value="<%=PageUtils.convertMultiWidgetToList(properties,"urlLabel-pageUrl")%>" />
		<li>
			<a href="#">&copy; ${copyrighttext}</a>
        </li>
		<c:forEach var="link" items="${corporateFooterLinks}" varStatus="loop">
			<ul class="copyright-links">				
				<c:set var="linkUrl" value="${link.pageUrl}" />
				<c:choose>
					<c:when test="${fn:startsWith(linkUrl,'/content/')}">
						   <c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>"/>
					</c:when>
					<c:otherwise>
						   <c:set var="linkUrl" value="${linkUrl}"/>
					</c:otherwise>
				</c:choose>
				<li>
					<a href="${fn:contains(linkUrl, 'http')?'':domain}${linkUrl}">${link.urlLabel}</a>
				</li>
			</ul>					
		</c:forEach>
	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure Footer Corporate Links Component</span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>