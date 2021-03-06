<%--
  Training Landing Banner
--%>
<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%String bannerimage=properties.get("jcr:imagePath3", "");
request.setAttribute("bannerimage",bannerimage);
%>


<c:choose>
	<c:when test="${not empty properties.trainingdetailsbannertitle}">	
            <div class="common-hero-banner hds-training-detail clearfix rsImg"  ${hdscorp:bgImgAtrr(requestScope.bannerimage,properties.trainingdetailsbannermobileimage)} > 
                <div class="common-hero-banner-container">
                    <div class="col-lg-7 col-md-7 col-xs-12" >
        				    <h2 class="top-banner-heading">${properties.trainingdetailsbannertitle}</h2>
                         <c:if test="${not empty properties.trainingdetailsbannersubtitle}">
                            <h1 class="headline">${properties.trainingdetailsbannersubtitle}</h1>
                        </c:if>
                            <h4 class="sub-headline">${properties.trainingdetailsbannercontent}</h4>
                            <c:if test="${not empty properties.trainingdetailsbannerbuttonlabel}">        					
	                            <div class="btn-square-white request">
	                             <a data-formtitle="${properties.formtitle}" rel="${properties.buttonmform?'iframemodal':''}"href="${properties.trainingdetailsbannerbuttonurl}" target="${properties.trainingdetailsbannerurltargettype?'_blank':'_self'}">
	                                ${properties.trainingdetailsbannerbuttonlabel}</a>
	                            </div>
                            </c:if>

							<c:if test="${not empty properties.trainingdetailsbannergetcertifiedlabel}">        					
	                            <div class="buy-through">
                                    <a rel="${properties.mform?'iframemodal':''}" class="animateLink" href="${properties.trainingdetailsbannergetcertifiedurl}" target="${properties.trainingdetailsbannercertificateurltargettype?'_blank':'_self'}">
	                                ${properties.trainingdetailsbannergetcertifiedlabel}${properties.thirdparty?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a>
	                            </div>
                            </c:if>
                    </div>
                </div>
        </div>
	</c:when>
	<c:otherwise>
	
	</c:otherwise>
</c:choose>