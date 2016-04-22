<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@ taglib prefix="wcmmode" uri="http://www.adobe.com/consulting/acs-aem-commons/wcmmode" %>
<%@ taglib prefix="wcm" uri="http://www.adobe.com/consulting/acs-aem-commons/wcm" %>

<c:set var="domain" value="" />
<c:set var="port" value="<%= request.getServerPort() %>" />
<c:if test="${empty port || port == 80}">
	<c:set var="domain" value="<%= pageProperties.getInherited("domain", "") %>" />
</c:if>
<c:set var="title" value="<%=properties.get("title")%>" />

<c:choose>
<c:when test="${not empty title}">
	<div class="col-sm-4">
      <div class="news-insight-explore-spotlight spotlight-normal">
        <div class="spotlight-content" style="height: 220px;">
          <div class="icon hidden-xs">
            <img src="${properties.iconurl}" alt="" title="">
          </div>
          <div class="icon hidden-sm hidden-md hidden-lg">
           <img src="${properties.iconurl}" alt="" title="">
          </div>
          <div class="type">${title}</div>
          <div class="spotlight-title">${properties.description}</div>
          <c:set var="linkUrl" value="${properties.readmorelink}" />
	   <c:choose>
		<c:when test="${fn:startsWith(linkUrl,'/content/')}">
			<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>"/>
		</c:when>
		<c:otherwise>
			<c:set var="linkUrl" value="${linkUrl}"/>
		</c:otherwise>
	   </c:choose>
          <div class="read-more"> <a href="${linkUrl}" target="${properties.readmorelinktargettype?'_blank':'_self'}" class="animateLink">${properties.readmorelabel}<span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a> </div>
        </div>
      </div>
    </div>
</c:when>
<c:otherwise>
	<wcmmode:edit>
		<p>
			<span class="cq-text-placeholder-ipe">Configure Title Description Component</span>
		</p>
	</wcmmode:edit>
</c:otherwise>
</c:choose>

 