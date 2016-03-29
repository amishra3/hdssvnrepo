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

<c:set var="linkUrl" value="${properties.newsandinsightsbannerbuttonurl}" />

<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="${hdscorp:shortURL(linkUrl)}" />
</c:if>

<c:choose>
	<c:when test="${not empty properties.newsandinsightsbannertitle}">
		<%--<div class="common-hero-short-banner news-insight clearfix" style="background-image:url('${requestScope.bannerimage}')">--%>
            <div class="common-hero-short-banner news-insight clearfix rsImg" style="background-image: url();" ${hdscorp:bgImgAtrr(requestScope.bannerimage,properties.newsandinsightsbannermobileimage)} > 
                <div class="content-container">
                    <div class="col-lg-6 col-md-6 col-xs-12" >
        				    <div class="top-banner-heading">${properties.newsandinsightsbannertitle}</div>
                         <c:if test="${not empty properties.newsandinsightsbannersubtitle}">
                            <h1 class="headline">${properties.newsandinsightsbannersubtitle}</h1>
                        </c:if>
                            <h4 class="sub-headline">${properties.newsandinsightsbannercontent}</h4>
                            <c:if test="${not empty properties.newsandinsightsbannerbuttonlabel}">        					
	                            <div class="btn-square-white request cta-news">
	                             <a href="${linkUrl}" target="${properties.newsandinsightsbannerurltargettype?'_blank':'_self'}">
	                                ${properties.newsandinsightsbannerbuttonlabel}</a>
	                            </div>
                            </c:if>
                    </div>
                </div>
        </div>
	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure News and insights landing banner </span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>