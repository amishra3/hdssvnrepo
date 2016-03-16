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
  <div class="about-hds-awards gatted-asset-pg">                    
                <div class="row content-container">
                	<div class="col-md-6 gated_asset">
                   	  <h2>${pdfNode.title}</h2>
                      		<div class="gated-heading col-sm-12">
                            
                            	<div class="col-lg-4 col-sm-4 col-xs-4 col-md-4 col-no-pad">
    							<c:choose>
                                        <c:when test="${not empty pdfNode.imagePath}">
                                        	<img src="${pdfNode.imagePath}" alt="" class="img-responsive">
                                        </c:when>
                                        <c:otherwise>
                                            <img src="${pdfNode.imagePath}" alt="" class="img-responsive">
                                        </c:otherwise>
                           		 </c:choose>
                                </div>
                                <div class="col-lg-8 col-sm-8 col-xs-8 col-md-8"> 
                                    <h3>${pdfNode.createdDate}</h3>
                                    <span></span>
                                </div>
                            </div>
                      	<p>${pdfNode.description}
                        </p>
                        <div class="share hidden-xs hidden-sm"><cq:include path="sharethismobile" resourceType="hdscorp/components/content/pdfsharethispage" /></div>
                        <div class="mb-cta-btn hidden-lg hidden-md"><button type="submit" class="">${assetGettingModel.downloadText}</button> </div>
                        <div class="resources">


                            <c:choose>
                                <c:when test="${assetGettingModel.urlTargetType}">
								<a href="${assetGettingModel.resourceLink}" class="animateLink" target="_blank"><span class="glyphicon glyphicon-menu-left animateIcon" aria-hidden="true"> </span>${assetGettingModel.resourceLabel}</a>
                                </c:when>
                                <c:otherwise>
                                     <a href="${assetGettingModel.resourceLink}" class="animateLink"><span class="glyphicon glyphicon-menu-left animateIcon" aria-hidden="true"> </span>${assetGettingModel.resourceLabel}</a>
                                </c:otherwise>
                            </c:choose>


                        </div>
                    </div>
                    <div class="col-md-6 grey-bg">
               	  <div class="gatted-asset-form">
                  		<div class="form hidden-xs hidden-sm">
                            <h2>${assetGettingModel.message}</h2>
                            <!--<img src="images/gatted-asset-frm.png"  alt="" class="img-responsive">-->
                            <div class="asset-form">
                            	<iframe src="${formIframeURL}" style="border:none;"></iframe>
                            </div>
                        </div>
                        <div class="share hidden-lg hidden-md"><cq:include path="sharethisdesktop" resourceType="hdscorp/components/content/pdfsharethispage" /></div>
                    </div>

                    </div>
                </div>
       </div>

      </c:if>