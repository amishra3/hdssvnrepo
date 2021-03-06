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

<c:set var="domain" value="" />
<c:set var="port" value="<%= request.getServerPort() %>" />
<c:if test="${empty port || port == 80}">
<c:set var="domain" value="<%= pageProperties.getInherited("domain", "") %>" />
</c:if>

<c:set var="subnavlinks"
	value="<%=PageUtils.convertMultiWidgetToList(properties,"mgmservsubnavlabel-mgmservsubnavlink-mgmservalttext-mgmservopeninnewwindow")%>" />
<c:set var="rightsection"
	value="<%=PageUtils.convertMultiWidgetToList(properties,"mgmservheadline-mgmservdescription-mgmservviewfeaturedproductslabel-mgmservviewfeaturedproductslink-mgmservopeninnewwindows-mgmservphonenumber")%>" />
<c:set var="mgmservnavpath" value="${properties.mgmservnavpath}" />
<c:if test="${fn:startsWith(mgmservnavpath,'/content/')}">
	<c:set var="mgmservnavpath"
		value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("mgmservnavpath").toString())%>" />
</c:if>

<div class="hds-megaMenuWrapper"
	style="background-image:url(); background-repeat:no-repeat; background-position:bottom right;"
	data-parent-title="${properties.mgmservnavtitle}"
	data-bg-url="${domain}${hdscorp:shortURL(properties.mgmservbackgroundimagepath)}"
	data-parent-path="${mgmservnavpath}">
	<div class="hds-megaMenu">
		<div class="content-container">
			<div class="row">
				<div class="col-md-12">
					<div class="megamenu-heading">
						<div class="icon hidden-xs hidden-sm">
							<img src="${domain}${hdscorp:shortURL(properties.mgmservtitleiconpath)}">
						</div>
						<div class="title">
							<h2><a href="javascript:void(0)" class="animateLink">${properties.mgmservtitle}
							<span aria-hidden="true"
								class="glyphicon glyphicon-menu-right animateIcon"></span></a></h2>

						</div>
					</div>
				</div>
				<div class="col-md-6 col-xs-12 megamenu-list">
					<ul>
						<c:forEach var="subnavlinks" items="${subnavlinks}" varStatus="count">
							<c:choose>
								<c:when test="${not empty subnavlinks.mgmservsubnavlabel}">
									<c:set var="pageUrlVal" value="${fn:contains(subnavlinks.mgmservsubnavlink, 'http')?'':domain}${hdscorp:shortURL(subnavlinks.mgmservsubnavlink)}" />
									<li>
                                    	<a itemprop="url"
										target="${subnavlinks.mgmservopeninnewwindow==1?'_blank':'_self'}"
                                         href="${subnavlinks.mgmpssubnavlink=='#'?'javascript:void(0)':pageUrlVal}" class="animateLink"><span itemprop="name">${subnavlinks.mgmservsubnavlabel}</span><span
											aria-hidden="true"
											class="glyphicon ${subnavlinks.mgmservopeninnewwindow==1?'glyphicon-new-window':'glyphicon-menu-right'} animateIcon"></span></a>
                                    </li>
                                </c:when>
							</c:choose>
						</c:forEach>
					</ul>
				</div>
				<div class="col-md-6 col-xs-12 spotlightNavigation" data-style="${domain}${hdscorp:shortURL(properties.mgsermobilebackgroundimagepath)}">

					<c:forEach var="rightsection" items="${rightsection}"
						varStatus="count">
						<div class="col-xs-12 col-md-6">
							<h3 class="hidden-xs hidden-sm">${rightsection.mgmservheadline}</h3>
							<div class="hidden-xs hidden-sm">${rightsection.mgmservdescription}</div>
							<c:choose>
								<c:when test="${not empty rightsection.mgmservphonenumber}">
									<p>
										<a href="javascript:void(0)"
											class="animateLink">${rightsection.mgmservphonenumber}</a>
									</p>
								</c:when>
								<c:otherwise>
										<c:if test="${not empty  rightsection.mgmservviewfeaturedproductslabel}">
									<c:set var="pageUrlVal2" value="${fn:contains(rightsection.mgmservviewfeaturedproductslink, 'http')?'':domain}${hdscorp:shortURL(rightsection.mgmservviewfeaturedproductslink)}"/>
                               			<p>		
                                    		<a href="${rightsection.mgmservviewfeaturedproductslink=='#'?'javascript:void(0)':pageUrlVal2}" target="${rightsection.mgmservopeninnewwindows==1?'_blank':'_self'}" class="animateLink">${rightsection.mgmservviewfeaturedproductslabel}<span
													aria-hidden="true"
													class="glyphicon ${rightsection.mgmservopeninnewwindows==1?'glyphicon-new-window':'glyphicon-menu-right'} animateIcon"></span></a>
										</p>
                            </c:if>

								</c:otherwise>
							</c:choose>
						</div>

					</c:forEach>
				</div>
			</div>
		</div>
	</div>
</div>