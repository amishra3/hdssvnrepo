<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>

<c:set var="isEditMode" value="${false}" />
<wcmmode:edit>
	<c:set var="isEditMode" value="${true}" />
</wcmmode:edit>

<c:if test="${empty properties.hidetile or isEditMode}">

	<c:set var="serviceObj" value="${requestScope['serviceObj']}" />
	<c:set var="linkUrl" value="${serviceObj.categoryPath}" />
	<c:set var="seealllinklabel" value="${requestScope['seealllinklabel']}" />
	<c:set var="loopindex" value="${requestScope['loopindex']}" />
	
	
	
	<c:if test="${fn:startsWith(linkUrl,'/content/')}">
		<c:set var="linkUrl" value="${hdscorp:shortURL(linkUrl)}" />
	</c:if>



	<div class="col-sm-4 col-centered">
		<div class="section-service-col tile">
			<div class="imageHolder">
				<img src="${properties.categoryiconpath}" alt="${serviceObj.categoryTitle}">
			</div>
				        <h4 class="headline">${serviceObj.categoryTitle}</h4>
       					 <p>${properties.categorysubtitle}</p>
       					 <a href="${linkUrl}" class="animateLink">${seealllinklabel} <span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a>
		</div>
	</div>
</c:if>