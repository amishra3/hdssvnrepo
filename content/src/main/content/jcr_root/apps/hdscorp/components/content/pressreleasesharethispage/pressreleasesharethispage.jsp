<%--

  Press Release share This Page component component.

  This is Press Release share This Page component

--%>
<%
%><%@include file="/apps/foundation/global.jsp"%>
<%
%><%@page session="false"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>


<div class="share-this-page clearfix">
	<div class="heading">${currentStyle.prstptitle}</div>

	<div class="share-links">


<% 
     String url = request.getRequestURL().toString();    
pageContext.setAttribute("url", url);

%>

		<c:set var="path" value="<%=currentPage.getPath()%>" />
		<c:if test="${fn:startsWith(path,'/content/')}">
			<c:set var="path"
				value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("path").toString())%>" />
		</c:if>
		<a
        href='http://www.facebook.com/share.php?u=${url}'
			target="_blank"> <img alt='Facebook'
			src='${currentStyle.prstpfacebookiconpath}' /></a> <a
			href="http://twitter.com/share?url=${url}"
			target="_blank"> <img alt='Twitter'
			src='${currentStyle.prstptwittericonpath}' />

		</a> <a class="icon-linkedin" rel="nofollow"
			href="http://www.linkedin.com/"
			onclick="popUp=window.open(
        'http://www.linkedin.com/shareArticle?url=${url}',
        'popupwindow',
        'scrollbars=yes,width=800,height=400');
    popUp.focus();
    return false">
			<img alt='LinkedIn' src='${currentStyle.prstplinkediniconpath}' />
		</a> <a
			href="mailto:${currentStyle.prstpresscontactmailid}"> <img src="${currentStyle.prstpemailiconpath}">
		</a>
	</div>
</div>
<div class="press-contact">
	<div class="heading">${currentStyle.prstppresscontactlabel}</div>
	<div class="press-contact-detail">
		${currentStyle.prstppresscontactdetails} <a
			href="mailto:${currentStyle.prstpresscontactmailid}" target="_blank">${currentStyle.prstpresscontactmailid}</a>
	</div>
</div>
</div>