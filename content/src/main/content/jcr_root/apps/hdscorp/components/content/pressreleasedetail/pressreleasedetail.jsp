<%--

  Event Component component.

  Hdscorp event component

--%><%
%><%@include file="/apps/foundation/global.jsp"%><%
%><%@page session="false" %><%
%>

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
                            <div class="share-this-page clearfix">
                                <div class="heading">Share this page</div>
                                <div class="share-links">
                                    <a href="javascript:void(0);"><img src="/etc/clientlibs/hdscorp/main/images/sprites/twitter-pr-share.png" alt="twitter" title="twitter"></a>
                                    <a href="javascript:void(0);"><img src="/etc/clientlibs/hdscorp/main/images/sprites/facebook-pr-share.png" alt="facebook" title="facebook"></a>
                                    <a href="javascript:void(0);"><img src="/etc/clientlibs/hdscorp/main/images/sprites/linkedin-pr-share.png" alt="linkedin" title="linkedin"></a>
                                    <a href="javascript:void(0);"><img src="/etc/clientlibs/hdscorp/main/images/sprites/blog-pr-share.png" alt="blog" title="blog"></a>
                                </div>
                            </div>
                            <div class="press-contact">
                                <div class="heading">Press contact</div> 
                                <div class="press-contact-detail">
                                    Stefani Finch<br>
                                    408-499-7349<br>
                                    <a href="mailto:Stefani.Finch@HDS.com" target="_blank">Stefani.Finch@HDS.com</a>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>






