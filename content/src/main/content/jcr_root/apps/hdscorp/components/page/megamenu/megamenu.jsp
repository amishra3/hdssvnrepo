<%@page session="false" contentType="text/html; charset=utf-8"%>
<%@taglib prefix="cq" uri="http://www.day.com/taglibs/cq/1.0" %>

<%@include file="/apps/foundation/global.jsp"%>


<cq:include script="headlibs.jsp" />

<!-- Load sidekick only when viewing page on its own -->
<% if(currentPage.getPath().equals(resourcePage.getPath())) {  %>
	<cq:include script="/libs/wcm/core/components/init/init.jsp" />
<%}%>

<cq:includeClientLib js="hdscorp.main" />

<wcmmode:edit>
	<cq:includeClientLib categories="cq.widgets" />
	<cq:includeClientLib categories="hdscorp.widgets" />
</wcmmode:edit>

<cq:include path="megamenupar" resourceType="hdscorp/components/page/megamenu/megamenucontainer" />






