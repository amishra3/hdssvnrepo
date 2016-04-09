<%--  
  <header.jsp>

  ==============================================================================
  
  JSP Script to generate universal header section of the page.
  
  ==============================================================================
--%>
<%@include file="/apps/foundation/global.jsp"%>
<cq:include path="${currentDesign.path}/jcr:content/browser-upgrade" resourceType="hdscorp/components/content/browser-upgrade"/>
<cq:include path="${currentDesign.path}/jcr:content/globalheader" resourceType="hdscorp/components/content/globalheader"/>

