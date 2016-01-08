<%--  
  <footer.jsp>
  ==============================================================================
  Section which includes branded footer area and global footer links.
  ==============================================================================
--%>
<%@include file="/apps/foundation/global.jsp"%>

    	
<cq:include path="${currentDesign.path}/jcr:content/globalfooter" resourceType="hdscorp/components/content/footer/footerwrapper"/>
<cq:include path="cloudservices" resourceType="cq/cloudserviceconfigs/components/servicecomponents"/> 

<cq:includeClientLib js="hdscorp.main"/> 
<!-- includeClientLib is not loading the JS lib and that is why doing it conventionally-->
<!-- <script type="text/javascript" src="/etc/clientlibs/hdscorp/main.js"></script> --> 