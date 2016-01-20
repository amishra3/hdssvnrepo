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
<%@include file="/apps/foundation/global.jsp"%>

<%@page
	import="com.day.cq.wcm.api.WCMMode,com.day.cq.tagging.Tag"%>

<%
	Tag[] tags = currentPage.getTags();
	for (Tag tag : tags) {

		if (tag.getTagID().contains("content-type")) {
%>
<meta name="Content Type" value="<%=tag.getTitle()%>" />
<%
	} else if (tag.getTagID().contains("services")) {
			if (tag.getParent() != null) {
%>
<meta name="Services"
	value="<%=tag.getParent().getTitle()%>/<%=tag.getTitle()%>" />
<%
	} else {
%>
<meta name="Services" value="<%=tag.getTitle()%>" />
<%
	}
		} else if (tag.getTagID().contains("region")) {
%>
<meta name="Region" value="<%=tag.getTitle()%>" />
<%
	} else if (tag.getTagID().contains("language")) {
%>
<meta name="Language" value="<%=tag.getTitle()%>" />
<%
	} else if (tag.getTagID().contains("country")) {
%>
<meta name="Country" value="<%=tag.getTitle()%>" />
<%
	} else if (tag.getTagID().contains("industry")) {
%>
<meta name="Industry" value="<%=tag.getTitle()%>" />
<%
	} else if (tag.getTagID().contains(
				"product-and-solutions")) {
			if (tag.getParent() != null) {
%>
<meta name="Products and Solutions "
	value="<%=tag.getParent().getTitle()%>/<%=tag.getTitle()%>" />
<%
	} else {
%>
<meta name="Products and Solutions" value="<%=tag.getTitle()%>" />
<%
	}

		}
	}
%>
