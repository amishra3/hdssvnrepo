<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:set var="linkUrl" value="${properties.hexbuttonurl}" />

<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>"/>
</c:if>

<c:set var="containerclass" value="" />
<wcmmode:edit>
	<!-- <c:set var="containerclass" value="showcontent" /> -->
</wcmmode:edit>

<c:choose>
	<c:when test="${not empty properties.hextitlecontent}">
        <c:set var="placardList" value="<%=PageUtils.convertMultiWidgetToList(properties,"placardTitle-placardcontent-placardIconPath-placardlinklabel-placardlinkurl")%>" />
        <div class="hero-homepage healthcare ${containerclass}">
            <div class="hero-homepage-container">
                <a href="javascript:void(0);" class="close-hero"><span class="sprite icon-close-hero"></span></a>
                <c:if test="${not empty properties.bannericonpath}">
                    <!-- IF ICON PATH IS PRODIVDED -->
                    <span class="sprite icon-healthcare bannericon bigbannericon" style="background-image: url('${properties.bannericonpath}')"></span>
                </c:if>
                <h1>${properties.hextitlecontent}</h1>
                <h4>${properties.hexsubtitlecontent}</h4>
                <p>${properties.hexcontent}</p>
        
                <ul class="healthcare-list">
                <c:forEach var="placardList" items="${placardList}" varStatus="loop">
                        <c:set var="placardTitle" value="${placardList.placardTitle}" />
                        <c:set var="placardIconPath" value="${placardList.placardIconPath}" />
                        <c:set var="placardcontent" value="${placardList.placardcontent}" />
          
                    <li class="hexagon-connect hexagon">
                        <span class="sprite icon-light" style="background-image: url('${placardIconPath}');"></span>
                        <h4>${placardTitle}</h4>
                        ${placardcontent}
                        <a href="#">CONNECT TO<br>health solutions <span class="sprite icon-caret-red"></span></a>
                    </li>

                </c:forEach>
                </ul>
            </div>
        </div>
	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure HEXAGON Modal Banner</span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>    	