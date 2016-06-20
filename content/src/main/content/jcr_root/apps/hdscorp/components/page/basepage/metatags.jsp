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

<%@page import="com.day.cq.wcm.api.WCMMode,com.day.cq.tagging.Tag"%>

<%
	Tag[] tags = currentPage.getTags();
	String services="";
	String topic="";
	for (Tag tag : tags) {

			if (tag.getTagID().contains("content-type")) {
	%>
				<meta name="content-type" content="<%=tag.getTitle()%>" />
	<%
			} else if (tag.getTagID().contains("services")) {
				if (tag.getParent() != null) {
					services= tag.getTitle();
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
		} else if (tag.getTagID().contains("product-and-solutions")) {
	            String tagTitle=tag.getTitle();
	            Tag parent=tag.getParent();
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
	<%
		}
	}

	if(currentPage.getAbsoluteParent(3)!=null && !currentPage.getAbsoluteParent(3).isHideInNav())
	{
	%>
		<meta name="section" content="<%=currentPage.getAbsoluteParent(3).getTitle()%>" />
	<%
		String section=currentPage.getAbsoluteParent(3).getName();
        if(section.equalsIgnoreCase("services") && currentPage.getAbsoluteParent(4)!=null)
           {
        	String servicesSection=currentPage.getAbsoluteParent(4).getTitle();
        	if(servicesSection.indexOf(services)==-1)
        	{
        		servicesSection=servicesSection+","+services;
        	}
	%>
			<meta name="services" content="<%=servicesSection%>" />
	<%
		}
	 	else if(section.equalsIgnoreCase("partners") && currentPage.getAbsoluteParent(4)!=null)
           {
	%>
			<meta name="partners" content="<%=currentPage.getAbsoluteParent(4).getTitle()%>" />
	<%
		}
		else if(section.equalsIgnoreCase("news-insights") && currentPage.getAbsoluteParent(4)!=null)
           {
	%>
			<meta name="news-and-insights" content="<%=currentPage.getAbsoluteParent(4).getTitle()%>" />
	<%
		}
        else if(section.equalsIgnoreCase("about-hds") && currentPage.getAbsoluteParent(4)!=null)
        {
	%>
			<meta name="abouthds" content="<%=currentPage.getAbsoluteParent(4).getTitle()%>" />
	<%
		}
         else if(section.equalsIgnoreCase("contact") && currentPage.getAbsoluteParent(4)!=null)
        {
	%>
			<meta name="contactus" content="<%=currentPage.getAbsoluteParent(4).getTitle()%>" />
	<%
		}
         else if(section.equalsIgnoreCase("products-solutions") && currentPage.getAbsoluteParent(4)!=null)
        {
        	 String pSection=currentPage.getAbsoluteParent(4).getTitle();
         	if(pSection.indexOf(topic)==-1)
         	{
         		pSection=pSection+","+topic;
         	}
	%>
			<meta name="topic" content="<%=pSection%>" />
	<%
		}
    }
%>

<meta name="language" content="<%=pageProperties.getInherited("websitelangtext", "")%>" />
<meta name="country" content="<%=pageProperties.getInherited("websitecountrytext", "")%>" />
<c:if test="${empty properties.disablerobotmetatag}">
<c:set var="robmeta" value="<%=pageProperties.getInherited("robotmetatag", "")%>" />
<c:choose>
    <c:when test="${empty robmeta}">
        <meta name="robots" content="INDEX, FOLLOW" />
    </c:when>
    <c:otherwise>
		 <meta name="robots" content="<%=pageProperties.getInherited("robotmetatag", "")%>" />
    </c:otherwise>
</c:choose>
</c:if>