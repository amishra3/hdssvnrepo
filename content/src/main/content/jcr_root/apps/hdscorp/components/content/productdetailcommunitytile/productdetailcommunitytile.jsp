<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>

<c:set var="articleurl" value="${properties.articleurl}" />
<c:if test="${fn:startsWith(articleurl,'/content/')}">
	<c:set var="articleurl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("articleurl").toString())%>" />
</c:if>

<div class="col-sm-6">
	<div class="hds-community-blog blog-left" style="background-image: url('${properties.communitybannermagePath}');">
		<div class="hds-community-blog-content">
			<div class="hds-community-blog-title">${properties.columntitle}</div>
			<div class="hds-community-blog-description">${properties.columncontent}</div>
			<div class="hds-community-blog-more">
				<a class="animateLink" href="${articleurl}" target="${properties.articleurlopeninnew?'_blank':'_self'}">${properties.articleurllabel} <span
					class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a>
			</div>
		</div>
	</div>
</div>