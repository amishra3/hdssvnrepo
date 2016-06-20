<%@page import="com.day.cq.wcm.api.Page"%>
<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>


<sling:adaptTo adaptable="${resource}"
	adaptTo="com.hdscorp.cms.slingmodels.NewsModel" var="model" />
      <div class="news-press-container hds-news-section">
                <div class="content-container"> 
                    <div class="col-sm-12">
                   <div class="icon-border">
					<h3><img src="${model.newsiconimage}" /><a class="animateLink" href="${model.viewAllNewsLink}">${model.hdsInNewsText} <span class="glyphicon glyphicon-menu-right animateIcon"></span></a></h3>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="image-container b-box1">
						<img src="${model.featuredNewsImage}" alt=""/>
                            <div class="inner-content-area">

                               <div class="date_box">					
                                    <div class="date-stamp hidden-sm hidden-md hidden-lg">
                                      <span><img src="${properties.newsicondevice}"></span>
                                          <span>${model.featuredNews.newsDate}</span>
                                    </div>						
                                    <div class="date-stamp hidden-xs">
                                     ${model.featuredNews.newsDate}
                                    </div>		
                                </div> 


                                <div class="title"><a class="animateLink" href="${properties.featurednewslink}" target="${properties.newwin?'_blank':'_self'}">${model.featuredNews.newsTitle}${properties.thirdparty?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a></div>
                                <div class="description">${model.featuredNewsDesc}</div>
                            </div>
                        </div>

                    
                     <c:forEach var="news" items="${model.newsList}" varStatus="loopcnt">
                         <c:set var="title" value="${news.newsTitle}"/>
                            <c:set var="count" value="${fn:length(title)}"/>
                              <c:if test="${count gt 130}">
                                <c:set var="title" value="${fn:substring(title, 0, 130)}..."/>
                              </c:if>

                         <c:choose>
                             <c:when test="${loopcnt.index < 3}">                               
					  <div class="content-panel">

                        <div class="date-stamp hidden-sm hidden-md hidden-lg">
                           <span><img src="${properties.newsicondevice}"></span>
                           <span><strong>${news.newsDate}</strong></span>
                      </div>
                      <div class="date-stamp hidden-xs"><strong>${news.newsDate}</strong></div>

                        <p>${title}</p>
                       <a class="animateLink" href="${news.newsDetailPath}" target="${news.openInNewTab?'_blank':'_self'}">${model.readMoreLabel}${news.newWinIcon?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a>
                    </div>
                                 <c:if test="${loopcnt.index==2}">
                                 </div> 

                                  <div class="col-sm-6"> <!--Start div-->
                                 </c:if>

                             </c:when>

                             <c:otherwise>

                      <div class="content-panel">

                        <div class="date-stamp hidden-sm hidden-md hidden-lg">
                           <span><img src="${properties.newsicondevice}"></span>
                           <span><strong>${news.newsDate}</strong></span>
                      </div>
                      <div class="date-stamp hidden-xs"><strong>${news.newsDate}</strong></div>

                        <p>${title}</p>
                       <a class="animateLink" href="${news.newsDetailPath}" target="${news.openInNewTab?'_blank':'_self'}">${model.readMoreLabel}${news.newWinIcon?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a>
                    </div>
                             </c:otherwise>
                         </c:choose>


                    </c:forEach>


                </div>
<div class="clearfix"></div>
                        <div class="col-sm-12">
                            <div class="view-all-pr">
                                <div class="btn-square-red">
                                    <a href="${model.viewAllNewsLink}">${model.viewAllNewsLabel}</a>
                                </div>
                            </div>
                        </div>
            </div>	
          </div>

	


