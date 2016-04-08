<%--
  About HDS Common Hero Banner.
--%>

<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>

<c:set var="bannerimagePath" value="${properties.commonherobannerimagePath}" />

<c:if test="${fn:startsWith(bannerimagePath,'/content/')}">
	<c:set var="bannerimagePath" value="${hdscorp:shortURL(bannerimagePath)}" />
</c:if>
<c:if test="${not empty properties.commonbannerbuttonurl}">
<c:set var="burl" value="${properties.commonbannerbuttonurl}" />
 </c:if>
<c:if test="${not empty properties.cvoverlay}">
  <c:set var="vid" value="${burl}" />
  <c:set var="vidurl" value="hds.resourceLib._openvideooverlayById(${vid});"/>
</c:if>

<c:choose>
	<c:when test="${not empty properties.commonherobannertitle}">
                <%--<div class="about-hds-csr-eco server-rack clearfix" style="background-image:url('${properties.commonherobannerimagePath}');">--%>
                    <div class="about-hds-csr-eco server-rack clearfix rsImg"  ${hdscorp:bgImgAtrr(properties.commonherobannerimagePath,properties.commonherobannermobileimage)} > 
                <div class="content-container container-fluid">
                    <div class="col-lg-7 col-md-7 col-xs-12 col-no-pad">
                        <div class="video-play hidden-lg hidden-md">
                            <a href="javascript:void(0);" class="btn-play-video"> 
                                <span class="sprite">
                                    <img src="${properties.commonbannerimageoverlaypath}" alt="">
                                </span>
                            </a>
                        </div>
                        <h3>${properties.commonherobannertitle}</h3>
                        <h2 class="headline">${properties.commonherobannersubtitle}</h2>
                        <h4 class="sub-headline">${properties.commonherobannercontent}</h4>

                                 <c:if test="${not empty properties.commonbannerbuttonlabel}">
                                <div class="btn-square-white request">
                                    <a href="${properties.cvoverlay?'javascript:void(0);':burl}" onclick="${!properties.cvoverlay?'':vidurl}" target="${properties.commonbannertargettype?'_blank':'_self'}">
                                        ${properties.commonbannerbuttonlabel}${properties.thirdparty?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':''}
                                    </a>
                                </div>
                            </c:if>
								<c:set var="burl2" value="${properties.commonbannervideoembedcode}" />
                                        <c:if test="${not empty properties.cvoverlay2}">
                                          <c:set var="vid2" value="${burl2}" />
                                <c:set var="vidurl2" value="hds.resourceLib._openvideooverlayById(${vid2});"/>

                             </c:if>

                        <c:if test="${not empty properties.commonherobannerbuttonlabel}">
                        <div class="video-play hidden-lg">
                            <a href="${properties.cvoverlay2?'javascript:void(0);':burl2}" onclick="${!properties.cvoverlay2?'':vidurl2}" target="${properties.commonbannertargettype2?'_blank':'_self'}" class="btn-play-video"> <span class="sprite video-play-small"></span></a>
                        </div>


                        <div class="btn-square-white request btn-play-video">
                            <a href="#">${properties.commonherobannerbuttonlabel}</a>
                        </div>
						  </c:if>
                    </div>

                    <div class="col-lg-5 col-md-5 col-xs-12 hidden-xs hidden-xs hidden-sm">
                        <div class="video-play-desktop">
                            <a href="${properties.cvoverlay2?'javascript:void(0);':burl2}" onclick="${!properties.cvoverlay2?'':vidurl2}" target="${properties.commonbannertargettype2?'_blank':'_self'}" class="btn-play-video">
                                <img src="${properties.commonbannerimageoverlaypath}" alt="">                               
                            </a>
                        </div>
                    </div>

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
