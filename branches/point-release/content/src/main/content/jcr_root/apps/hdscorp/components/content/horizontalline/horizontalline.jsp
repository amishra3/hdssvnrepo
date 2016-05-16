<%@include file="/apps/foundation/global.jsp" %>
<%@page session="false" %>

<c:set var="hline" value="<%=properties.get("separation")%>" />
<c:choose>
	<c:when test="${empty hline}">
        <wcm:placeholder classNames="cq-dl-placeholder"/>
    </c:when>

    <c:otherwise>
    <c:choose>
    <c:when test="${fn:contains(hline, 'true')}">
			<div class="lineseperator"/>
    </c:when>
    </c:choose>
    </c:otherwise>
</c:choose>
