<%@include file="/apps/foundation/global.jsp"%>
<%
	
%><%@page session="false"%>



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

				<c:forEach var="innerList"
					items="${twitterFeedModel.twitterFeedData}">


					<c:choose>

						<c:when test="${fn:contains(innerList.timeDifference, 'day')}">
							<c:set var="propertyValue"
								value="${twitterFeedModel.twDaysMessage}" />
						</c:when>
						<c:when test="${fn:contains(innerList.timeDifference, 'month')}">
							<c:set var="propertyValue"
								value="${twitterFeedModel.twMonthsMessage}" />
						</c:when>
						<c:when test="${fn:contains(innerList.timeDifference, 'year')}">
							<c:set var="propertyValue"
								value="${twitterFeedModel.twYearsMessage}" />
						</c:when>
						<c:when test="${fn:contains(innerList.timeDifference, 'week')}">
							<c:set var="propertyValue"
								value="${twitterFeedModel.twWeeksMessage}" />
						</c:when>
						<c:when test="${fn:contains(innerList.timeDifference, 'hour')}">
							<c:set var="propertyValue"
								value="${twitterFeedModel.twHoursMessage}" />
						</c:when>
						<c:when test="${fn:contains(innerList.timeDifference, 'min')}">
							<c:set var="propertyValue"
								value="${twitterFeedModel.twMinsMessage}" />
						</c:when>

						<c:otherwise>

						</c:otherwise>
					</c:choose>

					<c:set var="timeDifference"
							value="${fn:substring(innerList.timeDifference,0,2)}" />

                        <c:set var="timeDifference" value="${fn:replace(timeDifference,' ', '')}" />


                      <c:if test="${timeDifference=='1'}">
						<c:set var="propertyValue"
							value="${fn:substring(propertyValue,0,fn:length(propertyValue)-1)}" />

					</c:if>

					<c:set var="propertyValue"
						value="${propertyValue} ${twitterFeedModel.twAgoMessage}" />

					<c:set var="twitterPostMsg" value="${innerList.twitterMessageText}" />




					<c:if test="${not empty innerList.twitterURL}">
                      <c:set var="twitterURL" value="${fn:split(innerList.twitterURL, ',')}" />

<c:if test="${not empty twitterURL[0]}">

<c:set var="firsttwitterhttpURL" value='<a href="${twitterURL[0]}" target="_blank" >${twitterURL[0]}</a>' />


<c:set var="twitterPostMsg" value="${fn:replace(innerList.twitterMessageText, twitterURL[0], firsttwitterhttpURL)}" />

  </c:if>


<c:if test="${not empty twitterURL[1]}">

<c:set var="secondtwitterhttpURL" value='<a href="${twitterURL[1]}" target="_blank" >${twitterURL[1]}</a>' />


<c:set var="twitterPostMsg" value="${fn:replace(twitterPostMsg, twitterURL[1], secondtwitterhttpURL)}" />

  </c:if>

<c:if test="${not empty twitterURL[2]}">

<c:set var="thirdtwitterhttpURL" value='<a href="${twitterURL[2]}" target="_blank" >${twitterURL[2]}</a>' />


<c:set var="twitterPostMsg" value="${fn:replace(twitterPostMsg, twitterURL[2], thirdtwitterhttpURL)}" />

  </c:if>

 <c:if test="${not empty twitterURL[3]}">

<c:set var="thirdtwitterhttpURL" value='<a href="${twitterURL[3]}" target="_blank" >${twitterURL[3]}</a>' />


<c:set var="twitterPostMsg" value="${fn:replace(twitterPostMsg, twitterURL[3], thirdtwitterhttpURL)}" />

  </c:if>



    <c:set var="postedDate"
							value="${fn:substring(innerList.timeDifference,0,2)}" />

					</c:if>

					<div class="hexagon320">
						<div class="tweet-content">
							<div class="icon">
								<img src="${twitterFeedModel.iconPath}" alt="" title="">
							</div>
                       <c:choose>

						<c:when test="${not empty innerList.twitterHandle}">

                            <h4>${innerList.twitterHandle}</h4>
                      </c:when>

						<c:otherwise>
                     <h4>${twitterFeedModel.twdefaulttwitterhandlemessage}</h4>
						</c:otherwise>

                       </c:choose>

                            <p>${twitterPostMsg}</p>

							<p>${postedDate}${propertyValue}
							<p>
						</div>
					</div>

				</c:forEach>

			</div>
		</div>
	</div>

	<cq:include path="sociallinksconfig"
		resourceType="/apps/hdscorp/components/content/sociallinksconfig" />
</div>

