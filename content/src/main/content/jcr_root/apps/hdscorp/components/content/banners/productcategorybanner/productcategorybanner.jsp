<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:set var="linkUrl" value="${properties.simplebannerbuttonurl}" />

<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>" />
</c:if>

<c:set var="contentalignclass" value="${properties.contentalign?'floatright textrightalign':''}" />

<c:choose>
	<c:when test="${not empty properties.simplebannertitle}">

		<div class="hero-product-category server-rack clearfix" style="background-image: url('${properties.simplebannermagePath}');">
	              <div class="hero-product-solutions-container">
                      <div class="col-lg-6 col-md-6 col-xs-12 col-no-pad">
	                  <div class="product-category-heading">
	                  	  <c:if test="${not empty properties.categoryiconpath}">
	                      		<span class="icon ${contentalignclass}"><img src="${properties.categoryiconpath}"></span>
	                      </c:if>
	                      <c:if test="${not empty properties.categorytitle}">
	                      		<span class="text ${contentalignclass}">${properties.categorytitle}</span>
	                      </c:if>
	                  </div>
	                  <h1 class="headline ${contentalignclass}">${properties.simplebannertitle}</h1>
	                  <h3 class="${contentalignclass}">${properties.simplebannersubtitle}</h3>
	                  <h4 class="sub-headline ${contentalignclass}">${properties.simplebannercontent}</h4>
	                  <c:if test="${not empty properties.simpllebannerbuttonlabel}">
		                  <div class="btn-square-white learn-more-white-link ${contentalignclass}">
		                      <a href="${linkUrl}" target="${properties.simplebannerurltargettype?'_blank':'_self'}">${properties.simpllebannerbuttonlabel}</a>
		                  </div>
	                  </c:if>
					</div>
	              </div>
	      </div>
	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure Product Category Banner </span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>
