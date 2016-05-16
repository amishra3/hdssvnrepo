<%--

  Partener 2 Column Content Component component.

  This is Partener 2 Column Content Component

--%>
<%
%><%@include file="/libs/foundation/global.jsp"%>
<%
%><%@page session="false"%>
<%
%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>

<c:set var="column1multilinks"
	value="<%=PageUtils.convertMultiWidgetToList(properties,"findpartnerphonenumber-urllabeltab1-urlltargettab1-urltypetab1")%>" />
<c:set var="column2multilinks"
	value="<%=PageUtils.convertMultiWidgetToList(properties,"alredypartnerphonenumber-urllabeltab2-urlltargettab2-urltypetab2")%>" />





<c:if test="${properties.findpartnerurltype}">
	<c:set var="findpartnerurltypecssclass" value="glyphicon-new-window" />
</c:if>
<c:set var="findpartnerurltarget"
	value="${properties.findpartnerurltarget}" />
<c:if test="${fn:startsWith(findpartnerurltarget,'/content/')}">
	<c:set var="findpartnerurltarget"
		value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("findpartnerurltarget").toString())%>" />
</c:if>

<c:choose>
	<c:when test="${not empty properties.partnerhelpfulllinkstitle}">

		<div class="service-support-main clearfix">
			<div class="content-container">
				<h2>${properties.partnerhelpfulllinkstitle}</h2>
				<div class="col-sm-6">
					<div class="section-service-col clearfix">
						<div class="imageHolder">
							<img alt="${properties.findpartnertitle}"
								src="${properties.findpartnericonpath}">
						</div>
						<h3 class="headline">
							<a href="${findpartnerurltarget}" class="animateLink">${properties.findpartnertitle}<span
								class="glyphicon ${findpartnerurltypecssclass}"
								aria-hidden="true"></span></a>
						</h3>
						<p>${properties.findpartnercontent}</p>
						<br>
						<c:forEach var="column1link" items="${column1multilinks}">


							<c:set var="urlltargettab1" value="${column1link.urlltargettab1}" />

							<c:if test="${not empty column1link.findpartnerphonenumber}">


								<div class="col-sm-6 support-phone-no col-no-pad">${column1link.findpartnerphonenumber}</div>
							</c:if>
							<c:if test="${column1link.urltypetab1 eq 'yes'}">
								<c:set var="urltypetab1cssclass" value="glyphicon-new-window" />
							</c:if>


							<c:if test="${fn:startsWith(urlltargettab1,'/content/')}">
								<c:set var="urlltargettab1"
									value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("urlltargettab1").toString())%>" />
							</c:if>

							<c:if test="${not empty column1link.urllabeltab1}">
								<div class="col-sm-6 support-connect-login col-no-pad">
									<a href="${urlltargettab1}" class="animateLink">${column1link.urllabeltab1}<span
										class="glyphicon ${urltypetab1cssclass}" aria-hidden="true"></span></a>
								</div>
							</c:if>
						</c:forEach>

					</div>
				</div>


				<c:if test="${properties.alredypartnerrurltype}">
					<c:set var="alredypartnerrurltypecssclass"
						value="glyphicon-new-window" />
				</c:if>
				<c:set var="alredypartnerurltarget"
					value="${properties.alredypartnerurltarget}" />

				<c:if test="${fn:startsWith(alredypartnerurltarget,'/content/')}">
					<c:set var="alredypartnerurltarget"
						value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("alredypartnerurltarget").toString())%>" />
				</c:if>


				<div class="col-sm-6">
					<div class="section-service-col service-blue-box clearfix">
						<div class="imageHolder">
							<img alt="${properties.alredypartnerrtitle}"
								src="${properties.alredypartnericonpath}">
						</div>
						<h3 class="headline">
							<a href="${alredypartnerrurltype}" class="animateLink">${properties.alredypartnerrtitle}<span
								class="glyphicon ${alredypartnerrurltypecssclass}"
								aria-hidden="true"></span></a>
						</h3>
						<p>${properties.alredypartnercontent}</p>

						<c:forEach var="column2link" items="${column2multilinks}">
							<c:if test="${not empty column2link.alredypartnerphonenumber}">


								<div class="col-sm-6 support-phone-no col-no-pad">${column2link.alredypartnerphonenumber}</div>
							</c:if>

							<c:if test="${column2link.urltypetab2 eq 'yes'}">
								<c:set var="urltypetab2cssclass" value="glyphicon-new-window" />
							</c:if>

							<c:set var="urlltargettab2" value="${column2link.urlltargettab2}" />
							<c:if test="${fn:startsWith(urlltargettab2,'/content/')}">
								<c:set var="urlltargettab2"
									value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("urlltargettab2").toString())%>" />
							</c:if>
							<c:if test="${not empty column2link.urllabeltab2}">
								<div class="col-sm-6 support-connect-login col-no-pad">
									<a href="${urlltargettab2}" class="animateLink">${column2link.urllabeltab2}<span
										class="glyphicon ${urltypetab2cssclass}" aria-hidden="true"></span></a>
								</div>
							</c:if>
						</c:forEach>

					</div>
				</div>
			</div>
		</div>
	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure News and
					insights landing banner </span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>
