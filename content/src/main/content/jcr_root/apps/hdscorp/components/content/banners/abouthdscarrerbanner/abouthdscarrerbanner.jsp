<%--
  News and insights landing banner.
--%>
<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%String bannerimage=properties.get("jcr:imagePath3", "");
request.setAttribute("bannerimage",bannerimage);
%>

<c:set var="linkUrl" value="${properties.abouthdscarrerbannerbuttonurl}" />

<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>" />
</c:if>

<c:choose>
	<c:when test="${not empty properties.abouthdscarrerbannertitle}">
<div class="common-hero-banner about-hds-career clearfix"  style="background-image:url('${requestScope.bannerimage}')">
                <div class="common-hero-banner-container">
                    <div class="col-lg-7 col-md-7 col-xs-12">
                        <h2 class="top-banner-heading">${properties.abouthdscarrerbannertitle}</h2>
                        <c:if test="${not empty properties.abouthdscarrerbannersubtitle}">
						<h1 class="headline">${properties.abouthdscarrerbannersubtitle}</h1>
						</c:if>
                        <h4 class="sub-headline">${properties.abouthdscarrerbannercontent}</h4>
                         <c:if test="${not empty properties.abouthdscarrerbannerlabel}"> 
						<div class="btn-square-white request">
                            <a href="${linkUrl}" target="${properties.abouthdscarrerbannerurltargettype?'_blank':'_self'}">${properties.abouthdscarrerbannerlabel}</a>
                        </div>
                    </c:if>
					</div>
                </div>
            </div>
			</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure AboutHDS Carrer Page banner </span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>
