<%@include file="/apps/foundation/global.jsp"%>


<div class="contentarea">

	<c:if test="${pageProperties.personalizationEnabled}">
	
		<cq:include path="clientcontext"
			resourceType="cq/personalization/components/clientcontext" />
	
	</c:if>
		
	<cq:include path="productdescriptions" resourceType="hdscorp/components/content/productdescription" />
	<cq:include path="par" resourceType="foundation/components/parsys" />

</div>