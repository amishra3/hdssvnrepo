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


<c:set var="subnavlinks" value="<%=PageUtils.convertMultiWidgetToList(properties,"mgmahsubnavlabel-mgmahsubnavlink-mgmahalttext-mgmahopeninnewwindow")%>" />
<c:set var="aboutrightsection" value="<%=PageUtils.convertMultiWidgetToList(properties,"mgmahheadline-mgmahdescription-mgmahviewfeaturedproductslabel-mgmahviewfeaturedproductslink-mgmahopeninnewwindows")%>" />
<c:set var="mgmahnavpath" value="${properties.mgmahnavpath}" />
<c:if test="${fn:startsWith(mgmahnavpath,'/content/')}">
	<c:set var="mgmahnavpath" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("mgmahnavpath").toString())%>"/>
</c:if>


<%-- <li><a href="${properties.mgmahnavpath}.html" --%>
<%-- 	title="${properties.mgmpsnavtitle}">${properties.mgmahnavtitle} <span --%>
<!-- 		class="icon-accordion-closed"></span> <span -->
<!-- 		class="icon-accordion-opened"></span> -->
<!-- </a> -->
	<div class="hds-megaMenuWrapper"
		style="background-image:url(${properties.mgmahbackgroundimagepath}); background-repeat:no-repeat; background-position:bottom right;" data-parent-title="${properties.mgmpsnavtitle}" data-parent-path="${mgmahnavpath}">
		<div class="hds-megaMenu">
			<div class="content-container">
				<div class="row">
					<div class="col-md-12">
						<div class="megamenu-heading hidden-xs hidden-sm">
							<div class="icon">
								<img src="${properties.mgmahtitleiconpath}"
									title="${properties.mgmahtitle}">
							</div>
							<div class="title">
								<h2>${properties.mgmahtitle}</h2>
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

								<c:when test="${empty subnavlinks.mgmahsubnavlabel}">

                                     </c:when>
                                    <c:when test="${subnavlinks.mgmahsubnavlink=='#'}">                                        
                                        <li><a href="javascript:void(0)" class="animateLink" title="${subnavlinks.mgmahsubnavlabel}">${subnavlinks.mgmahsubnavlabel}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a></li>
  									</c:when>
									<c:when test="${subnavlinks.mgmahopeninnewwindow==1}">
										<li><a
											target="${subnavlinks.mgmahopeninnewwindow?'_blank':'_self'}"
											href="${subnavlinks.mgmahsubnavlink}.html"
											title="${subnavlinks.mgmahalttext}" class="animateLink">${subnavlinks.mgmahsubnavlabel}<span
												aria-hidden="true"
												class="glyphicon glyphicon-new-window animateIcon"></span></a></li>

									</c:when>
									<c:otherwise>
										<li><a
											target="${subnavlinks.mgmahopeninnewwindow?'_blank':'_self'}"
											href="${subnavlinks.mgmahsubnavlink}.html"
											title="${subnavlinks.mgmahalttext}" class="animateLink">${subnavlinks.mgmahsubnavlabel}<span
												aria-hidden="true"
												class="glyphicon glyphicon-menu-right animateIcon"></span></a></li>

									</c:otherwise>

								</c:choose>
							</c:forEach>
						</ul>
					</div>
					<div class="col-md-6 col-xs-12 spotlightNavigation">

						<c:forEach var="aboutrightsection" items="${aboutrightsection}"
							varStatus="count">
							<div class="col-xs-12 col-md-6">
								<h3 class="hidden-xs hidden-sm">
									${aboutrightsection.mgmahheadline}</h3>
								<p class="hidden-xs hidden-sm">${aboutrightsection.mgmahdescription}</p>

								<c:choose>
                                    <c:when test="${aboutrightsection.mgmahviewfeaturedproductslink=='#'}">                                        
                                              <p><a href="javascript:void(0)" class="animateLink" title="${aboutrightsection.mgmahviewfeaturedproductslabel}">${aboutrightsection.mgmahviewfeaturedproductslabel}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a></p>
                                     </c:when>
									<c:when test="${aboutrightsection.mgmahopeninnewwindows==1}">

										<p>
											<a
												target="${aboutrightsection.mgmahopeninnewwindows==1?'_blank':'_self'}"
												href="${aboutrightsection.mgmahviewfeaturedproductslink}.html"
												title="${aboutrightsection.mgmahviewfeaturedproductslabel}"
												class="animateLink">${aboutrightsection.mgmahviewfeaturedproductslabel}<span
												aria-hidden="true"
												class="glyphicon glyphicon-new-window animateIcon"></span></a>
										</p>


									</c:when>
									<c:otherwise>

										<p>
											<a
												target="${aboutrightsection.mgmahopeninnewwindows==1?'_blank':'_self'}"
												href="${aboutrightsection.mgmahviewfeaturedproductslink}.html"
												title="${aboutrightsection.mgmahviewfeaturedproductslabel}"
												class="animateLink">${aboutrightsection.mgmahviewfeaturedproductslabel}<span
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
<!-- </li> -->

