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

<c:set var="domain" value="" />
<c:set var="port" value="<%= request.getServerPort() %>" />
<c:if test="${empty port || port == 80}">
<c:set var="domain" value="<%= pageProperties.getInherited("domain", "") %>" />
</c:if>
<c:set var="subnavlinks"
	value="<%=PageUtils.convertMultiWidgetToList(properties,"mgmpssubnavlabel-mgmpssubnavlink-mgmpsopeninnewwindow-mgmpsalttext")%>" />
<c:set var="navpath" scope="request" value="${properties.mgmpsnavpath}" />
<c:set var="mgmpsnavpath" value="${properties.mgmpsnavpath}" />
<c:if test="${fn:startsWith(mgmpsnavpath,'/content/')}">
	<c:set var="mgmpsnavpath"
		value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("mgmpsnavpath").toString())%>" />
</c:if>

<div class="hds-megaMenuWrapper"
	style="background-image:url(); background-repeat:no-repeat; background-position:bottom right;"
	data-parent-title="${properties.mgmpsnavtitle}"
	data-bg-url="${domain}${hdscorp:shortURL(properties.mgmpsbackgroundimagepath)}"
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
							<h2><a href="javascript:void(0)" class="animateLink">${properties.mgmpstitle}
							<span aria-hidden="true"
								class="glyphicon glyphicon-menu-right animateIcon"></span></a></h2>							
						</div>
					</div>
				</div>
				<div class="col-md-6 col-xs-12 megamenu-list">

					<ul>
						<c:forEach var="subnavlinks" items="${subnavlinks}" varStatus="count">
                                <c:choose>
								<c:when test="${not empty subnavlinks.mgmpssubnavlabel}">
                                    <c:set var="pageUrlVal" value="${fn:contains(subnavlinks.mgmpssubnavlink, 'http')?'':domain}${hdscorp:shortURL(subnavlinks.mgmpssubnavlink)}" />
									 <li>
                                    	<a
										target="${subnavlinks.mgmpsopeninnewwindow==1?'_blank':'_self'}"
                                         href="${subnavlinks.mgmpssubnavlink=='#'?'javascript:void(0)':pageUrlVal}"
										title="${subnavlinks.mgmpsalttext}" class="animateLink">${subnavlinks.mgmpssubnavlabel}<span
											aria-hidden="true"
											class="glyphicon ${subnavlinks.mgmpsopeninnewwindow==1?'glyphicon-new-window':'glyphicon-menu-right'} animateIcon"></span></a>
                                    </li>

								</c:when>
							</c:choose>
						</c:forEach>
					</ul>
				</div>
				<div class="col-md-6 col-xs-12 spotlightNavigation" data-style="${domain}${hdscorp:shortURL(properties.mgmobilebackgroundimagepath)}">
					<div class="col-xs-12 col-md-12">
						<h3 class="hidden-xs hidden-sm">${properties.mgmpsheadline}</h3>
						<div class="hidden-xs hidden-sm">${properties.mgmpsdescription}</div>
							<c:if test="${not empty  properties.mgmpsviewfeaturedproductslabel}">
									<c:set var="pageUrlVal2" value="${fn:contains(properties.mgmpsviewfeaturedproductslink, 'http')?'':domain}${hdscorp:shortURL(properties.mgmpsviewfeaturedproductslink)}"/>
                               			<p>		
                                    		<a href="${properties.mgmpsviewfeaturedproductslink=='#'?'javascript:void(0)':pageUrlVal2}" target="${properties.mgmpsopeninnewwindowouter?'_blank':'_self'}" class="animateLink" title="${properties.mgmpsviewfeaturedproductslabel}">${properties.mgmpsviewfeaturedproductslabel}<span aria-hidden="true" class="glyphicon ${properties.mgmpsopeninnewwindowouter?'glyphicon-new-window':'glyphicon-menu-right'} animateIcon"></span></a>
										</p>
                            </c:if>

					</div>
				</div>
			</div>
		</div>
	</div>
</div>
