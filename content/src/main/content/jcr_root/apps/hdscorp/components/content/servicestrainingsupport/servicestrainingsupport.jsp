<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>


<c:set var="contentColumn" value="<%=PageUtils.convertMultiWidgetToList(properties,"columntitle-columndescription-columnmagepath-ctalabel-ctalabelurl-openininewwindow")%>" />    
<div class="service-support-main train-partner training clearfix">
	<div class="content-container clearfix">
	<div class="col-md-12"> 
            <c:forEach var="column" items="${contentColumn}" varStatus="loop">
             <c:set var="linkUrl" value="${column.ctalabelurl}"/>
            <div class="col-md-offset-2">        
			<div class="col-md-5">
				<div class="section-service-col service-training-partner clearfix">

					<h3 class="headline">${column.columntitle}</h3>
					<p>${column.columndescription}</p>
<c:if test="${not empty column.ctalabel}">
<c:choose>
<c:when test="${column.openininewwindow=='1'}">
<div class="support-connect-login col-no-pad"><a class="animateLink" href="${linkUrl}" target="_blank">${column.ctalabel} <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span></a></div>
</c:when>
<c:otherwise>
<div class="support-connect-login col-no-pad"><a class="animateLink" href="${linkUrl}">${column.ctalabel}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a></div>
</c:otherwise>
</c:choose>
</c:if>
                </div>

			</div> 
		    </div>
            </c:forEach>
        </div>
     </div>
</div>