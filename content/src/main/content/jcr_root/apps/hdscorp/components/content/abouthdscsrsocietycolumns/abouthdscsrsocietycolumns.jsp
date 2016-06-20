<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>



<c:set var="ctalabelurl" value="${properties.ctalabelurl}" />
<c:if test="${fn:startsWith(articleurl,'/content/')}">
	<c:set var="ctalabelurl" value="${hdscorp:shortURL(ctalabelurl)}" />
</c:if>
<c:set var="contentColumn"
	value="<%=PageUtils.convertMultiWidgetToList(properties,"columntitle-columndescription-columnmagepath-ctalabel-ctalabelurl-openininewwindow-thirdparty-isvideo-videoembededcode-csropenoverlay-isgatedcontent")%>" />

<div class="about-hds-articles">
	<div class="content-container container-fluid">
		<c:if test="${not empty properties.columnsheading}">
			<h2 class="dt-headline">${properties.columnsheading}</h2>
		</c:if>
		<div class="row">
			<c:forEach var="column" items="${contentColumn}" varStatus="loop">
				<c:set var="linkUrl" value="${column.ctalabelurl}" />
				<c:set var="vid" value="${column.videoembededcode}" />
				<c:set var="vidurl"
					value="hds.resourceLib._openvideooverlayById(${vid});" />
				<c:if test="${fn:startsWith(linkUrl,'/content/')}">
					<c:set var="linkUrl"
						value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>" />
				</c:if>
				<c:set var="isgatedclass" value=""/>
				<c:if test = "${column.isgatedcontent == 'yes'}">
					<c:set var="isgatedclass" value=" isGatedLock"/>
				</c:if>
				
				<div class="col-md-4">
					<div class="about-hds-articles-spotlight spotlight1"
						style="background-image: url('${column.columnmagepath}');">
						<div class="spotlight-mobile spotlight1 hidden-md hidden-lg"></div>
						<div class="spotlight-content">
							<c:if test="${not empty column.columntitle}">
								<div class="spotlight-title">${column.columntitle}</div>
							</c:if>
							<c:if test="${not empty column.columndescription}">
								<div class="spotlight-description">${column.columndescription}</div>
							</c:if>
							<c:choose>
								<c:when test="${column.isvideo == 1}">
									<div class="spotlight-more">
										<a
											href="${column.csropenoverlay==1?'javascript:void(0);':column.videoembededcode}"
											onclick="${column.csropenoverlay==2?'':vidurl}"
											target="${column.openininewwindow==1?'_blank':'_self'}"
											class="animateLink ${isgatedclass}">${column.ctalabel}${column.thirdparty==1?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':'<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span>'}</a>


									</div>
								</c:when>

								<c:otherwise>
									<div class="spotlight-more">
										<a href="${linkUrl}"
											target="${column.openininewwindow==1?'_blank':'_self'}"
											class="animateLink ${isgatedclass}">${column.ctalabel}${column.thirdparty==1?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':'<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span>'}</a>
									</div>
								</c:otherwise>
							</c:choose>


						</div>
					</div>
				</div>
			</c:forEach>
		</div>
	</div>
</div>