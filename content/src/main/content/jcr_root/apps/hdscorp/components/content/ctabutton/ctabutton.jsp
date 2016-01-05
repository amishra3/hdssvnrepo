<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>

<c:set var="linkUrl" value="${properties.ctatargeturl}"/>
<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>"/>
</c:if>

<c:set var="editbarstyle" value="" />
<wcmmode:edit>
	<c:set var="editbarstyle" value="style='overflow:auto;'" />
</wcmmode:edit>

<div class="col-sm-6 col-no-pad ${editbarstyle}">
	<div class="resources-all cs-selection-box">
		<a href="${linkUrl}">${properties.ctalabel}
			<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
		</a>
	</div>
</div>