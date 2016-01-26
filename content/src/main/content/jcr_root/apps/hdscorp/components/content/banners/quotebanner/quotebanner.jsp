<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>


<c:set var="bannertype" value="${properties.type}" />
<c:set var="bannerbackgroundstyle" value="" />

<c:if test = "${bannertype eq 'customdamimage' or empty bannertype}">
	<c:set var="bannerbackgroundstyle" value=" style='background-image: url(${properties.quoteheroimagereference})'" />
</c:if>

<c:if test = "${bannertype eq 'custombkgcolor'}">
	<c:set var="bannerbackgroundstyle" value=" style='background:none&#35;${properties.quotecolorbackgroundpicker}'" />
</c:if>



<div class="specific-quote" ${bannerbackgroundstyle}>
	<div class="content-container">
		<p>
			<span class="sprite icon-quote open-quote"></span>${properties.quotecontent}<span
				class="sprite icon-quote close-quote"></span>
		</p>
		<cite>${properties.quoteauthor}</cite>
	</div>
</div>
