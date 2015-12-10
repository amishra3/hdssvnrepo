<%--
  Homepage Hero Banner component.
--%>

<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:choose>
	<c:when test="${not empty properties.herotitlecontent}">

		<c:set var="tabList" value="<%=PageUtils.convertMultiWidgetToList(properties,"tabTitle-tabOverlayPath-tabIconPath")%>" />

		<div class="hero general col-xs-12 col-sm-12 col-md-12 col-lg-12" style="background-image: url(${properties.heroimagePath});">
    		<div class="hero-container general">
    			
    			<h2 class="headline hidden-xs">${properties.herotitlecontent}</h2>
    			<!-- <h2 class="headline hidden-sm hidden-md hidden-lg">${properties.herotitlecontent}</h2> -->
    			<h4 class="sub-headline hidden-xs">${properties.herosubtitlecontent}</h4>
    			<!-- <h4 class="sub-headline hidden-sm hidden-md hidden-lg">${properties.herosubtitlecontent}</h4> -->
    	
    			<ul class="general-list col-sm-10 col-md-9 col-lg-8 clearfix">
    				<c:forEach var="tabList" items="${tabList}">
						<c:set var="tabTitle" value="${tabList.tabTitle}" />
						<c:set var="tabOverlayPath" value="${tabList.tabOverlayPath}" />
						<c:set var="tabIconPath" value="${tabList.tabIconPath}" />
						<li class="col-sm-6">
    						<a href="#" data-href="${tabOverlayPath}.overlay.html" class="general-healthcare">
    							<span class="sprite icon-suitcase-red" style="background-image: url(${tabIconPath});background-position: 0 0"></span> ${tabTitle}
    						</a>
    						<sling:include path="${tabOverlayPath}.overlay.html" />	
    					</li>
    					
    					
    				</c:forEach>
    			</ul>
    	
    			<div class="view-all">
    				<a href="#">View All Industries &nbsp;<span class="sprite icon-caret-white"></span></a>
    			</div>
    	
    			<div class="scroll-down">
    				<a href="#"><span class="sprite icon-arrow-down"></span></a>
    			</div>
    		</div>
    	</div>	
</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure Homepage Hero Banner</span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>    	