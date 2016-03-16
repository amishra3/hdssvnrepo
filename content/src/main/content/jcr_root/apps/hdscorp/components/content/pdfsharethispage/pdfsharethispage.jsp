<%--Share This Page component.--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>

<%@page import="com.hdscorp.cms.restservice.ShortenerURLService"%>
<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.ShareThisPageModel" var="shareThisPageModel" />



<c:set var="titleTw" value="${fn:replace(pdfTitle,' ','%20')}" />

<c:set var="pdfTitleShare" value="${fn:replace(pdfTitle,' ','+')}" />

<c:set var="pdfDescShare" value="${fn:replace(pdfDesc,' ','+')}" />


${shareThisPageModel.stpTitle}&nbsp; &nbsp;
<a href="http://twitter.com/share?url=${pdfPath}&text=${titleTw}"
	target="_blank"> <img alt='Twitter'
	src='${shareThisPageModel.stpTwitterIconPath}' />

</a>
&nbsp;
<a
	href='http://www.facebook.com/share.php?u=${pdfPath}&title=${pdfTitleShare}+${pdfDescShare}'
	target="_blank"> <img alt='Facebook'
	src='${shareThisPageModel.stpFacebookIconPath}' /></a>
&nbsp;

<a class="icon-linkedin" rel="nofollow" href="http://www.linkedin.com/"
	onclick="popUp=window.open(
        'http://www.linkedin.com/shareArticle?url=${pdfPath}&title=${pdfTitleShare}&desc=${pdfTitleShare}',
        'popupwindow',
        'scrollbars=yes,width=800,height=400');
    popUp.focus();
    return false">
	<img alt='LinkedIn' src='${shareThisPageModel.stpLinkedinIconPath}' />
</a>
&nbsp;

<a lang="" href="javascript:void(0);" rel="emailHome"> <img alt=""
	src="${shareThisPageModel.stpEmailIconPath}">
</a>

