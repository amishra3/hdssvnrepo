<%--
  Homepage Hero Banner component.
--%>

<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>

<c:set var="viewlinkUrl" value="${properties.viewalllinkurl}" />

<c:if test="${fn:startsWith(viewlinkUrl,'/content/')}">
	<c:set var="viewlinkUrl" value="${hdscorp:shortURL(viewlinkUrl)}" />
</c:if>


<c:choose>
	<c:when test="${not empty properties.herotitlecontent}">
		<c:set var="tabOverlayPath" value="" />
		<c:set var="tabList" value="<%=PageUtils.convertMultiWidgetToList(properties,"tabTitle-tablink-tabIconPath")%>" />
