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
                                    <img src="${model.featurediconimage}" alt="${properties.featuredimagealtalt}">
                                </div>
                                <div class="name">${properties.featuredawardtitle}</div>
                                <div class="title">
                                   <a href="${properties.featuredawardlink}" class="animateLink" target="${properties.newtab?'_blank':'_self'}">${model.featuredAward.newsTitle}${not empty properties.thirdparty?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span>'}</a></div>
                                <div class="description">${model.featuredawarddesc}</div>
                            </div>
                        </div>

                        <div class="career-commitment-spotlight hidden-md hidden-lg">
                            <div style="background-image:url(${model.featuredimage});" class="spotlight-mobile hidden-md hidden-lg">
                                <div class="company-logo">
                                    <img class="img-responsive" alt="${properties.featuredimagealtalt}" src="${properties.featurediconimagedevice}">
                                </div>
                            </div>
                            <div class="spotlight-content">
                                <div class="name">${properties.featuredawardtitle}</div>
                                <div class="title">${model.featuredAward.newsTitle}</div>
                                <div class="description">${model.featuredawarddesc}</div>
                                <div class="learn-more">
                                    <div class="btn-square-red">
                                        <a href="${properties.featuredawardlink}" target="${properties.newtab?'_blank':'_self'}">${properties.readmorelabel}</a>
                                    </div>
                                </div>
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
                                    <a class="animateLink" href="${award.newsDetailPath}" target="${award.openInNewTab?'_blank':'_self'}">${model.readmorelabel}${award.newWinIcon?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':'<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span>'} </a>
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