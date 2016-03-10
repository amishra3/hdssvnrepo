<%@page session="false" %>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>

	<c:set var="linkUrl" value="${properties.tileurllink}" />
	
	<c:if test="${fn:startsWith(linkUrl,'/content/')}">
		<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>"/>
	</c:if>


  <div class="col-sm-6">
      <div class="section-service-col ${properties.widetileType} clearfix">
          <div class="imageHolder"><img alt="${properties.iconimagealttitle}" src="${properties.iconimagepath}"></div>
          <h3 class="headline"><a href="${properties.tilelink}" target="${not empty properties.newtab?'_blank':'_self'}" class="animateLink">${properties.widetiletitle}${not empty properties.newtab?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':'<span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a></h3>
          <p>${properties.tilecontent}</p>
	    <c:if test="${not empty properties.phonenumbertext}">      
			<div class="col-sm-6 support-phone-no col-no-pad">${properties.phonenumbertext}</div>
		</c:if>
		<c:if test="${not empty properties.tileurllabel}">
			<div class="col-sm-6 support-connect-login col-no-pad"><a href="${linkUrl}" target="${not empty properties.urlopennewtab?'_blank':'_self'}" class="animateLink">${properties.tileurllabel}<span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a></div>
		</c:if>
      </div>
  </div>
