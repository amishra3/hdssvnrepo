<%--
  Homepage Hero Banner component.
--%>

<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:set var="buttonUrl" value="${properties.simplebannerbuttonurl}" />

<c:if test="${fn:startsWith(buttonUrl,'/content/')}">
	<c:set var="buttonUrl" value="${hdscorp:shortURL(buttonUrl)}" />
</c:if>

<c:set var="linkUrl" value="${properties.simplebannerlinkurl}" />

<c:if test="${fn:startsWith(linkUrl,'/content/')}">
		<c:set var="linkUrl" value="${hdscorp:shortURL(linkUrl)}" />
</c:if>


<c:choose>
	<c:when test="${not empty properties.simplebannertitle}">
		<div
			<%-- class="hero-product-solutions clearfix ${properties.simplebannerusevideomodal?'server-rack':'overview'}"
			style="background-image:url('${properties.simplebannermagePath}');${properties.simplebannerusevideomodal?'display:block;':''}"> --%>
            	 class="hero-product-solutions clearfix ${properties.simplebannerusevideomodal?'server-rack':'overview'} rsImg"
	        style="background-image: url();" ${hdscorp:bgImgAtrr(properties.simplebannermagePath,properties.heromobileimage)} >
			<div
				class="hero-product-solutions-container ${properties.simplebannercontentalign?'floatright':''}">


				<div class="col-lg-6 col-md-6 col-xs-12 overRideleft">

					<h1 class="headline">${properties.simplebannertitle}</h1>
					<h3>${properties.simplebannersubtitle}</h3>
					<div class="sub-headline">
						<cq:text property="simplebannercontent"
							placeholder="click here to set text" />
					</div>

					<c:if test="${not empty properties.simplebannerusevideomodal}">

						<div class="video-play hidden-lg">
							<c:choose>
								<c:when
									test="${not empty properties.simplebannervideoembedcode}">
									<a href="#" class="btn-play-video"> <span
										class="sprite video-play-small"></span></a>
								</c:when>
								<c:otherwise>
								</c:otherwise>
							</c:choose>

						</div>
					</c:if>

					<c:if test="${not empty properties.simpllebannerbuttonlabel}">
						<div class="btn-square-white request">
							<a href="${buttonUrl}" rel="iframemodal" target="${properties.simplebannerurltargettype?'_blank':'_self'}">
								${properties.simpllebannerbuttonlabel} </a>
						</div>
					</c:if>
					<c:if test="${not empty properties.simpllebannerlinklabel}">
						<div class="buy-through">
							<!-- <a href="${linkUrl}" target="${properties.simplebannerlinkurltargettype?'_blank':'_self'}">${properties.simpllebannerlinklabel} <span class="sprite icon-caret-white"></span></a> -->
							<a class="animateLink" href="${linkUrl}"
								target="${properties.simplebannerlinkurltargettype?'_blank':'_self'}">${properties.simpllebannerlinklabel}
								<span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>
							</a>
						</div>
					</c:if>
				</div>


				<c:if test="${not empty properties.simplebannerusevideomodal}">
					<div
						class="col-lg-6 col-md-6 col-xs-12 hidden-xs hidden-sm video-section"
						style="background-image:url('${properties.simplebannerimageoverlaypath}');">
						<c:choose>
							<c:when test="${not empty properties.thirdpartyvideolink}">
                                <a href="${properties.thirdpartyvideolink}" target="_blank" class="servers hidden-xs hidden-sm btn-play-video"></a>
							</c:when>
							<c:otherwise>
                                	<c:choose>
                                            <c:when test="${not empty properties.simplebannervideoembedcode}">
                                                <a href="#" class="servers hidden-xs hidden-sm btn-play-video"></a>
                                            </c:when>
                                        <c:otherwise>
                                        </c:otherwise>
                                    </c:choose>

							</c:otherwise>
						</c:choose>








					</div>
				</c:if>
			</div>
		</div>
		<c:if test="${empty properties.thirdpartyvideolink}">
		<c:if test="${not empty properties.simplebannerusevideomodal}">
			<div class="hero-product-solutions video clearfix"
				style="background-image:url('${properties.simplebannermagePath}');">
				<div class="hero-product-solutions-container">
					<c:choose>
						<c:when test="${not empty properties.simplebannervideoembedcode}">
							<a href="#" class="close-hero"><span
								class="sprite icon-close-hero"></span></a>
                                    ${properties.simplebannervideoembedcode}
                     </c:when>
						<c:otherwise>
							<span class="sprite icon-close-hero"></span>
						</c:otherwise>
					</c:choose>
				</div>
			</div>
		</c:if>
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
