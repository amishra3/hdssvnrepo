<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:set var="linkUrl" value="${properties.abouthdsbannerbuttonurl}" />

<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>" />
</c:if>



<c:choose>
	<c:when test="${not empty properties.abouthdsbannertitle}">

		<div class="about-hds-career-leader bg-cover-career clearfix" style="background: url('${properties.abouthdsbannermagePath}') 50% 0% / cover no-repeat;;">
               <div class="content-container container-fluid">
                   <div class="col-sm-6 col-xs-12 col-no-pad ${ not empty properties.abouthdsbannercontentalign?'about-hds-leader-content':'about-hds-career-content'}">
                       <h2>${properties.abouthdsbannertitle}</h2>
                       <h4>${properties.abouthdsbannersubtitle}</h4>
                       <div class="blurb-container clearfix">
                           <p>
                               ${properties.abouthdsbannercontent}
                           </p>
                       </div>
                       <div class="learn-about-hds-career-leader btn-square-white">
                           <a href="${linkUrl}" target="${not empty properties.abouthdsbannerurltargettype?'_blank':'_self'}">${properties.abouthdsbannerbuttonlabel}</a>
                       </div>
                   </div>
               </div>
		</div>

	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure About HDS Banner </span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>
