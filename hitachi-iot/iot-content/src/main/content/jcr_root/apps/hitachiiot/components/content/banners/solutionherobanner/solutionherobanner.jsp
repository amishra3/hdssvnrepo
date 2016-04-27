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
<div class="hero-solutions clearfix rsImg" ${bannerbackgroundstyle}>
    <div class="col-lg-8 col-md-8 col-xs-12 col-no-pad">
        <h1>${properties.solutiontitlecontent}</h1>
        <h4 class="sub-headline">${properties.solutionsubtitlecontent}</h4>
        <c:if test="${not empty properties.videopathurl}">
        <div class="video-play hidden-lg hidden-md">
            <a href="javascript:void(0);" class="btn-play-video" onclick="${vidurl}"> <img src="${properties.videopathurl}"></a>
        </div>
        </c:if>
    </div>
   <c:if test="${not empty properties.videopathurl}">
    <div class="col-lg-4 col-md-4 col-xs-12 hidden-xs hidden-sm">
        <div class="video-play-desktop">
            <a href="javascript:void(0);" class="btn-play-video" onclick="${vidurl}">
                <img src="${properties.videopathurl}">
            </a>
        </div>
    </div>
    </c:if>
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


