<%--
  Homepage Hero Banner component.
--%>

<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>

<div class="stop"></div>
<c:set var="linkUrl" value="${properties.contactusbannerlinkurl}" />

<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>" />
</c:if>

<c:set var="buttonUrl" value="${properties.contactusbannerbuttonurl}" />

<c:if test="${fn:startsWith(buttonUrl,'/content/')}">
	<c:set var="buttonUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("buttonUrl").toString())%>" />
</c:if>




<c:choose>
	<c:when test="${not empty properties.contactbannercontent}">

  		<div class="footer-blue col-xs-12 col-sm-12 col-md-12 col-lg-12">
  			<div class="footer-container content-container col-md-12">
                <div class="talk">
                	${properties.contactbannercontent}
                    <div class="view-phone">
						<a href="${properties.phonelinkurl}" class="reseller animateLink" target="${properties.phonetargettype?'_blank':'_self'}">${properties.phonelinktext}<span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a>
                    </div>
                </div>

  				<div class="buttons">
  					<a href="${buttonUrl}" class="information btn-square -white hidden-sm hidden-md hidden-lg" target="${properties.contactusbannerurltargettype?'_blank':'_self'}">${properties.contactusbannerbuttonlabel}</a>
  					<a href="${linkUrl}" class="reseller animateLink" target="${properties.contactuslinkurltargettype?'_blank':'_self'}">${properties.contactusbannerlinktext}<span class="glyphicon glyphicon-new-window" aria-hidden="true"></span></a>
  					<a href="${buttonUrl}" class="information btn-square-white hidden-xs" target="${properties.contactusbannerurltargettype?'_blank':'_self'}">${properties.contactusbannerbuttonlabel}</a>
  				</div>
  			</div>
  		</div>


	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure CONTACT US PROMO BANNER </span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>
