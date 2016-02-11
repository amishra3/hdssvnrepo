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
<%
JCRDataAccessor dataAccessor = new JCRDataAccessor(pageContext);
%>
<c:set var="pageprops" value="<%=dataAccessor.getPage(currentPage.getAbsoluteParent(3).getPath())%>" />
<c:set var="domain" value="${pageprops.domain}" />
<c:set var="subnavlinks" value="<%=PageUtils.convertMultiWidgetToList(properties,"mgmcontactussubnavlabel-mgmcontactussubnavlink-mgmcontactusopeninnewwindow-mgmcontactusalttext")%>" />
<c:set var="subnavlinks2" value="<%=PageUtils.convertMultiWidgetToList(properties,"mgmcontactusheadline-mgmcontactusdescription-mgmcontactusviewfeaturedproductslabel-mgmcontactusnumber-mgmcontactusviewfeaturedproductslink-mgmcontactusopeninnewwindow2")%>" />
<c:set var="navpath" scope="request" value="${properties.mgmcontactusnavpath}"/>
<c:set var="mgmcontactusnavpath" value="${properties.mgmcontactusnavpath}" />
<c:if test="${fn:startsWith(mgmcontactusnavpath,'/content/')}">
	<c:set var="mgmcontactusnavpath" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("mgmcontactusnavpath").toString())%>"/>
</c:if>


<%-- <li><a href="${properties.mgmcontactusnavpath}.html" title="${properties.mgmcontactusnavtitle}">${properties.mgmcontactusnavtitle} --%>
<!--     	<span class="icon-accordion-closed"></span> -->
<!--     	<span class="icon-accordion-opened"></span> -->
<!--     </a> -->
    <div class="hds-megaMenuWrapper" style="background-image:url(${domain}${properties.mgmcontactusbackgroundimagepath}); background-repeat:no-repeat; background-position:bottom right;" data-parent-title="${properties.mgmcontactusnavtitle}" data-parent-path="${mgmcontactusnavpath}">
		<div class="hds-megaMenu">
        	<div class="content-container">
            	<div class="row">
                	<div class="col-md-12">
                    	<div class="megamenu-heading hidden-xs hidden-sm">
                        	<div class="icon">
                            	<img src="${properties.mgmcontactusiconpath}" title="${properties.mgmcontactustitle}">
                            </div>
                            <div class="title">
                            	<h2>${properties.mgmcontactustitle}</h2>
                                <span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span>
                            </div>
                         </div>
                     </div>
                     <div class="col-md-3 col-xs-12 megamenu-list">
                     	<ul class="single-col">
                          <li>
                            <c:forEach var="subnavlinks" items="${subnavlinks}" varStatus="count">
                                 <c:choose>
   						 <c:when test="${empty subnavlinks.mgmcontactussubnavlabel}">

                                     </c:when>
                                     <c:when test="{subnavlinks.mgmcontactussubnavlink=='#'}">                                        
                                    <li><a href="javascript:void(0)" class="animateLink" title="${subnavlinks.mgmcontactusalttext}">${subnavlinks.mgmcontactussubnavlabel}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a></li>
                                     </c:when>
                                    <c:when test="${subnavlinks.mgmcontactusopeninnewwindow==1}">
                        	<li><a target="${subnavlinks.mgmcontactusopeninnewwindow==1?'_blank':'_self'}" href="${domain}${subnavlinks.mgmcontactussubnavlink}.html" title="${subnavlinks.mgmcontactusalttext}" class="animateLink">${subnavlinks.mgmcontactussubnavlabel}<span aria-hidden="true" class="glyphicon glyphicon-new-window animateIcon"></span></a></li>

 </c:when>
                                     <c:otherwise>
                                         <li><a target="${subnavlinks.mgmcontactusopeninnewwindow==1?'_blank':'_self'}" href="${domain}${subnavlinks.mgmcontactussubnavlink}.html" title="${subnavlinks.mgmcontactusalttext}" class="animateLink">${subnavlinks.mgmcontactussubnavlabel}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a></li>

                                           </c:otherwise>

                            </c:choose>
                                     </c:forEach>
							</li>
                        </ul>
                    </div>
                    <div class="col-md-9 col-xs-12 spotlightNavigation">
					    <c:forEach var="subnavlinks2" items="${subnavlinks2}" varStatus="count">
                        <div class="col-xs-12 col-md-4">
                            <h3 class="hidden-xs hidden-sm">${subnavlinks2.mgmcontactusheadline}</h3>
                            <p class="hidden-xs hidden-sm">${subnavlinks2.mgmcontactusdescription}</p>
                            <div class="phone-no">${subnavlinks2.mgmcontactusnumber}</div>
<c:choose>
    			 <c:when test="${empty subnavlinks2.mgmcontactusviewfeaturedproductslabel}">

                                     </c:when>

                                <c:when test="${subnavlinks2.mgmcontactusviewfeaturedproductslink=='#'}">                                        
                                  <p><a href="javascript:void(0)" title="${subnavlinks2.mgmcontactusviewfeaturedproductslabel}" class="animateLink">${subnavlinks2.mgmcontactusviewfeaturedproductslabel}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a></p>
                                   </c:when>
                                    <c:when test="${subnavlinks2.mgmcontactusopeninnewwindow2==1}">
                            <p>
                                <a target="${subnavlinks2.mgmcontactusopeninnewwindow2==1?'_blank':'_self'}" href="${domain}${subnavlinks2.mgmcontactusviewfeaturedproductslink}.html" title="${subnavlinks2.mgmcontactusviewfeaturedproductslabel}" class="animateLink">${subnavlinks2.mgmcontactusviewfeaturedproductslabel}<span aria-hidden="true" class="glyphicon glyphicon-new-window animateIcon"></span></a></p>

 </c:when>
                                     <c:otherwise>
                                         <p>
                                <a target="${subnavlinks2.mgmcontactusopeninnewwindow2==1?'_blank':'_self'}" href="${domain}${subnavlinks2.mgmcontactusviewfeaturedproductslink}.html" title="${subnavlinks2.mgmcontactusviewfeaturedproductslabel}" class="animateLink">${subnavlinks2.mgmcontactusviewfeaturedproductslabel}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a></p>

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