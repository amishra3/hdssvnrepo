<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@ taglib prefix="wcmmode" uri="http://www.adobe.com/consulting/acs-aem-commons/wcmmode" %>
<%@ taglib prefix="wcm" uri="http://www.adobe.com/consulting/acs-aem-commons/wcm" %>

<c:set var="imageallignment" value="<%=properties.get("imageallignment")%>"/>
<c:set var="textallignment" value="<%=properties.get("textallignment")%>" />
<c:set var="greybackground" value="<%=properties.get("greybackground")%>" />

<c:choose>
<c:when test="${not empty properties.headlinecontent}">

<div class="solutions-page market-leader clearfix">
	<div class="market-leader-container content-container">
		<div class="market-leader-image col-lg-6  col-sm-12 ">
			<a href="javascript:void(0);" class="btn-play-video">
				<img src="${properties.infographicimage}" alt="">
				<img src="${properties.infographiciconpath}" alt="expand image" class="expand-box ">
			</a>
		</div>
		<div class="market-leader-content col-lg-6 col-sm-12 ">
			<h1>${properties.headlinecontent}</h1>
			 ${properties.descriptioncontent}
			<a href="${properties.buttonurl}" class="btn-square-red">${properties.buttonlabel}</a>
		</div>

		<div class="solutions-overlay" style="display: none;">
			<div class="common-hero-banner  clearfix col-md-12">
				<div class="common-hero-banner-container ">
						<a class="close-hero" href="javascript:void(0);" ><span class="sprite icon-close-hero"></span></a>
						 <img src="${properties.infographicimage}" alt="">
				</div>
			</div>
		</div>
	</div>
</div>

</c:when>
<c:otherwise>
	<wcmmode:edit>
		<p>
			<span class="cq-text-placeholder-ipe">Configure Infographic Headline Component</span>
		</p>
	</wcmmode:edit>
</c:otherwise>
</c:choose>




