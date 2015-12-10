<%--
  Homepage Hero Banner component.
--%>

<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:set var="buttonUrl" value="${properties.simplebannerbuttonurl}" />

<c:if test="${fn:startsWith(buttonUrl,'/content/')}">
	<c:set var="buttonUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("buttonUrl").toString())%>" />
</c:if>

<c:set var="linkUrl" value="${properties.simplebannerlinkurl}" />

<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>" />
</c:if>


<c:choose>
	<c:when test="${not empty properties.simplebannertitle}">
		<div class="hero-product-solutions overview clearfix" style="background-image:url('${properties.simplebannermagePath}');">
			<div class="hero-product-solutions-container ${properties.simplebannercontentalign?'floatright':''}">
				<h2 class="headline">${properties.simplebannertitle}</h2>
				<h3>${properties.simplebannersubtitle}</h3>
				<h4 class="sub-headline"><cq:text property="simplebannercontent" placeholder="click here to set text" /></h4>
		
				<c:if test="${not empty properties.simpllebannerbuttonlabel}">
					<div class="btn-square-white request">
						<a href="${buttonUrl}" target="${properties.simplebannerurltargettype?'_blank':'_self'}">
							${properties.simpllebannerbuttonlabel}
						</a>
					</div>
				</c:if>
				<c:if test="${not empty properties.simpllebannerlinklabel}">
					<div class="buy-through">
						<a href="${linkUrl}" target="${properties.simplebannerlinkurltargettype?'_blank':'_self'}">${properties.simpllebannerlinklabel} <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>
					</div>
				</c:if>
			</div>
		</div>
	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure SIMPLE HERO
					BANNER </span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>
