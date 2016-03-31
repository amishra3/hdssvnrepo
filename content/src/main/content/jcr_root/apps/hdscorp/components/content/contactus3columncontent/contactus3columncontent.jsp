<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.slingmodels.CategoryFacetsModel"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>

	<div class="grey_container clearfix">
		<div class="content-container container-fluid">
			<div class="col-md-4 grey-box-inner">
					<h2>${properties.contactuscolumntitle}</h2>
					<p>${properties.contactuscolumncontent}</p>
					<c:set var="column1multilinks" value="<%=PageUtils.convertMultiWidgetToList(properties,"urllabeltab1-urlltargettab1-urltype1-newwin1")%>" />
					
					<c:forEach var="column1link" items="${column1multilinks}">
						<c:set var="urllabeltab1" value="${column1link.urllabeltab1}" />
						<c:set var="urlltargettab1" value="${column1link.urlltargettab1}" />
				        <c:set var="urltype1" value="${column1link.urltype1}"/>

				        
				        <c:if test="${fn:startsWith(urlltargettab1,'/content/')}">
							<c:set var="urlltargettab1" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("urlltargettab1").toString())%>"/>
						</c:if>	
						
						<a class="animateLink" href="${urlltargettab1}" target="${column1link.newwin1==1?'_blank':'_self'}">${urllabeltab1}${column1link.urltype1==1?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a>
						
					</c:forEach>
			</div>
			<div class="col-md-4 grey-box-inner">
					<h2>${properties.contactuscolumntitle2}</h2>
					<p>${properties.contactuscolumncontent2}</p>
					<c:set var="column2multilinks" value="<%=PageUtils.convertMultiWidgetToList(properties,"urllabeltab2-urlltargettab2-urltype2-newwin2")%>" />

					<c:forEach var="column2link" items="${column2multilinks}">
						<c:set var="urllabeltab2" value="${column2link.urllabeltab2}" />
						<c:set var="urlltargettab2" value="${column2link.urlltargettab2}" />
				        <c:set var="urltype2" value="${column2link.urltype2}"/>
				        <c:set var="linktypecssclass" value="glyphicon-menu-right" />

				        
				        <c:if test="${fn:startsWith(urlltargettab2,'/content/')}">
							<c:set var="urlltargettab2" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("urlltargettab2").toString())%>"/>
						</c:if>	
						
						<a class="animateLink" href="${urlltargettab2}" target="${column2link.newwin2==1?'_blank':'_self'}">${urllabeltab2}${column2link.urltype2==1?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a>
						
					</c:forEach>
					
			</div>
			<div class="col-md-4 grey-box-inner">
					<h2>${properties.contactuscolumntitle3}</h2>
					<p>${properties.contactuscolumncontent3}</p>
					
					<c:set var="column3multilinks" value="<%=PageUtils.convertMultiWidgetToList(properties,"urllabeltab3-urlltargettab3-urltype3-newwin3")%>" />

					<c:forEach var="column3link" items="${column3multilinks}">
						<c:set var="urllabeltab3" value="${column3link.urllabeltab3}" />
						<c:set var="urlltargettab3" value="${column3link.urlltargettab3}" />
				        <c:set var="urltype3" value="${column3link.urltype3}"/>
				        <c:set var="linktypecssclass" value="glyphicon-menu-right" />

				        
				        <c:if test="${fn:startsWith(urlltargettab3,'/content/')}">
							<c:set var="urlltargettab3" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("urlltargettab3").toString())%>"/>
						</c:if>	
						
						<a class="animateLink" href="${urlltargettab3}" target="${column3link.newwin3==1?'_blank':'_self'}">${urllabeltab3}${column3link.urltype3==1?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a>
						
					</c:forEach>
					
			</div>
		</div>
	</div>