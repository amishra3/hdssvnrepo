<%--
  Homepage Hero Banner component.
--%>

<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:set var="linkUrl" value="${properties.hexbuttonurl}" />

<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>"/>
</c:if>


<c:choose>
	<c:when test="${not empty properties.hextitlecontent}">

		<c:set var="placardList" value="<%=PageUtils.convertMultiWidgetToList(properties,"placardTitle-placardcontent-placardIconPath")%>" />

    	<div class="calculating-success col-xs-12 col-sm-12 col-md-12 col-lg-12" style="background-image: url('${properties.heximagePath}')">
    		<div class="calculating-success-container content-container">
    			<h1>${properties.hextitlecontent}</h1>
    			<h4>${properties.hexsubtitlecontent}</h4>
					${properties.hexcontent}    	
    			<div class="explore hidden-sm hidden-md hidden-lg">
    				<a href="${linkUrl}" class="btn-square -white" target="${properties.hexurltargettype?'_blank':'_self'}">${properties.hexbuttonlabel}</a>
    			</div>
    	
    			<ul class="calculating-list">
    			<c:forEach var="placardList" items="${placardList}" varStatus="loop">
						<c:set var="placardTitle" value="${placardList.placardTitle}" />
						<c:set var="placardIconPath" value="${placardList.placardIconPath}" />
						<c:set var="placardcontent" value="${placardList.placardcontent}" />
	    				<li class="hexagon-good hexagon270">
	    					<span class="sprite icon-light" style="background-image: url('${placardIconPath}');"></span>
	    					<h4>${placardTitle}</h4>
	    					${placardcontent}
	    				</li>

						<c:if test="${!loop.last && properties.hexshowadditionsymbol}">							    				
			    			<li class="hidden-xs">
		    					<span class="sprite ${loop.count==1?'icon-plus':'icon-minus'}"/>
		    				</li>
						</c:if>	    				
    			</c:forEach>

    			</ul>
    	
    			<div class="explore hidden-xs">
    				<a href="${linkUrl}" class="btn-square -white" target="${properties.hexurltargettype?'_blank':'_self'}">${properties.hexbuttonlabel}</a>
    			</div>
    		</div>
    	</div>
    		
	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure Homepage HEXAGON Hero Banner</span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>    	