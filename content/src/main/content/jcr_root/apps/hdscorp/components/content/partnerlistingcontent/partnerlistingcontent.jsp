<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>

<c:set var="partnerfilterlist" value="${widgets:getMultiFieldPanelValues(resource, 'partnerfilterlist')}"/>
<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.PartnersContentModel" var="partnersContentModel" />


${properties.partnerfilterlabel}
<c:forEach items="${partnerfilterlist}" var="definition">
    <h1>${xss:encodeForHTML(xssAPI, definition['partnerfiltertitle'])}</h1>
    <h1s>${xss:encodeForHTML(xssAPI, definition['partnercategoryTag'])}</h1>
</c:forEach>

<h1>${properties.partnercattitle}</h1>
${properties.partnercaticonpath}

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

${properties.learnmorelinklabel}
${properties.learnmorelinkpath}


