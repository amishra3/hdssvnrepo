
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
<%@ page import="org.apache.sling.commons.json.JSONObject" %>
<%@ page import="java.io.PrintWriter" %>





<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.BannerModel" var="myBannerModel" />

<a href="${myBannerModel.ctaUrl3}" target="_blank"><img src="${myBannerModel.banner3}"  alt="${myBannerModel.altText3}" title="${myBannerModel.title3}"/></a>






