<%--

Industry Solution Offer Component

--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>


<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.IndustrySolutionOfferModel" var="industrySolutionOfferModel" />
<c:choose>
    <c:when test="${industrySolutionOfferModel.isoShowBlog==1}">
        <div class="features-solutions" style="background-image: url('${properties.isobgimage}')">
						<div class="content-container clearfix">
                        <div class="col-md-12"><h2>${industrySolutionOfferModel.title}</h2></div>
                        <div class="col-md-12 col-no-pad">							
                            <div class="feature-category">
                                <div class="col-md-6">
                                	<h3>${industrySolutionOfferModel.subTitle}</h3>
                                     ${industrySolutionOfferModel.description}
                                </div>
                                <div class="col-md-6">
                                 <cq:include path="industrysolutionblog1" resourceType="hdscorp/components/content/industrysolutionblog"/>
                                 </div>
                           <div class="col-md-12">
                               <c:if test="${not empty industrySolutionOfferModel.contactUSLabel}">
                                <div class="more-solutions">
                                     <a href="${hdscorp:shortURL(industrySolutionOfferModel.targetURL)}" target="${not empty industrySolutionOfferModel.targetURLType?'_blank':'_self'}" class="animateAnchor bottomPos text-center">${industrySolutionOfferModel.contactUSLabel}${not empty properties.thirdparty?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'} </a>
                                </div>
                               </c:if>
                             </div>
                              </div>
                            </div>
						</div>
					</div>
</c:when>

  <c:when test="${industrySolutionOfferModel.isoShowBlog==2}">

      <div class="solution-offer grey-bg" style="background-image: url('${properties.isobgimage}')">
                        <div class="content-container container-fluid">
                            <h2>${industrySolutionOfferModel.title}</h2>
                            <div class="fb-category-container" id="fixedRate1">
                                <div class="fb-category-box">
                                    <h3>${industrySolutionOfferModel.subTitle}</h3>
 									${industrySolutionOfferModel.description}
                                 </div>
                            </div>
							<div class="col-sm-12 solution-section col-no-pad">
								<div class="col-md-6 col-no-pad">
                                      <cq:include path="industrysolutionblog1" resourceType="hdscorp/components/content/industrysolutionblog"/>

                                </div>
                                <div class="col-md-6 col-no-pad">
                                      <cq:include path="industrysolutionblog2" resourceType="hdscorp/components/content/industrysolutionblog"/>

                                </div>
                            </div>

							<div class="col-sm-12 col-no-pad">
                                <c:if test="${not empty industrySolutionOfferModel.contactUSLabel}">
                                    <div class="more-solutions">
                                        <a href="${hdscorp:shortURL(industrySolutionOfferModel.targetURL)}" target="${not empty industrySolutionOfferModel.targetURLType?'_blank':'_self'}" class="animateAnchor bottomPos text-center">${industrySolutionOfferModel.contactUSLabel}${not empty properties.thirdparty?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a>
                                    </div>
								</c:if>
							</div>
                        </div>
                    </div>

</c:when>

    <c:otherwise>
   <div class="solution-offer" id="features-benefits" style="background-image: url('${properties.isobgimage}')">
                        <div class="content-container container-fluid">
                            <h2>${industrySolutionOfferModel.title}</h2>
                            <div class="fb-category-container" id="fixedRate0">
                                <div class="fb-category-box">
                                    <h3>${industrySolutionOfferModel.subTitle}</h3>
										${industrySolutionOfferModel.description}
 									<c:if test="${not empty industrySolutionOfferModel.contactUSLabel}">
                                         <div class="more-solutions">
                                         <a href="${hdscorp:shortURL(industrySolutionOfferModel.targetURL)}" target="${not empty industrySolutionOfferModel.targetURLType?'_blank':'_self'}" class="animateAnchor bottomPos text-center">${industrySolutionOfferModel.contactUSLabel}${not empty properties.thirdparty?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a>
                                        </div>
                                    </c:if>
                                </div>
                            </div>
                        </div>
                    </div>
    </c:otherwise>

</c:choose>
