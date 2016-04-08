<%@include file="/apps/foundation/global.jsp"%>

<%--


  ==============================================================================

  This is main content area of the page excluding top level navigation.

  ==============================================================================

--%>




<div id="content-outer-wrapper">
    <c:if test="${pageProperties.personalizationEnabled}">
        <cq:include path="clientcontext" resourceType="cq/personalization/components/clientcontext" />            
    </c:if>

	<cq:include path="par" resourceType="foundation/components/parsys" />
</div>
