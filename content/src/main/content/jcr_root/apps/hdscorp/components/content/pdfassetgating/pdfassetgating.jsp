<%--
  PDF Service component.
--%>

<%@page import="com.hdscorp.cms.config.HdsCorpGlobalConfiguration"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>

<%
	String pdfPath= request.getParameter("pdfPath");
	request.setAttribute("pdfPath", pdfPath);
	
	String requestURI = (String)request.getRequestURI();
	String pdfRenditionImagePath = (String)HdsCorpGlobalConfiguration.getPropertyValue(HdsCorpGlobalConfiguration.ASSET_GATING_IMAGE_RENDITION);
	String pdfImageRendition = requestURI+pdfRenditionImagePath; 
 	pageContext.setAttribute("pdfImageRendition", pdfImageRendition);
%>



<sling:adaptTo adaptable="${slingRequest}" adaptTo="com.hdscorp.cms.slingmodels.PDFMetaModel" var="pdfMetaModel" />

<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.AssetGettingModel" var="assetGettingModel" />

<c:set var="pdfNode" value="${pdfMetaModel.pdfNode}" /> 

<c:set var="pdfTitle" value="${pdfNode.title}" scope="request"/>
<c:set var="pdfDesc" value="${pdfNode.description}" scope="request"/>

<c:set var="formIframeURL" value="${properties.formIframeURL}"/>
<c:if test="${empty formIframeURL}">
	<c:set var="formIframeURL" value="https://pages.hds.com/hds-gated-form.html"/>
</c:if>

<c:if test="${null!=pdfNode}">
  <div class="gatted-asset-pg">                    
                <div class="row content-container">
                	<div class="col-md-6 gated_asset">
                      <div class="col-lg-12 col-sm-12 col-xs-12 col-md-12 col-no-pad"> 
                          <h3>${pdfNode.createdDate}</h3>
                          <span></span>
                        </div>
                   	  <h4>${pdfNode.title}</h4>
                          <c:if test="${not empty pdfNode.imagePath}">
								 <div class="gated-heading col-sm-12">                            
                                    <div class="col-lg-12 col-sm-12 col-xs-12 col-md-12 col-no-pad">
                                        <img src="${pdfNode.imagePath}" alt="" class="img-responsive">
                                    </div>
                                </div>
                          </c:if> 
                      	<p>${pdfNode.description}</p>
                        <div class="share"><cq:include path="sharethismobile" resourceType="hdscorp/components/content/pdfsharethispage" /></div>
                        <!--<div class="resources">
                             <c:if test="${not empty assetGettingModel.resourceLabel}">
                               <c:choose>
                                <c:when test="${assetGettingModel.urlTargetType}">
								<a href="${assetGettingModel.resourceLink}" class="animateLink" target="_blank"><span class="glyphicon glyphicon-menu-left animateIcon" aria-hidden="true"> </span>${assetGettingModel.resourceLabel}</a>
                                </c:when>
                                <c:otherwise>
                                     <a href="${assetGettingModel.resourceLink}" class="animateLink"><span class="glyphicon glyphicon-menu-left animateIcon" aria-hidden="true"> </span>${assetGettingModel.resourceLabel}</a>
                                </c:otherwise>
                            </c:choose>

                            </c:if>
                        </div>-->
                    </div>
                    <div class="col-md-6 grey-bg">
					<div class="gatted-asset-form">
                  		<div class="form">
                            <h2>${assetGettingModel.message}</h2>
                            <!--<img src="images/gatted-asset-frm.png"  alt="" class="img-responsive">-->
                            <div class="asset-form">
                            	<iframe src="${formIframeURL}" id="marketo_Iframe" style="border:none;"></iframe>
                            </div>
                        </div>
                    </div>

                    </div>
                </div>
       </div>

      </c:if>