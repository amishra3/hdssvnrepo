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
	style="background-image:url(); background-repeat:no-repeat; background-position:bottom right;"
	data-parent-title="${properties.mgmptnavtitle}"
	data-bg-url="${domain}${hdscorp:shortURL(properties.mgmptbackgroundimagepath)}"
	data-parent-path="${mgmptnavpath}">
	<div class="hds-megaMenu">
		<div class="content-container">
			<div class="row">
				<div class="col-md-12">
					<div class="megamenu-heading">
						<div class="icon hidden-xs hidden-sm">
							<img src="${domain}${hdscorp:shortURL(properties.mgmpttitleiconpath)}">
						</div>
						<div class="title">
							<h2><a href="javascript:void(0)" class="animateLink">${properties.mgmpttitle}
							<span aria-hidden="true"
								class="glyphicon glyphicon-menu-right animateIcon"></span></a></h2>
							
						</div>
					</div>
				</div> 
				<div class="col-md-6 col-xs-12 megamenu-list">

					<ul>
						<c:forEach var="subnavlinks" items="${partnersubnavlinks}" varStatus="count">
                                <c:choose>
								<c:when test="${not empty subnavlinks.mgmptsubnavlabel}">
                                    <c:set var="pageUrlVal" value="${fn:contains(subnavlinks.mgmptsubnavlink, 'http')?'':domain}${hdscorp:shortURL(subnavlinks.mgmptsubnavlink)}" />
									 <li>
                                    	<a itemprop="url"
										target="${subnavlinks.mgmptopeninnewwindow==1?'_blank':'_self'}"
                                         href="${subnavlinks.mgmptsubnavlink=='#'?'javascript:void(0)':pageUrlVal}"
										class="animateLink"><span itemprop="name">${subnavlinks.mgmptsubnavlabel}</span><span
											aria-hidden="true"
											class="glyphicon ${subnavlinks.mgmptopeninnewwindow==1?'glyphicon-new-window':'glyphicon-menu-right'} animateIcon"></span></a>
									</li>

								</c:when>
							</c:choose>
						</c:forEach>
					</ul>
				</div>
				<div class="col-md-6 col-xs-12 spotlightNavigation" data-style="${domain}${hdscorp:shortURL(properties.mgpartmobilebackgroundimagepath)}">
					<div class="col-xs-12 col-md-12">
						<h3 class="hidden-xs hidden-sm">${properties.mgmptheadline}</h3>

						<c:forEach var="partnerrighsection" items="${partnerrightsection}"
							varStatus="count">
							<div class="col-xs-12 col-md-4 override-left">
								<div class="hidden-xs hidden-sm">${partnerrighsection.mgmptmultidescription}</div>
							<c:if test="${not empty  partnerrighsection.mgmptmultisubnavlabel1}">
									<c:set var="pageUrlVal2" value="${fn:contains(partnerrighsection.mgmptmultisubnavlink1, 'http')?'':domain}${hdscorp:shortURL(partnerrighsection.mgmptmultisubnavlink1)}"/>
                               			<p>		
                                    		<a href="${partnerrighsection.mgmptmultisubnavlink1=='#'?'javascript:void(0)':pageUrlVal2}" target="${partnerrighsection.mgmptmultiopeninnewwindow==1?'_blank':'_self'}" class="animateLink">${partnerrighsection.mgmptmultisubnavlabel1}<span
												aria-hidden="true"
												class="glyphicon ${partnerrighsection.mgmptmultiopeninnewwindow==1?'glyphicon-new-window':'glyphicon-menu-right'} animateIcon"></span></a>
										</p>
                            </c:if>
							</div>
						</c:forEach>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
