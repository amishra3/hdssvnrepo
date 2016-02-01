<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@ page import="com.hdscorp.cms.slingmodels.SubCatContentModel"%>
<%@page import="com.hdscorp.cms.search.SearchServiceHelper"%>
<%@page import="com.day.cq.wcm.api.Page"%>
<%@page import="com.day.cq.search.result.SearchResult"%>
<%@page import="com.day.cq.search.result.Hit"%>
<%@page import="java.util.List"%>



<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.SubCatContentModel" var="subCatContentModel" /> 

<c:if test="${not empty properties.subcategorytitle}">
	<div class="category-heading hidden-xs hidden-sm">
		<h2>${properties.subcategorytitle}</h2>
	</div>
</c:if>

<c:if test="${not empty properties.subcategorytitle}">
	<div class="category-desc">
		<p>${properties.subcategorytitlesubtext}</p>
	</div>
</c:if>

<c:choose>
<c:when test="${not empty properties.subcatimagePath}">
	<c:set var="linkUrl" value="${properties.subcatbuttonurl}" />
	
	<c:if test="${fn:startsWith(linkUrl,'/content/')}">
		<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>"/>
	</c:if>
	
	
	<div class="category-promotion clearfix">
	     <div class="category-promo-img col-sm-5 hidden-xs ${not empty properties.subcatcontentalign?'floatright':''}">
	         <img src="${properties.subcatimagePath}" alt="" title="" class="img-responsive">
	     </div>
    </div>
</c:when>
<c:otherwise>
</c:otherwise>
</c:choose>		 

	     <div class="category-promo-desc col-sm-7">
	         <h2>${properties.subcategorybannertitle}</h2>
	         <p>${properties.subcategorybanneresubtext}</p>
			 
			 <c:if test="${not empty properties.subcatbuttonlabel}">
	         <div class="btn-square-red learn-more-red-link">
	             <a href="${linkUrl}" target="${not empty properties.subcatbuttonurltargettype?'_blank':'_self'}">${properties.subcatbuttonlabel}</a>
	         </div>
			 </c:if>
	     </div>


<div class="category-products-listing">
	<c:forEach var="product" items="${subCatContentModel.products}" varStatus="loopcnt">
	
		<div class="product">
		    <h3>${product.productTitle}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></h3>
		    ${product.productDescription}
		    <a href="${product.productPath}" class="animateLink">${properties.subcatproductviewlabel} <span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a>
		 </div>
	
	
	</c:forEach>
</div>
