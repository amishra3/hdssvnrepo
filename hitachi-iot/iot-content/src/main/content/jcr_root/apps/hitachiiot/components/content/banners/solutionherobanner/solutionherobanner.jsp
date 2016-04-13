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
<div class = "rsImg" ${bannerbackgroundstyle}> 	
	<div>
		<h1>${properties.solutiontitlecontent}</h1>
		<h3>${properties.solutionsubtitlecontent}</h3>
		<c:if test="${not empty properties.videoId}">
			<a href="javascript:void(0);" class="btn-play-video" onclick="${vidurl}"><img src="${properties.videopathurl}" /></a>
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