<%--

  News Insights Big Tile Component component.

  This is news insights big tile component

--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="java.util.Map"%>
<%@page import=" org.apache.sling.api.resource.*,
 org.apache.sling.api.scripting.*,
 org.apache.sling.jcr.api.*,
 javax.jcr .*,
 java.lang.String.*,com.day.cq.wcm.api.*,org.apache.sling.api.resource.*"%>

 <%@page import="java.util.Date"%>

<c:if test="${properties.nveeventtype ne 'Blog'}">
	<c:set var="eventLandingURL" value="${requestScope['eventLandingURL']}" />
	
	<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.NewsVerticalExplorerModel" var="newsVerticalExplorer" />
	<c:if test="${properties.nveeventtype ne 'Event'}">
		<c:set var="linkUrl" value="${hdscorp:shortURL(newsVerticalExplorer.targetURL)}" />
	</c:if>
	
	<c:if test="${properties.nveeventtype eq 'Event'}">
		<c:set var="linkUrl" value="${eventLandingURL}#event-id=${newsVerticalExplorer.newsInsightExplorer.id}" />
	</c:if>
	
	
	<div class="pr-common-box hidden-xs">
		<div class="icon">
			<img src="${newsVerticalExplorer.iconImagePath}" alt="" title="">
		</div>
		<div class="type">${newsVerticalExplorer.iconImageLabel}
			${newsVerticalExplorer.newsInsightExplorer.pubDate}</div>
		<div class="description">${newsVerticalExplorer.newsInsightExplorer.title}</div>
		<div class="read-more">
			<c:choose>
				<c:when test="${newsVerticalExplorer.openinnewwindow}">
					<a href="${linkUrl}" target="_blank" class="animateLink">${newsVerticalExplorer.readMoreLabel}
						${properties.thirdparty?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}
					</a>
				</c:when>
				<c:otherwise>
					<a href="${linkUrl}" class="animateLink">${newsVerticalExplorer.readMoreLabel}
                        ${properties.thirdparty?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a>
				</c:otherwise>
			</c:choose>
		</div>
	</div>


</c:if>

<c:if test="${properties.nveeventtype eq 'Blog'}">

<!-- 	<cq:include path="resourctatpar" resourceType="hdscorp/components/content/newsinsightsbigtile" /> -->

</c:if>