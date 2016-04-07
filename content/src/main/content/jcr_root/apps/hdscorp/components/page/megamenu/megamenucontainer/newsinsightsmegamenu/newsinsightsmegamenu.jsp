<%--
  News & Insights MegaMenu component.
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
	value="<%=PageUtils.convertMultiWidgetToList(properties,"mgmnewsinsightssubnavlabel-mgmnewsinsightssubnavlink-mgmnewsinsightsopeninnewwindow-mgmnewsinsightsalttext")%>" />
<c:set var="subnavlinks2"
	value="<%=PageUtils.convertMultiWidgetToList(properties,"mgmnewsinsightsheadline-mgmnewsinsightsdescription-mgmnewsinsightsviewfeaturedproductslabel-mgmnewsinsightsviewfeaturedproductslink-mgmnewsinsightsopeninnewwindow2-mgmnewsinsightsthirdparty")%>" />
<c:set var="navpath" scope="request"
	value="${properties.mgmnewsinsightsnavpath}" />

<c:set var="mgmnewsinsightsnavpath"
	value="${properties.mgmnewsinsightsnavpath}" />
<c:if test="${fn:startsWith(mgmnewsinsightsnavpath,'/content/')}">
	<c:set var="mgmnewsinsightsnavpath"
		value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("mgmnewsinsightsnavpath").toString())%>" />
</c:if>


<div class="hds-megaMenuWrapper"
	style="background-image:url(); background-repeat:no-repeat; background-position:bottom right;"
	data-parent-title="${properties.mgmnewsinsightsnavtitle}"
	data-bg-url="${domain}${hdscorp:shortURL(properties.mgmnewsinsightsbackgroundimagepath)}"
	data-parent-path="${mgmnewsinsightsnavpath}">
	<div class="hds-megaMenu">
		<div class="content-container">
			<div class="row">
				<div class="col-md-12">
					<div class="megamenu-heading">
						<div class="icon hidden-xs hidden-sm">
							<img src="${domain}${hdscorp:shortURL(properties.mgmnewsinsightstitleiconpath)}">
						</div>
						<div class="title">
							<h2><a href="javascript:void(0)" class="animateLink">${properties.mgmnewsinsightstitle}
							<span aria-hidden="true"
								class="glyphicon glyphicon-menu-right animateIcon"></span>
							</a></h2>							
						</div>
					</div>
				</div>
				<div class="col-md-4 col-xs-12 megamenu-list">

					<ul class="single-col">
						<c:forEach var="subnavlinks" items="${subnavlinks}" varStatus="count">
                                <c:choose>
								<c:when test="${not empty subnavlinks.mgmnewsinsightssubnavlabel}">
                                    <c:set var="pageUrlVal" value="${fn:contains(subnavlinks.mgmnewsinsightssubnavlink, 'http')?'':domain}${hdscorp:shortURL(subnavlinks.mgmnewsinsightssubnavlink)}" />
									 <li>
                                   	<a
										target="${subnavlinks.mgmnewsinsightsopeninnewwindow==1?'_blank':'_self'}"
                                         href="${subnavlinks.mgmpssubnavlink=='#'?'javascript:void(0)':pageUrlVal}"
										class="animateLink">${subnavlinks.mgmnewsinsightssubnavlabel}<span
											aria-hidden="true"
											class="glyphicon ${subnavlinks.mgmnewsinsightsopeninnewwindow==1?'glyphicon-new-window':'glyphicon-menu-right'} animateIcon"></span></a>
									</li>

					 			</c:when>
							</c:choose>
						</c:forEach>
					</ul>
				</div>

                <c:choose>

						<c:when test="${fn:length(subnavlinks2)>1}">


				<div class="col-md-8 col-xs-12 spotlightNavigation" data-style="${domain}${hdscorp:shortURL(properties.mgnewsmobilebackgroundimagepath)}">
					<c:forEach var="subnavlinks2" items="${subnavlinks2}"
						varStatus="count">
						<div class="col-xs-12 col-md-6">
							<h3 class="hidden-xs hidden-sm">${subnavlinks2.mgmnewsinsightsheadline}</h3>
							<div class="hidden-xs hidden-sm">${subnavlinks2.mgmnewsinsightsdescription}</div>
								<c:if test="${not empty  subnavlinks2.mgmnewsinsightsviewfeaturedproductslabel}">
									<c:set var="pageUrlVal2" value="${fn:contains(subnavlinks2.mgmnewsinsightsviewfeaturedproductslink, 'http')?'':domain}${hdscorp:shortURL(subnavlinks2.mgmnewsinsightsviewfeaturedproductslink)}"/>
                               			<p>		
                                    		<a href="${subnavlinks2.mgmnewsinsightsviewfeaturedproductslink=='#'?'javascript:void(0)':pageUrlVal2}" target="${subnavlinks2.mgmnewsinsightsopeninnewwindow2==1?'_blank':'_self'}" class="animateLink">${subnavlinks2.mgmnewsinsightsviewfeaturedproductslabel}
                                            ${subnavlinks2.mgmnewsinsightsthirdparty==1?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a>
										</p>
                            </c:if>
						</div>
					</c:forEach>
				</div> 
</c:when>

						<c:otherwise>
<div class="col-md-8 col-xs-12 spotlightNavigation" data-style="${domain}${hdscorp:shortURL(properties.mgnewsmobilebackgroundimagepath)}">
					<c:forEach var="subnavlinks2" items="${subnavlinks2}"
						varStatus="count">
						<div class="col-xs-12 col-md-12">
							<h3 class="hidden-xs hidden-sm">${subnavlinks2.mgmnewsinsightsheadline}</h3>
							<div class="hidden-xs hidden-sm">${subnavlinks2.mgmnewsinsightsdescription}</div>
								<c:if test="${not empty  subnavlinks2.mgmnewsinsightsviewfeaturedproductslabel}">
									<c:set var="pageUrlVal2" value="${fn:contains(subnavlinks2.mgmnewsinsightsviewfeaturedproductslink, 'http')?'':domain}${hdscorp:shortURL(subnavlinks2.mgmnewsinsightsviewfeaturedproductslink)}"/>
                               			<p>		
                                    		<a href="${subnavlinks2.mgmnewsinsightsviewfeaturedproductslink=='#'?'javascript:void(0)':pageUrlVal2}" target="${subnavlinks2.mgmnewsinsightsopeninnewwindow2==1?'_blank':'_self'}" class="animateLink">${subnavlinks2.mgmnewsinsightsviewfeaturedproductslabel}
                                            ${subnavlinks2.mgmnewsinsightsthirdparty==1?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a>
										</p>
                            </c:if>
						</div>
					</c:forEach>
				</div>
						</c:otherwise>

                </c:choose>


                        </div>
		</div>
	</div>
</div>
