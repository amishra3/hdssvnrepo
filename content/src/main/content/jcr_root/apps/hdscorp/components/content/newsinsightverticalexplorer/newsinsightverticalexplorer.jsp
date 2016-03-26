<%--

  News Insights Big Tile Component component.

  This is news insights big tile component

--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="java.util.Map"%>
<%@page
	import=" org.apache.sling.api.resource.*,
 org.apache.sling.api.scripting.*,
 org.apache.sling.jcr.api.*,
 javax.jcr .*,
 java.lang.String.*,com.day.cq.wcm.api.*,org.apache.sling.api.resource.*"%>

<%@page import="java.util.Date"%>

<sling:adaptTo adaptable="${resource}"
	adaptTo="com.hdscorp.cms.slingmodels.NewsInsightVerticalExplorerModel"
	var="newsInsightVerticalExplorer" />
<div class="news-insight-explore-spotlight"
	style="background-image: url('${newsInsightVerticalExplorer.backgroundImagePath}')">
	<div class="spotlight-mobile hidden-md hidden-lg"></div>
	<div class="spotlight-content">
		<div class="icon hidden-xs hidden-sm">
			<img src="${newsInsightVerticalExplorer.iconImagePath}" alt=""
				title="">
		</div>
		<div class="icon hidden-md hidden-lg">
			<img src="${properties.nibticonimagedevice}" alt="" title="">
		</div>
		<div class="type">${newsInsightVerticalExplorer.iconImageLabel}
			${newsInsightVerticalExplorer.newsInsightExplorerTop.pubDate}</div>
		<div class="spotlight-title">
			<a href="${newsInsightVerticalExplorer.targetURL}.html"
				class="animateLink">${newsInsightVerticalExplorer.newsInsightExplorerTop.title}<span
				aria-hidden="true"
				class="glyphicon glyphicon-menu-right animateIcon"></span></a>
		</div>
	</div>
</div>
<div class="news-insight-explore-spotlight spotlight-normal">
	<div class="spotlight-content">
		<div class="icon hidden-xs">
			<img src="${newsInsightVerticalExplorer.iconBottomImagePath}" alt=""
				title="">
		</div>
		<div class="icon hidden-sm hidden-md hidden-lg">
			<img src="${newsInsightVerticalExplorer.iconBottomImagePath}" alt=""
				title="">
		</div>
		<div class="type">${newsInsightVerticalExplorer.iconImageBottomLabel}
			${newsInsightVerticalExplorer.newsInsightExplorerBottom.pubDate}</div>
		<div class="spotlight-title">${newsInsightVerticalExplorer.newsInsightExplorerBottom.title}</div>
		<div class="read-more">
			<c:choose>
				<c:when test="${newsInsightVerticalExplorer.openinnewwindow}">
					<a href="${newsInsightVerticalExplorer.targetBottomURL}.html"
						target="_blank" class="animateLink">${newsInsightVerticalExplorer.readMoreBottomLabel}<span
						class="glyphicon glyphicon-menu-right animateIcon"
						aria-hidden="true"></span></a>
				</c:when>
				<c:otherwise>
					<a href="${newsInsightVerticalExplorer.targetBottomURL.html}"
						class="animateLink">${newsInsightVerticalExplorer.readMoreBottomLabel}<span
						class="glyphicon glyphicon-menu-right animateIcon"
						aria-hidden="true"></span></a>
				</c:otherwise>
			</c:choose>

		</div>

	</div>
</div>




