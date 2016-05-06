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
<div class="iot-solutions-hero common-hero-banner clearfix rsImg" ${bannerbackgroundstyle} >
	<div class="common-hero-banner-container">
	    <div class="col-lg-7 col-md-7 col-xs-12">
    	    <h1 class="headline">${properties.solutiontitlecontent}</h1>
	        <h3>${properties.solutionsubtitlecontent}</h3>
	        ${properties.description}
	        <c:if test="${not empty properties.videopathurl}">
        <div class="video-play hidden-lg hidden-md">
            <a href="javascript:void(0);" class="btn-play-video" onclick="${vidurl}"> <img src="${properties.videopathurl}"></a>
        </div>
        </c:if>
	    </div>
    	<c:if test="${not empty properties.videopathurl}">
        <div class="col-lg-5 col-md-5 col-xs-12 hidden-xs hidden-sm video-section">
        <div class="video-play-desktop">
            <a href="javascript:void(0);" class="btn-play-video" onclick="${vidurl}">
                <img src="${properties.videopathurl}">
            </a>
        </div>
    </div>
    </c:if>
	</div>
</div>
</c:when>
<c:otherwise>
	<wcmmode:edit>
		<p>
			<span class="cq-text-placeholder-ipe">Configure Solutions Hero Banner Component</span>
		</p>
	</wcmmode:edit>
</c:otherwise>
</c:choose>


