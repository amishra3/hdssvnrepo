<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>


<c:set var="componentverticalborder" value="rightborder" />

<c:if test = "${properties.hiderightborder}">
	<c:set var="componentverticalborder" value="" />
</c:if>


<div class="col-sm-4 col-no-pad">
	<div class="fb-category-points-box ${componentverticalborder}">
		<div class="fb-category-points-box-heading">${properties.columntitle}</div>
		<div class="fb-category-points-box-description">${properties.columncontent}</div>
	</div>
</div>