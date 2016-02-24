<%--

  Product And Solutions MegaMenu component.

  This is Product And Solutions MegaMenu

--%>
<%@page import="com.hdscorp.cms.dao.JCRDataAccessor"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PropertyResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.day.cq.wcm.api.WCMMode"%>
<%@page import="com.day.cq.wcm.api.PageFilter"%>
<%@page import="org.apache.sling.api.resource.ValueMap"%>
<%@ page import="java.util.Iterator"%>
<%@page import="javax.servlet.jsp.PageContext"%>
<%@include file="/apps/foundation/global.jsp"%>

<c:set var="domain" value="<%= pageProperties.getInherited("domain", "") %>" />
<c:set var="subnavlinks"
	value="<%=PageUtils.convertMultiWidgetToList(properties,"mgmpssubnavlabel-mgmpssubnavlink-mgmpsopeninnewwindow-mgmpsalttext")%>" />
<c:set var="navpath" scope="request" value="${properties.mgmpsnavpath}" />
<c:set var="mgmpsnavpath" value="${properties.mgmpsnavpath}" />
<c:if test="${fn:startsWith(mgmpsnavpath,'/content/')}">
	<c:set var="mgmpsnavpath"
		value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("mgmpsnavpath").toString())%>" />
</c:if>

<div class="hds-megaMenuWrapper"
	style="background-image:url(${domain}${hdscorp:shortURL(properties.mgmpsbackgroundimagepath)}); background-repeat:no-repeat; background-position:bottom right;"
	data-parent-title="${properties.mgmpsnavtitle}"
	data-parent-path="${mgmpsnavpath}">
	<div class="hds-megaMenu">
		<div class="content-container">
			<div class="row">
				<div class="col-md-12">
					<div class="megamenu-heading">
						<div class="icon hidden-xs hidden-sm">
							<img src="${domain}${hdscorp:shortURL(properties.mgmpstitleiconpath)}"
								title="${properties.mgmpstitle}">
						</div>
						<div class="title">
							<h2><a href="javascript:void(0)" title="${properties.mgmpstitle}">${properties.mgmpstitle}</a></h2>
							<span aria-hidden="true"
								class="glyphicon glyphicon-menu-right animateIcon"></span>
						</div>
					</div>
				</div>
				<div class="col-md-6 col-xs-12 megamenu-list">
					<ul>
						<c:forEach var="subnavlinks" items="${subnavlinks}"
							varStatus="count">
							<c:choose>
								<c:when test="${empty subnavlinks.mgmpssubnavlabel}">
								</c:when>
								<c:when test="${subnavlinks.mgmpssubnavlink=='#'}">
									<li><a href="javascript:void(0)" class="animateLink"
										title="${subnavlinks.mgmpssubnavlabel}">${subnavlinks.mgmpssubnavlabel}<span
											aria-hidden="true"
											class="glyphicon glyphicon-menu-right animateIcon"></span></a></li>
								</c:when>
								<c:when test="${subnavlinks.mgmpsopeninnewwindow==1}">
									<li><a
										target="${subnavlinks.mgmpsopeninnewwindow==1?'_blank':'_self'}"
										href="${fn:contains(subnavlinks.mgmpssubnavlink, 'http')?'':domain}${hdscorp:shortURL(subnavlinks.mgmpssubnavlink)}"
										title="${subnavlinks.subnavlinks}" class="animateLink">${subnavlinks.mgmpssubnavlabel}<span
											aria-hidden="true"
											class="glyphicon ${subnavlinks.mgmpsopeninnewwindow==1?'glyphicon-new-window':'glyphicon-menu-right'} animateIcon"></span></a></li>
								</c:when>
							</c:choose>
						</c:forEach>
					</ul>
				</div>
				<div class="col-md-6 col-xs-12 spotlightNavigation" data-style="${domain}${hdscorp:shortURL(properties.mgmobilebackgroundimagepath)}">
					<div class="col-xs-12 col-md-12">
						<h3 class="hidden-xs hidden-sm">${properties.mgmpsheadline}</h3>
						<div class="hidden-xs hidden-sm">${properties.mgmpsdescription}</div>
						<c:choose>

							<c:when test="${empty properties.mgmpsviewfeaturedproductslabel}">

							</c:when>

							<c:when test="${properties.mgmpsviewfeaturedproductslink=='#'}">
								<p>
									<a href="javascript:void(0)" class="animateLink"
										title="${properties.mgmpsviewfeaturedproductslabel}">${properties.mgmpsviewfeaturedproductslabel}<span
										aria-hidden="true"
										class="glyphicon glyphicon-menu-right animateIcon"></span></a>
								</p>
							</c:when>
							<c:when test="${properties.mgmpsopeninnewwindowouter}">
								<p>
									<a
										target="${properties.mgmpsopeninnewwindowouter?'_blank':'_self'}"
										href="${fn:contains(properties.mgmpsviewfeaturedproductslink, 'http')?'':domain}${hdscorp:shortURL(properties.mgmpsviewfeaturedproductslink)}"
										title="${properties.mgmpsviewfeaturedproductslabel}" class="animateLink">${properties.mgmpsviewfeaturedproductslabel}<span
										aria-hidden="true"
										class="glyphicon ${properties.mgmpsopeninnewwindowouter?'glyphicon-new-window':'glyphicon-menu-right'} animateIcon"></span></a>
								</p>
							</c:when>
						</c:choose>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
