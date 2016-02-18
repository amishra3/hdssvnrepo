<%@page session="false" %>
<%@include file="/apps/foundation/global.jsp"%>

<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.AwardsModel" var="model" />

<div class="career-commitment clearfix">
                <div class="content-container">
                    <div class="col-md-12">
                        <h2>${model.awardsheaderlabel}</h2>
                    </div>

                    <div class="col-md-6">
                        <div class="career-commitment-spotlight hidden-xs hidden-sm" style="background-image: url(${model.featuredimage});">
                            <div class="spotlight-content">
                                <div class="company-logo">
                                    <img src="${model.featurediconimage}" alt="">
                                </div>
                                <div class="name"></div>
                                <div class="title">
                                    <a href="#" class="animateLink">${model.featuredAward.newsTitle} <span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></a></div>
                                <div class="description">${model.featuredawarddesc}</div>
                            </div>
                        </div>

                                          
                    </div>
                    <div class="col-md-6">
                        <div class="company-list">
                      	<c:forEach var="award" items="${model.awardsList}"
			               varStatus="loopcnt">
                            <div class="company">
                                <div class="name">${award.newsTitle}</div>
                                <div class="description">${award.description}</div>
                                <div class="read-more">
                                    <a class="animateLink" href="${award.newsDetailPath}">${model.readmorelabel} <span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a>
                                </div>
                            </div>
                            </c:forEach>
                           
                            <div class="clearfix"></div>
                            <div class="view-all">
                                <div class="btn-square-red view-all-awards">
                                    <a href="${model.viewalllink}">${model.viewalllabel}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
















