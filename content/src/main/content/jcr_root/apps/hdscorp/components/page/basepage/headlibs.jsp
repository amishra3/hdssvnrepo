<%--
  <headlibs.jsp>

  ==============================================================================

  Includes the scripts and css to be included in the head tag

  ==============================================================================

--%><%@ page session="false" %><%
%><%@include file="/apps/foundation/global.jsp"%>

<wcmmode:edit>
	<cq:includeClientLib categories ="cq.widgets"/>
	<cq:includeClientLib categories ="hdscorp.widgets"/>
</wcmmode:edit>

<c:set var="cssmainclientlib" value="<%= pageProperties.getInherited("cssmainclientlib", "hdscorp.main") %>" />

<cq:includeClientLib css="${cssmainclientlib}"/>
<cq:includeClientLib categories="hdscorp.dependencies"/>

