<%--
  Market Leader component.
--%>

<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>

<c:set var="linkUrl" value="${properties.aboutusbuttonurl}" />
<c:set var="videoid" value="${properties.videoid}" />


    <c:if test="${fn:startsWith(linkUrl,'/content')}">
        <c:set var="linkUrl" value="${hdscorp:shortURL(linkUrl)}" />
    </c:if>
<c:set var="vidurl" value="openvideooverlayById(${videoid});"/>
<div class="home-page market-leader clearfix">
	<div class="market-leader-container content-container">
        <div class="market-leader-image col-lg-4 col-sm-12 col-md-4 col-md-push-8" style="background-image: url(${properties.videothumbnailimgpath}); background-position: 50% 50%; background-repeat: no-repeat">
			<c:if test="${not empty properties.videoiconpath}">
				<a href="javascript:void(0);" class="btn-play-video" onclick="${vidurl}">
                    <span class="market-leader-image-helper"></span>
                    <img src="${properties.videoiconpath}">
        	    </a>
		    </c:if>	
		</div>
		<div class="market-leader-content col-lg-8 col-sm-12 col-md-8 col-md-pull-4">
			<h2>${properties.title}</h2>
			${properties.description}
			<c:if test="${not empty linkUrl}">
			<a href="${linkUrl}" class="btn-square-red" target="${properties.aboutusbuttonlabeltargettype==true?'_blank':'_self'}">${properties.aboutusbuttonlabel}${properties.aboutusbuttonlabeltargettype?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':''}</a>
			</c:if>
		</div>
		
		
	</div>
</div>

