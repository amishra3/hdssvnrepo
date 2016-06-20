<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>

<c:set var="articleurl" value="${properties.articleurl}" />
<c:if test="${fn:startsWith(articleurl,'/content/')}">
	<c:set var="articleurl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("articleurl").toString())%>" />
</c:if>



<div class="col-sm-6 col-no-pad">
	<div class="product-box">
		<p class="product-copy-main">${properties.columntitle}</p>
		<p class="product-copy-sub">${properties.columncontent}</p>
		<p class="product-link">
            <c:if test="${not empty properties.articleurllabel}">
			<a class="animateLink" href="${articleurl}"	target="${properties.articleurlopeninnew?'_blank':'_self'}">${properties.articleurllabel}${properties.thirdparty?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}
			</a>
            </c:if> 
		</p>
	</div>
</div>