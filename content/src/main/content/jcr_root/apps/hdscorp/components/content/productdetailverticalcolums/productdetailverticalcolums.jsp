<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>


<div class="row">
	<div class="col-sm-4">
		<div class="resources-category">
			<div class="resources-category-heading">${properties.columntitle}</div>
			
			<c:set var="contentColumns" value="<%=PageUtils.convertMultiWidgetToList(properties,"contenticonpath-contenttitle-columncontent-seemorelabel-seemoretargeturl-contenticonpathalttext")%>" />
					<c:forEach var="column" items="${contentColumns}" varStatus="loop">
						<c:set var="linkUrl" value="${column.seemoretargeturl}"/>
						<c:if test="${fn:startsWith(linkUrl,'/content/')}">
							<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>"/>
						</c:if>	
						<div class="resources-category-box">
	                      <div class="resources-category-icon">
							<img src="${column.contenticonpath}" alt="${column.contenticonpathalttext}" title="${column.contenttitle}"/>
	                      </div>
	                      <div class="resources-category-title">${column.contenttitle}</div>
	                      <div class="resources-category-description">${column.columncontent}</div>
	                      <div class="resources-category-more">
						  		<a class="animateLink" target="_blank" href="${linkUrl}">${column.seemorelabel} <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a>
	                      </div>
	                    </div>
					</c:forEach>
		</div>	
	</div>
</div>

