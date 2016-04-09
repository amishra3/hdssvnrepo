<%--404 Component component.--%><%
%><%@include file="/apps/foundation/global.jsp"%><%
%><%@page session="false" %>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>

	<c:set var="multilinks" value="<%=PageUtils.convertMultiWidgetToList(properties,"nflinklabel-nflink-nfopeninnewwindow")%>" />


 <div class="common-hero-banner hero-product-solutions clearfix" style="background-image: url(${properties.nfbackgroundimage});">
               <div class="common-hero-banner-container">
                  <div class="col-lg-12 col-md-12 col-xs-12">
                     <!--404-->  
                     <div class="page-not-found">
                         <h1 class="headline">${properties.nftitle}</h1>
						 ${properties.nfsubtitle}
                         <c:forEach var="multilink" items="${multilinks}">
                        <p><a class="animateLink" href="${hdscorp:shortURL(multilink.nflink)}" target="${multilink.nfopeninnewwindow==1?'_blank':'_self'}">${multilink.nflinklabel} <span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a></p>

						</c:forEach>

                     </div>
                     <!--//404-->  
                  </div>
               </div>
            </div>