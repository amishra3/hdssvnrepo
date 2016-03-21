<%@include file="/apps/foundation/global.jsp"%>

<div class="contentarea">
	<c:if test="${pageProperties.personalizationEnabled}">
		<cq:include path="clientcontext" resourceType="cq/personalization/components/clientcontext" />
	</c:if>

	<cq:include path="signup" resourceType="foundation/components/parsys" />
	
	<cq:include path="resourcelibrary" resourceType="hdscorp/components/content/resourcelibrary" />
	
	<cq:include path="par" resourceType="foundation/components/parsys" />
</div>