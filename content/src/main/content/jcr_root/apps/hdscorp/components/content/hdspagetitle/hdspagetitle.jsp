<%@page session="false"%><%--
  Copyright 1997-2009 Day Management AG
  Barfuesserplatz 6, 4001 Basel, Switzerland
  All Rights Reserved.

  This software is the confidential and proprietary information of
  Day Management AG, ("Confidential Information"). You shall not
  disclose such Confidential Information and shall use it only in
  accordance with the terms of the license agreement you entered into
  with Day.

  ==============================================================================


--%>
<%@ page import="com.hdscorp.cms.slingmodels.TitleModel"%>

<%@include file="/apps/foundation/global.jsp"%>


<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.TitleModel" var="myModel" /> 
												
<cq:text property="jcr:title" value="${myModel.title}" tagName="${myModel.type}" tagClass="${myModel.underLineClass}"/>