<%--
  About HDS Common Hero Banner.
--%>

<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>

<c:set var="bannerimagePath" value="${properties.commonherobannerimagePath}" />

<c:if test="${fn:startsWith(bannerimagePath,'/content/')}">
	<c:set var="bannerimagePath" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("bannerimagePath").toString())%>" />
</c:if>

<c:choose>
	<c:when test="${not empty properties.commonherobannertitle}">
                <div class="about-hds-csr-eco server-rack clearfix" style="background-image:url('${properties.commonherobannerimagePath}');">
                <div class="content-container container-fluid">
                    <div class="col-lg-7 col-md-7 col-xs-12 col-no-pad">
                        <h3>${properties.commonherobannertitle}</h3>
                        <h2 class="headline">${properties.commonherobannersubtitle}</h2>
                        <h4 class="sub-headline">${properties.commonherobannercontent}</h4>

                        <c:if test="${not empty properties.commonherobannerbuttonlabel}">
                        <div class="video-play hidden-lg">
                            <a href="#" class="btn-play-video"> <span class="sprite video-play-small"></span></a>
                        </div>


                        <div class="btn-square-white request btn-play-video">
                            <a href="#">${properties.commonherobannerbuttonlabel}</a>
                        </div>
						  </c:if>
                    </div>

                    <div class="col-lg-5 col-md-5 col-xs-12 hidden-xs hidden-xs hidden-sm">
                        <div class="video-play-desktop">
                            <a href="#" class="btn-play-video">
                                <img src="${properties.commonherobannericonpath}">                               
                            </a>
                        </div>
                    </div>

                </div>
            </div>

			    <div class="hero-social-innovation video clearfix">
                <div class="hero-social-innovation-container">
                    <a href="#" class="close-hero"><span class="sprite icon-close-hero"></span></a>
                     ${properties.commonherobannervideoembedcode}
                </div>
            </div> 

    </c:when>

    <c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure Social Innovation Banner Component </span>
			</p>
		</wcmmode:edit>
	</c:otherwise>

</c:choose>
