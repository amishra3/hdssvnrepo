<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@ taglib prefix="wcmmode" uri="http://www.adobe.com/consulting/acs-aem-commons/wcmmode" %>
<%@ taglib prefix="wcm" uri="http://www.adobe.com/consulting/acs-aem-commons/wcm" %>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<c:set var="domain" value="" />
<c:set var="port" value="<%= request.getServerPort() %>" />
<c:if test="${empty port || port == 80}">
<c:set var="domain" value="<%= pageProperties.getInherited("domain", "") %>" />
</c:if>
<c:set var="partners" value="<%=PageUtils.convertMultiWidgetToList(properties,"partnericonimgpath-partnericonalttext-partnericonurl-icontargettype")%>" />
<c:choose>
<c:when test="${not empty partners}">
<div class="aboutus-partners partners-section">
  <div class="content-container container-fluid">
    <div class="partner-program clearfix">
      <div class="heading clearfix">
         <div class="icon">
               <img alt="${properties.title}" src="${properties.titleiconurl}">
         </div>
        <h2>${properties.title}</h2>
      </div>
      <div class="partner-list clearfix" id="partner-list">
       <c:forEach var="partner" items="${partners}">
        <div class="partner col-xs-6 col-sm-6 col-md-2 col-lg-2">
          <div class="logo">
           <c:set var="linkUrl" value="${partner.partnericonurl}" />
					<c:choose>
						<c:when test="${fn:startsWith(linkUrl,'/content/')}">
							<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>"/>
						</c:when>
						<c:otherwise>
							<c:set var="linkUrl" value="${linkUrl}"/>
						</c:otherwise>
					</c:choose>
            <a href="${linkUrl}" target="${partner.icontargettype?'_blank':'_self'}" title="${partner.partnericonalttext}"><img src="${partner.partnericonimgpath}" alt="${partner.partnericonalttext}"></a>
          </div>
        </div>
        </c:forEach>
       
      </div>
    </div>
  </div>
</div>
</c:when>
<c:otherwise>
	<wcmmode:edit>
		<p>
			<span class="cq-text-placeholder-ipe">Configure Partners Information Component</span>
		</p>
	</wcmmode:edit>
</c:otherwise>
</c:choose>











