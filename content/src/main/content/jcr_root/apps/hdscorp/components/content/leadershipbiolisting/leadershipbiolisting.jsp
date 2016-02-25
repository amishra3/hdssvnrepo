<%--
  Leadership landing page banner component.
--%>

<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>


<div class="about-hds-leaders" style="background-image:url('${properties.biotilesbackgroundimage}');">
	<div class="content-container">					
    <h2>${properties.biotilestitle}</h2>

    <c:set var="contentColumn" value="<%=PageUtils.convertMultiWidgetToList(properties,"leadername-leaderimagepath-leaderdesgniation-leaderviewbiotext-leaderviewbiotargeturl-leaderopeninnewwindow")%>" />    
			<c:forEach var="column" items="${contentColumn}" varStatus="loop">

                <c:set var="linkUrl" value="${column.leaderviewbiotargeturl}"/>

						<c:if test="${fn:startsWith(linkUrl,'/content/')}">
							<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>"/>
						</c:if>	

	        <div class="col-md-4 col-sm-6">
            <div class="leaders-info">
            <img src="${column.leaderimagepath}" alt=""/>
                <div class="leaders-info-panel">
                <h2 class="leaders-name">${column.leadername}</h2>

                    <div class="view-bio">
                    <c:choose>

<c:when test="${column.leaderopeninnewwindow=='1'}">
<a class="animateLink" href="${linkUrl}" target="_blank"> ${column.leaderviewbiotext}<span aria-hidden="true" class="glyphicon glyphicon-share animateIcon"></span></a>
</c:when>
<c:otherwise>
<a class="animateLink" href="${linkUrl}"> ${column.leaderviewbiotext}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a>
</c:otherwise>
</c:choose>
                    </div>
                        <div class="clearfix"></div>
                            <p>${column.leaderdesgniation}</p>
</div>
</div>
                 </div>
</c:forEach>
</div>
</div>
