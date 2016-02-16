<%--
  About CSR Hero Banner component.
--%>

<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:set var="buttonUrl" value="${properties.abouthdsbannerbuttonurl}" />

<c:if test="${fn:startsWith(buttonUrl,'/content/')}">
	<c:set var="buttonUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("buttonUrl").toString())%>" />
</c:if>

<c:choose>
	<c:when test="${not empty properties.abouthdsherobannertitle}">
		<div class="hero-product-solutions server-rack clearfix ${properties.abouthdbannerusevideomodal?'server-rack':'overview'}" style="background-image:url('${properties.abouthdsherobannermagePath}');${properties.abouthdbannerusevideomodal?'display:block;':''}">
			<div class="hero-product-solutions-container ${properties.abouthdsbannercontentalign?'floatright':''}">


               		 <div class="col-lg-6 col-md-6 col-xs-12 overRideleft">

                    <h1 class="headline">${properties.abouthdsherobannertitle}</h1>
                    <h3>${properties.abouthdsbannersubtitle}</h3>
                    <h4 class="sub-headline"><cq:text property="abouthdsherobannercontent" placeholder="click here to set text" /></h4>

                    <c:if test="${not empty properties.abouthdbannerusevideomodal}">
                        <div class="video-play hidden-lg">
                            <a href="#" class="btn-play-video"> <span class="sprite video-play-small"></span></a>
                        </div>
                    </c:if>
    
                    <c:if test="${not empty properties.abouthdsbannerbuttonlabel}">
                        <div class="btn-square-white request">
                            <a href="${buttonUrl}" target="${properties.abouthdsbannerurltargettype?'_blank':'_self'}">
                                ${properties.abouthdsbannerbuttonlabel}
                            </a>
                        </div>
                    </c:if>
                </div>

				<div class="col-lg-6 col-md-6 col-xs-12 hidden-xs hidden-sm">
                    <c:if test="${not empty properties.abouthdbannerusevideomodal}">
                        <a href="#" class="servers hidden-xs hidden-sm btn-play-video"><img src="${properties.abouthdsbannerimageoverlaypath}"></a>
                    </c:if>
                </div>

			</div>
		</div>

		<c:if test="${not empty properties.abouthdbannerusevideomodal}">
	      <div class="hero-product-solutions video clearfix" style="background-image:url('${properties.abouthdsherobannermagePath}');}">
	      	<div class="hero-product-solutions-container">
	      		<a href="#" class="close-hero"><span class="sprite icon-close-hero"></span></a>
	      			${properties.abouthdsbannervideoembedcode}
	      	</div>
	      </div>
		</c:if>


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
