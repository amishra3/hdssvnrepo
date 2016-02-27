<%--
Leadership BIO details component
--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>

<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.LeaderShipBIODetailsModel" var="leaderShipBIODetailsModel" />


<c:choose>
	<c:when test="${not empty leaderShipBIODetailsModel.lbdTitle}">
     <div class="leader-detail">
                <div class="content-container container-fluid">
                    <div class="row">
                        <div class="profile-name hidden-sm hidden-md hidden-lg">
                            <h1>${leaderShipBIODetailsModel.lbdTitle}</h1>
                        </div>
                        <div class="leader-info hidden-sm hidden-md hidden-lg">
                            ${leaderShipBIODetailsModel.lbdJobTitle}
                        </div>
                        <div class="share-links mt_mb hidden-sm hidden-md hidden-lg">
                              <strong>${currentStyle.lbdfollowlabel}</strong>
                                <a href="${leaderShipBIODetailsModel.lbdTwiterFollowURL}" target="_blank"><img title="${leaderShipBIODetailsModel.lbdtwitteralt}" alt="${leaderShipBIODetailsModel.lbdtwitteralt}" src="${leaderShipBIODetailsModel.lbdtwittericonpath}"></a>
    							<a href="${leaderShipBIODetailsModel.lbdFacebookFollowURL}" target="_blank"><img title="${leaderShipBIODetailsModel.lbdfacebookalt}" alt="${leaderShipBIODetailsModel.lbdfacebookalt}" src="${leaderShipBIODetailsModel.lbdfacebookiconpath}"></a>
    							<a href="${leaderShipBIODetailsModel.lbdLinkedinFollowURL}" target="_blank"><img title="${leaderShipBIODetailsModel.lbdlinkedinalt}" alt="${leaderShipBIODetailsModel.lbdlinkedinalt}" src="${leaderShipBIODetailsModel.lbdlinkediniconpath}"></a>
                     </div>
						<div class="col-sm-4">
                            <div class="leader-profile"><img src="${leaderShipBIODetailsModel.lbdimage}" alt="${leaderShipBIODetailsModel.lbdimagealt}" title="${leaderShipBIODetailsModel.lbdimagealt}"></div>
                        </div>
                        <div class="col-sm-8">                            
                            <div class="profile-name hidden-xs">
                                <h1>${leaderShipBIODetailsModel.lbdTitle}</h1>
                            </div>
    						<div class="leader-info hidden-xs">
                                ${leaderShipBIODetailsModel.lbdJobTitle}
                            </div>

    						<div class="share-links mt_mb hidden-xs">
    						      <strong>${currentStyle.lbdfollowlabel} ${leaderShipBIODetailsModel.lbdfallowname}</strong>
    							 <a href="${leaderShipBIODetailsModel.lbdTwiterFollowURL}" target="_blank"><img title="${leaderShipBIODetailsModel.lbdtwitteralt}" alt="${leaderShipBIODetailsModel.lbdtwitteralt}" src="${leaderShipBIODetailsModel.lbdtwittericonpath}"></a>
    							<a href="${leaderShipBIODetailsModel.lbdFacebookFollowURL}" target="_blank"><img title="${leaderShipBIODetailsModel.lbdfacebookalt}" alt="${leaderShipBIODetailsModel.lbdfacebookalt}" src="${leaderShipBIODetailsModel.lbdfacebookiconpath}"></a>
    							<a href="${leaderShipBIODetailsModel.lbdLinkedinFollowURL}" target="_blank"><img title="${leaderShipBIODetailsModel.lbdlinkedinalt}" alt="${leaderShipBIODetailsModel.lbdlinkedinalt}" src="${leaderShipBIODetailsModel.lbdlinkediniconpath}"></a>
                            </div>
						<div class="leaders_description">
                            <p>${leaderShipBIODetailsModel.lbdContent}</p>
                            </div>
                            <div class="view-all-executive">
                                <a href="${currentStyle.lbdviewalllinkurl}" target="${currentStyle.lbdviewalllinkopeninnewwindow}" class="animateLink"><span aria-hidden="true" class="glyphicon glyphicon-menu-left animateIconLeft"></span>${currentStyle.lbdviewalllinklabel}</a>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </c:when>

	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure Leadership BIO details component</span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>