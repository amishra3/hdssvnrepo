<%--
  Homepage Hero Banner component.
--%>

<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>

<div class="stop"></div>
<c:set var="linkUrl" value="${properties.contactusbannerlinkurl}" />

<c:set var="buttonUrl" value="${properties.contactusbannerbuttonurl}" />

<c:if test="${fn:startsWith(buttonUrl,'/content/')}">
	<c:set var="buttonUrl" value="${hdscorp:shortURL(buttonUrl)}" />
</c:if>


<c:choose>
	<c:when test="${not empty properties.contactbannercontent}">

  		 <div class="footer-blue col-xs-12 col-sm-12 col-md-12 col-lg-12">
  	       <div class="footer-container content-container col-lg-12">
            <div class="talk">
                	${properties.contactbannercontent}
                    
                </div>

  				<div class="buttons">
  					<a data-formtitle="${!properties.mform?'':ftitle}" href="${buttonUrl}" rel="${properties.mform?'iframemodal':''}" class="information btn-square -white" target="${properties.contactusbannerurltargettype?'_blank':'_self'}">${properties.contactusbannerbuttonlabel}</a>
                    
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


