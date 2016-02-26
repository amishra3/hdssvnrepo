<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>

<c:set var="linkUrl" value="${properties.quotebuttontargeturl}" />
<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>" />
</c:if> 

<c:set var="bannertype" value="${properties.type}" />
<c:set var="quoteype" value="${properties.quoteype}" />
<c:set var="bannerbackgroundstyle" value="" />

<c:if test = "${bannertype eq 'customdamimage' or empty bannertype}">
	<c:set var="bannerbackgroundstyle" value=" style='background-image: url(${properties.quoteheroimagereference})'" />
</c:if>

<c:if test = "${bannertype eq 'custombkgcolor'}">
	<c:set var="bannerbackgroundstyle" value=" style='background:none&#35;${properties.quotecolorbackgroundpicker}'" />
</c:if>

<c:if test = "${quoteype=='specific-quote'}">
	<c:set var="quote" value="specific-quote" />
</c:if>

<c:if test = "${quoteype=='specific-quote partner-quote'}">
	<c:set var="quote" value="specific-quote partner-quote" />
</c:if>


<div class="${quote}" ${bannerbackgroundstyle}>
	<div class="content-container">

        <c:if test="${not empty properties.quoteheadline}">
        <p>${properties.quoteheadline}</p>
		<div class="partner-btn">
			<div class="btn-square-transparent request clearfix">
				<a href="${linkUrl}" class="animateLink" target="${properties.openinnewwindow?'_blank':'_self'}">${properties.quotebuttonlabel}<span class="glyphicon glyphicon-share animateIcon hidden-xs hidden-sm" aria-hidden="true"></span> </a>
			</div>


		</div>
        </c:if>    

        <c:if test="${not empty properties.quotecontent}">
		<p>
			<span class="sprite icon-quote open-quote"></span>${properties.quotecontent}<span
				class="sprite icon-quote close-quote"></span>
		</p>
		<cite>${properties.quoteauthor}</cite>
        </c:if>    

	</div>
</div>
