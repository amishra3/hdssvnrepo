<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>


<div class="row">
	<div class="col-sm-4">
		<div class="resources-category">
            <c:if test="${not empty properties.columntitle}">

            <h3 class="resources-category-heading">${properties.columntitle}</h3>
            </c:if>

			<c:set var="contentColumns" value="<%=PageUtils.convertMultiWidgetToList(properties,"contenticonpath-contenttitle-columncontent-seemorelabel-seemoretargeturl-contenticonpathalttext-seemorenewwin-seemorenewwin1-thirdparty-voverlay-videoid-isgatedcontent")%>" />
					<c:forEach var="column" items="${contentColumns}" varStatus="loop">
						<c:set var="isgatedclass" value=""/>
						<c:if test = "${column.isgatedcontent == 'yes'}">
							<c:set var="isgatedclass" value=" isGatedLock"/>
						</c:if>
						<c:set var="linkUrl" value="${column.seemoretargeturl}"/>
                            <c:if test="${not empty column.videoid}">
                              <c:set var="vid" value="${column.videoid}" />
                                <c:set var="vidurl" value="hds.resourceLib._openvideooverlayById(${vid});"/>
                             </c:if>

						<c:if test="${fn:startsWith(linkUrl,'/content/')}">
							<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>"/>
						</c:if>	
						<div class="resources-category-box">
	                      <div class="resources-category-icon">
							<img src="${column.contenticonpath}" alt="${column.contenticonpathalttext}" title="${column.contenticonpathalttext}"/>
	                      </div>
	                      <div class="resources-category-title">${column.contenttitle}</div>
	                      <div class="resources-category-description">${column.columncontent}</div>
                            <c:choose>
                            	<c:when test="${not empty column.seemorelabel}">
                                      <div class="resources-category-more">
                                         <a class="animateLink ${isgatedclass}" href="${column.voverlay==1?'javascript:void(0);':linkUrl}" onclick="${column.voverlay==2?'':vidurl}" target="${column.seemorenewwin==1?'_blank':'_self'}">${column.seemorelabel}${column.thirdparty==1?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a>
                                      </div>
                                </c:when>
                                <c:otherwise>

                                 </c:otherwise>
								</c:choose>
	                    </div>
					</c:forEach>
		</div>	
	</div>
</div>

