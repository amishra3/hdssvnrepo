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
	<c:choose>
     <c:when test="${not empty blogModel.breadmore}">
         <div class="read-more">
               <a href="${hdscorp:shortURL(blogModel.breadmorelink)}" class="animateLink" target="${blogModel.bopeninnew?'_blank':'_self'}">${blogModel.breadmore}${properties.thirdpartyicon?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':'<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span>'}</a>
          </div>
       </c:when>
        <c:otherwise>
        </c:otherwise>
		</c:choose>




</div>