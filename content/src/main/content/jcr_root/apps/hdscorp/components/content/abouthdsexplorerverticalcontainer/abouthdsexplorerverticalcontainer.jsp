<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>



<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.AboutHDSExplorerVerticalContainerModel" var="aboutHDSExplorerVerticalContainerModel" />



<div class="about-hds-latest">
                <div class="content-container container-fluid">
                    <div class="row">

<c:forEach items="${aboutHDSExplorerVerticalContainerModel.ahecList}" var="aheMultifield" varStatus="multfieldStatus">
    <c:forEach items="${aheMultifield}" var="aheMultiObject" varStatus="multiStatus">
 <div class="col-sm-6">

    <c:choose>
    <c:when test="${fn:substringAfter(aheMultiObject.value, '$') == '1'}"> 
<h2><a href="${fn:substringBefore(aheMultiObject.value, "$")}" target="_blank">${aheMultiObject.key}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a></h2>
    </c:when>
        <c:otherwise>
<h2><a href="${fn:substringBefore(aheMultiObject.value, "$")}">${aheMultiObject.key}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a></h2>
        </c:otherwise>
    </c:choose>

 <cq:include path="abouthdspar${multfieldStatus.count}" resourceType="/apps/hdscorp/components/content/abouthdsverticalexplorer" />


 </div>
</c:forEach>

</c:forEach>

                    </div>
                </div>
            </div>