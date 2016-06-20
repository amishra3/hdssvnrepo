<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:choose>
	<c:when test="${not empty properties.aboutushextitlecontent}">

		<c:set var="placardList" value="<%=PageUtils.convertMultiWidgetToList(properties,"placardTitle-placardcontent-placardIconPath-placardIconalt-placardurllabel-placardtargeturl-seemorenewwin")%>" />	
		<c:set var="bannertypeclass" value="behind-scene-hexagon"/>
		<c:if test="${not empty properties.bannertype}">
			<c:set var="bannertypeclass1" value="${properties.bannertype}"/>
		</c:if>
		<%--<div class="${bannertypeclass1} clearfix" style="background-image: url('${properties.aboutusheximagePath}');">--%>
            <div class="${bannertypeclass1} clearfix rsImg"  ${hdscorp:bgImgAtrr(properties.aboutusheximagePath,properties.aboutushexmobileimage)} > 

            <c:if test="${not empty properties.aboutushextitlecontent}">
            <div class="content-container">
            	<h2>${properties.aboutushextitlecontent}</h2>
                <c:if test="${not empty properties.aboutushexsubtitlecontent}">
                    <p class="col-sm-10 col-sm-offset-1">${properties.aboutushexsubtitlecontent}</p>
                </c:if>
            </div>
            </c:if>

            <div class="${bannertypeclass}-list">
            	<div class="content-container">
                	<div class="col-sm-12 col-no-pad hex-contain row-centered clearfix">

						<c:forEach var="placardList" items="${placardList}" varStatus="loop">
							<c:set var="placardTitle" value="${placardList.placardTitle}" />
							<c:set var="placardIconPath" value="${placardList.placardIconPath}" />
							<c:set var="placardcontent" value="${placardList.placardcontent}" />
	                    	<c:set var="placardIconalt" value="${placardList.placardIconalt}" />
	                    	<c:set var="placardurllabel" value="${placardList.placardurllabel}" />
	                    	<c:set var="placardtargeturl" value="${placardList.placardtargeturl}" />
							<c:if test="${fn:startsWith(placardtargeturl,'/content/')}">
								<c:set var="placardtargeturl" value="${hdscorp:shortURL(placardtargeturl)}" />
							</c:if>
	
	
							<div class="hexagon320 hex-col-centered">
                                <div class="hexagon-content">
                                    <div class="icon">
                                        <img src="${placardIconPath}" alt="${placardIconalt}" title="${placardIconalt}">
                                    </div>
                                    <h4>${placardTitle}</h4>
                                    <p>${placardcontent}</p>

    
                                    <c:if test="${not empty placardurllabel}">

    
                                    <div class="read-more">
                                        <a href="${placardtargeturl}" target="${placardList.seemorenewwin==1?'_blank':'_self'}" class="animateLink">${placardurllabel}
                                            <span aria-hidden="true"
											class="glyphicon ${placardList.seemorenewwin==1?'glyphicon-new-window':'glyphicon-menu-right animateIcon'}"></span>

                                        </a>
                                    </div>


                                    </c:if>
                                </div>
							</div>
		    			</c:forEach>
					</div>
                </div>
            </div>
		
		</div>    		
	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure About US HEXAGON Banner</span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>    	