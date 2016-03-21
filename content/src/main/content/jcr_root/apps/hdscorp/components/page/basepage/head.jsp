<%--
  Copyright 1997-2010 Day Management AG
  Barfuesserplatz 6, 4001 Basel, Switzerland
  All Rights Reserved.

  This software is the confidential and proprietary information of
  Day Management AG, ("Confidential Information"). You shall not
  disclose such Confidential Information and shall use it only in
  accordance with the terms of the license agreement you entered into
  with Day.

  ==============================================================================

  Default head script.

  Draws the HTML head with some default content:
  - includes the WCML init script
  - includes the head libs script
  - includes the favicons
  - sets the HTML title
  - sets some meta data

  ==============================================================================
--%>

<%@include file="/apps/foundation/global.jsp" %>
<%@page import="com.day.cq.wcm.api.components.IncludeOptions"%>
<%@page import="com.day.cq.wcm.api.WCMMode"%>

<c:choose>
    <c:when test="${ requestScope['com.day.cq.wcm.api.WCMMode']=='EDIT' || 
            requestScope['com.day.cq.wcm.api.WCMMode']=='DESIGN'}">
        <% componentContext.setDefaultDecorationTagName("div"); %>
    </c:when>
    <c:otherwise>
        <% componentContext.setDefaultDecorationTagName(""); %>
    </c:otherwise>
</c:choose>
<%@ page import="com.day.cq.commons.Doctype,org.apache.commons.lang3.StringEscapeUtils" %>
<%
    String xs = Doctype.isXHTML(request) ? "/" : "";
	//String favIcon = currentDesign.getPath() + "/clientLibs/images/icons/favicon.ico";
	String favIcon = "/etc/clientlibs/hdscorp/main/images/favicon.ico";
	if(resourceResolver.getResource(favIcon) == null){
	    favIcon = null;
	} 
%>
<c:set var="titleprefix" value="<%= pageProperties.getInherited("titleprefix", "") %>" />
<head>
      <meta charset="utf-8"/>
      <meta name="format-detection" content="telephone=yes" />
      <meta http-equiv="cleartype" content="on" />
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1"/>

      <meta http-equiv="content-type" content="text/html; charset=UTF-8"<%=xs%>>
	  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
      <meta name="keywords" content="<%= StringEscapeUtils.escapeHtml4(pageProperties.get("keywords", "")) %>"<%=xs%>>
      <meta name="description" content="<%= StringEscapeUtils.escapeHtml4(properties.get("jcr:description", "")) %>"<%=xs%>>
	  <meta name="google" value="notranslate" />
	  <meta name="referrer" content="origin"/>
	  <cq:include script="metatags.jsp"/>
      <script src="https://use.typekit.net/ypb6hdo.js"></script>
      <script>try{Typekit.load({ async: true });}catch(e){}</script>
	
	  <cq:include script="headlibs.jsp"/>
	  <cq:include script="headeranalytics.jsp"/>
      <cq:include script="/libs/wcm/core/components/init/init.jsp"/>
	  <% if (favIcon != null) { %>
		<link rel="icon" type="image/vnd.microsoft.icon" href="<%= favIcon %>"<%=xs%>>
		<link rel="shortcut icon" type="image/vnd.microsoft.icon" href="<%= favIcon %>"<%=xs%>>
      <% } %>
      <title>${titleprefix}<%= (StringEscapeUtils.escapeHtml4(properties.get("pageTitle", "")) == null || StringEscapeUtils.escapeHtml4(properties.get("pageTitle", "")).equals("")) ? StringEscapeUtils.escapeHtml4(currentPage.getTitle()):StringEscapeUtils.escapeHtml4(properties.get("pageTitle", ""))%></title>
      
	  <c:if test="${not empty pageProperties.insertnocacheheaders}">
		  <% 
			  response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
			  response.setHeader("Dispatcher", "no-cache");
			  response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
			  response.setHeader("Expires", "0"); // Proxies.
		  %>
		  
		  <META HTTP-EQUIV="PRAGMA" CONTENT="NO-CACHE">
		  <META HTTP-EQUIV="Dispatcher" CONTENT="NO-CACHE"> 
		  <META HTTP-EQUIV="Expires" CONTENT="-1">
		  <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, no-store, must-revalidate">
		 		  
	  </c:if>
      
</head>
