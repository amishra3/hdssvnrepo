<%--

  About HDS Megamenu Component component.

  This is about hds megamenu component

--%>
<%
%><%@include file="/apps/foundation/global.jsp"%>
<%
%><%@page session="false"%>
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
	value="<%=PageUtils.convertMultiWidgetToList(properties,"mgmahsubnavlabel-mgmahsubnavlink-mgmahalttext-mgmahopeninnewwindow")%>" />
<c:set var="aboutrightsection"
	value="<%=PageUtils.convertMultiWidgetToList(properties,"mgmahheadline-mgmahdescription-mgmahviewfeaturedproductslabel-mgmahviewfeaturedproductslink-mgmahopeninnewwindows")%>" />
<c:set var="mgmahnavpath" value="${properties.mgmahnavpath}" />
<c:if test="${fn:startsWith(mgmahnavpath,'/content/')}">
	<c:set var="mgmahnavpath"
		value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("mgmahnavpath").toString())%>" />
</c:if>


<div class="hds-megaMenuWrapper"
	style="background-image:url(); background-repeat:no-repeat; background-position:bottom right;"
	data-parent-title="${properties.mgmpsnavtitle}"
	data-bg-url="${domain}${hdscorp:shortURL(properties.mgmahbackgroundimagepath)}"
	data-parent-path="${mgmahnavpath}">
	<div class="hds-megaMenu">
		<div class="content-container">
			<div class="row">
				<div class="col-md-12">
					<div class="megamenu-heading">
						<div class="icon hidden-xs hidden-sm">
							<img src="${domain}${hdscorp:shortURL(properties.mgmahtitleiconpath)}"
								title="${properties.mgmahtitle}">
						</div>
						<div class="title">
							<h2><a href="javascript:void(0)" class="animateLink">${properties.mgmahtitle}
							<span aria-hidden="true"
								class="glyphicon glyphicon-menu-right animateIcon"></span></a></h2>
							
						</div>
					</div>
				</div>

				<div class="col-md-6 col-xs-12 megamenu-list">
					<ul>
						<c:forEach var="subnavlinks" items="${subnavlinks}" varStatus="count">
                                <c:choose>
								<c:when test="${not empty subnavlinks.mgmahsubnavlabel}">
                                    <c:set var="pageUrlVal" value="${fn:contains(subnavlinks.mgmahsubnavlink, 'http')?'':domain}${hdscorp:shortURL(subnavlinks.mgmahsubnavlink)}" />
                                    <li>
                                    	<a
										target="${subnavlinks.mgmahopeninnewwindow==1?'_blank':'_self'}"
                                         href="${subnavlinks.mgmahsubnavlink=='#'?'javascript:void(0)':pageUrlVal}"
										title="${subnavlinks.mgmahalttext}" class="animateLink">${subnavlinks.mgmahsubnavlabel}<span
											aria-hidden="true"
											class="glyphicon ${subnavlinks.mgmahopeninnewwindow==1?'glyphicon-new-window':'glyphicon-menu-right'} animateIcon"></span></a>
									</li>

								</c:when>
							</c:choose>
						</c:forEach>
					</ul>
				</div>
				<div class="col-md-6 col-xs-12 spotlightNavigation" data-style="${domain}${hdscorp:shortURL(properties.mgabtmobilebackgroundimagepath)}">

					<c:forEach var="aboutrightsection" items="${aboutrightsection}"
						varStatus="count">
						<div class="col-xs-12 col-md-6">
							<h3 class="hidden-xs hidden-sm">
								${aboutrightsection.mgmahheadline}</h3>
							<div class="hidden-xs hidden-sm">${aboutrightsection.mgmahdescription}</div>
								<c:if test="${not empty  aboutrightsection.mgmahviewfeaturedproductslabel}">
									<c:set var="pageUrlVal2" value="${fn:contains(aboutrightsection.mgmahviewfeaturedproductslink, 'http')?'':domain}${hdscorp:shortURL(aboutrightsection.mgmahviewfeaturedproductslink)}"/>
                               			<p>		
                                    		<a href="${aboutrightsection.mgmahviewfeaturedproductslink=='#'?'javascript:void(0)':pageUrlVal2}" target="${aboutrightsection.mgmahopeninnewwindows==1?'_blank':'_self'}" class="animateLink" title="${aboutrightsection.mgmahviewfeaturedproductslabel}">${aboutrightsection.mgmahviewfeaturedproductslabel}<span
											aria-hidden="true"
											class="glyphicon ${aboutrightsection.mgmahopeninnewwindows==1?'glyphicon-new-window':'glyphicon-menu-right'} animateIcon"></span></a>
										</p>
                            </c:if>

						</div>
					</c:forEach>
				</div>
			</div>
		</div>
	</div>
</div>
