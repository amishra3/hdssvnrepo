<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:choose>
	<c:when test="${not empty properties.hexagonbannertitle}">

		<c:set var="placardList" value="<%=PageUtils.convertMultiWidgetToList(properties,"placardTitle-placardcontent-placardIconPath-placardIconalt-placardurllabel-placardtargeturl-openinnewwindow-thirdparty")%>" />

		<div class="advance-tech-hexagon clearfix rsImg" style="background-image: url();" ${hdscorp:bgImgAtrr(properties.hexagonbannertitleimagePath,properties.hexagonbannertitlemobileimagePath)}  >
			<div class="content-container clearfix">
            	<h2>${properties.hexagonbannertitle}</h2>
				<p class="col-sm-10 col-sm-offset-1">${properties.hexagonbannerdescription}</p>
            </div>
            
            <div class="advance-tech-hexagon-list clearfix">
            	<div class="content-container">
                	<div class="col-sm-10 col-sm-offset-1 col-no-pad hex-contain clearfix">

						<c:forEach var="placardList" items="${placardList}" varStatus="loop">
							<c:set var="placardTitle" value="${placardList.placardTitle}" />
							<c:set var="placardIconPath" value="${placardList.placardIconPath}" />
							<c:set var="placardcontent" value="${placardList.placardcontent}" />
	                    	<c:set var="placardIconalt" value="${placardList.placardIconalt}" />
	                    	<c:set var="placardurllabel" value="${placardList.placardurllabel}" />
	                    	<c:set var="placardtargeturl" value="${placardList.placardtargeturl}" />
                            <c:set var="openinnewwindow" value="${placardList.openinnewwindow}" />
							<c:if test="${fn:startsWith(placardtargeturl,'/content/')}">
								<c:set var="placardtargeturl" value="${hdscorp:shortURL(placardtargeturl)}" />
							</c:if>
	
	
							<div class="hexagon320">
                                <div class="hexagon-content">
                                    <div class="icon">
                                        <img src="${placardIconPath}" alt="${placardIconalt}" title="${placardIconalt}">
                                    </div>
                                    <h4>${placardTitle}</h4>
                                    <p>${placardcontent}</p>

    
                                    <c:if test="${not empty placardurllabel}">
                                    <div class="read-more">
 <a href="${placardtargeturl}" target="${openinnewwindow==1?'_blank':'_self'}" class="animateLink">${placardurllabel}${placardList.thirdparty==1?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}

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
				<span class="cq-text-placeholder-ipe">Configure Social Innovation Advance Tech Hexagon Banner</span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>    	