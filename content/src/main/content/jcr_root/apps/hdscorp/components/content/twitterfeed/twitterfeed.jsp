<%@include file="/apps/foundation/global.jsp"%><%
%><%@page session="false" %>



<sling:adaptTo adaptable="${resource}"
	adaptTo="com.hdscorp.cms.slingmodels.TwitterFeedModel"
	var="twitterFeedModel" />


<div class="stay-touch-hexagon clearfix"
	style="background-image: url('${twitterFeedModel.bGImagePath}');">
	<div class="content-container">
		<h3>${properties.twtitle}</h3>
	</div>
	<div class="stay-touch-hexagon-list twitter-feed">
		<div class="content-container">
			<div
				class="col-sm-10 col-sm-offset-1 col-no-pad hex-contain clearfix">

                    <c:forEach var="innerList" items="${twitterFeedModel.twitterFeedData}">


	<c:choose>

		<c:when test="${fn:contains(innerList.timeDifference, 'day')}">
			<c:set var="propertyValue" value="${twitterFeedModel.twDaysMessage}" />
		</c:when>
		<c:when test="${fn:contains(innerList.timeDifference, 'month')}">
			<c:set var="propertyValue" value="${twitterFeedModel.twMonthsMessage}" />
		</c:when>
		<c:when test="${fn:contains(innerList.timeDifference, 'year')}">
			<c:set var="propertyValue" value="${twitterFeedModel.twYearsMessage}" />
		</c:when>
		<c:when test="${fn:contains(innerList.timeDifference, 'week')}">
			<c:set var="propertyValue" value="${twitterFeedModel.twWeeksMessage}" />
		</c:when>
		<c:when test="${fn:contains(innerList.timeDifference, 'hour')}">
			<c:set var="propertyValue" value="${twitterFeedModel.twHoursMessage}" />
		</c:when>
		<c:when test="${fn:contains(innerList.timeDifference, 'min')}">
			<c:set var="propertyValue" value="${twitterFeedModel.twMinsMessage}" />
		</c:when>

		<c:otherwise>

		</c:otherwise>
	</c:choose>

	<c:set var="propertyValue" value="${propertyValue} ${twitterFeedModel.twAgoMessage}" />                        

	<c:set var="twitterPostMsg" value="${innerList.twitterMessageText}" />




    <c:if test="${not empty innerList.twitterURL}">


        <c:set var="twitterhttpURL" value='<a href="${innerList.twitterURL}" target="_blank" >${innerList.twitterURL}</a>' />




		<c:set var="twitterPostMsg"
			value="${fn:replace(innerList.twitterMessageText, innerList.twitterURL, twitterhttpURL)}" />

		<c:set var="postedDate"
			value="${fn:substring(innerList.timeDifference,0,2)}" />

	</c:if>

	<div class="hexagon320">
		<div class="tweet-content">
			<div class="icon">
				<img src="${twitterFeedModel.iconPath}" alt="" title="">
			</div>
			
			<p>${twitterPostMsg}</p>

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

