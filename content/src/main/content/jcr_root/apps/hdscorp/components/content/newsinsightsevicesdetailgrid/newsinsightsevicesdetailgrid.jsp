<%@page session="false"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@include file="/apps/foundation/global.jsp"%>
<c:set var="serviceLinks" value="<%=PageUtils.convertMultiWidgetToList(properties,"contenticonpath-columniconalt-columntitle-columncontent-ctatext-ctalink-seemorenewwin")%>" />
<div class="news-insight-resources news-insights-section clearfix" style="background-image:url(${properties.sectionbackground})">
	<div class="cs-container content-container">
        <div class="container-fluid">
        <h2>${properties.sectiontitle}</h2>

					<c:forEach var="slinks" items="${serviceLinks}">
                        <c:set var="icopath" value="${slinks.contenticonpath}" />
                        <c:set var="icoalt" value="${slinks.columniconalt}" />
                        <c:set var="title" value="${slinks.columntitle}" />
                        <c:set var="description" value="${slinks.columncontent}" />
                        <c:set var="ctat" value="${slinks.ctatext}" />
                        <c:set var="newwin" value="${slinks.seemorenewwin}" />
                        <c:set var="ctalink" value="${slinks.ctalink}" />
                        <div class="col-sm-4">
                           			 <div class="news-resources-col" data-href="">
                                         <div class="imageHolder"><img src="${icopath}" alt="${icoalt}" title="${icoalt}"></div>
                                             <h3 class="headline hidden-xs">${title}</h3>
                                         <h3 class="headline hidden-sm hidden-md hidden-lg"><a href="${ctalink}" target="${newwin==1?'_blank':'_self'}">${title}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a></h3>
                                       <c:choose>
                            	<c:when test="${not empty ctalink && not empty ctat}">
                                      <div class="resources-category-more">
                                            <a class="animateLink hidden-xs" href="${ctalink}" target="${newwin==1?'_blank':'_self'}">${ctat} <span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a>
                                      </div>
                                </c:when>
                                <c:otherwise>
                                   
                                 </c:otherwise>
								</c:choose>
                                         </div>
                                      </div>
					</c:forEach>
        	</div>


    </div>


</div>