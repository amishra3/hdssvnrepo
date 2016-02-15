<%@page import="com.day.cq.wcm.api.Page"%>
<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>

<c:set var="loadMoreLabel" value="${properties.loadMoreLabel}" scope="request"/>
<c:set var="readMoreText" value="${properties.readMoreText}" scope="request"/>
<c:set var="newsPath" value="${properties.newsPath}" scope="request"/>
<c:set var="searchType" value="${properties.searchType}" scope="request"/>
<c:set var="noofItemsShown" value="${properties.noofItemsShown}" scope="request"/>



<sling:adaptTo adaptable="${slingRequest}" adaptTo="com.hdscorp.cms.slingmodels.PressReleasesSearchModel" var="model" />
<c:set var="resultSize" value="${fn:length(model.newsList)}"/>
<c:set var="noResultMessage" value="No results found."/>
<c:set var="itemsVisibleonLoad" value="5"/>
<c:if test="${not empty properties.noResultMessage}">
	<c:set var="noResultMessage" value="${properties.noResultMessage}"/>
</c:if>

<c:if test="${not empty properties.itemsVisibleonLoad}">
	<c:set var="itemsVisibleonLoad" value="${properties.itemsVisibleonLoad}"/>
</c:if>

<div class="col-md-9 pr-archives-list">
	<div class="pr-archives-list-items">
		<c:forEach var="news" items="${model.newsList}" varStatus="loopcnt">

			<div class="pr">
				<div class="pr-date">${news.newsDate}</div>
				<h3>${news.newsTitle}</h3>
				<a href="${news.newsDetailPath}" class="animateLink">${model.readMoreText}<span
					aria-hidden="true"
					class="glyphicon glyphicon-menu-right animateIcon"></span>
				</a>
			</div>
		</c:forEach>
	</div>
	<c:if test="${resultSize!=0 and resultSize > itemsVisibleonLoad}">
		<div class="pr-load-more">
			<div class="learn-more-red-link" id="loadMorePrBtn">
				<a href="javascript:void(0);">${model.loadMoreLabel}</a>
			</div>
		</div>
	</c:if>
	
	<c:if test="${resultSize==0}">
		<div class="no-matched-result" style="padding: 50px 0; text-align: center;">${noResultMessage}</div>	
	</c:if>
</div>




