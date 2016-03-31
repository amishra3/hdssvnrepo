<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>




<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.NewsExplorerVerticalContainerModel" var="newsExplorerVerticalModel" />
<div class="clearfix"></div>
<div class="pr-explore news-explore" id="${properties.id}" style="background-image: url('${properties.newsbackgroundimage}')">
                <div class="pr-explore-container">
                    <div class="row">

						<c:forEach items="${newsExplorerVerticalModel.nevcList}" var="nevcMultifield" varStatus="multfieldStatus">
							<c:forEach items="${nevcMultifield}" var="nevcMultiObject" varStatus="multiStatus">
						<div class="col-sm-4">

                            <c:choose>
    <c:when test="${fn:substringAfter(nevcMultiObject.value, '$') == '1'}"> 
    <h2><a href="${fn:substringBefore(nevcMultiObject.value, "$")}" target="_blank">${nevcMultiObject.key} <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span></a></h2>
    </c:when>
        <c:otherwise>
	<h2><a href="${fn:substringBefore(nevcMultiObject.value, "$")}" class="animateLink">${nevcMultiObject.key} <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a></h2>
        </c:otherwise>
    </c:choose>



<c:choose>
<c:when test="${properties.numberofnewsrows=='1'}">
<cq:include path="newsfirstpar${multfieldStatus.count}" resourceType="/apps/hdscorp/components/content/newsverticalexplorer" />
</c:when>
<c:otherwise>
<cq:include path="newsfirstpar${multfieldStatus.count}" resourceType="/apps/hdscorp/components/content/newsverticalexplorer" />
<cq:include path="newssecondpar${multfieldStatus.count}" resourceType="/apps/hdscorp/components/content/newsverticalexplorer" />
</c:otherwise>
</c:choose>
						 </div>
						</c:forEach>

						</c:forEach>

                    </div>
                </div>
</div>
