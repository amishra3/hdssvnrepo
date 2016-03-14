<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>


<c:if test="${empty properties.hidetile}">

	<c:set var="serviceObj" value="${requestScope['serviceObj']}" />
	<c:set var="linkUrl" value="${serviceObj.categoryPath}" />
	<c:set var="seealllinklabel" value="${requestScope['seealllinklabel']}" />
	<c:set var="loopindex" value="${requestScope['loopindex']}" />
	
	
	
	<c:if test="${fn:startsWith(linkUrl,'/content/')}">
		<c:set var="linkUrl" value="${hdscorp:shortURL(linkUrl)}" />
	</c:if>



	<div class="col-sm-4 col-centered">
		<div class="section-service-col">
			<div class="imageHolder">
				<img src="${properties.categoryiconpath}" alt="${serviceObj.categoryTitle}">
			</div>
			<h3 class="headline">
				<a href="${linkUrl}" class="animateLink">${serviceObj.categoryTitle}<span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a>
			</h3>
			<p>${properties.categorysubtitle}</p>
		</div>
	</div>
</c:if>