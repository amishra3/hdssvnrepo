<%@include file="/apps/foundation/global.jsp"%>
<%@page import="org.apache.sling.api.resource.Resource"%>
<%@page import="javax.jcr.Node"%>
<script src="https://use.typekit.net/bza1awk.js"></script>
<script>try{Typekit.load({ async: true });}catch(e){}</script>
<sling:defineObjects/>

<div class="contentarea spec-section">
	<c:if test="${pageProperties.personalizationEnabled}">
		<cq:include path="clientcontext" resourceType="cq/personalization/components/clientcontext" />
	</c:if>
	
<%	
	Resource res = resourceResolver.getResource(currentPage.getPath()+"/jcr:content") ;
    Node node = res.adaptTo(Node.class);
	
	if (node.hasProperty("techSpecContentPath")){
		//sling.include(node.getProperty("techSpecContentPath").getString());
		String techSpecContentPath = node.getProperty("techSpecContentPath").getString();
		sling.include(techSpecContentPath.substring(0, techSpecContentPath.lastIndexOf("/")));
	}
%>
</div>
	




	

