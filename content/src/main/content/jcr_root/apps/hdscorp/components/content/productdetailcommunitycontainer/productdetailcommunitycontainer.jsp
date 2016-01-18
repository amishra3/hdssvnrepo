<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>


<div class="stop"></div>
<c:set var="linkUrl" value="${properties.joincommunitytargeturl}"/>
<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>"/>
</c:if>
<c:set var="editbarstyle" value="" />

<div class="hds-community-section">
	<div class="hds-community-container container-fluid">
		<div class="hds-title">${properties.sectiontitle}</div>

         <div class="row">
			<cq:include path="communitycontentpar" resourceType="hdscorp/components/content/column-control" />
            <div class="hds-community-join">
                <a class="animateLink" href="${targetUrl}" target="${properties.joincommunitytargeturlopenininew?'_blank':'_self'}">
                    ${properties.joincommunity} <span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span>
                </a>
            </div>
		</div>


	</div>
</div>