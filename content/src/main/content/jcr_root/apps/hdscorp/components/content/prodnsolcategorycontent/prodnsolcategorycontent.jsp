<%@page import="com.day.cq.wcm.api.Page"%>
<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%-- <%@ include file="service.jsp" %> --%>

<sling:adaptTo adaptable="${slingRequest}" adaptTo="com.hdscorp.cms.slingmodels.ProdnSolCategoryLandingModel" var="model" />


	<c:forEach var="product" items="${model.products}" varStatus="loopcnt">
		<c:set var="productTitle" value="${product.productTitle}" />
		<c:set var="productInitialChar" value="${fn:substring(productTitle, 0,1)}" />
		<c:set var="productTags" value="${product.productTags}" />
		<c:if test="${not empty  productTags}">
			<c:set var="productTags" value="${fn:join(productTags, ',')}" />
		</c:if>
		
		
		<div class="product" data-sort="${productInitialChar}" data-alpha="${productInitialChar}"
		data-category="${productTags}">
			<h3><a href="${product.productPath}" class="filterText">${product.productTitle}</a></h3>
			<div class="deafultdesc">
		    	${product.productDescription}
		    </div>
		    
		    <%// IF there is no selector, dont include this as the defaul one would be showed %>
		    <%// Mark the description which belongs to parent category, if available %>
		    
		    <c:forEach var="descriptionObj" items="${product.descriptionList}" varStatus="descloopcnt">
		    	<div class="catdesc hidden" data-desctag="${fn:join(descriptionObj.categoryTag, ',')}">
		    		${descriptionObj.description}
		    	</div>
			</c:forEach>
		    
		    <a href="${product.productPath}" class="animateLink">${properties.viewproductlabel} <span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a>
		 </div>
	</c:forEach>
