<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@ taglib prefix="wcmmode" uri="http://www.adobe.com/consulting/acs-aem-commons/wcmmode" %>
<%@ taglib prefix="wcm" uri="http://www.adobe.com/consulting/acs-aem-commons/wcm" %>

<c:set var="title" value="<%=properties.get("title")%>" />
<c:choose>
<c:when test="${not empty title}">
	<div class="aboutus-news news-insight-explore">
     <div class="content-container container-fluid">
    <div class="heading clearfix">
     <div class="icon">
               <img alt="${properties.title}" src="${properties.iconurl}">
         </div>
      <h2>${title}</h2>
    </div>
    <cq:include path="columncontrol" resourceType="hdscorp/components/content/column-control" /> 
   
  </div>
</div>
</c:when>
<c:otherwise>
	<wcmmode:edit>
		<p>
			<span class="cq-text-placeholder-ipe">Configure Column Control Container Component</span>
		</p>
	</wcmmode:edit>
</c:otherwise>
</c:choose>

