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
<c:set var="vidurl" value="hds.resourceLib._openvideooverlayById(${videoid});"/>
<div class="market-leader clearfix">
	<div class="market-leader-container content-container">
		<div class="market-leader-image col-sm-6 col-sm-push-6 col-md-5 col-md-push-7" style="background-image: url(${properties.videothumbnailimgpath}); background-position: 50% 50%; background-repeat: no-repeat;">
			<a href="javascript:void(0);" onclick="${vidurl}" class="btn-play-video"><img src="${properties.videoiconpath}"></a>
		</div>
		<div class="market-leader-content col-sm-6 col-sm-pull-6 col-md-7 col-md-pull-5">
			<h1>${properties.title}</h1>
			${properties.description}
			<a href="${linkUrl}" class="btn-square-red">${properties.aboutusbuttonlabel}</a>
		</div>
		<div class="common-hero-banner video clearfix col-md-12">
			<div class="common-hero-banner-container">
					<a class="close-hero" href="javascript:void(0);"><span class="sprite icon-close"></span></a>
					 <iframe width="560" height="315" src="https://www.youtube.com/embed/7M7HOR0eU9I" frameborder="0" allowfullscreen=""></iframe>
			</div>
		</div>
	</div>
</div>



