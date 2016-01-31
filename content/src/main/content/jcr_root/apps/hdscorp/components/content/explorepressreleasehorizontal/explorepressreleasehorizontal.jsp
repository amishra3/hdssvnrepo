<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>

<%@page import="com.hdscorp.cms.slingmodels.ExplorePressReleaseContentModel"%>

<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.ExplorePressReleaseContentModel" var="explorePressReleaseContentModel" />


<c:set var="contentTypeLabel" value="${properties.contentTypeLabel}" />
<c:set var="presreleaseurllabel" value="${properties.presreleaseurllabel}" />
<c:set var="contentTypeIcon" value="${properties.contentTypeIcon}" />

<c:if test="${empty contentTypeLabel}">
	<c:set var="contentTypeLabel" value="Press Release" />
</c:if>

<c:if test="${empty presreleaseurllabel}">
	<c:set var="presreleaseurllabel" value="Read More" />
</c:if>

<c:if test="${empty contentTypeIcon}">
	<c:set var="contentTypeIcon" value="/etc/clientlibs/hdscorp/main/images/icon-content-type.png" />
</c:if>


<c:forEach var="pressRelease" items="${explorePressReleaseContentModel.pressReleases}" varStatus="loopcnt">
				
	<div class="pr-common-box hidden-xs hidden-sm">
	    <div class="icon">
	        <img title="" alt="" src="${contentTypeIcon}">
	    </div>
	    <div class="type">${contentTypeLabel}, ${pressRelease.pubDate}</div>
	    <div class="description">${pressRelease.title}</div>
	    <div class="read-more">
	        <a href="${pressRelease.link}" target="${not empty properties.urltargettype?'_blank':'_self'}" class="animateLink">${presreleaseurllabel} <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a>
	    </div>
	</div>

</c:forEach>

