<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>


<div class="product-category-list">
	<div class="product-category-list-container">		
		<cq:include path="categoryproductlistingtitle" resourceType="hdscorp/components/content/cateogryproductlisting/sectiontitle" />
		<div class="row">
			<cq:include path="subcategoryfilterpar" resourceType="hdscorp/components/content/cateogryproductlisting/subcategoryfilter" />

		</div>
	</div>
</div> 