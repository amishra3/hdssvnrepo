<%--

  Press Release share This Page component component.

  This is Press Release share This Page component

--%>
<%
	
%><%@include file="/apps/foundation/global.jsp"%>
<%
	
%><%@page session="false"%>
<%@page import="com.hdscorp.cms.util.PageUtils,sun.misc.BASE64Encoder"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@ page
	import="com.day.cq.commons.Doctype,org.apache.commons.lang3.StringEscapeUtils,org.apache.sling.api.resource.ValueMap"%>
<%@page import="com.hdscorp.cms.restservice.ShortenerURLService"%>

<div class="share-this-page clearfix">
	<div class="heading">${currentStyle.prstptitle}</div>

	<div class="share-links">


		<c:set var="url" value="<%=request.getRequestURL().toString()%>"/>
		<%
			ShortenerURLService sus = sling.getService(ShortenerURLService.class);
			String shortURL = sus
					.getShortURL(request.getRequestURL().toString() + "&keyword=test&title=hdsproducts&format=simple");
			pageContext.setAttribute("shortURL", shortURL);
			ValueMap valueMap = currentPage.getProperties();
			String title = valueMap.get("jcr:title", "null");
			String titleTW = valueMap.get("jcr:title", "null");

			String description = valueMap.get("jcr:description", "null");

			pageContext.setAttribute("pageTitle", title.replaceAll(" ", "+"));
			pageContext.setAttribute("pageTitleTW", title.replaceAll(" ", "%20"));
			if (description != "null") {
				pageContext.setAttribute("pageDescription", description.replaceAll(" ", "+"));
			}
		%>


		<c:set var="email" value="${currentStyle.prstpresscontactmailid}" />
		<c:if test="${not empty email}">
			<c:set var="encodedEmailId"
				value="${fn:replace(email, 
                                '@', '(at)')}" />
		</c:if>








		<c:set var="path" value="<%=currentPage.getPath()%>" />
		<c:if test="${fn:startsWith(path,'/content/')}">
			<c:set var="path"
				value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("path").toString())%>" />
		</c:if>

		<div class="block-share spread-share p-t-md">


			<a
				href='http://www.facebook.com/share.php?u=${url}&title=${pageTitle}+${pageDescription}'
				target="_blank"> <img alt='Facebook'
				src='${currentStyle.prstpfacebookiconpath}' /></a> <a
				href="http://twitter.com/share?url=${shortURL}&text=${pageTitleTW}"
				target="_blank"> <img alt='Twitter'
				src='${currentStyle.prstptwittericonpath}' />

			</a> <a class="icon-linkedin" rel="nofollow"
				href="http://www.linkedin.com/"
				onclick="popUp=window.open(
        'http://www.linkedin.com/shareArticle?url=${url}&title=${pageTitle}&desc=${pageDescription}',
        'popupwindow',
        'scrollbars=yes,width=800,height=400');
    popUp.focus();
    return false">
				<img alt='LinkedIn' src='${currentStyle.prstplinkediniconpath}' />
			</a> <a lang="${encodedEmailId}" href="javascript:void(0);"
				rel="emailHome"> <img src="${currentStyle.prstpemailiconpath}">
			</a>
		</div>
	</div>


	<div class="press-contact">
		<div class="heading">${currentStyle.prstppresscontactlabel}</div>
		<div class="press-contact-detail">
			${currentStyle.prstppresscontactdetails} <a lang="${encodedEmailId}"
				href="javascript:void(0);" rel="emailHome">${currentStyle.prstpresscontactmailid}</a>
		</div>
	</div>
</div>