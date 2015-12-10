<%--
  Homepage Hero Banner component.
--%>

<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:set var="linkUrl" value="${properties.simplebannerbuttonurl}" />

<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>" />
</c:if>



<c:choose>
	<c:when test="${not empty properties.simplebannertitle}">

		<c:set var="placardList" value="<%=PageUtils.convertMultiWidgetToList(properties,"placardTitle-placardcontent-placardIconPath")%>" />

		<div class="millennials col-xs-12 col-sm-12 col-md-12 col-lg-12" style="background-image:url('${properties.simplebannermagePath}');">
			<div class="millennials-container content-container col-md-12">
				<div class="millennials-content">
					<h1>
						${properties.simplebannertitle}
					</h1>
					<h4>${properties.simplebannersubtitle}</h4>
						${properties.simplebannercontent}
						<a href="${linkUrl}" class="learn btn-square -white" target="${properties.simplebannerurltargettype?'_blank':'_self'}">
							${properties.simpllebannerbuttonlabel}
						</a>
					<div class="return hidden-sm hidden-md hidden-lg">
						<a href="#"><span class="sprite icon-arrow-up"></span><br>Return To Top</a>
					</div>
				</div>
			</div>
		</div>


	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure SIMPLE HERO
					BANNER </span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>
