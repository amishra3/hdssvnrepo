<%@page session="false" %>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.slingmodels.CategoryGridModel"%>

<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.CategoryGridModel" var="categoryGridModel" />



<div class="product-list-section clearfix">
	<div class="cs-container content-container">
		<!--Row Starts-->
		<div class="container-fluid overRideleft">
			<c:set var="seealllinklabel" value="${properties.seealllinklabel}" scope="request" />
			<c:forEach var="category" items="${categoryGridModel.categories}" varStatus="loopcnt">
				<c:set var="categoryObj" value="${category}" scope="request" />
				
		
				<cq:include path="categorypar-${loopcnt.index}" resourceType="hdscorp/components/content/categorygrid/categorytile" />
		
				<c:remove var="categoryObj" scope="request" />
			</c:forEach>
			<c:remove var="seealllinklabel" scope="request" />
		</div>
	</div>
    <!--/.Row ends-->
</div>











