<%--Press Release Details component--%>

<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.PressReleaseDetailModel" var="pressRelease" />
           
            <div class="pr-detail">
                <div class="pr-detail-container">
                    <div class="row">
                        <div class="col-md-12 col-md-12 pr-detail-desc">
                            <h1>${pressRelease.pressReleaseTitle}</h1>
                        </div>
                        <div class="col-md-9 pr-detail-desc">                                                      
                            ${pressRelease.pressReleaseDescription}
                            <div class="pr-view-all">
                                <a href="${pressRelease.viewAllPRLink}" class="animateLink">${pressRelease.viewAllPRLabel} <span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a>
                            </div>
                        </div>
                        <div class="col-md-3 pr-detail-share">
                            <cq:include path="sharethispage" resourceType="hdscorp/components/content/pressreleasesharethispage"/>
                        </div>                        
                    </div>
                </div>
            </div>

