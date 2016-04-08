<%--

  Patners Program Business Benifit component.

  This is partners program business benifit component

--%><%
%><%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%
%><%@page session="false" %><%
%><%
	// TODO add you code here
%>

<sling:adaptTo adaptable="${resource}"
	adaptTo="com.hdscorp.cms.slingmodels.PartnerProgramBusinessBenifitModel"
	var="partnerProgramBusinessBenifitModel" />

<c:set var="learnMoreLink" value="${partnerProgramBusinessBenifitModel.learnMoreLink}" />
<c:if test="${fn:startsWith(learnMoreLink,'/content/')}">
	<c:set var="learnMoreLink"
		value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("learnMoreLink").toString())%>" />
</c:if>

<c:set var="signUpLink" value="${partnerProgramBusinessBenifitModel.signUpLink}" />
<c:if test="${fn:startsWith(signUpLink,'/content/')}">
	<c:set var="signUpLink"
		value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("learnMoreLink").toString())%>" />
</c:if>

<c:set var="optionalProgramCallToActionLink" value="${partnerProgramBusinessBenifitModel.optionalProgramCallToActionLink}" />
<c:if test="${fn:startsWith(optionalProgramCallToActionLink,'/content/')}">
	<c:set var="optionalProgramCallToActionLink"
		value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("learnMoreLink").toString())%>" />
</c:if>
							<c:if test="${not empty properties.pvoverlay}">
                              <c:set var="vid" value="${optionalProgramCallToActionLink}" />
                                <c:set var="vidurl" value="hds.resourceLib._openvideooverlayById(${vid});"/>
                             </c:if>

<div class="business-specific partner-hexContain clearfix">
                <div class="business-specific-container clearfix content-container">
                    <div class="specific-benefit row">
                        <div class="content-container clearfix">
                            <div class="col-xs-12 col-md-8">
                                <h2>${partnerProgramBusinessBenifitModel.headLine}</h2>
                                <p>${partnerProgramBusinessBenifitModel.description}</p>
                                <div class="btn-square-white signup">
                                    <a href="${signUpLink}" target="${partnerProgramBusinessBenifitModel.signUpOpenInNewWindow?'_blank':'_self'}">${partnerProgramBusinessBenifitModel.signUpLabel}${not empty properties.sigthirdparty?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':''}</a>
                                </div>

                                <a class="animateLink learn-more-white" href="${learnMoreLink}" target="${properties.ppbblearnmoreopeninnewwindow?'_blank':'_self'}">${partnerProgramBusinessBenifitModel.learnMoreLabel}${properties.lthirdparty?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':'<span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a>
                                
                            </div>
                            <div class="col-xs-12 col-md-4 hexContain">
                                <ul class="calculating-list">
                                    <li class="hexagon-transformative hexagon">
                                        <span class="sprite"><img src="${partnerProgramBusinessBenifitModel.optionalProgramIconPath}" alt="" title="" style="position: absolute;top: -30px;left: 0px;right: 0px;margin: 0px auto;"></span>
                                        <h4>${partnerProgramBusinessBenifitModel.optionalProgramHeadLine}</h4>
                                        <p>${partnerProgramBusinessBenifitModel.optionalProgarmDescription}</p>
                                        <a href="${properties.pvoverlay?'javascript:void(0);':optionalProgramCallToActionLink}" onclick="${!properties.pvoverlay?'':vidurl}" class="animateAnchor bottomPos text-center" target="${partnerProgramBusinessBenifitModel.callToActionOpenInNewWindow?'_blank':'_self'}">${partnerProgramBusinessBenifitModel.optionalProgarmCallToActionLabel}${properties.pthirdparty?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}
</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>