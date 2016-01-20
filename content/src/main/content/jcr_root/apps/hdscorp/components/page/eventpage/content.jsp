<%@include file="/apps/foundation/global.jsp"%>

<%--


  ==============================================================================

  This is main content area of the page excluding top level navigation.

  ==============================================================================

--%>

	<script src="https://use.typekit.net/bza1awk.js"></script>
	<script>try{Typekit.load({ async: true });}catch(e){}</script>


<div id="content-outer-wrapper">
    <c:if test="${pageProperties.personalizationEnabled}">
        <cq:include path="clientcontext" resourceType="cq/personalization/components/clientcontext" />            
    </c:if>

	<cq:include path="par" resourceType="foundation/components/parsys" />
</div>
<cq:include path="event" resourceType="/apps/hdscorp/components/content/event" />