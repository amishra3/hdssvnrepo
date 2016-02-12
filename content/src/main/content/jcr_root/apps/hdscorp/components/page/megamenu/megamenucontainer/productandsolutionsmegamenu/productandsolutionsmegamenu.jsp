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


<!-- <li> -->
<%-- 	<a href="${properties.mgmpsnavpath}.html" title="${properties.mgmpsnavtitle}">${properties.mgmpsnavtitle} --%>
<!--     	<span class="icon-accordion-closed"></span> -->
<!--     	<span class="icon-accordion-opened"></span> -->
<!--     </a> -->
<div class="hds-megaMenuWrapper"
	style="background-image:url(${domain}${properties.mgmpsbackgroundimagepath}); background-repeat:no-repeat; background-position:bottom right;"
	data-parent-title="${properties.mgmpsnavtitle}"
	data-parent-path="${mgmpsnavpath}">
	<div class="hds-megaMenu">
		<div class="content-container">
			<div class="row">
				<div class="col-md-12">
					<div class="megamenu-heading hidden-xs hidden-sm">
						<div class="icon">
							<img src="${domain}${properties.mgmpstitleiconpath}"
								title="${properties.mgmpstitle}">
						</div>
						<div class="title">
							<h2>${properties.mgmpstitle}</h2>
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
										href="${domain}${subnavlinks.mgmpssubnavlink}.html"
										title="${subnavlinks.subnavlinks}" class="animateLink">${subnavlinks.mgmpssubnavlabel}<span
											aria-hidden="true"
											class="glyphicon glyphicon-new-window animateIcon"></span></a></li>
								</c:when>
								<c:otherwise>
									<li><a
										target="${subnavlinks.mgmpsopeninnewwindow==1?'_blank':'_self'}"
										href="${domain}${subnavlinks.mgmpssubnavlink}.html"
										title="${subnavlinks.mgmpsalttext}" class="animateLink">${subnavlinks.mgmpssubnavlabel}<span
											aria-hidden="true"
											class="glyphicon glyphicon-menu-right animateIcon"></span></a></li>
								</c:otherwise>

							</c:choose>
						</c:forEach>
					</ul>
				</div>
				<div class="col-md-6 col-xs-12 spotlightNavigation">
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
										href="${domain}${properties.mgmpsviewfeaturedproductslink}.html"
										title="VIEW FEATURED PRODUCT" class="animateLink">${properties.mgmpsviewfeaturedproductslabel}<span
										aria-hidden="true"
										class="glyphicon glyphicon-new-window animateIcon"></span></a>
								</p>
							</c:when>
							<c:otherwise>
								<p>
									<a
										target="${properties.mgmpsopeninnewwindowouter?'_blank':'_self'}"
										href="${domain}${properties.mgmpsviewfeaturedproductslink}.html"
										title="VIEW FEATURED PRODUCT" class="animateLink">${properties.mgmpsviewfeaturedproductslabel}<span
										aria-hidden="true"
										class="glyphicon glyphicon-menu-right animateIcon"></span></a>
								</p>
							</c:otherwise>
						</c:choose>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- </li> -->






