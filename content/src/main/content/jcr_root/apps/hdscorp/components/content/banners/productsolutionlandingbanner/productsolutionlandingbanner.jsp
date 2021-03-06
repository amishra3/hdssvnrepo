<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:set var="linkUrl" value="${properties.simplebannerbuttonurl}" />

<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="${hdscorp:shortURL(linkUrl)}" />
</c:if>

<c:set var="contentalignclass" value="${properties.contentalign?'floatright textrightalign':''}" />

<c:choose>
	<c:when test="${not empty properties.simplebannertitle}">
		<%-- <div class="common-hero-short-banner server-rack clearfix" style="background-image: url('${properties.simplebannermagePath}');"> --%>
		<div class="common-hero-short-banner server-rack  clearfix rsImg"  ${hdscorp:bgImgAtrr(properties.simplebannermagePath,properties.simplebannermobilemagePath)} > 
          <div class="content-container">
              <div class="col-lg-6 col-md-6 col-xs-12">
                  <h1 class="headline">${properties.simplebannertitle}</h1>
                 	<h4 class="sub-headline">${properties.simplebannersubtitle}</h4>
                  <div class="btn-square-white request">
                      <a href="${linkUrl}" title="${properties.simpllebannerbuttonlabel}">${properties.simpllebannerbuttonlabel}</a>
                  </div>
              </div>
          </div>
		</div>
	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure Product Category Banner </span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>