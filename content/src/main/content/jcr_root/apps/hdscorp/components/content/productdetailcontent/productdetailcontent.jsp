<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<div class="fb-section">
<div class="fb-container container-fluid">
	<c:if test="${not empty properties.sectiontitle}">
		<div class="fb-title hidden-xs hidden-sm">${properties.sectiontitle}</div>
	</c:if>	
	
	<c:set var="containerclass" value=""/>


	<c:if test="${empty properties.sectiontitle}">
		<c:set var="containerclass" value="reduceTopPadding"/>
	</c:if>	



	<div class="fb-category-container ${properties.sectiondiv?'no-border-container':''}">
		<div class="fb-category-box ${containerclass}">
			<div class="fb-category-heading">${properties.contenttitle}</div>
			<div class="fb-category-highlight">${properties.contensubttitle}</div>
			<div class="row row-no-margin">
				<cq:include path="columncontentpar" resourceType="hdscorp/components/content/column-control" />
			</div>
		</div>
	</div>
</div>
</div>