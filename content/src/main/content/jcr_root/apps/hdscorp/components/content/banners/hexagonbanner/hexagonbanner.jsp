<%--
  Homepage Hero Banner component.
--%>

<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:set var="linkUrl" value="${properties.hexbuttonurl}" />

<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="${hdscorp:shortURL(linkUrl)}" />
</c:if>

<c:set var="editbarstyle" value="" />
<wcmmode:edit>
	<c:set var="editbarstyle" value="editbarstyle" />
</wcmmode:edit>


<c:choose>
	<c:when test="${not empty properties.hextitlecontent}">

		<c:set var="placardList" value="<%=PageUtils.convertMultiWidgetToList(properties,"placardTitle-placardcontent-placardIconPath-placardIconalt")%>" />

    	<%-- <div class="calculating-success col-xs-12 col-sm-12 col-md-12 col-lg-12 hero-homepage-container ${editbarstyle} ${not empty properties.hexbuttonlabel?' ':'heaxongonbannernobutton'}" style="background-image: url('${properties.heximagePath}')"> --%>
             <div class="calculating-success col-xs-12 col-sm-12 col-md-12 col-lg-12 hero-homepage-container ${editbarstyle} ${not empty properties.hexbuttonlabel?' ':'heaxongonbannernobutton'} rsImg" style="background-image: url();" ${hdscorp:bgImgAtrr(properties.heximagePath,properties.hexmobileimage)}>
    	    <!-- IF IS A MODAL TRUE -->
    	    <c:if test="${properties.ismodalcontent}">
    	    	<a href="javascript:void(0);" class="close-hero"><span class="sprite icon-close-hero"></span></a>
    	    </c:if>
    	    <c:if test="${properties.bannericonpath}">
    	    <!-- IF ICON PATH IS PRODIVDED -->
            	<span class="sprite icon-healthcare" style="background-image: url('${properties.bannericonpath}')"></span>
            </c:if>
    		<div class="calculating-success-container content-container">
    			<h2>${properties.hextitlecontent}</h2>
    			<h4>${properties.hexsubtitlecontent}</h4>
					<p>${properties.hexcontent}</p>	
				<c:if test="${not empty properties.hexbuttonlabel}">					
	    			<div class="explore hidden-sm hidden-md hidden-lg">
	    				<a href="${linkUrl}" class="btn-square -white" target="${properties.hexurltargettype?'_blank':'_self'}">${properties.hexbuttonlabel}</a>
	    			</div>
				</c:if>    	
    			<ul class="calculating-list">
    			<c:forEach var="placardList" items="${placardList}" varStatus="loop">
						<c:set var="placardTitle" value="${placardList.placardTitle}" />
						<c:set var="placardIconPath" value="${placardList.placardIconPath}" />
						<c:set var="placardcontent" value="${placardList.placardcontent}" />
                    	<c:set var="placardIconalt" value="${placardList.placardIconalt}" />
	    				<li class="hexagon-good hexagon270">
                            <img src='${placardIconPath}' alt='${placardIconalt}' title='${placardIconalt}' style="position: absolute;top: -30px;left: 0px;right: 0px;margin: 0px auto;">
	    					<h4>${placardTitle}</h4>
	    					${placardcontent}
	    				</li>

						<c:if test="${!loop.last && properties.hexshowadditionsymbol}">							    				
			    			<li class="hidden-xs separator">
		    					<span class="sprite ${loop.count==1?'icon-plus':'icon-minus'}"/>
		    				</li>
						</c:if>	    				
    			</c:forEach>

    			</ul>
    			<c:if test="${not empty properties.hexbuttonlabel}">
	    			<div class="explore hidden-xs">
	    				<a href="${linkUrl}" class="btn-square -white" target="${properties.hexurltargettype?'_blank':'_self'}">${properties.hexbuttonlabel}</a>
	    			</div>
				</c:if>    			
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