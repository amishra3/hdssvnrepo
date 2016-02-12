<%--

  Sevices MegaMenu component component.

  This is services Megamenu component

--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>

<%@page import="com.hdscorp.cms.dao.JCRDataAccessor"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PropertyResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.day.cq.wcm.api.WCMMode"%>
<%@page import="com.day.cq.wcm.api.PageFilter"%>
<%@page import="org.apache.sling.api.resource.ValueMap"%>
<%@ page import="java.util.Iterator"%>
<%@page import="javax.servlet.jsp.PageContext"%>

<%
JCRDataAccessor dataAccessor = new JCRDataAccessor(pageContext);
%>
<c:set var="pageprops"
	value="<%=dataAccessor.getPage(currentPage.getAbsoluteParent(3).getPath())%>" />
<c:set var="domain" value="${pageprops.domain}" />

<c:set var="subnavlinks"
	value="<%=PageUtils.convertMultiWidgetToList(properties,"mgmservsubnavlabel-mgmservsubnavlink-mgmservalttext-mgmservopeninnewwindow")%>" />
<c:set var="rightsection"
	value="<%=PageUtils.convertMultiWidgetToList(properties,"mgmservheadline-mgmservdescription-mgmservviewfeaturedproductslabel-mgmservviewfeaturedproductslink-mgmservopeninnewwindows-mgmservphonenumber")%>" />
<c:set var="mgmservnavpath" value="${properties.mgmservnavpath}" />
<c:if test="${fn:startsWith(mgmservnavpath,'/content/')}">
	<c:set var="mgmservnavpath"
		value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("mgmservnavpath").toString())%>" />
</c:if>

<%-- <li><a href="${properties.mgmservnavpath}" --%>
<%-- 	title="${properties.mgmpsnavtitle}">${properties.mgmservnavtitle} <span --%>
<!-- 		class="icon-accordion-closed"></span> <span -->
<!-- 		class="icon-accordion-opened"></span> -->
<!-- </a> -->
<div class="hds-megaMenuWrapper"
	style="background-image:url(${domain}${properties.mgmservbackgroundimagepath}); background-repeat:no-repeat; background-position:bottom right;"
	data-parent-title="${properties.mgmservnavtitle}"
	data-parent-path="${mgmservnavpath}">
	<div class="hds-megaMenu">
		<div class="content-container">
			<div class="row">
				<div class="col-md-12">
					<div class="megamenu-heading hidden-xs hidden-sm">
						<div class="icon">
							<img src="${domain}${properties.mgmservtitleiconpath}"
								title="${properties.mgmservtitle}">
						</div>
						<div class="title">
							<h2>${properties.mgmservtitle}</h2>
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
								<c:when test="${empty subnavlinks.mgmservsubnavlabel}">
								</c:when>
								<c:when test="${subnavlinks.mgmservsubnavlink=='#'}">
									<li><a href="javascript:void(0)" class="animateLink"
										title="${subnavlinks.mgmservsubnavlabel}">${subnavlinks.mgmservsubnavlabel}<span
											aria-hidden="true"
											class="glyphicon glyphicon-menu-right animateIcon"></span></a></li>
								</c:when>
								<c:when test="${subnavlinks.mgmservopeninnewwindow==1}">
									<li><a
										target="${subnavlinks.mgmservopeninnewwindow==1?'_blank':'_self'}"
										href="${domain}${subnavlinks.mgmservsubnavlink}.html"
										title="${subnavlinks.mgmservalttext}" class="animateLink">${subnavlinks.mgmservsubnavlabel}<span
											aria-hidden="true"
											class="glyphicon glyphicon-new-window animateIcon"></span></a></li>
								</c:when>
								<c:otherwise>
									<li><a
										target="${subnavlinks.mgmservopeninnewwindow==1?'_blank':'_self'}"
										href="${domain}${subnavlinks.mgmservsubnavlink}.html"
										title="${subnavlinks.mgmservalttext}" class="animateLink">${subnavlinks.mgmservsubnavlabel}<span
											aria-hidden="true"
											class="glyphicon glyphicon-menu-right animateIcon"></span></a></li>

								</c:otherwise>
							</c:choose>


						</c:forEach>
					</ul>
				</div>
				<div class="col-md-6 col-xs-12 spotlightNavigation">

					<c:forEach var="rightsection" items="${rightsection}"
						varStatus="count">
						<div class="col-xs-12 col-md-6">
							<h3 class="hidden-xs hidden-sm">${rightsection.mgmservheadline}</h3>
							<div class="hidden-xs hidden-sm">${rightsection.mgmservdescription}</div>


							<c:choose>
								<c:when test="${not empty rightsection.mgmservphonenumber}">

									<p>
										<a href="javascript:void(0)" title="Phone Number"
											class="animateLink">${rightsection.mgmservphonenumber}</a>
									</p>

								</c:when>
								<c:otherwise>
									<c:choose>

										<c:when
											test="${empty rightsection.mgmservviewfeaturedproductslabel}">

										</c:when>

										<c:when
											test="${rightsection.mgmservviewfeaturedproductslink=='#'}">
											<p>
												<a href="javascript:void(0)" class="animateLink"
													title="${rightsection.mgmservviewfeaturedproductslabel}">${rightsection.mgmservviewfeaturedproductslabel}<span
													aria-hidden="true"
													class="glyphicon glyphicon-menu-right animateIcon"></span></a>
											</p>
										</c:when>
										<c:when test="${rightsection.mgmservopeninnewwindows==1}">

											<p>
												<a
													target="${rightsection.mgmservopeninnewwindows==1?'_blank':'_self'}"
													href="${domain}${rightsection.mgmservviewfeaturedproductslink}.html"
													title="${rightsection.mgmservviewfeaturedproductslabel}"
													class="animateLink">${rightsection.mgmservviewfeaturedproductslabel}<span
													aria-hidden="true"
													class="glyphicon glyphicon-new-window animateIcon"></span></a>
											</p>
										</c:when>
										<c:otherwise>
											<p>
												<a
													target="${rightsection.mgmservopeninnewwindows==1?'_blank':'_self'}"
													href="${domain}${rightsection.mgmservviewfeaturedproductslink}"
													title="${rightsection.mgmservviewfeaturedproductslabel}.html"
													class="animateLink">${rightsection.mgmservviewfeaturedproductslabel}<span
													aria-hidden="true"
													class="glyphicon glyphicon-menu-right animateIcon"></span></a>
											</p>
										</c:otherwise>
									</c:choose>

								</c:otherwise>
							</c:choose>
						</div>

					</c:forEach>


				</div>
			</div>
		</div>
	</div>
</div>
<!-- </li> -->
