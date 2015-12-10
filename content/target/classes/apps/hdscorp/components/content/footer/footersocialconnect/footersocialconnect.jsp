<%--
  footersocialconnect component.
  This component is used to display social connect icons in the global footer
--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>



<c:set var="socialmultilinks" value="<%=PageUtils.convertMultiWidgetToList(properties,"linktargeturl-linkIconPath")%>" />

<ul class="social-icons">
	<c:forEach var="externalLink" items="${socialmultilinks}">
		<c:set var="linktargeturl" value="${externalLink.linktargeturl}" />
		<c:set var="linkIconPath" value="${externalLink.linkIconPath}" />
		<a href="${linktargeturl}" target="_blank"> 
			<span class="sprite icon-facebook-white"
				style="background-image: url(${linkIconPath});background-position: 0 0;" />
		</a>
	</c:forEach>
</ul>
