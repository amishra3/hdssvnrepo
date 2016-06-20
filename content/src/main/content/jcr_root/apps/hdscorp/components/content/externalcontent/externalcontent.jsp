<%@page import="org.apache.sling.api.resource.PersistableValueMap"%>
<%@page import="javax.jcr.Node"%>
<%
%><%@include file="/apps/foundation/global.jsp"%><%
%><%@page session="false" %><%
%>
<% 
	if(currentNode!=null){
		Resource currResource = resourceResolver.getResource(currentNode.getPath());
		PersistableValueMap map = currResource.adaptTo(PersistableValueMap.class);
		map.put("jcr:title",properties.get("dc:title"));
		map.put("jcr:description",properties.get("dc:description"));
		map.save();	
	}
%>
<c:set var="contenttags" value="${fn:join(properties['./cq:tags'], ',')}" />

<br><br><b>External Content Title :: </b> ${properties["./dc:title"]}
<br><br><b>External Content Target URL :: </b> ${properties["./contentpath"]}
<br><br><b>External Content Tags :: </b>${contenttags}
<br><br><b>Is Content Gated :: </b>${properties["./dc:gated"]}


<%
String gatedStartedDate = properties.get("./dc:startdate","");
String gatedEndDate = properties.get("./dc:enddate","");

%>

<br><br><b>Gating Start Date :: </b><%=gatedStartedDate%>

<br><br><b>Gating End Date :: </b><%=gatedEndDate%>

<br><br><b>Content Description (Short) ::</b>${properties["./dc:description"]}

<br><br><b>Content Description (Long) ::</b>${properties["./dc:longdescription"]}

<br><br><b>Content Path :: </b>${properties["./contentpath"]}