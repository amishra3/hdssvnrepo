<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%String bannerimage=properties.get("jcr:imageFileRef", "");
request.setAttribute("bannerimage",bannerimage);
%>


<c:set var="buttonUrl" value="${properties.industrysolutionsherobannerbuttonurl}" />

<c:if test="${fn:startsWith(buttonUrl,'/content/')}">
	<c:set var="buttonUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("buttonUrl").toString())%>" />
</c:if>

<c:choose>
	<c:when test="${not empty properties.industrysolutionsherobannertopheading}">

        <div class="common-hero-banner industry-sol clearfix" style="background: url('${requestScope.bannerimage}')">
           <div class="common-hero-banner-container">
              <div class="col-lg-8 col-md-10 col-xs-12">
			     <div class="top-banner-heading hidden-xs hidden-sm">${properties.industrysolutionsherobannertopheading}</div>
                    <h1 class="headline">${properties.industrysolutionsherobannerheadline}</h1>
                    <h4 class="sub-headline">${properties.industrysolutionsherobannersubheadline}</h4>
			
                 </div>
           </div>
        </div>

       <c:if test="${not empty properties.industrysolutionsherobannerlabel}">
              <div class="btn-square-white request">
                  <a href="${buttonUrl}" target="${properties.industrysolutionsherobannerurltargettype?'_blank':'_self'}">
                      ${properties.industrysolutionsherobannerlabel}
                   </a>
               </div>
       </c:if>

	</c:when>

	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure Industry Solutions Hero Banner Component</span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>