<%--
  Market Leader component.
--%>

<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>

<c:set var="linkUrl" value="${properties.marketLeaderButtonurl}" />

    <c:if test="${fn:startsWith(linkUrl,'/content')}">
        <c:set var="linkUrl" value="${hdscorp:shortURL(linkUrl)}" />
    </c:if>

<div class="market-leader clearfix">
	<div class="market-leader-container content-container">
		<div class="market-leader-image col-sm-6 col-sm-push-6 col-md-5 col-md-push-7">
			<a href="javascript:void(0);" class="btn-play-video"><img src="images/play-button.png"></a>
		</div>
		<div class="market-leader-content col-sm-6 col-sm-pull-6 col-md-7 col-md-pull-5">
			<h1>Hitachi an IoT Market Leader</h1>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat magna aliqua. Ut enim ad minim veniam, quis nostrud.
				Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
			<p>
				Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
			</p>
			<a href="#" class="btn-square-red">Corporate Info CTA</a>
		</div>
		<div class="common-hero-banner video clearfix col-md-12">
			<div class="common-hero-banner-container">
					<a class="close-hero" href="javascript:void(0);"><span class="sprite icon-close"></span></a>
					 <iframe width="560" height="315" src="https://www.youtube.com/embed/7M7HOR0eU9I" frameborder="0" allowfullscreen=""></iframe>
			</div>
		</div>
	</div>
</div>