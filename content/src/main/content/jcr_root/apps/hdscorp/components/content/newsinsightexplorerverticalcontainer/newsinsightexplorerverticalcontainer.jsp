<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>


<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.NewsInsightExplorerVerticalContainerModel" var="newsInsightContainerModel" />





 <div class="news-insight-explore">
          <div class="content-container container-fluid">

<c:forEach items="${newsInsightContainerModel.nivcList}" var="nivcMultifield" varStatus="multfieldStatus">
    <c:forEach items="${nivcMultifield}" var="nivcMultiObject" varStatus="multiStatus">
<div class="col-sm-4">
<a href="${nivcMultiObject.value}"><h2>${nivcMultiObject.key}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></h2></a>
    <cq:include path="firstpar${multfieldStatus.count}" resourceType="/apps/hdscorp/components/content/newsinsightverticalexplorer" />
         </div>
        </c:forEach>

</c:forEach>

  </div>
   </div> 





