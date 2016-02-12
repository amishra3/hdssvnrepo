<%--Blog component.--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>


<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.BlogModel" var="blogModel" />



<div class="insight-common-box">
<div class="icon">
<img title="" alt="" src="${blogModel.bimagepath}">
</div>
<div class="type">${blogModel.bautherdetails}</div>
<h5>${blogModel.btitle}</h5>
<div class="description"> ${blogModel.bcontent}</div>
<div class="read-more">
<c:choose>
<c:when test="${blogModel.bopeninnew=='true'}">        
<a href="${blogModel.breadmorelink}" class="animateLink" target="_blank">${blogModel.breadmore} <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a>
</c:when>
<c:otherwise>         
<a href="${blogModel.breadmorelink}" class="animateLink">${blogModel.breadmore} <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a>
</c:otherwise>
</c:choose>
</div>
</div>