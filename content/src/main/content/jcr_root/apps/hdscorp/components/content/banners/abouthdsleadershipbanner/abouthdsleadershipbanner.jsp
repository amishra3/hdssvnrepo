<%--
About HDS Leadership Banner
--%>
<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%String bannerimage=properties.get("jcr:imageFileRef", "");
request.setAttribute("bannerimage",bannerimage);
%>


<c:choose>
	<c:when test="${not empty properties.abouthdsleadershipbannerheading}">
	    <div class="common-hero-banner about-leader-banner server-rack clearfix" style="background-image:url('${requestScope.bannerimage}');">
                <div class="common-hero-banner-container">
                    <div class="col-lg-8 col-md-12 col-xs-12 col-no-pad about-leadership">
                        <h2 class="top-banner-heading">${properties.abouthdsleadershipbannerheading}</h2>
                        <h1 class="headline">${properties.abouthdsleadershipbannerheadline}</h1>
                        <h4 class="sub-headline">${properties.abouthdsleadershipbannersubheadline}</h4>    					
                    </div>
                </div>
       </div>
	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure About HDS Leadership Banner</span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>