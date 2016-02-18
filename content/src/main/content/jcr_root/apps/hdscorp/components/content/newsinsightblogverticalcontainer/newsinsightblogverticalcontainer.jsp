<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>


<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.NewsInsightExplorerVerticalContainerModel" var="newsInsightContainerModel" />





 <div class="explore-insight">
          <div class="explore-insight-container container-fluid">
  <div class="row">
<c:forEach items="${newsInsightContainerModel.nivcList}" var="nivcMultifield" varStatus="multfieldStatus">
    <c:forEach items="${nivcMultifield}" var="nivcMultiObject" varStatus="multiStatus">
<div class="container-fluid">
    <c:choose>
    <c:when test="${fn:substringAfter(nivcMultiObject.value, ':') == '1'}"> 
<a href="${fn:substringBefore(nivcMultiObject.value, ":")}" target="_blank"><h2>${nivcMultiObject.key}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></h2></a>
        </c:when>
        <c:otherwise>
<a href="${fn:substringBefore(nivcMultiObject.value, ":")}"><h2>${nivcMultiObject.key}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></h2></a>
       </c:otherwise>
    </c:choose>
    </div>
        <div class="col-sm-6">    
    <cq:include path="newsandinsightfirst${multfieldStatus.count}" resourceType="foundation/components/parsys" />
       </div>
         <div class="col-sm-6"> 
    <cq:include path="newsandinsightsecond${multfieldStatus.count}" resourceType="foundation/components/parsys" />
 	 </div>
        </c:forEach>

</c:forEach>
  </div>
  </div>
   </div> 





