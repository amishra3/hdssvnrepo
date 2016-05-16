<%@page session="false" %>
<%@include file="/apps/foundation/global.jsp"%>

<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.PressReleasesModel" var="model" />
<div class="news-press-container">
  <div class="content-container">
    <div class="col-sm-12">
      <div class="icon-border">


        <h3> <img src="${model.priconimage}" /> <a class="animateLink" href="${model.viewAllPrLink}">${model.pressReleasesLabel} <span class="glyphicon glyphicon-menu-right animateIcon"></span></a></h3>
      </div>
    </div>
    <div class="col-sm-6">
      <div class="">
        <div class="image-container"> <img src="${model.featuredPrImage}" alt="" />
          <div class="inner-content-area">
            <div class="date_box">
              <div class="date-stamp hidden-sm hidden-md hidden-lg"> <span><img src="${properties.featuredprdevice}"></span> <span>${model.featuredPR.newsDate}</span> </div>
              <div class="date-stamp hidden-xs"> ${model.featuredPR.newsDate} </div>
            </div>
            <div class="title"><a class="animateLink" href="${properties.featuredpressreleaselink}" target="_self">${model.featuredPR.newsTitle} <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span> </a></div>
            <div class="description">${model.featuredPrDesc}</div>
          </div>
        </div>
      </div>

				<c:forEach var="pressRelease" items="${model.pressReleaseList}"
			varStatus="loopcnt">
                <c:set var="title" value="${pressRelease.newsTitle}"/>
				<c:set var="count" value="${fn:length(title)}"/>
                <c:if test="${count gt 130}">
					<c:set var="title" value="${fn:substring(title, 0, 130)}..."/>
					</c:if>

					<c:choose>
                        	<c:when test="${loopcnt.index < 3}">
									<div class="content-panel">
										<div class="date-stamp hidden-sm hidden-md hidden-lg">
                                              <span><img src="${properties.featuredprdevice}"></span>
                                                  <span><strong>${pressRelease.newsDate}</strong></span>
                                            </div>
                    
                                                    <div class="date-stamp hidden-xs"><strong>${pressRelease.newsDate}</strong></div>
                                                    <p>${title}</p>
                                                    <a class="animateLink" href="${pressRelease.newsDetailPath}" target="${pressRelease.openInNewTab?'_blank':'_self'}">${model.readMoreLabel}
                                                        <span class="glyphicon glyphicon-menu-right animateIcon"
                                                        aria-hidden="true"></span>
                                                    </a>

                                        </div>
                                		 <c:if test="${loopcnt.index==2}">
												 </div> 

												  <div class="col-sm-6"> <!--Start div-->
												 </c:if>
                             </c:when>
                        	<c:otherwise>
                                <div class="content-panel">
											<div class="date-stamp hidden-sm hidden-md hidden-lg">
			              <span><img src="${properties.featuredprdevice}"></span>
                              <span><strong>${pressRelease.newsDate}</strong></span>
		                </div>

                <div class="date-stamp hidden-xs"><strong>${pressRelease.newsDate}</strong></div>
				<p>${title}</p>
				<a class="animateLink" href="${pressRelease.newsDetailPath}" target="${pressRelease.openInNewTab?'_blank':'_self'}">${model.readMoreLabel}
					<span class="glyphicon glyphicon-menu-right animateIcon"
					aria-hidden="true"></span>
				</a>
                                </div>
                            </c:otherwise>
                    </c:choose>    
		</c:forEach>


  </div>


</div>
     <div class="clearfix"></div>
    <div class="col-sm-12">
      <div class="view-all-pr">
        <div class="btn-square-red"> <a href="${model.viewAllPrLink}">${model.viewAllPrLabel}</a> </div>
      </div>
    </div>
    </div>
