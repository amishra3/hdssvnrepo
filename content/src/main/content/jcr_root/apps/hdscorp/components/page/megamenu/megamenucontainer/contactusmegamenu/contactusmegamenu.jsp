<%--
  Contact Us component.
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
	value="<%=PageUtils.convertMultiWidgetToList(properties,"mgmcontactussubnavlabel-mgmcontactussubnavlink-mgmcontactusopeninnewwindow-mgmcontactusalttext")%>" />
<c:set var="subnavlinks2"
	value="<%=PageUtils.convertMultiWidgetToList(properties,"mgmcontactusheadline-mgmcontactusdescription-mgmcontactusviewfeaturedproductslabel-mgmcontactusnumber-secondmgmcontactusnumber-mgmcontactusviewfeaturedproductslink-mgmcontactusopeninnewwindow2-overlay")%>" />
<c:set var="navpath" scope="request"
	value="${properties.mgmcontactusnavpath}" />
<c:set var="mgmcontactusnavpath"
	value="${properties.mgmcontactusnavpath}" />
<c:if test="${fn:startsWith(mgmcontactusnavpath,'/content/')}">
	<c:set var="mgmcontactusnavpath"
		value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("mgmcontactusnavpath").toString())%>" />
</c:if>


<div class="hds-megaMenuWrapper"
	style="background-image:url(); background-repeat:no-repeat; background-position:bottom right;"
	data-parent-title="${properties.mgmcontactusnavtitle}"
	data-bg-url="${domain}${hdscorp:shortURL(properties.mgmcontactusbackgroundimagepath)}"
	data-parent-path="${mgmcontactusnavpath}">
	<div class="hds-megaMenu">
		<div class="content-container">
			<div class="row">
				<div class="col-md-12">
					<div class="megamenu-heading">
						<div class="icon hidden-xs hidden-sm">
							<img src="${domain}${hdscorp:shortURL(properties.mgmcontactusiconpath)}">
						</div>
						<div class="title">
							<h2><a href="javascript:void(0)" class="animateLink">${properties.mgmcontactustitle}
							<span aria-hidden="true"
								class="glyphicon glyphicon-menu-right animateIcon"></span></a></h2>
							
						</div>
					</div>
				</div>
				<div class="col-md-3 col-xs-12 megamenu-list">

					<ul class="single-col">

                            <c:forEach var="subnavlinks" items="${subnavlinks}" varStatus="count">
                                <c:choose>

								<c:when test="${not empty subnavlinks.mgmcontactussubnavlabel}">
                                    <c:set var="pageUrlVal" value="${fn:contains(aboutrightsection.mgmcontactussubnavlink, 'http')?'':domain}${hdscorp:shortURL(subnavlinks.mgmcontactussubnavlink)}" />
									 <li>
                                    	<a
										target="${subnavlinks.mgmcontactusopeninnewwindow==1?'_blank':'_self'}"
                                         href="${subnavlinks.mgmcontactussubnavlink=='#'?'javascript:void(0)':pageUrlVal}"
										class="animateLink">${subnavlinks.mgmcontactussubnavlabel}<span
												aria-hidden="true"
												class="glyphicon ${subnavlinks.mgmcontactusopeninnewwindow==1?'glyphicon-new-window':'glyphicon-menu-right'} animateIcon"></span></a>
									</li>

								</c:when>
							</c:choose>
						</c:forEach>

					</ul>
				</div>
				<div class="col-md-9 col-xs-12 spotlightNavigation" data-style="${domain}${hdscorp:shortURL(properties.mgconmobilebackgroundimagepath)}">
					<c:forEach var="subnavlinks2" items="${subnavlinks2}"
						varStatus="count">
						<div class="col-xs-12 col-md-4">
							<h3 class="hidden-xs hidden-sm">${subnavlinks2.mgmcontactusheadline}</h3>
							<div class="hidden-xs hidden-sm">${subnavlinks2.mgmcontactusdescription}</div>
							
							<c:if test="${not empty  subnavlinks2.mgmcontactusnumber}">
							<div class="phone-no">${subnavlinks2.mgmcontactusnumber}</div>
							</c:if>
                            <c:if test="${not empty  subnavlinks2.secondmgmcontactusnumber}">
							<div class="phone-no">${subnavlinks2.secondmgmcontactusnumber}</div>
							</c:if>
								<c:if test="${not empty  subnavlinks2.mgmcontactusviewfeaturedproductslabel}">
									<c:set var="pageUrlVal2" value="${fn:contains(subnavlinks2.mgmcontactusviewfeaturedproductslink, 'http')?'':domain}${hdscorp:shortURL(subnavlinks2.mgmcontactusviewfeaturedproductslink)}"/>
                               			<p>		
                                            <a rel="${subnavlinks2.overlay==1?'iframemodal':''}" href="${subnavlinks2.mgmnewsinsightsviewfeaturedproductslink=='#'?'javascript:void(0)':pageUrlVal2}" target="${subnavlinks2.mgmcontactusopeninnewwindow2==1?'_blank':'_self'}" class="animateLink">${subnavlinks2.mgmcontactusviewfeaturedproductslabel}<span
											aria-hidden="true"
											class="glyphicon ${subnavlinks2.mgmcontactusopeninnewwindow2==1?'glyphicon-new-window':'glyphicon-menu-right'} animateIcon"></span></a>
										</p>
                            </c:if>
						</div>
					</c:forEach>
				</div>
			</div>
		</div>
	</div>
</div>
