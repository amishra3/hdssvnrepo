<%@include file="/apps/foundation/global.jsp"%>

	<script src="https://use.typekit.net/bza1awk.js"></script>
	<script>try{Typekit.load({ async: true });}catch(e){}</script>


	<c:set var="editbarstyle" value="" />
	<wcmmode:edit>
		<c:set var="editbarstyle" value="style='overflow:auto;'" />
	</wcmmode:edit>
	
	<div ${editbarstyle}>
		<cq:include path="herobannerpar" resourceType="hdscorp/components/content/banners/homeherobanner" />
		
	</div>
	
	<div ${editbarstyle}>	
		<cq:include path="secondarybannerpar" resourceType="hdscorp/components/content/banners/homepagesecondarybanner" />
		
	</div>
	
	<div ${editbarstyle}>
		<cq:include path="hexsecondarybannerpar" resourceType="hdscorp/components/content/banners/hexagonbanner" />
		
	</div>
	
	<div ${editbarstyle}>
		<cq:include path="simplebannerpar" resourceType="hdscorp/components/content/banners/homesimplebanner" />
	</div>
	
	<!-- CONTACT US PROMO STARTS Here-->
		
		
	<!-- CONTACT US PROMO ENDS Here-->
		
	<c:if test="${pageProperties.personalizationEnabled}">
		<cq:include path="clientcontext" resourceType="cq/personalization/components/clientcontext" />
	</c:if>
	
	<cq:include path="par" resourceType="foundation/components/parsys" />
