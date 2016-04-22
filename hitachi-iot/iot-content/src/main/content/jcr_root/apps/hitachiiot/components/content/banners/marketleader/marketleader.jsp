<%--
  Market Leader component.
--%>

<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>

<c:set var="linkUrl" value="${properties.aboutusbuttonurl}" />
<c:set var="videoid" value="${properties.videoid}" />
<c:set var="hideVideo" value="${properties.hidevideo}" />

    <c:if test="${fn:startsWith(linkUrl,'/content')}">
        <c:set var="linkUrl" value="${hdscorp:shortURL(linkUrl)}" />
    </c:if>
<c:set var="vidurl" value="openvideooverlayById(${videoid});"/>
<div class="market-leader clearfix">
	<div class="market-leader-container content-container">
		<div class="market-leader-image col-sm-6 col-sm-push-6 col-md-5 col-md-push-7" style="background-image: url(${properties.videothumbnailimgpath}); background-position: 50% 50%; background-repeat: no-repeat;">
			
			<c:if test="${not empty properties.videoiconpath}">
			<a href="javascript:void(0);"  class="btn-play-video" onclick="${vidurl}"><img src="${properties.videoiconpath}"></a>
	        </c:if>	
		</div>
		<div class="market-leader-content col-sm-6 col-sm-pull-6 col-md-7 col-md-pull-5">
			<h1>${properties.title}</h1>
			${properties.description}
			<c:if test="${not empty properties.aboutusbuttonlabel}">
			<a href="${linkUrl}" class="btn-square-red">${properties.aboutusbuttonlabel}</a>
			</c:if>
		</div>
		
	</div>
</div>





