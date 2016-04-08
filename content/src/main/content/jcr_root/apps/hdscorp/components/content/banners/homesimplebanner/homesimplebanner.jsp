<%--
  Homepage Hero Banner component.
--%>

<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:set var="linkUrl" value="${properties.simplebannerbuttonurl}" />

<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="${hdscorp:shortURL(linkUrl)}" />
</c:if>


<c:if test="${empty properties.ishomebanner or properties.ishomebanner==1}">
	<c:set var="isHomeBanner" value="${true}"/>
</c:if>

<c:choose>
	<c:when test="${not empty properties.simplebannertitle}">

		<c:set var="placardList" value="<%=PageUtils.convertMultiWidgetToList(properties,"placardTitle-placardcontent-placardIconPath")%>" />
        
<%--<div class="millennials ${!isHomeBanner?'services-training':''} clearfix" style="background-image:url('${properties.simplebannermagePath}');">--%>
    <div class="millennials ${!isHomeBanner?'services-training':''} clearfix rsImg"  ${hdscorp:bgImgAtrr(properties.simplebannermagePath,properties.simplebannermobileimage)} > 
			<div class="millennials-container content-container ${!isHomeBanner?'col-md-12':''}">
				<div class="millennials-content">
					<h1>
						${properties.simplebannertitle}
					</h1>
					<h3>${properties.simplebannersubtitle}</h3>
					<div class="blurb-container clearfix">
						<p class="${!isHomeBanner?'col-md-5':'col-sm-8 col-md-6'}">${properties.simplebannercontent}</p>
					</div>
					<c:if test="${not empty properties.simpllebannerbuttonlabel}">
						<div class="btn-square-white learn-millennials">
							<a href="${linkUrl}" class="learn -white" target="${properties.simplebannerurltargettype?'_blank':'_self'}">
                        	${properties.simpllebannerbuttonlabel}${properties.thirdparty?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':''}
							</a>
						</div>
					</c:if>	
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