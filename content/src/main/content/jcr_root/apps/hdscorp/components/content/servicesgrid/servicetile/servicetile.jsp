<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>


<c:set var="serviceObj" value="${requestScope['serviceObj']}" />
<c:set var="linkUrl" value="${serviceObj.categoryPath}" />
<c:set var="seealllinklabel" value="${requestScope['seealllinklabel']}" />


<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>"/>
</c:if>
												
												
<div class="col-sm-4">
    <div class="section-product-col">
    	<a href="${linkUrl}" >
	        <div class="imageHolder"><img src="${properties.categoryiconpath}" alt="${serviceObj.categoryTitle}"></div>
	        <h3 class="headline">${serviceObj.categoryTitle}</h3>
	        <p>${properties.categorysubtitle}</p>
         </a>
    </div>
</div>
