<%--
  Leadership Bio Listing Component.
--%>

<%@page session="false"%>
<%@ taglib prefix="widgets" uri="http://www.adobe.com/consulting/acs-aem-commons/widgets" %>
<%@ taglib prefix="xss" uri="http://www.adobe.com/consulting/acs-aem-commons/xss" %>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>

<c:set var="leadersinfo" value="${widgets:getMultiFieldPanelValues(resource, 'leadersinfo')}"/>

<div class="about-hds-leaders" style="background-image:url('${properties.biotilesbackgroundimage}');">
	<div class="content-container">					
    <h2>${properties.biotilestitle}</h2>
		
    <c:forEach items="${leadersinfo}" var="leadersinfo" varStatus="loopcnt">
    <c:set var="leaderbio" value="${leadersinfo['leaderviewbiotargeturl']}"/>
    <c:if test="${fn:startsWith(leaderbio,'/content/')}">
	<c:set var="leaderbio" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("leaderbio").toString())%>"/>
	</c:if>
	
        <div class="col-md-4 col-sm-6">
            <div class="leaders-info">
            <img src="${xss:encodeForHTML(xssAPI, leadersinfo['leaderimagepath'])}" alt=""/>
                <div class="leaders-info-panel">
                <h2 class="leaders-name">${xss:encodeForHTML(xssAPI, leadersinfo['leadername'])}</h2>
                    <div class="view-bio">
                    <a class="animateLink" href="${xss:encodeForHTML(xssAPI, leadersinfo['leaderviewbiotargeturl'])}">${xss:encodeForHTML(xssAPI, leadersinfo['leaderviewbiotext'])}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a>
                    </div>
                        <div class="clearfix"></div>
                            <p>${xss:encodeForHTML(xssAPI, leadersinfo['leaderdesgniation'])}</p>
    </div>
</div>
            </div>
</c:forEach>
       </div>
</div>