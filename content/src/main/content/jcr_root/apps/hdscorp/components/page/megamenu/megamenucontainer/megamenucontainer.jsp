<%@include file="/apps/foundation/global.jsp"%>
<%@page import="org.apache.sling.api.resource.Resource"%>
<%@page import="com.day.cq.wcm.api.Page"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="org.apache.sling.api.resource.PersistableValueMap"%>
<%@page import="com.adobe.granite.ocs.api.Deployment.Properties"%>
<%@page import="javax.jcr.Node"%>


<c:set var="topnavelementpath" value="${properties.topnavelementpath}"/>


<cq:include path="megamenu-parsys" resourceType="foundation/components/parsys"/>

<c:if test="${not empty topnavelementpath}">

<%
		PersistableValueMap map = resource.adaptTo(PersistableValueMap.class);
		String topNavElementPath = (String) map.get("topnavelementpath");

		Resource res = null;

		if (topNavElementPath != null) {
			res = resourceResolver.getResource(topNavElementPath);
			if (res != null) {
				map.put("topnavelementactualpath",PathResolver.getShortURLPath(topNavElementPath));

				Page topNavPage = res.adaptTo(Page.class);
				String topnavelementTitle = topNavPage.getTitle();
				map.put("topnavelementTitle", topnavelementTitle);

				map.save();
			}
		}
%>

</c:if>

<wcmmode:edit>
	<c:if test="${not empty topnavelementpath}">
		<p>
			<span class="cq-text-placeholder-ipe">Configure megamenu content here.</span>
		</p>
	</c:if>
    <cq:include path="end" resourceType="/apps/hdscorp/components/content/manual-id-wrapper/end" />
</wcmmode:edit>
