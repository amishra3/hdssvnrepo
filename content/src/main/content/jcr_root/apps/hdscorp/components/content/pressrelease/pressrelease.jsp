<%--

  Event Component component.

  Hdscorp event component

--%><%
%><%@include file="/apps/foundation/global.jsp"%><%
%><%@page session="false" %><%
%>

<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.PressReleasesModel" var="model" />

 <div class="news-press-container">
                <div class="content-container">
                    <div class="col-sm-12">
                   <div class="icon-border"> <h3><img src="images/sprites/icon-press.png"/>${model.pressReleasesLabel}<span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></h3></div>
                    </div>
                    <div class="col-sm-6">
                        <div class="image-container">
						<img src="${model.featuredPrImage}"alt=""/>
                            <div class="inner-content-area">
							<div class="date_box">${model.featuredPR.newsDate}</div>
                                 <div class="title">${model.featuredPR.newsTitle}</div>
                                <div class="description">${model.featuredPrDesc}</div>
                            </div>
                        </div>						
                    </div>
                    <c:forEach var="pressRelease" items="${model.pressReleaseList}" varStatus="loopcnt">
                    <div class="col-sm-6 content-panel">
                        <strong>${pressRelease.newsDate}</strong>
                        <p>${pressRelease.newsTitle}</p>
                        <a class="animateLink" href="${pressRelease.newsDetailPath}">${model.readMoreLabel} <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a>
                    </div>
                    </c:forEach>
                   <div class="clearfix"></div>
                        <div class="col-sm-12">
                            <div class="view-all-pr">
                                <div class="btn-square-black">
                                    <a href="${model.viewAllPrLink}">${model.viewAllPrLabel}</a>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>

		