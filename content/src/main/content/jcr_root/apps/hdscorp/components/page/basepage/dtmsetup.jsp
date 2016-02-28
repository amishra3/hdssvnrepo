<%@include file="/apps/foundation/global.jsp"%>
<%@page import="org.apache.sling.settings.SlingSettingsService"%>
<%@page import="java.util.Set"%>



<% 
	String pageTemplate = (String)currentPage.getProperties().get("cq:template", "");
	String pageType = "";
//  	System.out.println(pageTemplate);
	if(pageTemplate!=null){
		pageType=pageTemplate.substring(pageTemplate.lastIndexOf("/")+1);
	}
	
	String pageName = (String)currentPage.getProperties().get("cq:template", "");
%>

<meta name="pageName" content="<%=currentPage.getTitle()%>" />
<meta name="pageType" content="<%=pageType%>" />
<meta name="pageLoadEvent" content="<%=pageType%> view" />
