<%@page import="com.day.cq.wcm.api.Page"%>
<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>


<sling:adaptTo adaptable="${slingRequest}"
	adaptTo="com.hdscorp.cms.slingmodels.PressReleaseModel" var="model" />


<div class="col-md-9 pr-archives-list">
	<div class="pr-archives-list-items">
		<c:forEach var="news" items="${model.newsList}" varStatus="loopcnt">

			<div class="pr">
				<div class="pr-date">${news.newsDate}</div>
				<h3>${news.newsTitle}</h3>
				<a href="${news.newsDetailPath}" class="animateLink">${model.readPressReleaseText}<span
					aria-hidden="true"
					class="glyphicon glyphicon-menu-right animateIcon"></span>
				</a>
			</div>
		</c:forEach>
	</div>
	<div class="pr-load-more">
		<div class="learn-more-red-link">
			<a href="javascript:void(0);">${model.loadMoreLabel}</a>
		</div>
	</div>
</div>




