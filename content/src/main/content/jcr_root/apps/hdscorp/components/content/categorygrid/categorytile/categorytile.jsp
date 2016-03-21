<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>


<c:set var="categoryObj" value="${requestScope['categoryObj']}" />
<c:set var="linkUrl" value="${categoryObj.categoryPath}" />
<c:set var="seealllinklabel" value="${requestScope['seealllinklabel']}" />


<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>"/>
</c:if> 
								
<div class="col-sm-4 overRidePadding col-centered">
    <div class="section-product-col panel-box" style="height: 280px;">
        <div class="imageHolder"><img src="${properties.categoryiconpath}" alt="${categoryObj.categoryTitle}"></div>
        <h4 class="headline">${categoryObj.categoryTitle}</h4>
        <p>${properties.categorysubtitle}</p>
        <a href="${linkUrl}" class="animateLink">${seealllinklabel} <span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a>
    </div>
</div>