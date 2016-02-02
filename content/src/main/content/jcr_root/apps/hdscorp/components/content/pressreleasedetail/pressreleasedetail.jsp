<%--

  Event Component component.

  Hdscorp event component

--%><%
%><%@include file="/apps/foundation/global.jsp"%><%
%><%@page session="false" %><%
%>

<h4> Press Release detail Component</h4>
<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.PressReleaseDetailModel" var="pressRelease" />

<h1>${pressRelease.pressReleaseTitle}</h1>

${pressRelease.pressReleaseDescription}