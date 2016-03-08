<%--
  ==============================================================================

  corporatefooter component - This component displays the footer components.

  ==============================================================================
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
			<p class="links">
				<c:forEach var="link" items="${corporateFooterLinks}" varStatus="loop">
					<c:set var="linkUrl" value="${link.pageUrl}" />
					
					<c:choose>
   						<c:when test="${fn:startsWith(linkUrl,'/content/')}">
                               <c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>"/>
               			</c:when>
               			<c:otherwise>
                               <c:set var="linkUrl" value="${linkUrl}"/>
   						</c:otherwise>
					</c:choose>
               		<a href="${domain}${linkUrl}">${link.urlLabel}</a> <c:if test="${!loop.last}">|</c:if>
				</c:forEach>
			</p>					
	</c:when>
	<c:otherwise>
		<wcmmode:edit>
				<a>Please provide global footer links</a>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>

<p class="copyright">
	${copyrighttext}
</p>