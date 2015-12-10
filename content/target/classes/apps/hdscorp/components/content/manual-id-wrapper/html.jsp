<%@include file="/apps/foundation/global.jsp"%>

<c:set var="id" value="${properties.id}"/>
<c:choose>
    <c:when test="${not empty id}">
        <div id="${properties.id}"><cq:include path="wrapper-parsys" resourceType="foundation/components/parsys"/></div>
    </c:when>
    <c:otherwise>
        <cq:include path="wrapper-parsys" resourceType="foundation/components/parsys"/>
    </c:otherwise>
</c:choose>
<wcmmode:edit>
    <cq:include path="end" resourceType="responsive/business/components/content/manual-id-wrapper/end" />
</wcmmode:edit>
