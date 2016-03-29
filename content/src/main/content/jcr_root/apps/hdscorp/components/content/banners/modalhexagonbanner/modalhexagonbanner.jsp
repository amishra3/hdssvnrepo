<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:set var="linkUrl" value="${properties.hexbuttonurl}" />

<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="${hdscorp:shortURL(linkUrl)}" />
</c:if>

<c:set var="containerclass" value="" />
<wcmmode:edit>
	<!-- <c:set var="containerclass" value="showcontent" /> -->
</wcmmode:edit>

<c:choose>
	<c:when test="${not empty properties.hextitlecontent}">
        <c:set var="placardList" value="<%=PageUtils.convertMultiWidgetToList(properties,"placardTitle-placardcontent-placardIconPath-placardlinklabel-placardlinkurl-seemorenewwin-thirdparty")%>" />
            <div class="hero-homepage-container">
                <a href="javascript:void(0);" class="close-hero"><span class="sprite icon-close-hero"></span></a>
                <c:if test="${not empty properties.bannericonpath}">
                    <!-- IF ICON PATH IS PRODIVDED -->
                    <span class="sprite bannericon bigbannericon">
						<img src="${properties.bannericonpath}">
                    </span>
                </c:if>
                <h1>${properties.hextitlecontent}</h1>
                <h4>${properties.hexsubtitlecontent}</h4>
                <p>${properties.hexcontent}</p>

                <ul class="healthcare-list">
                    <c:forEach var="placardList" items="${placardList}" varStatus="loop">
                        <c:set var="placardTitle" value="${placardList.placardTitle}" />
                        <c:set var="placardIconPath" value="${placardList.placardIconPath}" />
                        <c:set var="placardcontent" value="${placardList.placardcontent}" />
                        <c:set var="placardlinklabel" value="${placardList.placardlinklabel}" />
						<c:set var="placardlinkurl" value="${placardList.placardlinkurl}" />
						
						<c:if test="${fn:startsWith(placardlinkurl,'/content/')}">
							<c:set var="placardlinkurl" value="${hdscorp:shortURL(placardlinkurl)}" />
						</c:if>
	                                            
	                    <li class="hexagon-connect hexagon">
	                        <span class="sprite icon-connect" style="background-image: url(${placardIconPath});background-position: 0 0;background-repeat:no-repeat;"></span>
	                        <h4>${placardTitle}</h4>
	                        <p>${placardcontent}</p>
	                        <a class="animateAnchor" href="${placardlinkurl}" target="${placardList.seemorenewwin==1?'_blank':'_self'}">${placardlinklabel}${placardList.thirdparty==1?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':'<span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a>
	                    </li>

                </c:forEach>
                </ul>
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