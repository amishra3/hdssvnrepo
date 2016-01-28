<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>




<c:choose>
	<c:when test="${not empty properties.abouthdsherobannertitle}">

		 <div class="common-hero-short-banner about-hds clearfix" style="background: url('${properties.abouthdsherobannermagePath}')">
		     <div class="content-container">
		         <div class="col-lg-7 col-md-7 col-xs-12">
		             <h2 class="headline">${properties.abouthdsherobannertitle}</h2>
		             <h4 class="sub-headline">${properties.abouthdsherobannercontent}</h4>
		         </div>
		     </div>
		 </div>
	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure About HDS Hero Banner </span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>
