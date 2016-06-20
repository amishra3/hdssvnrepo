<%@include file="/apps/foundation/global.jsp"%>

<c:set var="editbarstyle" value="" />
<wcmmode:edit>
	<c:set var="editbarstyle" value="style='overflow:auto;'" />
</wcmmode:edit>

<div class="contentarea">

	<c:if test="${pageProperties.personalizationEnabled}">
	
		<cq:include path="clientcontext" resourceType="cq/personalization/components/clientcontext" />
	
	</c:if>
	
	<cq:include path="pressrelease" resourceType="hdscorp/components/content/pressreleasedetail" />
	
</div>