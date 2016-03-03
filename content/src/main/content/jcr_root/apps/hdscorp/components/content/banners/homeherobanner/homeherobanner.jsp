<%--
  Homepage Hero Banner component.
--%>

<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>

<c:set var="viewlinkUrl" value="${properties.viewalllinkurl}" />

<c:if test="${fn:startsWith(viewlinkUrl,'/content/')}">
	<c:set var="viewlinkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("viewlinkUrl").toString())%>" />
</c:if>


<c:choose>
	<c:when test="${not empty properties.herotitlecontent}">
		<c:set var="tabOverlayPath" value="" />
		<c:set var="tabList" value="<%=PageUtils.convertMultiWidgetToList(properties,"tabTitle-tabOverlayPath-tabIconPath")%>" />
	
<%-- 		<div class="hero-homepage general" style="background-image: url(${properties.heroimagePath});"> --%>
		<div class="hero-homepage general rsImg" style="background-image: url();" ${hdscorp:bgImgAtrr(properties.heroimagePath,null)} > 
    		<div class="hero-homepage-container general">
    			<h2 class="headline hidden-xs">${properties.herotitlecontent}</h2>
    			<h2 class="headline hidden-sm hidden-md hidden-lg">${properties.herotitlecontent}</h2>
    			<h4 class="sub-headline hidden-xs">${properties.herosubtitlecontent}</h4>
    			<h4 class="sub-headline hidden-sm hidden-md hidden-lg">${properties.herosubtitlecontent}</h4>
    	
    			<ul class="general-list col-sm-10 col-md-9 col-lg-8 clearfix">
    				<c:forEach var="tabList" items="${tabList}">
						<c:set var="tabTitle" value="${tabList.tabTitle}" />
						<c:set var="tabOverlayPath" value="${tabList.tabOverlayPath}" />
						<c:set var="tabIconPath" value="${tabList.tabIconPath}" />
						<li class="col-sm-6">
    						<a href="#" data-class="healthcare">    							
    							<span class="sprite icon-suitcase-red" style="background-image: url(${tabIconPath});background-position: 0 0;background-repeat:no-repeat;"></span> ${tabTitle}
    						</a>

    						<sling:include path="${tabOverlayPath}.modal.html"/>
    						
    					</li>
    					

    				</c:forEach>
    			</ul>
    	
    			<div class="view-all">
    				<a href="${viewlinkUrl}">${properties.viewalllinktext}<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>
    			</div>
    	
    			<div class="scroll-down">
    				<a href="javascript:void(0);"><span class="sprite icon-arrow-down"></span></a>
    			</div>
    		</div>
    	</div> 

         <div class="hero-homepage list-content-container"></div> 
    	
	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure Homepage Hero Banner</span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>    	