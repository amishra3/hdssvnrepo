
<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:set var="tabinks" value="<%=PageUtils.convertMultiWidgetToList(properties,"tabName-tabAnchor-defaultActiveTab")%>" />

<div class="accordion-menu-container">
	<div class="accordion-menu hidden-sm hidden-md hidden-lg">
		<span class="acc-label" id="stickyNav-0"></span> <span
			class="icon-accordion-closed"></span> <span
			class="icon-accordion-opened"></span>
	</div>
</div>

<div class="hidden-xs content-container" style="position: relative;">
	<div class="navContain">
		<div class="stickNav-background">
			<div class="stickNav-container">
				<ul class="list-inline stickyNav">
					<c:forEach var="tabinks" items="${tabinks}" varStatus="loopcnt">
								<c:set var="tabName" value="${tabinks.tabName}" />
								<c:set var="tabAnchor" value="${tabinks.tabAnchor}" />
								<c:set var="defaultActiveTab" value="${tabinks.defaultactivetab}" />
								
								<li class="${tabAnchor} ${loopcnt.index==0?'active':''}"><a href="#${tabAnchor}">${tabName}</a></li>
					</c:forEach>			
			</div>
		</div>
	</div>
</div>




