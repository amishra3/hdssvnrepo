<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>
<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.NewsInsightExplorerVerticalContainerModel" var="newsInsightContainerModel" />

 <div class="news-insight-explore">
          <div class="content-container container-fluid">

<c:forEach items="${newsInsightContainerModel.nivcList}" var="nivcMultifield" varStatus="multfieldStatus">
    <c:forEach items="${nivcMultifield}" var="nivcMultiObject" varStatus="multiStatus">
<div class="col-sm-4">

    <c:choose>
    <c:when test="${fn:substringAfter(nivcMultiObject.value, '/:') == '1'}"> 
	<a href="${fn:substringBefore(nivcMultiObject.value, "/:")}" target="_blank"><h2>${nivcMultiObject.key}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></h2></a>
    </c:when>
        <c:otherwise>
            <h2><a href="${fn:substringBefore(nivcMultiObject.value, "/:")}" target="_self" class="animateLink">${nivcMultiObject.key}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a></h2>
        </c:otherwise>
    </c:choose>
    <cq:include path="firstpar${multfieldStatus.count}" resourceType="/apps/hdscorp/components/content/newsinsightverticalexplorer" />
         </div>
        </c:forEach>

</c:forEach>

  </div>
 <div class="orange-sep">&nbsp;</div>
   </div> 





