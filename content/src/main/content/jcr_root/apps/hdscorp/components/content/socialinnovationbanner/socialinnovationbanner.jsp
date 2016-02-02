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
                <div class="hero-social-innovation server-rack clearfix" style="background-image:url('${properties.socialinnovationbannerimagePath}');">
                <div class="hero-social-innovation-container">
                    <div class="col-lg-7 col-md-7 col-xs-12 col-no-pad">
                        <h2 class="headline">${properties.socialinnovationbannertitle}</h2>
                        <h3>${properties.socialinnovationbannersubtitle}</h3>
                        <h4 class="sub-headline">${properties.socialinnovationbannercontent}</h4>
						
                        <div class="video-play hidden-lg">
                            <a href="#" class="btn-play-video"> <span class="sprite video-play-small"></span></a>
                        </div>
						
                        <div class="btn-square-white request btn-play-video">
                            <a href="#">${properties.socialinnovationbannerbuttonlabel}</a>
                        </div>
						
                    </div>
					
                    <div class="col-lg-5 col-md-5 col-xs-12 hidden-xs hidden-sm">
                        <div class="video-play-desktop">
                            <a href="#" class="btn-play-video">
                                <img src="${properties.socialinnovationbannericonpath}">                               
                            </a>
                        </div>
                    </div>

                </div>
            </div>

			    <div class="hero-social-innovation video clearfix">
                <div class="hero-social-innovation-container">
                    <a href="#" class="close-hero"><span class="sprite icon-close-hero"></span></a>
                     ${properties.socialinnovationbannervideoembedcode}
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
