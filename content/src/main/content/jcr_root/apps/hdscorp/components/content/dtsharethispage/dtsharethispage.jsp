<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>
<%@page import="com.hdscorp.cms.util.PageUtils,sun.misc.BASE64Encoder"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@ page
	import="com.day.cq.commons.Doctype,org.apache.commons.lang3.StringEscapeUtils,org.apache.sling.api.resource.ValueMap"%>
<%@page import="com.hdscorp.cms.restservice.ShortenerURLService"%>

<c:set var="path" value="<%=request.getRequestURL().toString()%>" />
<%
	ShortenerURLService sus = sling.getService(ShortenerURLService.class);
	//String shortURL = sus.getShortURL(request.getRequestURL().toString());
	ValueMap valueMap = currentPage.getProperties();
	String shortPath = PathResolver.getShortURLPath(pageContext.getAttribute("path").toString());
	String domainVal = (String) pageProperties.getInherited("domain", "");
	String absolutePath = PathResolver.getAbsoluteDomainUrl(shortPath, domainVal);
	String shortURL = sus.getShortURL(absolutePath);
	pageContext.setAttribute("shortURL", shortURL);
%>
<c:set var="title" value='<%=valueMap.get("jcr:title", "null")%>' />

<c:if test="${not empty title}">
	<c:set var="pageTitle" value='${fn:replace(title, " ", "+")}' />

	<c:set var="twitterPageTitle" value='${fn:replace(title, " ", "%20")}' />

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

<c:set var="desc" value='<%=valueMap.get("jcr:description", "null")%>' />
<c:if test="${not empty desc}">
	<c:set var="desc" value='${fn:replace(desc, " ", "+")}' />
</c:if>

<c:set var="path" value="<%=absolutePath%>" />
<div class="share-this-page hidden-xs hidden-sm clearfix">
	${currentStyle.dtstptitle}
	<div class="share-links">

		<div class="block-share spread-share p-t-md">
			<a
				href="http://twitter.com/share?url=${shortURL}&text=${twitterPageTitle}"
				target="_blank"> <img alt='Twitter'
				src='${currentStyle.dtstptwittericonpath}' />

			</a>

			<c:choose>
				<c:when test="${not empty desc} ">
					<a
						href='http://www.facebook.com/share.php?u=${path}&title=${pageTitle}+${desc}'
						target="_blank"> <img alt='Facebook'
						src='${currentStyle.dtstpfacebookiconpath}'></a>


				</c:when>

				<c:otherwise>

					<a
						href='http://www.facebook.com/share.php?u=${path}&title=${pageTitle}'
						target="_blank"> <img alt='Facebook'
						src='${currentStyle.dtstpfacebookiconpath}'></a>
				</c:otherwise>
			</c:choose>

			<a
				href='https://www.linkedin.com/shareArticle?mini=true&url=${path}&title=${pageTitle}&desc=${desc}'
				target="_blank"> <img alt='LinkedIn'
				src='${currentStyle.dtstplinkediniconpath}'></a>
		</div>
	</div>
	
	</div>
	

<div class="dt-mobile-share hidden-md hidden-lg">
	
<div class="share-mobile">
   <span class="icon-share-mobile"></span>
</div>


<div class="share-mobile-container">
   <div class="share-section">
      <div class="col-sm-12 col-no-pad">
	    <label>${currentStyle.mbdtstptitle}:</label>
	  </div>
	  <div class="col-sm-12 share-ico-box col-no-pad">
		 <a
				href="http://twitter.com/share?url=${shortURL}&text=${twitterPageTitle}"
				target="_blank"> <img alt='Twitter'
				src='${currentStyle.mbdtstptwittericonpath}' />

		</a>
		<c:choose>
				<c:when test="${not empty desc} ">
					<a
						href='http://www.facebook.com/share.php?u=${path}&title=${pageTitle}+${desc}'
						target="_blank"> <img alt='Facebook'
						src='${currentStyle.mbdtstpfacebookiconpath}'></a>


				</c:when>

				<c:otherwise>

					<a
						href='http://www.facebook.com/share.php?u=${path}&title=${pageTitle}'
						target="_blank"> <img alt='Facebook'
						src='${currentStyle.mbdtstpfacebookiconpath}'></a>
				</c:otherwise>
			</c:choose>
			
		<a
				href='https://www.linkedin.com/shareArticle?mini=true&url=${path}&title=${pageTitle}&desc=${desc}'
				target="_blank"> <img alt='LinkedIn'
				src='${currentStyle.mbdtstplinkediniconpath}'></a>
	  </div>
   </div>
   </div>
    </div>
