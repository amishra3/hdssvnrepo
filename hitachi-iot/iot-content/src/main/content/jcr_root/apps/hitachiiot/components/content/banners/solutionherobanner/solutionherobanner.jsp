<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@ taglib prefix="wcmmode" uri="http://www.adobe.com/consulting/acs-aem-commons/wcmmode" %>
<%@ taglib prefix="wcm" uri="http://www.adobe.com/consulting/acs-aem-commons/wcm" %>

<c:set var="bannerbackgroundstyle" value="${hdscorp:bgImgAtrr(properties.bannerbackgroundimage,properties.bannerbackgroundmobileimage)}" />
<c:set var="videoid" value="${properties.videoId}" />
<c:set var="vidurl" value="hds.resourceLib._openvideooverlayById(${videoid});"/>
<c:choose>
<c:when test="${not empty properties.solutiontitlecontent}">
<div class="hero-solutions clearfix rsImg" style="background-color: purple;" ${bannerbackgroundstyle}>
    <div class="col-lg-8 col-md-8 col-xs-12 col-no-pad">
        <h1>${properties.solutiontitlecontent}</h1>
        <h4 class="sub-headline">${properties.solutionsubtitlecontent}</h4>
        <div class="video-play hidden-lg hidden-md">
            <a href="javascript:void(0);" class="btn-play-video" onclick="${vidurl}"> <span class="sprite video-play-small"></span> <img src="${properties.videopathurl}"></a>
        </div>
    </div>
    <div class="col-lg-4 col-md-4 col-xs-12 hidden-xs hidden-sm">
        <div class="video-play-desktop">
            <a href="javascript:void(0);" class="btn-play-video" onclick="${vidurl}">
                <img src="${properties.videopathurl}">
            </a>
        </div>
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
