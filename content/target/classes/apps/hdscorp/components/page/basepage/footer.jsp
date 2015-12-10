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
