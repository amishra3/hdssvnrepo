<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>

<c:set var="joincommunitymsg" value="<%= pageProperties.getInherited("joincommunitymsg", "JOIN THE COMMUNITY AND START A CONVERSATION") %>" />
<div class="stop"></div>
<c:set var="linkUrl" value="${properties.joincommunitytargeturl}"/>
<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>"/>
</c:if>
<c:set var="editbarstyle" value="" />

<div class="hds-community-section" style="background-image: url('${properties.sectionbackground}');">
	<div class="hds-community-container container-fluid">
		<div class="hds-title">${properties.sectiontitle}</div>

         <div class="row">
			<cq:include path="communitycontentpar" resourceType="hdscorp/components/content/column-control" />
            <div class="hds-community-join">
                <a class="animateLink" href="http://community.hds.com/" target="_blank">
                    ${joincommunitymsg} <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>
                </a>
            </div>
		</div>


	</div>
</div>