<%--
  footersocialconnect component.
  This component is used to display social connect icons in the global footer
--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>



<c:set var="socialmultilinks" value="<%=PageUtils.convertMultiWidgetToList(properties,"linktargeturl-linkIconPath-linkicontext")%>" />

<ul class="social-icons hide-small">
	<c:forEach var="externalLink" items="${socialmultilinks}">
		<c:set var="linktargeturl" value="${externalLink.linktargeturl}" />
		<c:set var="linkIconPath" value="${externalLink.linkIconPath}" />
        <c:set var="imageAltText" value="${externalLink.linkicontext}"/>
		<a href="${linktargeturl}" target="_blank"> 
            <img alt="${imageAltText}" title="${imageAltText}" src="${linkIconPath}"/>
		</a>
	</c:forEach>
</ul>
