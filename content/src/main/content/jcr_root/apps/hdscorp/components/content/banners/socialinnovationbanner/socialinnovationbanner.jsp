<%--
  Social Innovation Banner Component.
--%>

<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>

<c:set var="bannerimagePath" value="${properties.socialinnovationbannerimagePath}" />

<c:if test="${fn:startsWith(bannerimagePath,'/content/')}">
	<c:set var="bannerimagePath" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("bannerimagePath").toString())%>" />
</c:if>

<c:choose>
	<c:when test="${not empty properties.socialinnovationbannertitle}">
                <div class="common-hero-banner server-rack clearfix" style="background-image:url('${properties.socialinnovationbannerimagePath}');">
                <div class="common-hero-banner-container">
                    <div class="col-lg-6 col-md-6 col-xs-12">
                        <h2 class="headline">${properties.socialinnovationbannertitle}</h2>
                        <h3>${properties.socialinnovationbannersubtitle}</h3>
                        <h4 class="sub-headline">${properties.socialinnovationbannercontent}</h4>

                        <c:if test="${not empty properties.socialinnovationbannervideoembedcode}">
                        <div class="video-play hidden-lg hidden-md">
                            <a href="#" class="btn-play-video"> <span class="sprite video-play-small"></span></a>
                        </div>
                            </c:if> 

                        <c:if test="${not empty properties.socialinnovationbannerbuttonlabel}">
                        <div class="btn-square-white request btn-play-video">
                            <a href="#">${properties.socialinnovationbannerbuttonlabel}</a>
                        </div>
						</c:if> 
                    </div>

					<c:if test="${not empty properties.socialinnovationbannervideoembedcode}">
                    <div class="col-lg-5 col-md-5 col-xs-12 hidden-xs hidden-sm video-section">
                        <div class="video-play-desktop">
                            <a href="#" class="btn-play-video">
                                <img src="${properties.socialinnovationbannericonpath}">                               
                            </a>
                        </div>
                    </div>
                    </c:if> 
                </div>
            </div>

                <c:if test="${not empty properties.socialinnovationbannervideoembedcode}">
			    <div class="common-hero-banner video clearfix" style="background-image:url('${properties.socialinnovationbannerimagePath}');">
                <div class="common-hero-banner-container">
                    <a href="#" class="close-hero"><span class="sprite icon-close-hero"></span></a>
                     ${properties.socialinnovationbannervideoembedcode}
                </div>
                </div> 
                </c:if> 
    </c:when>

    <c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure Social Innovation Banner Component </span>
			</p>
		</wcmmode:edit>
	</c:otherwise>

</c:choose>
