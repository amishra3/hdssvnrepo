<%@include file="/apps/foundation/global.jsp"%>
<%
%><%@page session="false"%>
<%@page
	import="com.hdscorp.cms.util.PageUtils,java.util.List,com.hdscorp.cms.util.PageUtils,com.hdscorp.cms.constants.ServiceConstants,org.apache.sling.commons.json.JSONArray, org.apache.sling.commons.json.JSONObject"%>

<sling:adaptTo adaptable="${resource}"
	adaptTo="com.hdscorp.cms.slingmodels.TwitterFeedModel"
	var="twitterFeedModel" />
<c:set var="daysMessage" scope="request"
	value="${twitterFeedModel.twDaysMessage}" />
<c:set var="monthsmessage" scope="request"
	value="${twitterFeedModel.twMonthsMessage}" />
<c:set var="yearsmessage" scope="request"
	value="${twitterFeedModel.twYearsMessage}" />
<c:set var="weeksmessage" scope="request"
	value="${twitterFeedModel.twWeeksMessage}" />
<c:set var="hoursmessage" scope="request"
	value="${twitterFeedModel.twHoursMessage}" />
<c:set var="minituesmessage" scope="request"
	value="${twitterFeedModel.twMinsMessage}" />
<c:set var="agoMessage" scope="request"
	value="${twitterFeedModel.twAgoMessage}" />


<%

String str=PageUtils.getPropertyValue(resourceResolver,PageUtils.getPropertyValue(resourceResolver,"/apps/hdscorp/config/com.hdscorp.cms.scheduler.TwitterScheduler","twitter.storagePath"),ServiceConstants.TWITTER_SAVE_FEED_DATA_PROPERTY_NAME );
JSONArray jsonArray = new JSONArray(str);

pageContext.setAttribute("mylist",PageUtils.jsonArraytoList(jsonArray));

%>

<div class="stay-touch-hexagon clearfix"
	style="background-image: url('${twitterFeedModel.bGImagePath}');">
	<div class="content-container">
		<h2>${properties.twtitle}</h2>
	</div>
	<div class="stay-touch-hexagon-list twitter-feed">
		<div class="content-container">
			<div
				class="col-sm-10 col-sm-offset-1 col-no-pad hex-contain clearfix">

                    <c:forEach var="innerList" items="${mylist}">

	<c:choose>

		<c:when test="${fn:contains(innerList.timeDifference, 'day')}">
			<c:set var="propertyValue" value="${daysMessage}" />
		</c:when>
		<c:when test="${fn:contains(innerList.timeDifference, 'month')}">
			<c:set var="propertyValue" value="${monthsmessage}" />
		</c:when>
		<c:when test="${fn:contains(innerList.timeDifference, 'year')}">
			<c:set var="propertyValue" value="${yearsmessage}" />
		</c:when>
		<c:when test="${fn:contains(innerList.timeDifference, 'week')}">
			<c:set var="propertyValue" value="${weeksmessage}" />
		</c:when>
		<c:when test="${fn:contains(innerList.timeDifference, 'hour')}">
			<c:set var="propertyValue" value="${hoursmessage}" />
		</c:when>
		<c:when test="${fn:contains(innerList.timeDifference, 'min')}">
			<c:set var="propertyValue" value="${minituesmessage}" />
		</c:when>

		<c:otherwise>

		</c:otherwise>
	</c:choose>

	<c:set var="propertyValue" value="${propertyValue} ${agoMessage}" />                        

	<c:set var="twitterPostMsg" value="${innerList.twitterMessageText}" />

	<c:if test="${fn:contains(innerList.twitterMessageText, 'http')}">




		<c:set var="twitterPostUrl"
			value="${fn:substring(innerList.twitterMessageText,fn:indexOf(innerList.twitterMessageText, 'http'),fn:length(innerList.twitterMessageText))}" />

		<c:set var="twitterHrefLink"
			value='<a href="${twitterPostUrl}" target="_blank" >${twitterPostUrl}</a>' />



		<c:set var="twitterPostMsg"
			value="${fn:replace(innerList.twitterMessageText, twitterPostUrl, twitterHrefLink)}" />

		<c:set var="postedDate"
			value="${fn:substring(innerList.timeDifference,0,2)}" />

	</c:if>

	<div class="hexagon320">
		<div class="tweet-content">
			<div class="icon">
				<img src="${twitterFeedModel.iconPath}" alt="" title="">
			</div>
			<h4>${properties.twtwitterhandlelabel}</h4>
			<h4>${twitterPostMsg}</h4>

			<p>${postedDate} ${propertyValue}<p>
		</div>
	</div>

</c:forEach>

			</div>
		</div>
	</div>

	<cq:include path="sociallinksconfig"
		resourceType="/apps/hdscorp/components/content/sociallinksconfig" />
</div>













