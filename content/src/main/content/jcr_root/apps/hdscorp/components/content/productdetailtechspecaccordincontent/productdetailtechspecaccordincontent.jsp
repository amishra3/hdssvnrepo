<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:set var="defaultEditState" value="" />
<wcmmode:edit><c:set var="defaultEditState" value="open" /></wcmmode:edit>

<div class="vsp-soft-products-title">${properties.accordinsectiontitle}</div>

<c:set var="multilinks" value="<%=PageUtils.convertMultiWidgetToList(properties,"linkName")%>" />

<c:forEach var="accordinBox" items="${multilinks}" varStatus="loopcnt">
	<c:set var="accordinBoxTitle" value="${accordinBox.linkName}" />
	<div class="accordion-level" id="accord-box${loopcnt.index }">

		<div class="accordion-menu-container ${defaultEditState}">
			<div class="accordion-menu">
				<div id="stickyNav" class="acc-label">${accordinBoxTitle}</div>
				<span class="icon-accordion-closed"></span> 
				<span class="icon-accordion-opened"></span>
			</div>
		</div>
		

		<div class="accordion-content ${defaultEditState}">
			<cq:include path="accordincontentpar_${loopcnt.index}" resourceType="hdscorp/components/content/productdetailtechspecaccordininnercontent" />
		</div>
	
	</div>
</c:forEach>