<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@ taglib prefix="wcmmode" uri="http://www.adobe.com/consulting/acs-aem-commons/wcmmode" %>
<%@ taglib prefix="wcm" uri="http://www.adobe.com/consulting/acs-aem-commons/wcm" %>


<c:set var="buttonurl" value="${properties.buttonurl}" />
<c:if test="${fn:startsWith(buttonurl,'/content/')}">
	<c:set var="buttonurl" value="${hdscorp:shortURL(buttonurl)}" />
</c:if>
<c:choose>
<c:when test="${not empty properties.headlinecontent}">

<div class="solutions-page market-leader clearfix">
	<div class="market-leader-container content-container">
		<div class="market-leader-image col-lg-6 col-md-6 col-sm-12 ">
		<c:choose>
         <c:when test="${properties.displayinfographic}">
			<a href="javascript:void(0);" class="btn-play-video">
				<img src="${properties.infographicimage}" alt="">
				<img src="${properties.infographiciconpath}" alt="expand image" class="expand-box ">
			</a>
		 </c:when>
         <c:otherwise>
         <img src="${properties.infographicimage}" alt="">
         </c:otherwise>
        </c:choose>
		</div>
		<div class="market-leader-content col-lg-6 col-md-6 col-sm-12 ">
			<h2>${properties.headlinecontent}</h2>
			 ${properties.descriptioncontent}
			<a href="${buttonurl}" class="btn-square-red" target="${properties.buttontargettype==true?'_blank':'_self'}">${properties.buttonlabel}${properties.buttontargettype?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':''}</a>
		</div>
	</div>
</div>
 <c:if test="${properties.displayinfographic}">
<div class="solutions-overlay" style="display: none;">
	<div class="common-hero-banner clearfix col-md-12">
		<div class="common-hero-banner-container ">
		  <img src="${properties.infographicimage}" alt="">
			
		</div>
	</div>
	<a class="close-hero" href="javascript:void(0);" ><span class="sprite icon-close-hero"></span></a>
</div>
</c:if>


</c:when>
<c:otherwise>
	<wcmmode:edit>
		<p>
			<span class="cq-text-placeholder-ipe">Configure Infographic Headline Component</span>
		</p>
	</wcmmode:edit>
</c:otherwise>
</c:choose>


