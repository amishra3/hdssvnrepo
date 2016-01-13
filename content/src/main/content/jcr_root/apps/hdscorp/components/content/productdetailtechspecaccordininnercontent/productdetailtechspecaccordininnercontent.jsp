<%@page session="false"%>
<%@ taglib prefix="widgets" uri="http://www.adobe.com/consulting/acs-aem-commons/widgets" %>
<%@ taglib prefix="xss" uri="http://www.adobe.com/consulting/acs-aem-commons/xss" %>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>

<c:set var="definitions" value="${widgets:getMultiFieldPanelValues(resource, 'definitions')}"/>
<c:forEach items="${definitions}" var="definition" varStatus="loopcnt">
	<c:set var="downloadlink" value="${definition['downloadtargeturl']}"/>
	<c:if test="${fn:startsWith(downloadlink,'/content/')}">
		<c:set var="downloadlink" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("downloadlink").toString())%>"/>
	</c:if>

          <div id="box${loopcnt.index}">
           <div class="vsp-soft-products-details clearfix">
               <div class="col-sm-4">
                   <div class="product-name">
                       ${xss:encodeForHTML(xssAPI, definition['contenttitle'])}
                       <span aria-hidden="true" class="glyphicon glyphicon-menu-right"></span>
                   </div>
                   <c:if test="${not empty definition['downloadlinklabel']}">
	                   <div class="product-download">
		                   	<a href="${downloadlink}" target="_blank">
		                       	${xss:encodeForHTML(xssAPI, definition['downloadlinklabel'])}
		                       	<span aria-hidden="true" class="glyphicon glyphicon-new-window"></span>
		                    </a>
	                   </div>
                   </c:if>
                   <c:if test="${not empty definition['emailinformationlabel']}">                   
	                   <div class="product-email">
	                       ${xss:encodeForHTML(xssAPI, definition['emailinformationlabel'])} 
	                       <span aria-hidden="true" class="glyphicon glyphicon-menu-right"></span>
	                   </div>
                   </c:if>
               </div>
               <div class="col-sm-8">
                   <div class="product-desc">
                           ${definition['sectioncontent']}
                   </div>
               </div>
           </div>
      </div>
</c:forEach>