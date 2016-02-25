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

                           hhh ${nevcMultiObject.value}
                            <c:choose>
    <c:when test="${fn:substringAfter(nevcMultiObject.value, '$') == '1'}"> 
    <a href="${fn:substringBefore(nevcMultiObject.value, "$")}" target="_blank"><h2>${nevcMultiObject.key}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></h2></a>
    </c:when>
        <c:otherwise>
<a href="${fn:substringBefore(nevcMultiObject.value, "$")}"><h2>${nevcMultiObject.key}<span aria-hidden="true" class="glyphicon glyphicon-share animateIcon"></span></h2></a>
        </c:otherwise>
    </c:choose>



						 <cq:include path="newsfirstpar${multfieldStatus.count}" resourceType="/apps/hdscorp/components/content/newsverticalexplorer" />
						 <cq:include path="newssecondpar${multfieldStatus.count}" resourceType="/apps/hdscorp/components/content/newsverticalexplorer" />

						 </div>
						</c:forEach>

						</c:forEach>

                    </div>
                </div>
</div>
