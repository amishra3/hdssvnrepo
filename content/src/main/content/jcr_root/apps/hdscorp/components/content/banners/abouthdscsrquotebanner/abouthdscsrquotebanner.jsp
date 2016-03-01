<%--
  About HDS CSR Quote Banner Component.
--%>
<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:set var="linkUrl" value="${properties.ctatargeturl}" />

<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>" />
</c:if> 

<c:set var="bannertype" value="${properties.type}" />
<c:set var="bannerbackgroundstyle" value="" />

<c:if test = "${bannertype == 'customdamimage'}">
	<c:set var="bannerbackgroundstyle" value=" style='background-image: url(${properties.bannerbackgroundimage})''" />
</c:if>


<c:if test = "${bannertype=='white'}">

	<c:set var="csrquote" value="about-hds-csr-quote csr-quote-1 clearfix" />
</c:if>
<c:if test = "${bannertype=='black'}">

	<c:set var="csrquote" value="about-hds-csr-quote csr-quote-2 clearfix" />
</c:if>
<c:if test = "${bannertype=='red'}">

	<c:set var="csrquote" value="about-hds-csr-quote csr-quote-3 clearfix" />
</c:if>

<c:if test = "${bannertype=='blue'}">

	<c:set var="csrquote" value="about-hds-csr-quote csr-quote-4 clearfix" />
</c:if>

<c:if test = "${bannertype=='customdamimage'}">

	<c:set var="csrquote" value="about-hds-csr-quote csr-quote-4 clearfix" />
</c:if>


<c:choose>
	<c:when test="${not empty properties.quoteheadline}">

    <div class="${csrquote}" ${bannerbackgroundstyle}>
    <div class="about-hds-csr-quote-container">
        <div class="col-md-10 col-md-offset-1 clearfix">
            <h2 class="headline">${properties.quoteheadline}</h2>
            <p> <span class="sprite icon-quote open-quote"></span>${properties.quotecontent}<span
				class="sprite icon-quote close-quote"></span></p>
            <c:if test="${not empty properties.ctalabel}">
            <div class="learn-more">
                 <div class="learn-more-csr-quote btn-square-white">
                     <a href="${linkUrl}" target="${properties.openinnewwindow?'_blank':'_self'}">${properties.ctalabel}</a>
                 </div>
            </div>
            </c:if>
        </div>
    </div>
    </div>

	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure About HDS CSR Quote Banner Component</span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>         