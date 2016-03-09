<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>
<sling:adaptTo adaptable="${resource}"
	adaptTo="com.hdscorp.cms.slingmodels.NewsInsightExplorerVerticalContainerModel"
	var="newsInsightContainerModel" />

<div class="news-insight-explore">
	<div class="content-container container-fluid">

		<c:forEach items="${newsInsightContainerModel.nivcList}" var="nivcMultifield" varStatus="multfieldStatus">
			<c:forEach items="${nivcMultifield}" var="nivcMultiObject" varStatus="multiStatus">
				<div class="col-sm-4">

					<c:set var="targetlink" value="${fn:substringBefore(nivcMultiObject.value, '$')}"/>
                    <c:set var="newwin" value="${fn:substringAfter(nivcMultiObject.value, '$')}"/>
					<c:if test="${fn:startsWith(targetlink,'/content/')}">
						<c:set var="targetlink" value="${hdscorp:shortURL(targetlink)}" />
					</c:if>
					<h2><a class="animateLink" href="${targetlink}" target="${newwin==1?'_blank':'_self'}">
						${nivcMultiObject.key}
							<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span>						
					</a></h2>
					<cq:include path="firstpar${multfieldStatus.count}" resourceType="/apps/hdscorp/components/content/newsinsightverticalexplorer" />
				</div>
			</c:forEach>

		</c:forEach>

	</div>
	<div class="orange-sep">&nbsp;</div>
</div>