<%--
  News and insights landing banner.
--%>
<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:set var="linkUrl" value="${properties.eventbannerbuttonurl}" />

<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>" />
</c:if>

<c:choose>
	<c:when test="${not empty properties.eventbannertitle}">
        <div class="common-hero-banner news-banner clearfix" style="background-image:url(${properties.eventbannerimagePath});">
                <div class="common-hero-banner-container">
                    <div class="col-lg-12 col-md-12 col-xs-12 news-content-box" >
        				    <h2 class="top-banner-heading">${properties.eventbannertitle}</h2>
                        	<h3 class="sub-headline" style="color:#fff;">${properties.eventmaintitle}</h3>
                            <h1 class="headline">${properties.eventbannersubtitle}</h1>
                            <h4 class="sub-headline">${properties.eventbannercontent}</h4>        					
                            <div class="btn-square-white request">
                             <a href="${linkUrl}" target="${properties.eventbannerurltargettype?'_blank':'_self'}">
                                ${properties.eventbannerbuttonlabel}</a>
                            </div>
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