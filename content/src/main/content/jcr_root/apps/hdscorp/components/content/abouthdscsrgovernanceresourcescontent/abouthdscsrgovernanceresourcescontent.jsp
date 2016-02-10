<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<div class="resources-section csr-governance-resource">
        <div class="resources-container container-fluid">
	
		<c:if test="${not empty properties.sectiontitle}">
			<div class="resources-title">${properties.sectiontitle}</div>
		</c:if>
	
			
		<!-- row start -->
		<div class="row row-reduce-half">
			<cq:include path="resourctatpar" resourceType="hdscorp/components/content/column-control" />
		</div>
		<!-- row end -->
	</div>
</div>