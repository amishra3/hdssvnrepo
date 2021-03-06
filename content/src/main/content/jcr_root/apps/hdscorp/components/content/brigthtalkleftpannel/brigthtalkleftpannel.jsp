
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>
<sling:adaptTo adaptable="${resource}"
	adaptTo="com.hdscorp.cms.slingmodels.BrightTalkLeftNavModel"
	var="brightTalkLeftNavModel" />


<c:set var="featuredfilterlabel" value="${properties.featuredfilterlabel}"/>
<c:if test="${empty featuredfilterlabel}">
	<c:set var="featuredfilterlabel" value="All Webcasts"/>
</c:if>


<ul>
    		<li class="active"><a data-catagory="All Webcast"
				title="Featured" href="javascript:void(0);" class="active webcast-cat">${featuredfilterlabel}<span
					class="icon-accordion-closed hidden-md hidden-lg"></span><span
					class="icon-accordion-opened hidden-md hidden-lg"></span></a>
			<div class="MobileHolderWrapper"></div></li>

	<c:forEach items="${brightTalkLeftNavModel.featuredTag}"
		var="featuredTag">
		<c:forEach items="${featuredTag}" var="featureTag">
			<c:forEach items="${featureTag.value}" var="tagResults"
				varStatus="tagStatus">
				<c:choose>
					<c:when test="${tagStatus.index== 0}">
						<c:set var='tagslist' value='${tagResults.title}' />
						<c:set var='tagsNamelist' value='${tagResults.tagName}' />
					</c:when>
					<c:otherwise>
						<c:set var='tagslist' value='${tagslist},${tagResults.title}' />
						<c:set var='tagsNamelist'
							value='${tagsNamelist},${tagResults.tagName}' />
					</c:otherwise>
				</c:choose>
			</c:forEach>
			<li><a data-catagory="<c:out value='${tagslist}' />"
				title="${eventTag.key}" href="javascript:void(0);" class="webcast-cat">${featureTag.key}<span
					class="icon-accordion-closed hidden-md hidden-lg"></span><span
					class="icon-accordion-opened hidden-md hidden-lg"></span></a>
			<div class="MobileHolderWrapper"></div></li>

		</c:forEach>
	</c:forEach>

</ul>