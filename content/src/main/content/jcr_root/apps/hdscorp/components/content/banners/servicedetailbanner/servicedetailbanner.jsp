<%--
  Service Detail Banner
--%>
<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%String bannerimage=properties.get("jcr:imageFileRef", "");
request.setAttribute("bannerimage",bannerimage);
%>


<c:choose>
	<c:when test="${not empty properties.servicedetailbanner}">
	    <%-- <div class="common-hero-banner service-detail-banner clearfix" style="background-image:url('${requestScope.bannerimage}');"> --%>
		<div class="common-hero-banner service-detail-banner clearfix rsImg"  ${hdscorp:bgImgAtrr(requestScope.bannerimage,properties.servicedetailbannermobileimage)} > 
            <div class="common-hero-banner-container">
               <div class="col-lg-6 col-md-6 col-xs-12">
                  <div class="top-banner-heading">
                     <span class="text">${properties.servicedetailbanner}</span>
                  </div>
                  <h1 class="headline">${properties.servicedetailbannerheadline}</h1>
		          <h3>${properties.servicedetailbannersubheadline}</h3>
                  <h4 class="sub-headline">${properties.servicedetailbannercontent}</h4>
                   <c:if test="${not empty properties.servicedetaibuttonlabel}">
						<div class="btn-square-white request">
							<a href="${properties.servicedetaibuttonurl}"
								target="${properties.servicedetaitargettype?'_blank':'_self'}">
								${properties.servicedetaibuttonlabel} </a>
						</div>
					</c:if>
               </div>
           </div>
       </div>
	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure Service Detail Banner </span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>