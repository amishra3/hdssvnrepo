<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>


<c:set var="serviceObj" value="${requestScope['serviceObj']}" />
<c:set var="linkUrl" value="${serviceObj.categoryPath}" />
<c:set var="seealllinklabel" value="${requestScope['seealllinklabel']}" />
<c:set var="loopindex" value="${requestScope['loopindex']}" />
<c:set var="tilepaddingclass" value="" />

<c:if test="${(loopindex != 0) && (loopindex mod 3 == 0)}">	
	<c:set var="tilepaddingclass" value=" col-sm-offset-2" />
</c:if>


<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>"/>
</c:if>
												
												

<div class="col-sm-4 ${tilepaddingclass}">
            <div class="section-service-col">
            	<a href="${linkUrl}" >
			         <div class="imageHolder"><img src="${properties.categoryiconpath}" alt="${serviceObj.categoryTitle}"></div>
			         <h3 class="headline">${serviceObj.categoryTitle}<span class="glyphicon glyphicon-menu-right"></span></h3>
			         <p>${properties.categorysubtitle}</p>
		        </a>
    </div>
</div>