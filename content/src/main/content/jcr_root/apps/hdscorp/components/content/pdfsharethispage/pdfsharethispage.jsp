<%--Share This Page component.--%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="org.apache.sling.api.resource.ValueMap"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>

<%@page import="com.hdscorp.cms.restservice.ShortenerURLService"%>
<sling:adaptTo adaptable="${resource}"
	adaptTo="com.hdscorp.cms.slingmodels.ShareThisPageModel"
	var="shareThisPageModel" />


<c:set var="pdfPath" value="<%=request.getRequestURL().toString()%>" />
<%
			ShortenerURLService sus = sling.getService(ShortenerURLService.class);
		    ValueMap valueMap = currentPage.getProperties();
			String shortPath = PathResolver.getShortURLPath(pageContext.getAttribute("pdfPath").toString());
			String domainVal = (String)pageProperties.getInherited("domain", "");
			String absolutePath = PathResolver.getAbsoluteDomainUrl(shortPath, domainVal);
			String shortURL = sus.getShortURL(absolutePath);
		    pageContext.setAttribute("shortURL", shortURL);
		
		%>


<c:if test="${not empty pdfTitle}">
	<c:set var="twitterPageTitle" value="${fn:replace(pdfTitle,' ','%20')}" />
	<c:set var="twitterPageTitle"
		value='${fn:replace(twitterPageTitle, "&nbsp;", "%20")}' />
	<c:if test="${fn:length(twitterPageTitle)>139}">
		<c:set var="twitterPageTitle"
			value="${fn:substring(twitterPageTitle, 0, 139)}" />

		<c:set var="count"
			value="${fn:length(twitterPageTitle)- fn:length(shortURL)}" />

		<c:set var="twitterPageTitle"
			value="${fn:substring(twitterPageTitle, 0, count)}" />

		<c:set var="twittitle"
			value="${fn:substring(twitterPageTitle, fn:length(twitterPageTitle)-3, fn:length(twitterPageTitle))}" />

		<c:set var="twitterPageTitle"
			value="${fn:substring(twitterPageTitle, 0, count-3)}" />

		<c:set var="twittitle" value="${fn:replace(twittitle, '%', '%20')}" />


		<c:set var="twitterPageTitle" value="${twitterPageTitle}${twittitle}" />
	</c:if>
</c:if>

<c:set var="pdfTitleShare" value="${fn:replace(pdfTitle,' ','+')}" />

<c:set var="pdfDescShare" value="${fn:replace(pdfDesc,' ','+')}" />


${shareThisPageModel.stpTitle}&nbsp; &nbsp;
<a
	href="http://twitter.com/share?url=${shortURL}&text=${twitterPageTitle}"
	target="_blank"> <img alt='Twitter'
	src='${shareThisPageModel.stpTwitterIconPath}' /></a>
&nbsp;
<a
	href='http://www.facebook.com/share.php?u=<%=absolutePath%>&title=${pdfTitleShare}+${pdfDescShare}'
	target="_blank"> <img alt='Facebook'
	src='${shareThisPageModel.stpFacebookIconPath}' /></a>
&nbsp;
<a class="icon-linkedin" rel="nofollow" href="http://www.linkedin.com/"
	onclick="popUp=window.open('http://www.linkedin.com/shareArticle?url=<%=absolutePath %>&title=${pdfTitleShare}&desc=${pdfTitleShare}','popupwindow','scrollbars=yes,width=800,height=400');popUp.focus(); return false"><img
	alt='LinkedIn' src='${shareThisPageModel.stpLinkedinIconPath}' /></a>


