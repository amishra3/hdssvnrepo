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
	<c:set var="linkUrl" value="${hdscorp:shortURL(linkUrl)}" />
</c:if>

<c:choose>
	<c:when test="${not empty properties.abouthdscarrerbannertitle}">
<%-- <div class="common-hero-banner about-hds-career new-abouthds-banner clearfix"  style="background-image:url('${requestScope.bannerimage}')">--%>
     <div class="common-hero-banner about-hds-career new-abouthds-banner clearfix rsImg"  style="background-image: url();" ${hdscorp:bgImgAtrr(requestScope.bannerimage,properties.abouthdscarrerbannermobileimage)} > 
                <div class="common-hero-banner-container">
                        <div class="col-lg-7 col-md-7 col-xs-12">
    
                            <h2 class="top-banner-heading">${properties.abouthdscarrerbannertitle}</h2>
    
                            <c:if test="${not empty properties.abouthdscarrerbannersubtitle}">
                            <h1 class="headline">${properties.abouthdscarrerbannersubtitle}</h1>
                            </c:if>

                            <h4 class="sub-headline">${properties.abouthdscarrerbannercontent}</h4>
                         </div>
				 </div>
				<div class="red-bg">
                	<div class="content-container">
                	<div class="col-lg-10 col-md-10 col-xs-12">
                         <div class="cta-text">
                                <h4>${properties.promotext}</h4>
                             <c:if test="${not empty properties.abouthdscarrerbannerlabel}"> 
                                <div class="btn-square-white request cta-btn">
                                    <a href="${linkUrl}" target="${properties.abouthdscarrerbannerurltargettype?'_blank':'_self'}">${properties.abouthdscarrerbannerlabel}${properties.abouthdscarrerbannerurltargettype?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':''}</a>
                                </div>
                              </c:if>
                            </div>
                    </div>
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

