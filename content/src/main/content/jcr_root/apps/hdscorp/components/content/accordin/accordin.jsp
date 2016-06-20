
<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:set var="tabinks" value="<%=PageUtils.convertMultiWidgetToList(properties,"tabName-tabAnchor-defaultActiveTab")%>" />


<div class="hidden-xs hidden-sm content-container" id="hdspsaccordion" style="position: relative; min-height:49px;">
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




