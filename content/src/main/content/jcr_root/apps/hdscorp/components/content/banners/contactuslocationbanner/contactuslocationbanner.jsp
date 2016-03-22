<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:choose>
	<c:when test="${not empty properties.contactlocationtitlecontent}">

		<c:set var="placardList" value="<%=PageUtils.convertMultiWidgetToList(properties,"phonenumbertext")%>" />


	<div class="headquarter-block clearfix">
		<div class="content-container clearfix">
			<div class="col-md-12">
			<div class="contact-info">
				<h2>${properties.contactlocationtitlecontent}</h2>
				<p>${properties.contactlocationsubtitlecontent}</p>
			</div>
			</div>
			<div class="col-md-9">
				<img src="${properties.contactlocationimagePath}" alt="${properties.contactimagealtlabel}" class="img-responsive"/>
			</div>
			<div class="col-md-3">
				<div class="right_address_panel">
					<h4>${properties.contactlocationlabel}</h4>
					<p>${properties.contactlocationaddressline1}</p>
					<p>${properties.contactlocationaddressline2}</p>
                    <div class="driving-direction clearfix">
    					<a class="animateLink" href="${properties.contactdrivingdirectionsurl}" target="${properties.openinnew?'_blank':'_self'}">${properties.contactdrivingdirectionslabel}${properties.thirdparty?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a>
                    </div>
					<div class="address-contacts">
						<c:forEach var="placardList" items="${placardList}" varStatus="loop">
							<c:set var="phonenumbertext" value="${placardList.phonenumbertext}" />
	                        <div class="contact">
	                            ${phonenumbertext}
	                        </div>
						</c:forEach>					
					</div>
					
					<c:set var="linkUrl" value="${properties.contactlocationviewallurl}" />

					<c:if test="${fn:startsWith(linkUrl,'/content/')}">
						<c:set var="linkUrl" value="${hdscorp:shortURL(linkUrl)}" />
					</c:if>
					
                    <div class="view-all-loc clearfix">
					   <a class="animateLink" href="${linkUrl}" target="${properties.openinnew2?'_blank':'_self'}">${properties.contactlocationviewalllabel}${properties.thirdparty2?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a>
                    </div>
				</div>
			</div>
		</div>
	</div>



	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure Contact US Location Banner</span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>    	