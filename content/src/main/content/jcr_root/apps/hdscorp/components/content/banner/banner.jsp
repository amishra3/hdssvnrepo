
<%@page session="false"%><%--
  Copyright 1997-2008 Day Management AG
  Barfuesserplatz 6, 4001 Basel, Switzerland
  All Rights Reserved.

  This software is the confidential and proprietary information of
  Day Management AG, ("Confidential Information"). You shall not
  disclose such Confidential Information and shall use it only in
  accordance with the terms of the license agreement you entered into
  with Day.

  ==============================================================================

  Title component.

  Draws a title either store on the resource or from the page

--%><%@include file="/apps/foundation/global.jsp"%>
<%@ page import="org.apache.sling.commons.json.JSONObject"%>
<%@ page import="java.io.PrintWriter"%>
<%
	String type = properties.get("listFrom", "homepagehero");
%>

<c:set var="bannerType" value="<%=type%>" />



<c:choose>
	<c:when test="${bannerType eq 'homepagehero'}">
		<cq:include script="homepagehero.jsp" />
	</c:when>
	<c:when test="${bannerType eq 'homepagesecondary'}">
		<cq:include script="homepagesecondary.jsp" />
	</c:when>
	<c:when test="${bannerType eq 'homepagesecondarytype2'}">
		<cq:include script="homepagesecondarytype2.jsp" />
	</c:when>
	<c:when test="${bannerType eq 'storagehero'}">
		<cq:include script="storagehero.jsp" />
	</c:when>
	<c:when test="${bannerType eq 'productdetailvideohero'}">
		<cq:include script="productdetailvideohero.jsp" />
	</c:when>
	<c:when test="${bannerType eq 'newsandinsightsshorthero'}">
		<cq:include script="newsandinsightsshorthero.jsp" />
	</c:when>
	<c:when test="${bannerType eq 'newsandinsightsshorthero'}">
		<cq:include script="newsandinsightsshorthero.jsp" />
	</c:when>

</c:choose>




