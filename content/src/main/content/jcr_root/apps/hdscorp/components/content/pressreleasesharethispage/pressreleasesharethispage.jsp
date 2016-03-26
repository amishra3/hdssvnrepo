
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>
<%@page import="com.hdscorp.cms.util.PageUtils,sun.misc.BASE64Encoder"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@ page
	import="com.day.cq.commons.Doctype,org.apache.commons.lang3.StringEscapeUtils,org.apache.sling.api.resource.ValueMap"%>
<%@page import="com.hdscorp.cms.restservice.ShortenerURLService"%>



<div class="share-this-page clearfix">
	<div class="heading">${currentStyle.prstptitle}</div>

	<div class="share-links">




        <%
			ShortenerURLService sus = sling.getService(ShortenerURLService.class);
        String shortURL = sus
				.getShortURL(request.getRequestURL().toString());
             pageContext.setAttribute("shortURL", shortURL);
             ValueMap valueMap = currentPage.getProperties();

		%>



		<c:set var="title" value='<%=valueMap.get("jcr:title", "null")%>' />
		<c:if test="${not empty title}">
			<c:set var="pageTitle" value='${fn:replace(title, " ", "+")}' />


            <c:set var="twitterPageTitle"
				value='${fn:replace(title, " ", "%20")}' />

			 <c:set var="twitterPageTitle" value="${fn:substring(twitterPageTitle, 0, 139)}" />
            <c:set var="count"  value="${fn:length(twitterPageTitle)- fn:length(shortURL)}"/>
             <c:set var="twitterPageTitle" value="${fn:substring(twitterPageTitle, 0, count)}" />


		</c:if>

        <c:set var="desc" value='<%=valueMap.get("jcr:description", "null")%>' />
		<c:if test="${not empty desc}">
			<c:set var="desc" value='${fn:replace(desc, " ", "+")}' />
		</c:if>
		<c:set var="email" value="${currentStyle.prstpresscontactmailid}" />
		<c:if test="${not empty email}">
			<c:set var="encodedEmailId"
				value="${fn:replace(email, 
                                '@', '(at)')}" />
		</c:if>


		<c:set var="path" value="<%=request.getRequestURL().toString()%>" />

		<c:set var="path"
			value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("path").toString())%>" />

		<div class="block-share spread-share p-t-md">


            <c:choose>
          <c:when test="${not empty desc} " >
           <a
				href='http://www.facebook.com/share.php?u=${path}&title=${pageTitle}+${desc}'
				target="_blank"> <img alt='Facebook'
				src='${currentStyle.prstpfacebookiconpath}' /></a> 


    </c:when>

    <c:otherwise>

 <a href='http://www.facebook.com/share.php?u=${path}&title=${pageTitle}'
				target="_blank"> <img alt='Facebook'
				src='${currentStyle.prstpfacebookiconpath}' /></a> 
    </c:otherwise>
                </c:choose>




            <a
				href="http://twitter.com/share?url=${shortURL}&text=${twitterPageTitle}"
				target="_blank"> <img alt='Twitter'
				src='${currentStyle.prstptwittericonpath}' />

			</a> <a class="icon-linkedin" rel="nofollow"
				href="http://www.linkedin.com/"
				onclick="popUp=window.open(
        'http://www.linkedin.com/shareArticle?url=${path}&title=${pageTitle}&desc=${desc}',
        'popupwindow',
        'scrollbars=yes,width=800,height=400');
    popUp.focus();
    return false">
				<img alt='LinkedIn' src='${currentStyle.prstplinkediniconpath}' />
			</a> <a lang="${encodedEmailId}" href="javascript:void(0);"
				rel="emailHome"> <img alt='Email' src="${currentStyle.prstpemailiconpath}">
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

