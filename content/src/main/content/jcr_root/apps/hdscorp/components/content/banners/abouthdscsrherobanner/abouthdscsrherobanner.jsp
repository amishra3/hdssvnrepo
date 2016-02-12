<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>




<c:choose>
	<c:when test="${not empty properties.abouthdsherobannertitle}">

		 <div class="common-hero-banner about-hds-csr clearfix" style="background-image: url('${properties.abouthdsherobannermagePath}')">
		     <div class="common-hero-banner-container">
		         <div class="col-lg-6 col-md-6 col-xs-12">
		             <h2 class="headline">${properties.abouthdsherobannertitle}</h2>
                      <h3>${properties.abouthdsbannersubtitle}</h3>
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
