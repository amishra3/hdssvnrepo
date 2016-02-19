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

<c:set var="partnersubnavlinks"
	value="<%=PageUtils.convertMultiWidgetToList(properties,"mgmptsubnavlabel-mgmptsubnavlink-mgmptopeninnewwindow-mgmptalttext")%>" />
<c:set var="partnerrightsection"
	value="<%=PageUtils.convertMultiWidgetToList(properties,"mgmptmultidescription-mgmptmultisubnavlabel1-mgmptmultisubnavlink1-mgmptmultiopeninnewwindow")%>" />
<c:set var="mgmptnavpath" value="${properties.mgmptnavpath}" />
<c:if test="${fn:startsWith(mgmptnavpath,'/content/')}">
	<c:set var="mgmptnavpath"
		value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("mgmptnavpath").toString())%>" />
</c:if>


<div class="hds-megaMenuWrapper"
	style="background-image:url(${domain}${properties.mgmptbackgroundimagepath}); background-repeat:no-repeat; background-position:bottom right;"
	data-parent-title="${properties.mgmptnavtitle}"
	data-parent-path="${mgmptnavpath}">
	<div class="hds-megaMenu">
		<div class="content-container">
			<div class="row">
				<div class="col-md-12">
					<div class="megamenu-heading hidden-xs hidden-sm">
						<div class="icon">
							<img src="${domain}${properties.mgmpttitleiconpath}"
								title="${properties.mgmpttitle}">
						</div>
						<div class="title">
							<h2>${properties.mgmpttitle}</h2>
							<span aria-hidden="true"
								class="glyphicon glyphicon-menu-right animateIcon"></span>
						</div>
					</div>
				</div>
				<div class="col-md-6 col-xs-12 megamenu-list">
					<ul>
						<c:forEach var="subnavlinks" items="${partnersubnavlinks}"
							varStatus="count">
							<c:choose>


								<c:when test="${empty subnavlinks.mgmptsubnavlabel}">

								</c:when>

								<c:when test="${subnavlinks.mgmptsubnavlink=='#'}">
									<li><a href="javascript:void(0)"
										title="${subnavlinks.mgmptalttext}" class="animateLink">${subnavlinks.mgmptsubnavlabel}<span
											aria-hidden="true"
											class="glyphicon glyphicon-menu-right animateIcon"></span></a></li>
								</c:when>
								<c:when test="${subnavlinks.mgmptopeninnewwindow==1}">
									<li><a
										target="${subnavlinks.mgmptopeninnewwindow==1?'_blank':'_self'}"
										href="${fn:contains(subnavlinks.mgmptsubnavlink, 'http')?'':domain}${subnavlinks.mgmptsubnavlink}.html"
										class="animateLink" title="${subnavlinks.mgmptalttext}">${subnavlinks.mgmptsubnavlabel}<span
											aria-hidden="true"
											class="glyphicon glyphicon-new-window animateIcon"></span></a></li>
								</c:when>
								<c:otherwise>
									<li><a
										target="${subnavlinks.mgmptopeninnewwindow==1?'_blank':'_self'}"
										href="${fn:contains(subnavlinks.mgmptsubnavlink, 'http')?'':domain}${subnavlinks.mgmptsubnavlink}.html"
										title="${subnavlinks.mgmptalttext}" class="animateLink">${subnavlinks.mgmptsubnavlabel}<span
											aria-hidden="true"
											class="glyphicon glyphicon-menu-right animateIcon"></span></a></li>
								</c:otherwise>
							</c:choose>
						</c:forEach>
					</ul>
				</div>
				<div class="col-md-6 col-xs-12 spotlightNavigation">
					<div class="col-xs-12 col-md-12">
						<h3 class="hidden-xs hidden-sm">${properties.mgmptheadline}</h3>

						<c:forEach var="partnerrighsection" items="${partnerrightsection}"
							varStatus="count">
							<div class="col-xs-12 col-md-4">
								<div class="hidden-xs hidden-sm">${partnerrighsection.mgmptmultidescription}</div>
								<c:choose>

									<c:when
										test="${empty partnerrighsection.mgmptmultisubnavlabel1}">

									</c:when>

									<c:when test="${partnerrighsection.mgmptmultisubnavlink1=='#'}">
										<p>
											<a href="javascript:void(0)"
												title="${partnerrighsection.mgmptmultisubnavlabel1}"
												class="animateLink">${partnerrighsection.mgmptmultisubnavlabel1}<span
												aria-hidden="true"
												class="glyphicon glyphicon-menu-right animateIcon"></span></a>
										</p>
									</c:when>

									<c:when
										test="${partnerrighsection.mgmptmultiopeninnewwindow==1}">
										<p>
											<a
												target="${partnerrighsection.mgmptmultiopeninnewwindow==1?'_blank':'_self'}"
												href="${fn:contains(partnerrighsection.mgmptmultisubnavlink1, 'http')?'':domain}${partnerrighsection.mgmptmultisubnavlink1}.html"
												title="${partnerrighsection.mgmptmultisubnavlabel1}"
												class="animateLink">${partnerrighsection.mgmptmultisubnavlabel1}<span
												aria-hidden="true"
												class="glyphicon glyphicon-new-window animateIcon"></span></a>
										</p>
									</c:when>
									<c:otherwise>
										<p>
											<a
												target="${partnerrighsection.mgmptmultiopeninnewwindow==1?'_blank':'_self'}"
												href="${fn:contains(partnerrighsection.mgmptmultisubnavlink1, 'http')?'':domain}${partnerrighsection.mgmptmultisubnavlink1}.html"
												title="${partnerrighsection.mgmptmultisubnavlabel1}"
												class="animateLink">${partnerrighsection.mgmptmultisubnavlabel1}<span
												aria-hidden="true"
												class="glyphicon glyphicon-menu-right animateIcon"></span></a>
										</p>
									</c:otherwise>
								</c:choose>
							</div>
						</c:forEach>

					</div>
				</div>
			</div>
		</div>
	</div>
</div>
