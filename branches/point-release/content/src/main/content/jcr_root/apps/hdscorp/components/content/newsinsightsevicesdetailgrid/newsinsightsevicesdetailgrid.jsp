<%@page session="false"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@include file="/apps/foundation/global.jsp"%>
<c:set var="serviceLinks" value="<%=PageUtils.convertMultiWidgetToList(properties,"contenticonpath-columniconalt-columntitle-columncontent-ctatext-ctalink-voverlay-seemorenewwin-columndescription-thirdparty")%>" />


<div id ="nsight" class="news-insight-resources news-insights-section clearfix ${properties.type}" style="background-image:url(${properties.sectionbackground})">
	<div class="cs-container content-container">
        <div class="container-fluid">
	        <h3>${properties.sectiontitle}</h3>
	        <div class="row-centered">
					<c:forEach var="slinks" items="${serviceLinks}">
	                       <c:set var="icopath" value="${slinks.contenticonpath}" />
	                       <c:set var="icoalt" value="${slinks.columniconalt}" />
	                       <c:set var="title" value="${slinks.columntitle}" />
	                       <c:set var="description" value="${slinks.columndescription}" />
	                       <c:set var="ctat" value="${slinks.ctatext}" />
	                       <c:set var="newwin" value="${slinks.seemorenewwin}" />
	                       <c:set var="ctalink" value="${slinks.ctalink}" />
	                       <c:if test="${fn:startsWith(ctalink,'/content/')}">
							<c:set var="ctalink" value="${hdscorp:shortURL(ctalink)}" />
						</c:if>
                        <c:if test="${slinks.voverlay==1}">
                              	<c:set var="vid" value="${ctalink}" />
                                <c:set var="vidurl" value="hds.resourceLib._openvideooverlayById(${vid});"/>
                             </c:if>
	  					    <c:choose>
	                           <c:when test="${not empty title && not empty icopath}">
								<div class="col-sm-4 col-centered">
									<div class="news-resources-col" data-href="">
										<div class="imageHolder">
											<img src="${icopath}" alt="${icoalt}" title="${icoalt}">
										</div>
										<h2 class="headline hidden-xs">${title}</h2>
										<h2 class="headline hidden-sm hidden-md hidden-lg">
                                           <a href="${slinks.voverlay==1?'javascript:void(0);':ctalink}" onclick="${column.voverlay==2?'':vidurl}" target="${newwin==1?'_blank':'_self'}">${title} ${slinks.thirdparty==1?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}
											</a>
										</h2>
								 <c:if test="${not empty description}">
                                        <p>${description}</p>
       							 </c:if>
										<c:choose>
											<c:when test="${not empty ctalink && not empty ctat}">
												<div class="resources-category-more">
													<a class="animateLink hidden-xs" href="${slinks.voverlay==1?'javascript:void(0);':ctalink}" onclick="${column.voverlay==2?'':vidurl}" target="${newwin==1?'_blank':'_self'}">${ctat} 
														${slinks.thirdparty==1?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}
													</a>
												</div>
											</c:when>
											<c:otherwise>
	
											</c:otherwise>
										</c:choose>
									</div>
								</div>
						</c:when>
	                       <c:otherwise>
	                          
	                        </c:otherwise>
					</c:choose>
				</c:forEach>
			</div>
    	</div>
    </div>
</div>
