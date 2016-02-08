<%--
  Product Description Component
--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>

<c:set var="descriptionlist" value="${widgets:getMultiFieldPanelValues(resource, 'descriptionlist')}"/>

<c:forEach items="${descriptionlist}" var="definition">
    <h1>${xss:encodeForHTML(xssAPI, definition['category-tag'])}</h1>
    <h1s>${xss:encodeForHTML(xssAPI, definition['description'])}</h1>
</c:forEach>