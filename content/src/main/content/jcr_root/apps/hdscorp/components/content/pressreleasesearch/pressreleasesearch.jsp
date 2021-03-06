<%@page import="com.day.cq.wcm.api.Page"%>
<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>

<c:set var="loadMoreLabel" value="${properties.loadMoreLabel}"
	scope="request" />
<c:set var="readMoreText" value="${properties.readMoreText}"
	scope="request" />
<c:set var="newsPath" value="${properties.newsPath}" scope="request" />
<c:set var="searchType" value="${properties.searchType}" scope="request" />
<c:set var="noofItemsShown" value="${properties.noofItemsShown}"
	scope="request" />



<sling:adaptTo adaptable="${slingRequest}"
	adaptTo="com.hdscorp.cms.slingmodels.PressReleasesSearchModel"
	var="model" />
<c:set var="resultSize" value="${fn:length(model.newsList)}" />
<c:set var="noResultMessage" value="No results found." />
<c:set var="itemsVisibleonLoad" value="5" />
<c:if test="${not empty properties.noResultMessage}">
	<c:set var="noResultMessage" value="${properties.noResultMessage}" />
</c:if>

<c:if test="${not empty properties.itemsVisibleonLoad}">
	<c:set var="itemsVisibleonLoad"
		value="${properties.itemsVisibleonLoad}" />
</c:if>

<div class="load-pr-archives-list">
     <c:forEach var="news" items="${model.newsList}" varStatus="loopcnt">
            <div class="pr">
                <c:if test="${searchType == 'awards'}">
                    <div class="award-logo">
                        <img src="${news.imgpath}" alt="${news.imageAlt}" />
                    </div>
                </c:if>
                <div class="pr-content">
                    <div class="pr-date">${news.newsDate}</div>
                    <h3>${news.newsTitle}</h3>
                    <c:if test="${not empty news.newsDetailPath}">
                        <a href="${news.newsDetailPath}" class="animateLink" target="${news.openInNewTab?'_blank':'_self'}">${model.readMoreText}
                            ${news.newWinIcon?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':'<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span>'}
                        </a>
                    </c:if>
                </div>
            </div>
        </c:forEach>
</div>