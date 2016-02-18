<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>



<html>
	<title>Facebook Test</title>
<body>
    <script src="//connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v2.2" 
  		async></script>  
    <div class="fb-post" data-href="https://www.facebook.com/HitachiDataSystems/posts/10153834853186788" data-width="500"></div>
</body>
</html>

<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.NewsInsightExplorerVerticalContainerModel" var="newsInsightContainerModel" />





 <div class="news-insight-explore">
          <div class="content-container container-fluid">

<c:forEach items="${newsInsightContainerModel.nivcList}" var="nivcMultifield" varStatus="multfieldStatus">
    <c:forEach items="${nivcMultifield}" var="nivcMultiObject" varStatus="multiStatus">
<div class="col-sm-4">

    <c:choose>
    <c:when test="${fn:substringAfter(nivcMultiObject.value, ':') == '1'}"> 
	<a href="${fn:substringBefore(nivcMultiObject.value, ":")}" target="_blank"><h2>${nivcMultiObject.key}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></h2></a>
    </c:when>
        <c:otherwise>
<a href="${fn:substringBefore(nivcMultiObject.value, ":")}"><h2>${nivcMultiObject.key}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></h2></a>
        </c:otherwise>
    </c:choose>



    <cq:include path="firstpar${multfieldStatus.count}" resourceType="/apps/hdscorp/components/content/newsinsightverticalexplorer" />
         </div>
        </c:forEach>

</c:forEach>

  </div>
 <div class="orange-sep">&nbsp;</div>
   </div> 





