<%--
  News and insights landing banner.
--%>
<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:set var="linkUrl" value="${properties.newsandinsightsbannerbuttonurl}" />

<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>" />
</c:if>

<c:choose>
	<c:when test="${not empty properties.newsandinsightsbannertitle}">
		<div class="common-hero-banner news-banner clearfix" style="background-image:url('${properties.newsandinsightsbannerimagePath}');">
                <div class="common-hero-banner-container">
                    <div class="col-lg-8 col-md-12 col-xs-12 col-no-pad news-content-box" >
        				    <h2 class="top-banner-heading">${properties.newsandinsightsbannertitle}</h2>
                            <h1 class="headline">${properties.newsandinsightsbannersubtitle}</h1>
                            <h4 class="sub-headline">${properties.newsandinsightsbannercontent}</h4>
                            <c:if test="${not empty properties.newsandinsightsbannerbuttonlabel}">        					
	                            <div class="btn-square-white request">
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