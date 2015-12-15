<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.day.cq.wcm.api.Page"%>
<%@ page import="org.apache.sling.api.resource.ResourceResolver,
					com.day.cq.wcm.commons.WCMUtils,
					com.day.cq.wcm.api.components.Toolbar"%>


<c:if test="${empty pageProperties.hidereturntotop}">
		<button class="cta-scroll-top">
			<div class="icon-arrow-scroll-top"></div>
			<span class="text-return">return to top</span>
		</button>
</c:if>
