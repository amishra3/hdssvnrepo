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
<meta name="content-type" content="<%=tag.getTitle()%>" />
<%
	} else if (tag.getTagID().contains("services")) {
			if (tag.getParent() != null) {
%>
<meta name="services"
	content="<%=tag.getParent().getTitle()%>/<%=tag.getTitle()%>" />
<%
	} else {
%>
<meta name="services" content="<%=tag.getTitle()%>" />
<%
	}
		} else if (tag.getTagID().contains("region")) {
%>
<meta name="region" content="<%=tag.getTitle()%>" />
<%
	} else if (tag.getTagID().contains("language")) {
%>
<meta name="language" content="<%=tag.getTitle()%>" />
<%
	} else if (tag.getTagID().contains("country")) {
%>
<meta name="country" content="<%=tag.getTitle()%>" />
<%
	} else if (tag.getTagID().contains("industry")) {
%>
<meta name="industry" content="<%=tag.getTitle()%>" />
<%
	} else if (tag.getTagID().contains(
				"product-and-solutions")) {
            String tagTitle=tag.getTitle();
            Tag parent=tag.getParent();
            String topic="";
            while(parent!=null)
            {
                if(parent.getTitle().equals("Common"))
                    break;
				if(tagTitle.length()>0)
                {
                    tagTitle="/"+tagTitle;
                }
                tagTitle=parent.getTitle()+tagTitle;
                parent=parent.getParent();
            }
            if(tagTitle!=null)
            {
           	String tagsArr[]= tagTitle.split("/");
           	if(tagsArr.length>1)
           		topic=tagsArr[1];
            }
             %>
            <meta name="products-and-solutions" content="<%=tagTitle%>" />
            <meta name="topic" content="<%=topic%>" />
            <%

		}
	}
	if(!currentPage.isHideInNav())
	{
	String section=currentPage.getAbsoluteParent(3).getTitle();
	%>
	<meta name="section" content="<%=section%>" />
	<%}%>