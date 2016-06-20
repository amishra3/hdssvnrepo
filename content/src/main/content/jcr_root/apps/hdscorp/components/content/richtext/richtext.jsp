<%@include file="/apps/foundation/global.jsp"%>

<c:if test="${not empty properties.id}">
	<div id="${properties.id}">
</c:if>

	<cq:text property="text" placeholder="click here to set text" />

<c:if test="${not empty properties.id}">
	</div>
</c:if>