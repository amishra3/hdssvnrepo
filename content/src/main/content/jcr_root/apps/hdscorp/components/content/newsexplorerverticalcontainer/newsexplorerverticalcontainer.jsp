<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.NewsExplorerVerticalContainerModel" var="newsExplorerVerticalModel" />
<div class="clearfix"></div>
<div class="pr-explore" style="background-image: url('${properties.newsbackgroundimage}')">
                <div class="pr-explore-container">
                    <div class="row">

						<c:forEach items="${newsExplorerVerticalModel.nevcList}" var="nevcMultifield" varStatus="multfieldStatus">
							<c:forEach items="${nevcMultifield}" var="nevcMultiObject" varStatus="multiStatus">
						<div class="col-sm-4">
						<a href="${nevcMultiObject.value}"><h2>${nevcMultiObject.key}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></h2></a>

						 <cq:include path="newsfirstpar${multfieldStatus.count}" resourceType="/apps/hdscorp/components/content/newsverticalexplorer" />
						 <cq:include path="newssecondpar${multfieldStatus.count}" resourceType="/apps/hdscorp/components/content/newsverticalexplorer" />

						 </div>
						</c:forEach>

						</c:forEach>

                    </div>
                </div>
</div>
