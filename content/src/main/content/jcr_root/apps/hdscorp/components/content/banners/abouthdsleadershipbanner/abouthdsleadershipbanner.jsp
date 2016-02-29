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
                    <div class="col-lg-6 col-md-6 col-xs-12">
                        <h2 class="top-banner-heading">${properties.abouthdsleadershipbannerheading}</h2>
                        <h1 class="headline">${properties.abouthdsleadershipbannerheadline}</h1>
                        <h4 class="sub-headline">${properties.abouthdsleadershipbannersubheadline}</h4>    

					<c:if test="${not empty properties.leaderbuttonlabel}">
						<div class="btn-square-white request">
							<a href="${properties.leaderbuttonurl}"
								target="${properties.thirdparty?'_blank':'_self'}">
								${properties.leaderbuttonlabel} </a>
						</div>
					</c:if>

                    <c:if test="${not empty properties.leaderlinktext}">
						<div class="buy-through">
							<a class="animateLink" href="${properties.leaderlinkurl}"
								target="${properties.thirdpartylink?'_blank':'_self'}">${properties.leaderlinktext}
								${properties.thirdpartylink?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}
							</a>
						</div>
					</c:if>



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