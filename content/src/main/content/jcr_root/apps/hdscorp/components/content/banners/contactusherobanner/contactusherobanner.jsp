<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:choose>
	<c:when test="${not empty properties.contactustitlecontent}">

		<c:set var="placardList" value="<%=PageUtils.convertMultiWidgetToList(properties,"placardTitle-placardcontent-phonenumbertext1-phonenumbertext2-contacturllabel1-contacttargeturl1-contacturllabel2-contacttargeturl2")%>" />




            <div class="common-hero-short-banner contact-banner clearfix" style="background: url('${properties.contactusimagePath}')">
                <div class="content-container">
                    <h1 class="headline">${properties.contactustitlecontent}</h1>
					<div class="row detail-container">
					
					
						<c:forEach var="placardList" items="${placardList}" varStatus="loop">
							<c:set var="placardTitle" value="${placardList.placardTitle}" />
							<c:set var="placardcontent" value="${placardList.placardcontent}" />
							<c:set var="phonenumbertext1" value="${placardList.phonenumbertext1}" />
							<c:set var="phonenumbertext2" value="${placardList.phonenumbertext2}" />
							<c:set var="contacturllabel1" value="${placardList.contacturllabel1}" />
							<c:set var="contacttargeturl1" value="${placardList.contacttargeturl1}" />
							<c:set var="contacturllabel2" value="${placardList.contacturllabel2}" />
							<c:set var="contacttargeturl2" value="${placardList.contacttargeturl2}" />

							<c:if test="${fn:startsWith(contacttargeturl1,'/content/')}">
								<c:set var="contacttargeturl1" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("contacttargeturl1").toString())%>"/>
							</c:if>
				
							<c:if test="${fn:startsWith(contacttargeturl2,'/content/')}">
								<c:set var="contacttargeturl2" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("contacttargeturl2").toString())%>"/>
							</c:if>
			
			
							<div class="col-sm-4">
								<div class="details-box">
									<h2>${placardTitle}</h2>
									<p>${placardcontent}</p>
									<c:if test="${not empty phonenumbertext1}">
										<div class="address-contacts">
											<div class="contact">${phonenumbertext1}</div>
										</div>
									</c:if>
									<c:if test="${not empty phonenumbertext2}">
										<div class="address-contacts">
											<div class="contact">${phonenumbertext2}</div>
										</div>
									</c:if>									
									<c:if test="${not empty contacturllabel1}">
										<a class="animateLink" href="${contacttargeturl1}">${contacturllabel1}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a>
									</c:if>

									<c:if test="${not empty contacturllabel2}">
										<a class="animateLink" href="${contacttargeturl2}">${contacturllabel2}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a>
									</c:if>									
									
								</div>
							</div>			
			
						</c:forEach>
					
		
                    </div>
                </div>
            </div>








		
	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure About US HEXAGON Banner</span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>    	