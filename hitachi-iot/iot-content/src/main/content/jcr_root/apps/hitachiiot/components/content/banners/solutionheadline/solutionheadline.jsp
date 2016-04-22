<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@ taglib prefix="wcmmode" uri="http://www.adobe.com/consulting/acs-aem-commons/wcmmode" %>
<%@ taglib prefix="wcm" uri="http://www.adobe.com/consulting/acs-aem-commons/wcm" %>

<c:set var="bannerbackgroundstyle" value="${hdscorp:bgImgAtrr(properties.heroimagePath,properties.heromobileimage)}" />

<c:set var="videoid" value="${properties.videoId}" />
<c:set var="vidurl" value="openvideooverlayById(${videoid});"/>
<c:choose>
<c:when test="${not empty properties.solutiontitlecontent}">
<div class="accordion-section-hero content-container rsImg" ${bannerbackgroundstyle}>
		<div class="accordion-section-hero-image col-lg-4 col-sm-12 col-md-4 col-md-push-8" >
		<c:if test="${not empty properties.videopathurl}">
			<a href="javascript:void(0);" class="btn-play-video" onclick="${vidurl}"><img src="${properties.videopathurl}" /></a>
		</c:if>
			
		</div>
		<div class="accordion-section-hero-content col-lg-7 col-lg-offset-1 col-sm-12 col-md-7 col-md-offset-1 col-md-pull-4">
			<h1>${properties.solutiontitlecontent}</h1>
			${properties.solutionsubtitlecontent}
		</div>
		
	
	</div>
</c:when>
<c:otherwise>
	<wcmmode:edit>
		<p>
			<span class="cq-text-placeholder-ipe">Configure Solutions Headline Component</span>
		</p>
	</wcmmode:edit>
</c:otherwise>
</c:choose>


