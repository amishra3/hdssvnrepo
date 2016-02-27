<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>


<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.PartnersContentModel" var="partnersContentModel" />

<c:forEach var="partner" items="${partnersContentModel.partners}" varStatus="loopcnt">

<h3>${partner.partnerTitle}</h3>
<p>${partner.partnerDescription}</p>
<p>${partner.partnerIconImageAltText}</p>
<p>${partner.partnerBackgroundImagePath}</p>
<p>${partner.partnerIconImagePath}</p>
	<c:forEach items="${partner.partnerTags}" var="partnerTag">
		<p>${partnerTag}</p>	
	</c:forEach>
</c:forEach> 
