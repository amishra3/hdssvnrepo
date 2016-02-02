<%@page import="com.day.cq.wcm.api.Page"%>
<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>


<sling:adaptTo adaptable="${resource}"
	adaptTo="com.hdscorp.cms.slingmodels.NewsModel" var="model" />
      <div class="news-press-container hds-news-section">
                <div class="content-container">
                    <div class="col-sm-12">
                   <div class="icon-border"> <h3><img src="images/sprites/icon-press.png"/>${model.hdsInNewsText}</h3></div>
                    </div>
                    <div class="col-sm-6">
                        <div class="image-container b-box1">
						<img src="${model.featuredNewsImage}"alt=""/>
                            <div class="inner-content-area">
							<div class="date_box">${model.featuredNews.newsDate}</div>
                                 <div class="title">${model.featuredNews.newsTitle}</div>
                                <div class="description">${model.featuredNewsDesc}</div>
                            </div>
                        </div>
                    </div>
                    
                     <c:forEach var="news" items="${model.newsList}" varStatus="loopcnt">
                    <div class="col-sm-6 content-panel">
                        <strong>${news.newsDate}</strong>
                        <p>${news.newsTitle}</p>
                        <a class="animateLink" href="${news.newsDetailPath}">${model.readMoreLabel} <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a>
                    </div>
                    </c:forEach>
                   <div class="clearfix"></div>
                        <div class="col-sm-12">
                            <div class="view-all-pr">
                                <div class="btn-square-black">
                                    <a href="${model.viewAllNewsLink}">${model.viewAllNewsLabel}</a>
                                </div>
                            </div>
                        </div>
                     
                </div>
            </div>	
	
	


