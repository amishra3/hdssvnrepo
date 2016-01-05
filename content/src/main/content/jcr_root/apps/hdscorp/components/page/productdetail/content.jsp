<%@include file="/apps/foundation/global.jsp"%>

<script src="https://use.typekit.net/bza1awk.js"></script>
<script>try{Typekit.load({ async: true });}catch(e){}</script>


<div class="contentarea">

	<c:if test="${pageProperties.personalizationEnabled}">
	
		<cq:include path="clientcontext"
			resourceType="cq/personalization/components/clientcontext" />
	
	</c:if>
	

	<cq:include path="par" resourceType="foundation/components/parsys" />

</div>