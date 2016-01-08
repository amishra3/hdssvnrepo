<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<div class="resources-section">
	<div class="resources-container container-fluid">
	
		<c:if test="${not empty properties.sectiontitle}">
			<div class="resources-title hidden-xs">${properties.sectiontitle}</div>
		</c:if>
	
		<div class="row row-no-margin">
			<cq:include path="columnresourcecontentpar" resourceType="hdscorp/components/content/column-control" />
		</div>
	
	
		<!-- row start -->
		<div class="row row-reduce-half">
			<cq:include path="resourctatpar" resourceType="hdscorp/components/content/column-control" />
		</div>
		<!-- row end -->
	</div>
</div>